import concurrent.futures

import config
import data
from . import recipe_creator

logger = config.logging.getLogger(__name__)


def create_recipes(ingredients: [data.RequestedIngredient], recipe_params: data.RecipeParams):
    def create_recipe(coach: data.coach.Coach):
        logger.info(f'Starting recipe creation for {coach.name}')

        recipe = recipe_creator.create_recipe(
            coach_description=coach.descriptionForGpt,
            ingredients=ingredients,
            recipe_params=recipe_params
        )

        logger.info(f'Finished recipe creation for {coach.name}')

        return recipe | {'coach': coach.as_dict()}

    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        recipes_iterator = executor.map(create_recipe, data.COACHES.values(), timeout=30)

    return list(recipes_iterator)
