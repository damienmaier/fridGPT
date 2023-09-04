import config

import data
import errors
from . import classifiers

logger = config.logging.getLogger(__name__)


def parse_and_validate_ingredients(json_request) -> [data.RequestedIngredient]:
    if not json_request['ingredients']:
        logger.error('received empty ingredients list')
        raise errors.MalformedRequestError

    if len(json_request['ingredients']) > 100:
        logger.error('received too many ingredients')
        raise errors.TooManyIngredientsError

    ingredients = [_parse_and_validate_ingredient(ingredient) for ingredient in json_request['ingredients']]

    logger.info('checking if sufficient ingredients were received')
    if all(ingredient.name in data.SUGGESTED_INGREDIENTS and data.SUGGESTED_INGREDIENTS[ingredient.name].autoAdd
           for ingredient in ingredients):
        logger.warning('only default ingredients were received')
        raise errors.InsufficientIngredientsError
    if not classifiers.is_sufficient_ingredients(ingredients):
        logger.warning('insufficient ingredients')
        raise errors.InsufficientIngredientsError

    return ingredients


def _parse_and_validate_ingredient(json_ingredient) -> data.RequestedIngredient:
    try:
        ingredient = data.RequestedIngredient.from_dict(json_ingredient)
    except (TypeError, KeyError):
        logger.error('malformed request')
        raise errors.MalformedRequestError

    logger.info(f'validating ingredient {ingredient.name}')

    if ingredient.name in data.SUGGESTED_INGREDIENTS:
        if ingredient.quantity and ingredient.quantity.unit != data.SUGGESTED_INGREDIENTS[ingredient.name].unit:
            logger.error(f'received wrong unit for ingredient {ingredient.name} which is in suggested ingredients')
            raise errors.WrongIngredientUnitError(ingredient)

    else:

        logger.info(f'validating custom ingredient {ingredient.name} length')
        if not 0 < len(ingredient.name) <= 50:
            logger.warning(f'custom ingredient {ingredient.name} has invalid length')
            raise errors.InvalidCustomIngredientError(ingredient)

        logger.info(f'validating custom ingredient {ingredient.name} name')
        if not classifiers.is_valid_ingredient(ingredient.name):
            logger.warning(f'custom ingredient {ingredient.name} is invalid')
            raise errors.InvalidCustomIngredientError(ingredient)

        logger.info(f'validating custom ingredient {ingredient.name} unit')
        if ingredient.quantity:
            if not classifiers.is_valid_unit_for_ingredient(ingredient_name=ingredient.name,
                                                            unit=ingredient.quantity.unit):
                logger.warning(f'custom ingredient {ingredient.name} has invalid unit {ingredient.quantity.unit}')
                raise errors.InvalidCustomIngredientUnitError(ingredient)

    return ingredient
