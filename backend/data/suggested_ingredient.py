import dataclasses
import json
import pathlib


@dataclasses.dataclass
class SuggestedIngredient:
    """An ingredient that may be suggested to the user while they are typing."""
    name: str
    unit: str
    defaultQuantity: float
    # If true, this is a "default" ingredient (farine, sucre, ...) that will be added automatically in the
    # dedicated separate list.
    autoAdd: bool

    def as_dict(self) -> dict:
        return dataclasses.asdict(self)

    @staticmethod
    def read_suggested_ingredients() -> dict[str, 'SuggestedIngredient']:
        with open(pathlib.Path(__file__).parent / 'suggested_ingredients.json', encoding='utf-8') as f:
            return {data['name']: SuggestedIngredient(**data) for data in json.load(f)}


SUGGESTED_INGREDIENTS = SuggestedIngredient.read_suggested_ingredients()
