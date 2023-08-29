import json

import gpt.task


class GptAssistedRecipeFinder(gpt.task.GptAssistedTask):

    def build_gpt_prompt(self, ingredients: [str]):
        # todo: modifier le prompt pour que GPT génère une recette à partir des ingrédients
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

    def post_process_gpt_response(self, gpt_response_content: str):
        return json.loads(gpt_response_content)
