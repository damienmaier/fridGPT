import ai.gpt
import data


class SufficientIngredientsValidator(ai.gpt.Classifier):

    def __init__(self):
        system_message = (
            "Tu vas recevoir dans chaque message un texte json décrivant une liste d'ingrédients  "
            "de cuisine disponibles dans une cuisine, avec éventuellement leur quantité. "
            "Ton travail est d'indiquer si les ingrédients sont suffisants pour cuisiner un plat. "
            "Tu dois tenir compte du fait qu'il n'y a aucun autre ingrédient disponible. "
            "Pour que les ingrédients soient suffisants, il faut au moins qu'ils incluent un aliment nourrissant "
            "(par exemple un féculent, une céréale, une légumineuse, des légumes, des fruits, etc.) "
            "dans une quanitité suffisante."
        )

        ok_cases = [
            [
                [
                    data.RequestedIngredient(name='sel'),
                    data.RequestedIngredient(name='poivre'),
                    data.RequestedIngredient(name='huile de cuisson'),
                    data.RequestedIngredient(name='vinaigre'),
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
                    data.RequestedIngredient(name='safran'),
                    data.RequestedIngredient(name="huile d'olive"),
                    data.RequestedIngredient(name='lentilles', quantity=data.RequestedIngredientQuantity('g', 1)),
                ]
            ],
        ]

        super().__init__(system_message, ok_cases, nok_cases)

    @staticmethod
    def convert_case_to_gpt_message(case: [data.RequestedIngredient]) -> str:
        return data.RequestedIngredient.ingredient_list_to_json(case, ignore_mandatory=True)


is_sufficient_ingredients = SufficientIngredientsValidator()
