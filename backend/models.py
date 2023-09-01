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

    @staticmethod
    def to_json(ingredients: list['RequestedIngredient']) -> str:
        return json.dumps([ingredient.as_dict() for ingredient in ingredients], ensure_ascii=False, indent=4)


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


@dataclasses.dataclass
class Coach:
    name: str
    description: str
    image_url: str

    def as_dict(self):
        return dataclasses.asdict(self)

    @staticmethod
    def read_coaches() -> dict[str, 'Coach']:
        with open(root.PROJECT_ROOT_PATH / 'data' / 'coaches.json', encoding='utf-8') as f:
            return {
                data['name']: Coach(data['name'], data['description'], data['image_url'])
                for data in json.load(f)
            }


COACHES = Coach.read_coaches()
