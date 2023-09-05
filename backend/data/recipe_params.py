import dataclasses
import enum
from typing import Optional


class RecipeDifficulty(enum.Enum):
    easy = 1
    medium = 2
    hard = 3


@dataclasses.dataclass
class RecipeParams:
    difficulty: Optional[RecipeDifficulty]
    duration: Optional[float]
    personCount: Optional[int]
    otherIngredientsAllowed: bool = False
