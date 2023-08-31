import gpt.task


class GptAssistedIngredientNameValidation(gpt.task.GptAssistedTask):

    def build_gpt_prompt(self, ingredient_name: str):
        return [
            {
                "role": "system",
                "content": "Ton travail est de vérifier que le texte entré par l'utilisateur est bien un nom "
                           "d'ingrédient de recette de cuisine."
                           "Tu dois simplement répondre par oui ou non."
            },
            {
                "role": "user",
                "content": "pommes de terre"
            },
            {
                "role": "assistant",
                "content": "oui"
            },
            {
                "role": "user",
                "content": "ajsfhjksdfh"
            },
            {
                "role": "assistant",
                "content": "non"
            },
            {
                "role": "user",
                "content": "table"
            },
            {
                "role": "assistant",
                "content": "non"
            },
            {
                "role": "user",
                "content": "carotte toit"
            },
            {
                "role": "assistant",
                "content": "non"
            },
            {
                "role": "user",
                "content": ingredient_name
            },

        ]

    def post_process_gpt_response(self, gpt_response_content: str):
        return gpt_response_content == "oui"