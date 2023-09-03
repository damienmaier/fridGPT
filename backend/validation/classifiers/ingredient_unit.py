import gpt


class IngredientUnitValidator(gpt.Classifier):

    def __init__(self):
        system_message = (
            "Tu vas recevoir dans chaque message un nom d'ingrédient et une unité de mesure. "
            "Ton travail est de vérifier que l'unité de mesure est appropriée pour l'ingrédient. "
        )

        ok_cases = [
            ('pommes de terre', 'kg'),
            ('pommes de terre', 'g'),
            ('pommes de terre', 'pièce'),
            ('lait', 'l'),
            ('lait', 'ml'),
            ('pâtes', 'kg'),
            ('pâtes', 'g'),
        ]

        nok_cases = [
            ('pommes de terre', 'l'),
            ('lait', 'pièce'),
        ]

        super().__init__(system_message, ok_cases, nok_cases)

    @staticmethod
    def convert_case_to_gpt_message(ingredient_name, unit) -> str:
        return f'{ingredient_name} --- {unit}'


is_valid_unit_for_ingredient = IngredientUnitValidator()
