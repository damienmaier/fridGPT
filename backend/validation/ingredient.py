import errors
import data
from . import classifiers


def parse_and_validate_ingredients(json_request) -> [data.RequestedIngredient]:
    if not json_request['ingredients']:
        raise errors.MalformedRequestError
    if len(json_request['ingredients']) > 100:
        raise errors.TooManyIngredientsError
    ingredients = [_parse_and_validate_ingredient(ingredient) for ingredient in json_request['ingredients']]
    if not classifiers.is_sufficient_ingredients(ingredients):
        raise errors.InsufficientIngredients

    return ingredients


def _parse_and_validate_ingredient(json_ingredient) -> data.RequestedIngredient:
    try:
        ingredient = data.RequestedIngredient.from_dict(json_ingredient)
    except (TypeError, KeyError):
        raise errors.MalformedRequestError

    if ingredient.name in data.SUGGESTED_INGREDIENTS:
        if ingredient.quantity and ingredient.quantity.unit != data.SUGGESTED_INGREDIENTS[ingredient.name].unit:
            raise errors.WrongIngredientUnitError(ingredient)
    else:
        if not 0 < len(ingredient.name) <= 50:
            raise errors.InvalidCustomIngredientError(ingredient)
        if not classifiers.is_valid_ingredient(ingredient.name):
            raise errors.InvalidCustomIngredientError(ingredient)
        if ingredient.quantity:
            if not classifiers.is_valid_unit_for_ingredient(ingredient_name=ingredient.name,
                                                            unit=ingredient.quantity.unit):
                raise errors.InvalidCustomIngredientUnitError(ingredient)

    return ingredient
