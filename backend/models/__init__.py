import models.coach
import models.suggested_ingredient
from models.requested_ingredient import RequestedIngredient, RequestedIngredientQuantity

SUGGESTED_INGREDIENTS = models.suggested_ingredient.SuggestedIngredient.read_suggested_ingredients()
COACHES = models.coach.Coach.read_coaches()
