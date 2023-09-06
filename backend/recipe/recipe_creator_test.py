import unittest

import data
from .recipe_creator import create_recipe


class RecipeCreatorTest(unittest.TestCase):

    def test_create_system_message_default_params(self):
        system_message = create_recipe._build_system_message(
            coach_description='Germaine, une grand-mère spécialiste en cuisine traditionnelle française.',
            recipe_params=data.RecipeParams()
        )

        expected_system_message = r"""Tu incarnes le cuisinier suivant : Germaine, une grand-mère spécialiste en cuisine traditionnelle française..

Tu reçois une liste d'ingrédients et tu crées une recette.

Tu ne peux pas utiliser des ingrédients qui ne sont pas dans la liste.

Il est possible que certains ingrédients aient la mention mandatory: true. Dans ce cas tu dois obligatoirement utiliser cet ingrédient dans ta recette.

Les autres ingrédients sont optionnels. Utilise les seulement si c'est pertinent pour ta recette.

Certains ingrédients peuvent avoir une quantité précisée. Il s'agit d'une quantité maximum. Tu peux utiliser moins de cet ingrédient si tu le souhaites.

Le résultat final doit respecter le format JSON suivant:
{
   "dishName":"<nom de la recette>",
   "dishDescription":"<description recette>",
   "ingredients":"<liste des ingrédients utilisés pour cette recette>",
   "steps":[
      "<première étape de la recette>",
      "<deuxième étape de la recette>",
      "<troisième étape de la recette>",
      etc.
   ]
}

Le JSON que tu génères doit être indenté pour être agréable à lire.

Effectue les étapes ci-dessous tout en complétant le JSON associé.

1. donne un nom/titre à ta recette.

2. génère une brève description de la recette en mentionnant les ingrédients principaux utilisés.

3. liste les ingrédients ainsi : <ingrédient>\n<ingrédient>\n<ingrédient>\n etc. Précise aussi la quantité utilisée comme dans un livre de cuisine.

4. présente de manière claire et concise les différentes étapes de la recette.

"""

        self.assertEqual(system_message, expected_system_message)

    def test_create_system_message_some_params(self):
        system_message = create_recipe._build_system_message(
            coach_description='Germaine, une grand-mère spécialiste en cuisine traditionnelle française.',
            recipe_params=data.RecipeParams(
                difficulty=data.RecipeDifficulty.EASY,
                duration=1.5,
                personCount=4,
                otherIngredientsAllowed=True
            )
        )

        expected_system_message = r"""Tu incarnes le cuisinier suivant : Germaine, une grand-mère spécialiste en cuisine traditionnelle française..

Tu reçois une liste d'ingrédients et tu crées une recette.

Si nécessaire, tu peux utiliser des ingrédients qui ne sont pas dans la liste.

Il est possible que certains ingrédients aient la mention mandatory: true. Dans ce cas tu dois obligatoirement utiliser cet ingrédient dans ta recette.

Les autres ingrédients sont optionnels. Utilise les seulement si c'est pertinent pour ta recette.

Certains ingrédients peuvent avoir une quantité précisée. Il s'agit d'une quantité maximum. Tu peux utiliser moins de cet ingrédient si tu le souhaites.

Le résultat final doit respecter le format JSON suivant:
{
   "dishName":"<nom de la recette>",
   "dishDescription":"<description recette>",
   "ingredients":"<liste des ingrédients utilisés pour cette recette>",
   "steps":[
      "<première étape de la recette>",
      "<deuxième étape de la recette>",
      "<troisième étape de la recette>",
      etc.
   ]
}

Le JSON que tu génères doit être indenté pour être agréable à lire.

Effectue les étapes ci-dessous tout en complétant le JSON associé.

1. donne un nom/titre à ta recette.

2. génère une brève description de la recette en mentionnant les ingrédients principaux utilisés.

3. liste les ingrédients ainsi : <ingrédient>\n<ingrédient>\n<ingrédient>\n etc. Précise aussi la quantité utilisée comme dans un livre de cuisine.

4. présente de manière claire et concise les différentes étapes de la recette.

La recette doit être réalisable par quelqu'un ayant un niveau de cuisine débutant.
La recette est pour 4 personnes.
La recette doit être réalisable en 1.5 heures.
"""

        self.assertEqual(system_message, expected_system_message)

