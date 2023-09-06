import json

import ai.gpt
import config

logger = config.logging.getLogger(__name__)


class HelpMessageCreator(ai.gpt.Task):

    def __init__(self):
        super().__init__(timeout=60)

    def build_gpt_prompt(self, recipe_steps: [str], step_index: int) -> 'ai.gpt.Prompt':
        prompt = ai.gpt.Prompt(f"""
            Voici les instructions d'une recette de cuisine : 
                                   
            {json.dumps(recipe_steps, ensure_ascii=False, indent=4)}
        
        """)

        prompt.add_user_message(f"""
            L'utilisateur a besoin d'aide pour comprendre l'étape suivante :
            
            {recipe_steps[step_index]}
            
            Ecris une explication plus détaillée de cette étape. Si l'étape inclut des termes techniques de cuisine,
            explique les.
            
            Les autres étapes de la recette t'ont été fournies pour que tu comprennes le contexte, mais ton explication
            doit concerner uniquement l'étape mentionnée ci-dessus.        
        """)

        return prompt

    def post_process_gpt_response(self, gpt_response_content: str) -> str:
        return gpt_response_content


def create_help_message_for_step(recipe_steps: [str], step_index: int) -> str:
    logger.info("Creating help message for recipe step")
    help_message = HelpMessageCreator()(recipe_steps, step_index)
    logger.info("Help message created")

    return help_message
