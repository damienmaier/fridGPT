import gpt.task
import gpt.prompt


class GptAssistedIngredientNameValidation(gpt.task.GptAssistedTask):

    def build_gpt_prompt(self, ingredient_name: str):
        prompt = gpt.prompt.Prompt(
            "Ton travail est de vérifier que le texte entré par l'utilisateur est bien un nom "
            "d'ingrédient de recette de cuisine."
            "Tu dois simplement répondre par oui ou non."
        )

        prompt.add_user_message('pommes de terre')
        prompt.add_system_message('oui')
        prompt.add_user_message('ajsfhjksdfh')
        prompt.add_system_message('non')
        prompt.add_user_message('table')
        prompt.add_system_message('non')
        prompt.add_user_message('carotte toit')
        prompt.add_system_message('non')
        prompt.add_user_message(ingredient_name)

        return prompt

    def post_process_gpt_response(self, gpt_response_content: str):
        return gpt_response_content == "oui"
