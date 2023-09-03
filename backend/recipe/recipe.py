import gpt
import models


def create_recipes(ingredients: [models.RequestedIngredient]):
    recipes = gpt.find_recipe(ingredients)

    for recipe in recipes:
        recipe['coach'] = models.COACHES[recipe['coach']]

    return recipes


class GptAssistedRecipeFinder(gpt.task.GptAssistedTask):

    def __init__(self):
        super().__init__(max_tokens=3000, frequency_penalty=0.2, presence_penalty=0.2, temperature=0.8)

    def build_gpt_prompt(self, ingredients: [models.RequestedIngredient]):

        with open(root.PROJECT_ROOT_PATH / 'data' / 'recipe_prompt.txt', 'r', encoding='utf-8') as f:
            system_message = f.read()

        prompt = gpt.prompt.Prompt(system_message)
        prompt.add_user_message(models.RequestedIngredient.ingredient_list_to_json(ingredients))

        return prompt

    def post_process_gpt_response(self, gpt_response_content: str):
        return json.loads(gpt_response_content)