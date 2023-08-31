import errors
import models


def parse_and_validate_ingredients(json_request) -> [models.RequestedIngredient]:
    if not json_request['ingredients']:
        raise errors.MalformedRequestError
    if len(json_request['ingredients']) > 100:
        raise errors.TooManyIngredientsError
    try:
        ingredients = [parse_and_validate_ingredient(ingredient) for ingredient in json_request['ingredients']]
    except (TypeError, KeyError):
        raise errors.MalformedRequestError


def parse_and_validate_ingredient(json_ingredient) -> models.RequestedIngredient:
    try:
        ingredient = models.RequestedIngredient.from_dict(json_ingredient)
    except (TypeError, KeyError):
        raise errors.MalformedRequestError

    if ingredient.name in models.SUGGESTED_INGREDIENTS:
        if ingredient.quantity and ingredient.quantity.unit != models.SUGGESTED_INGREDIENTS[ingredient.name].unit:
            raise errors.WrongIngredientUnitError(ingredient)
    else:
        if not 0 < len(ingredient.name) <= 50:
            raise errors.InvalidCustomIngredientError(ingredient)

    return ingredient
