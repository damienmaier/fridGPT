import gpt
import models


class SufficientIngredientsValidator(gpt.Classifier):

    def __init__(self):
        system_message = (
            "Tu vas recevoir dans chaque message un texte json décrivant une liste d'ingrédients  "
            "de cuisine disponibles dans une cuisine, avec éventuellement leur quantité. "
            "Ton travail est d'indiquer si cette liste contient suffisamment d'ingrédients pour "
            "cuisiner quelque chose. Tu dois tenir compte du fait qu'il n'y a aucun autre ingrédient  "
            "disponible."
        )

        ok_cases = [
            [
                [
                    models.RequestedIngredient(name='sel', quantity=None),
                    models.RequestedIngredient(name='poivre', quantity=None),
                    models.RequestedIngredient(name='huile de cuisson', quantity=None),
                    models.RequestedIngredient(name='vinaigre', quantity=None),
                    models.RequestedIngredient(name='lentilles',
                                               quantity=models.RequestedIngredientQuantity('g', 500)),
                    models.RequestedIngredient(name='carotte',
                                               quantity=models.RequestedIngredientQuantity('pièce', 3)),
                    models.RequestedIngredient(name='pâtes', quantity=models.RequestedIngredientQuantity('g', 300)),
                ]
            ]
        ]

        nok_cases = [
            [
                [
                    models.RequestedIngredient(name='safran', quantity=None),
                    models.RequestedIngredient(name="huile d'olive", quantity=None),
                    models.RequestedIngredient(name='lentilles', quantity=models.RequestedIngredientQuantity('g', 1)),
                ]
            ]
        ]

        super().__init__(system_message, ok_cases, nok_cases)

    @staticmethod
    def convert_case_to_gpt_message(case: [models.RequestedIngredient]) -> str:
        return models.RequestedIngredient.ingredient_list_to_json(case)


is_sufficient_ingredients = SufficientIngredientsValidator()
