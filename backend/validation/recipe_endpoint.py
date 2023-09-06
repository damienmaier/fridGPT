import dataclasses
from typing import Optional

import config
import data
import errors
from . import classifiers
from .util import parse_and_validate_types

logger = config.logging.getLogger(__name__)


@dataclasses.dataclass
class RecipeEndpointRequest:
    ingredients: list[data.RequestedIngredient]
    params: data.RecipeParams = dataclasses.field(default_factory=data.RecipeParams)


def parse_and_validate_recipe_endpoint_request(unstructured_request) -> RecipeEndpointRequest:
    request: RecipeEndpointRequest = parse_and_validate_types(unstructured_request, RecipeEndpointRequest)

    if not 0 < len(request.ingredients) <= 100:
        logger.error('received invalid number of ingredients')
        raise errors.MalformedRequestError

    for ingredient in request.ingredients:
        _validate_ingredient(ingredient)

    logger.info('checking if enough non default ingredients were received')

    def is_not_default(ingredient: data.RequestedIngredient) -> bool:
        return not (ingredient.name in data.SUGGESTED_INGREDIENTS and data.SUGGESTED_INGREDIENTS[ingredient.name].autoAdd)

    if sum(map(is_not_default, request.ingredients)) < 5:
        logger.warning('less than 5 non default ingredients were received')
        raise errors.InsufficientIngredientsError

    logger.info('checking if ingredients are sufficient to create a recipe')

    if not classifiers.is_sufficient_ingredients(request.ingredients):
        logger.warning('insufficient ingredients')
        raise errors.InsufficientIngredientsError

    return request


def _validate_ingredient(ingredient) -> None:
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
