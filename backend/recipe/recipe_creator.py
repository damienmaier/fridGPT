import json
import pathlib

import cattrs

import ai.gpt
import data


class RecipeCreator(ai.gpt.Task):

    def __init__(self):
        super().__init__(max_tokens=3000, timeout=60)

    @staticmethod
    def _build_system_message(coach_description: str, recipe_params: data.RecipeParams) -> str:

        with open(pathlib.Path(__file__).parent / 'recipe_prompt.txt', 'r', encoding='utf-8') as f:
            unformatted_system_message = f.read()

        def difficulty_word():
            match recipe_params.difficulty:
                case data.RecipeDifficulty.EASY:
                    return 'débutant'
                case data.RecipeDifficulty.MEDIUM:
                    return 'moyen'
                case data.RecipeDifficulty.HARD:
                    return 'avancé'

        system_message = unformatted_system_message.format(
            coach_description=coach_description,

            other_ingredients_allowed_instruction=
            'Si nécessaire, tu peux utiliser des ingrédients qui ne sont pas dans la liste.'
            if recipe_params.otherIngredientsAllowed else
            'Tu ne peux pas utiliser des ingrédients qui ne sont pas dans la liste.',

            difficulty_instruction=
            f'La recette doit être réalisable par quelqu\'un ayant un niveau de cuisine {difficulty_word()}.\n'
            if recipe_params.difficulty else "",

            number_of_persons_instruction=
            f'La recette est pour {recipe_params.personCount} personnes.\n'
            if recipe_params.personCount else "",

            time_instruction=
            f'La recette doit être réalisable en {recipe_params.duration} heures.\n'
            if recipe_params.duration else "",
        )

        return system_message

    def build_gpt_prompt(
            self,
            coach_description: str,
            ingredients: [data.RequestedIngredient],
            recipe_params: data.RecipeParams
    ) -> ai.gpt.prompt.Prompt:

        prompt = ai.gpt.prompt.Prompt(self._build_system_message(coach_description, recipe_params))

        prompt.add_user_message(data.RequestedIngredient.ingredient_list_to_json(ingredients))

        return prompt

    def post_process_gpt_response(self, gpt_response_content: str) -> data.Recipe:
        try:
            unstructured_response_content = json.loads(gpt_response_content)
        except json.JSONDecodeError:
            raise self.PostProcessingError('Unable to decode GPT response as JSON')

        try:
            recipe = cattrs.structure(unstructured_response_content, data.Recipe)
        except cattrs.BaseValidationError:
            raise self.PostProcessingError('Unable to decode GPT response as Recipe')

        self._validate_recipe(recipe)

        return recipe

    def _validate_recipe(self, recipe: data.Recipe) -> None:

        if not 3 <= len(recipe.dishName) <= 200:
            raise self.PostProcessingError(f'Recipe dish name has invalid length: {len(recipe.dishName)}')

        if not 3 <= len(recipe.dishDescription) <= 500:
            raise self.PostProcessingError(f'Recipe dish description has invalid length: {len(recipe.dishDescription)}')

        if not 3 <= len(recipe.ingredients) <= 500:
            raise self.PostProcessingError(f'Recipe ingredients has invalid length: {len(recipe.ingredients)}')

        if not 1 <= len(recipe.steps) <= 30:
            raise self.PostProcessingError(f'Invalid recipe steps number: {len(recipe.steps)}')

        for step in recipe.steps:
            if not 3 <= len(step) <= 500:
                raise self.PostProcessingError(f'Recipe step has invalid length: {len(step)}')


create_recipe = RecipeCreator()
