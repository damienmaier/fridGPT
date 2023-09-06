import dataclasses
from typing import Optional

from .coach import Coach


@dataclasses.dataclass
class Recipe:
    dishName: str
    dishDescription: str
    ingredients: str
    steps: list[str]
    coach: Optional[Coach] = None

    def as_dict(self):
        return dataclasses.asdict(self)
