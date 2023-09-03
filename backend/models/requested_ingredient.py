import dataclasses
import json


@dataclasses.dataclass
class RequestedIngredientQuantity:
    unit: str
    value: float


@dataclasses.dataclass
class RequestedIngredient:
    name: str
    quantity: RequestedIngredientQuantity | None

    def as_dict(self) -> dict:
        return {'name': self.name, } | ({'quantity': dataclasses.asdict(self.quantity)} if self.quantity else {})

    @staticmethod
    def from_dict(data: dict) -> 'RequestedIngredient':
        return RequestedIngredient(
            name=data['name'],
            quantity=RequestedIngredientQuantity(**data['quantity']) if 'quantity' in data else None
        )

    @staticmethod
    def ingredient_list_to_json(ingredients: list['RequestedIngredient']) -> str:
        return json.dumps([ingredient.as_dict() for ingredient in ingredients], ensure_ascii=False, indent=4)
