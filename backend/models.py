import dataclasses
import json

import root


@dataclasses.dataclass
class RequestedIngredientQuantity:
    unit: str
    value: float


@dataclasses.dataclass
class RequestedIngredient:
    name: str
    quantity: RequestedIngredientQuantity

    def as_dict(self) -> dict:
        return dataclasses.asdict(self)

    @staticmethod
    def from_dict(data: dict) -> 'RequestedIngredient':
        return RequestedIngredient(
            name=data['name'],
            quantity=RequestedIngredientQuantity(**data['quantity']) if 'quantity' in data else None
        )


@dataclasses.dataclass
class SuggestedIngredient:
    unit: str
    default_quantity: float
    auto_add: bool

    @staticmethod
    def read_suggested_ingredients() -> dict[str, 'SuggestedIngredient']:
        with open(root.PROJECT_ROOT_PATH / 'data' / 'ingredients.json') as f:
            return {
                data['name']: SuggestedIngredient(data['unit'], data['defaultQuantity'], data['autoAdd'])
                for data in json.load(f)['ingredients']
            }


suggested_ingredients = SuggestedIngredient.read_suggested_ingredients()
