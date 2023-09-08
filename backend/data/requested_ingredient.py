import dataclasses
import json
from typing import Optional


@dataclasses.dataclass
class RequestedIngredientQuantity:
    unit: str
    value: float


@dataclasses.dataclass
class RequestedIngredient:
    """An ingredient that was received in a recipe generation request."""
    name: str
    quantity: Optional[RequestedIngredientQuantity] = None
    mandatory: bool = False

    def as_dict(self, ignore_mandatory=False) -> dict:
        dict_ = dataclasses.asdict(self)
        if not self.quantity:
            del dict_['quantity']
        if not self.mandatory or ignore_mandatory:
            del dict_['mandatory']

        return dict_

    @staticmethod
    def ingredient_list_to_json(ingredients: list['RequestedIngredient'], ignore_mandatory=False) -> str:
        """Transforms a list of RequestedIngredient objects into a JSON string.

        args
            `ingredients`: A list of RequestedIngredient objects.
            `ignore_mandatory`: If True, the `mandatory` field will not be included in the JSON.

        returns
            A JSON string that is indented to be human-readable.
        """
        return json.dumps([ingredient.as_dict(ignore_mandatory) for ingredient in ingredients], ensure_ascii=False,
                          indent=4)
