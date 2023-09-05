import dataclasses
import enum
from typing import Optional


class RecipeDifficulty(enum.Enum):
    easy = 1
    medium = 2
    hard = 3


@dataclasses.dataclass
class RecipeConfig:
    difficulty: Optional[RecipeDifficulty] = None
    duration: Optional[float] = None
    personCount: Optional[int] = None
    otherIngredientsAllowed: bool = False
