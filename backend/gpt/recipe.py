import json
import gpt.prompt

import gpt.task
import models
import root


class GptAssistedRecipeFinder(gpt.task.GptAssistedTask):

    def __init__(self):
        super().__init__(model='gpt-3.5-turbo-16k', max_tokens=12500)

    def build_gpt_prompt(self, ingredients: [str]):

        with open(root.PROJECT_ROOT_PATH / 'data' / 'recipe_prompt.txt', 'r', encoding='utf-8') as f:
            system_message = f.read()

        prompt = gpt.prompt.Prompt(system_message)
        prompt.add_user_message(models.RequestedIngredient.ingredient_list_to_json(ingredients))

        return prompt

    def post_process_gpt_response(self, gpt_response_content: str):
        return json.loads(gpt_response_content)
