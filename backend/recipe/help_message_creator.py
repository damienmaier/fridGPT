import json

import ai.gpt


class HelpMessageCreator(ai.gpt.Task):

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


create_help_message_for_step = HelpMessageCreator()
