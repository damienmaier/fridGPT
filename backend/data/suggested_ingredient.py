import dataclasses
import json
import pathlib


@dataclasses.dataclass
class SuggestedIngredient:
    name: str
    unit: str
    defaultQuantity: float
    autoAdd: bool

    def as_dict(self):
        return dataclasses.asdict(self)

    @staticmethod
    def read_suggested_ingredients() -> dict[str, 'SuggestedIngredient']:
        with open(pathlib.Path(__file__).parent / 'suggested_ingredients.json', encoding='utf-8') as f:
            return {data['name']: SuggestedIngredient(**data) for data in json.load(f)}


SUGGESTED_INGREDIENTS = SuggestedIngredient.read_suggested_ingredients()
