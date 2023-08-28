import json

from gpt.task import GptAssistedTask


def recipe_prompt_builder(ingredients: [str]):
    return [
        {
            'role': 'system',
            'content': 'Tu es un assistant'
        },
        {
            'role': 'user',
            'content': '''
                    Répète exactement le texte json suivant:
                    {
                        "dishDescription": "voici un exemple de description de plat",
                        "instructions": "voici un exemple d'instructions"
                    }
            '''
        },
    ]


def recipe_post_processor(gpt_response: str):
    return json.loads(gpt_response)
