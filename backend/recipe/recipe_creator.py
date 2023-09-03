import json
import pathlib

import ai.gpt
import data


class RecipeCreator(ai.gpt.Task):

    def __init__(self):
        super().__init__(max_tokens=3000)

    def build_gpt_prompt(self, coach_description: str, ingredients: [data.RequestedIngredient]):
        with open(pathlib.Path(__file__).parent / 'recipe_prompt.txt', 'r', encoding='utf-8') as f:
            system_message = f.read()

        prompt = ai.gpt.prompt.Prompt(system_message)

        prompt.add_user_message(data.RequestedIngredient.ingredient_list_to_json(ingredients))

        return prompt

    def post_process_gpt_response(self, gpt_response_content: str):
        return json.loads(gpt_response_content)


create_recipe = RecipeCreator()
