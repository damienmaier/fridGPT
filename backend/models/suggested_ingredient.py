import dataclasses
import json

import root


@dataclasses.dataclass
class SuggestedIngredient:
    name: str
    unit: str
    default_quantity: float
    auto_add: bool

    @staticmethod
    def read_suggested_ingredients() -> dict[str, 'SuggestedIngredient']:
        with open(root.PROJECT_ROOT_PATH / 'data' / 'suggested_ingredients.json', encoding='utf-8') as f:
            return {
                data['name']: SuggestedIngredient(data['name'], data['unit'], data['defaultQuantity'], data['autoAdd'])
                for data in json.load(f)['ingredients']
            }


SUGGESTED_INGREDIENTS = SuggestedIngredient.read_suggested_ingredients()
