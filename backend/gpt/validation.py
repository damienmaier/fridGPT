import gpt.task
import gpt.prompt


class GptAssistedIngredientNameValidation(gpt.task.GptAssistedTask):

    def build_gpt_prompt(self, ingredient_name: str) -> gpt.prompt.Prompt:
        prompt = gpt.prompt.Prompt(
            "Ton travail est de vérifier que le texte entré par l'utilisateur est bien un nom "
            "d'ingrédient de recette de cuisine. "
            "Tu dois simplement répondre par oui ou non."
        )

        prompt.add_user_message('pommes de terre')
        prompt.add_assistant_message('oui')
        prompt.add_user_message('ajsfhjksdfh')
        prompt.add_assistant_message('non')
        prompt.add_user_message('table')
        prompt.add_assistant_message('non')
        prompt.add_user_message('carotte toit')
        prompt.add_assistant_message('non')
        prompt.add_user_message(ingredient_name)

        return prompt

    def post_process_gpt_response(self, gpt_response_content: str):
        return gpt_response_content == "oui"


class GptAssistedIngredientUnitValidation(gpt.task.GptAssistedTask):
    def build_gpt_prompt(self, ingredient_name: str, unit: str) -> gpt.prompt.Prompt:
        prompt = gpt.prompt.Prompt(
            "Tu vas recevoir dans chaque message un nom d'ingrédient et une unité de mesure. "
            "Ton travail est de vérifier que l'unité de mesure est appropriée pour l'ingrédient. "
            "Tu dois simplement répondre par oui ou non."
        )

        prompt.add_user_message('pommes de terre --- kg')
        prompt.add_assistant_message('oui')
        prompt.add_user_message('pommes de terre --- pièce')
        prompt.add_assistant_message('oui')
        prompt.add_user_message('pommes de terre --- l')
        prompt.add_assistant_message('non')
        prompt.add_user_message('lait --- l')
        prompt.add_assistant_message('oui')
        prompt.add_user_message(f'{ingredient_name} --- {unit}')

        return prompt

    def post_process_gpt_response(self, gpt_response_content: str):
        return gpt_response_content == "oui"
