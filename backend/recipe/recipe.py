from ai import gpt
import data


def create_recipes(ingredients: [data.RequestedIngredient]):
    recipes = gpt.find_recipe(ingredients)

    for recipe in recipes:
        recipe['coach'] = data.COACHES[recipe['coach']]

    return recipes


class GptAssistedRecipeFinder(ai.gpt.task.GptAssistedTask):

    def __init__(self):
        super().__init__(max_tokens=3000, frequency_penalty=0.2, presence_penalty=0.2, temperature=0.8)

    def build_gpt_prompt(self, ingredients: [data.RequestedIngredient]):

        with open(root.PROJECT_ROOT_PATH / 'data' / 'recipe_prompt.txt', 'r', encoding='utf-8') as f:
            system_message = f.read()

        prompt = ai.gpt.prompt.Prompt(system_message)
        prompt.add_user_message(data.RequestedIngredient.ingredient_list_to_json(ingredients))

        return prompt

    def post_process_gpt_response(self, gpt_response_content: str):
        return json.loads(gpt_response_content)