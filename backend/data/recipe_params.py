import dataclasses
import enum
from typing import Optional


class RecipeDifficulty(enum.Enum):
    EASY = 1
    MEDIUM = 2
    HARD = 3


@dataclasses.dataclass
class RecipeParams:
    """The optional parameters that the user can specify on the recipe generation page."""

    difficulty: Optional[RecipeDifficulty] = None

    # in hours
    duration: Optional[float] = None

    personCount: Optional[int] = None

    # whether the user allows the recipe to contain additional ingredients that were not listed
    otherIngredientsAllowed: bool = False
