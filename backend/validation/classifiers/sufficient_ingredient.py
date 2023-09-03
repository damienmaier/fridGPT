import gpt
import data


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
                    data.RequestedIngredient(name='sel', quantity=None),
                    data.RequestedIngredient(name='poivre', quantity=None),
                    data.RequestedIngredient(name='huile de cuisson', quantity=None),
                    data.RequestedIngredient(name='vinaigre', quantity=None),
                    data.RequestedIngredient(name='lentilles',
                                             quantity=data.RequestedIngredientQuantity('g', 500)),
                    data.RequestedIngredient(name='carotte',
                                             quantity=data.RequestedIngredientQuantity('pièce', 3)),
                    data.RequestedIngredient(name='pâtes', quantity=data.RequestedIngredientQuantity('g', 300)),
                ]
            ]
        ]

        nok_cases = [
            [
                [
                    data.RequestedIngredient(name='safran', quantity=None),
                    data.RequestedIngredient(name="huile d'olive", quantity=None),
                    data.RequestedIngredient(name='lentilles', quantity=data.RequestedIngredientQuantity('g', 1)),
                ]
            ]
        ]

        super().__init__(system_message, ok_cases, nok_cases)

    @staticmethod
    def convert_case_to_gpt_message(case: [data.RequestedIngredient]) -> str:
        return data.RequestedIngredient.ingredient_list_to_json(case)


is_sufficient_ingredients = SufficientIngredientsValidator()
