import ai.gpt


class IngredientUnitValidator(ai.gpt.Classifier):
    """A classifier that validates if a unit is valid for an ingredient.

    See the documentation of `ai.gpt.Classifier` for more information.

    An instance of this class can be called like a function to get a prediction.
    """

    @staticmethod
    def convert_case_to_gpt_message(ingredient_name, unit) -> str:
        return f'{ingredient_name} --- {unit}'


is_valid_unit_for_ingredient = IngredientUnitValidator(
    system_message=(
        "Tu vas recevoir dans chaque message un nom d'ingrédient et une unité de mesure. "
        "Ton travail est de vérifier que l'unité de mesure est appropriée pour l'ingrédient. "
    ),

    ok_cases=[
        ('pommes de terre', 'kg'),
        ('pommes de terre', 'g'),
        ('pommes de terre', 'pièce'),
        ('lait', 'l'),
        ('lait', 'ml'),
        ('pâtes', 'kg'),
        ('pâtes', 'g'),
    ],

    nok_cases=[
        ('pommes de terre', 'l'),
        ('lait', 'pièce'),
    ]
)
