import dataclasses


@dataclasses.dataclass
class IngredientQuantity:
    unit: str
    value: float


@dataclasses.dataclass
class Ingredient:
    name: str
    quantity: IngredientQuantity

    @staticmethod
    def from_dict(data: dict) -> 'Ingredient':
        return Ingredient(
            name=data['name'],
            quantity=IngredientQuantity(**data['quantity'])
        )
