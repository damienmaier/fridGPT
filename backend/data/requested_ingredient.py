import dataclasses
import json


@dataclasses.dataclass
class RequestedIngredientQuantity:
    unit: str
    value: float


@dataclasses.dataclass
class RequestedIngredient:
    name: str
    quantity: RequestedIngredientQuantity | None = None
    mandatory: bool = False

    def as_dict(self) -> dict:
        dict_ = dataclasses.asdict(self)
        if not self.quantity:
            del dict_['quantity']
        if not self.mandatory:
            del dict_['mandatory']

        return dict_

    @staticmethod
    def from_dict(data: dict) -> 'RequestedIngredient':
        data = data.copy()

        if 'quantity' in data:
            data['quantity'] = RequestedIngredientQuantity(**data['quantity'])

        return RequestedIngredient(**data)

    @staticmethod
    def ingredient_list_to_json(ingredients: list['RequestedIngredient']) -> str:
        return json.dumps([ingredient.as_dict() for ingredient in ingredients], ensure_ascii=False, indent=4)
