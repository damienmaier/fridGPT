import dataclasses
import enum
from typing import Optional


class RecipeDifficulty(enum.Enum):
    EASY = 1
    MEDIUM = 2
    HARD = 3


@dataclasses.dataclass
class RecipeParams:
    difficulty: Optional[RecipeDifficulty] = None
    duration: Optional[float] = None
    personCount: Optional[int] = None
    otherIngredientsAllowed: bool = False
