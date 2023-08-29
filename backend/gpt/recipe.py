import json

import gpt.task


class GptAssistedRecipeFinder(gpt.task.GptAssistedTask):

    def build_gpt_prompt(self, ingredients: [str]):
        userInput = "ingrédients: "
        for i in range(0, len(ingredients)):
            userInput += ingredients[i] + ", "

        userInput = userInput[:-2]
  
        return [
            {
                "role": "system",
                "content": "Tu es un cuisinier qui fournit des recettes à partir d'une liste d'ingrédients. Utilise les étapes suivantes pour répondre aux entrées de l'utilisateur. \n\nEtape 1: génère la description de la recette que tu a crée ainsi que son nom. Commence toujours par le nom puis la description: \"<insérer nom recette>===<insérer description recette>\"\n \nEtape 2: présente de manière concise et structurée les différentes étapes de la recette. Les étapes doivent êtres numérotées. Chaque étape doit être séparée par \"\\n##\\n\" par exemple : \"1. texte etape1\\n##\\n2.texte etape2\\n##\\n3.texte etape3 etc.\"\n\nFinalement retourne les résultats de l'étape 1 et 2 sous la forme d'un JSON. Par exemple: {\"dishDescription\": \"<insérer résultat étape 1>\", \"instructions\": \"<insérer résultat étape 2>\"}"
            },
            {
                "role": "user",
                "content": "ingrédients: carottes, tomates, hachis de bœuf, oignon, beurre, crème, huile d'olives, parmesan, sel, poivre"
            },
            {
                "role": "assistant",
                "content": "{\"dishDescription\": \"Gratin de bœuf aux légumes===Un délicieux gratin à base de hachis de bœuf, de carottes, de tomates et d'oignons, le tout gratiné avec du parmesan fondant.\", \"instructions\": \"1. Préchauffez votre four à 180°C.\\n##\\n2. Dans une poêle, faites fondre le beurre avec un filet d'huile d'olive.\\n##\\n3. Ajoutez l'oignon finement haché et faites-le revenir jusqu'à ce qu'il soit doré.\\n##\\n4. Ajoutez le hachis de bœuf et faites-le cuire jusqu'à ce qu'il soit bien doré et légèrement croustillant.\\n##\\n5. Incorporez les carottes coupées en petits dés et laissez cuire pendant quelques minutes.\\n##\\n6. Ajoutez les tomates coupées en dés et laissez mijoter pendant 10 minutes.\\n##\\n7. Assaisonnez avec du sel et du poivre selon votre goût.\\n##\\n8. Ajoutez la crème et mélangez bien.\\n##\\n9. Versez le mélange dans un plat à gratin et saupoudrez généreusement de parmesan râpé.\\n##\\n10. Enfournez pendant environ 20 minutes, jusqu'à ce que le gratin soit doré et bouillonnant.\\n##\\n11. Servez chaud et dégustez !\"}"
            },
            {
                "role": "user",
                "content": userInput
            }
        ]

    def post_process_gpt_response(self, gpt_response_content: str):
        return json.loads(gpt_response_content)
