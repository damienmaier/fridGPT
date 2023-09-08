"""This package provides dataclasses for modelling objects that the backend uses.

See https://docs.python.org/3/library/dataclasses.html for more information on python dataclasses.
"""

from .requested_ingredient import RequestedIngredient, RequestedIngredientQuantity
from .suggested_ingredient import SUGGESTED_INGREDIENTS
from .coach import COACHES
from .recipe_params import RecipeParams, RecipeDifficulty
from .recipe import Recipe
