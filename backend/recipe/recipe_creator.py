import json
import pathlib

import cattrs

import ai.dalle
import ai.gpt
import data


class RecipeCreator(ai.gpt.Task):
    """A GPT assisted task that creates a recipe from a list of ingredients.

    This class is a subclass of `ai.gpt.Task`. See the documentation of `ai.gpt.Task` for more information about how
    this class works.
    """

    def __init__(self):

        # as generating the help message can take a while, we set a larger timeout
        # we also increase the max size of the GPT request
        super().__init__(max_tokens=3000, timeout=60)

    @staticmethod
    def _build_system_message(coach_description: str, recipe_params: data.RecipeParams) -> str:
        """Reads the master recipe creation prompt and adjusts it with respect to the coach and user parameters.

        args
            `coach_description`: A description of the coach that will be inserted in the prompt.
            `recipe_params`: The parameters of the recipe.

        returns
            A text to be used as the system message of the GPT prompt.
        """

        # This is where the fun begins.

        # recipe_prompt.txt contains the master recipe creation prompt. It contains several placeholders
        # that we are going to fill according to the coach description and the user parameters.

        # Note that the double curly braces around the json example in recipe_prompt.txt ({{ and }}) are used to
        # avoid the `format` function below to interpret them as placeholders. The `format` function will replace
        # them with single curly braces.

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
            f'La recette doit être réalisable par quelqu\'un ayant un niveau de cuisine {difficulty_word()}.\n\n'
            if recipe_params.difficulty else "",

            number_of_persons_instruction=
            f'La recette est pour {recipe_params.personCount} personnes.\n\n'
            if recipe_params.personCount else "",

            time_instruction=
            f'La recette doit être réalisable en {recipe_params.duration} heures.\n\n'
            if recipe_params.duration else "",
        )

        return system_message

    def build_gpt_prompt(
            self,
            coach_description: str,
            ingredients: [data.RequestedIngredient],
            recipe_params: data.RecipeParams
    ) -> ai.gpt.prompt.Prompt:
        """Builds a GPT prompt for requesting a recipe.

        See the documentation of `ai.gpt.Task` for more information about how this method works.

        args:
            `coach_description`: A description of the coach that will be inserted in the prompt.
            `ingredients`: The list of ingredients that the recipe should contain.
            `recipe_params`: The parameters of the recipe.

        returns:
            A GPT prompt with
                A system message describing the recipe creation task and the expected response format.
                A user message containing the list of ingredients.

        """

        prompt = ai.gpt.prompt.Prompt(self._build_system_message(coach_description, recipe_params))

        prompt.add_user_message(data.RequestedIngredient.ingredient_list_to_json(ingredients))

        return prompt

    def post_process_gpt_response(self, gpt_response_content: str) -> data.Recipe:
        """Parses and validates the GPT recipe response.

        See the documentation of `ai.gpt.Task` for more information about how this method works.

        This method parses the GPT response as JSON and builds a `data.Recipe` object from it. It then performs
        several validation checks on the recipe to ensure that it is valid. If the recipe is not valid,
        an exception is raised to ask the `__call__` method of `ai.gpt.Task` to retry the request.

        args
            `gpt_response_content`: The content of the GPT response.

        raises
            `self.PostProcessingError` in the following cases:
                - The GPT response is not valid JSON.
                - The parsed JSON response is not a valid `data.Recipe` object.
                - The recipe does not satisfy the validation checks.

        """

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
        """Performs some basic validation checks on the recipe.

        args
            `recipe`: The recipe to validate.

        raises
            `self.PostProcessingError` if the recipe does not satisfy the validation checks.

        """

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
