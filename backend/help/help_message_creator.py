import json

import ai.gpt
import config

logger = config.get_logger(__name__)


class HelpMessageCreator(ai.gpt.Task):
    """A gpt assisted task that creates a help message for a recipe step.

    This is a subclass of `ai.gpt.Task`. See the documentation of `ai.gpt.Task` for more information about how
    this class works.
    """

    def __init__(self):

        # as generating the help message can take a while, we set a larger timeout
        super().__init__(timeout=60)

    def build_gpt_prompt(self, recipe_steps: list[str], step_index: int) -> 'ai.gpt.Prompt':
        """Builds a GPT prompt for requesting a help message for a recipe step.

        See the documentation of `ai.gpt.Task` for more information about how this method works.

        args
            recipe_steps: the whole recipe text
            step_index: the index of the step for which a help message should be generated

        """

        prompt = ai.gpt.Prompt(f"""
            Voici les instructions d'une recette de cuisine : 
                                   
            {json.dumps(recipe_steps, ensure_ascii=False, indent=4)}
        
        """)

        prompt.add_user_message(f"""
            L'utilisateur a besoin d'aide pour comprendre l'étape suivante :
            
            {recipe_steps[step_index]}
            
            Ecris une explication plus détaillée de cette étape. Si l'étape inclut des termes techniques de cuisine,
            explique les.
            
            Ton explication doit avoir une longueur de 4 ou 5 phrases au maximum.
            
            Les autres étapes de la recette t'ont été fournies pour que tu comprennes le contexte, mais ton explication
            doit concerner uniquement l'étape mentionnée ci-dessus.        
        """)

        return prompt


def create_help_message_for_step(recipe_steps: list[str], step_index: int) -> str:
    """Creates a help message for a recipe step.

    args
        recipe_steps: the whole recipe text
        step_index: the index of the step for which a help message should be generated

    returns
        A useful help message that gives more information about the recipe step to the user.
    """
    logger.info("Creating help message for recipe step")
    help_message = HelpMessageCreator()(recipe_steps, step_index)
    logger.info("Help message created")

    return help_message
