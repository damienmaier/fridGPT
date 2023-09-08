import ai.gpt
import data


class SufficientIngredientsValidator(ai.gpt.Classifier):
    """A classifier that validates if a list of ingredients is sufficient to cook a meal.

    See the documentation of `ai.gpt.Classifier` for more information.

    An instance of this class can be called like a function to get a prediction.
    """

    @staticmethod
    def convert_case_to_gpt_message(case: list[data.RequestedIngredient]) -> str:
        return data.RequestedIngredient.ingredient_list_to_json(case, ignore_mandatory=True, ignore_quantity=True)


is_sufficient_ingredients = SufficientIngredientsValidator(
    system_message=(
        "Tu vas recevoir dans chaque message un texte json décrivant une liste d'ingrédients  "
        "de cuisine disponibles dans une cuisine, avec éventuellement leur quantité. "
        "Ton travail est d'indiquer si les ingrédients sont suffisants pour cuisiner un plat. "
        "Tu dois tenir compte du fait qu'il n'y a aucun autre ingrédient disponible. "
        "Pour que les ingrédients soient suffisants, il faut au moins qu'ils incluent un aliment nourrissant "
        "comme par exemple une viande ou un poisson ou un féculent ou une céréale ou une légumineuse ou des légumes ou des fruits, etc. "
        "Si les la liste d'ingrédients contient uniquement des épices, tu dois répondre non."
    ),

    ok_cases=[
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
    ],

    nok_cases=[
        [
            [
                data.RequestedIngredient(name='safran'),
                data.RequestedIngredient(name="huile d'olive"),
                data.RequestedIngredient(name="vinaigre"),
            ]
        ],
    ]
)
