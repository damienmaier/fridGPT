import concurrent.futures

import config
import data
from . import recipe_creator

logger = config.logging.getLogger(__name__)


def create_recipes(ingredients: list[data.RequestedIngredient], recipe_params: data.RecipeParams) -> list[data.Recipe]:
    """Creates several recipes, one for each coach.

    args
        `ingredients`: list of available ingredients
        `recipe_params`: additional parameters that specify the time available for cooking, etc.
    """

    # we parallelize the recipe creation process, one thread per recipe

    def create_recipe(coach: data.coach.Coach) -> data.Recipe:
        logger.info(f'Starting recipe creation for {coach.name}')

        recipe = recipe_creator.create_recipe(
            coach_description=coach.descriptionForGpt,
            ingredients=ingredients,
            recipe_params=recipe_params
        )

        logger.info(f'Finished recipe creation for {coach.name}')

        recipe.coach = coach

        return recipe

    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        recipes_iterator = executor.map(create_recipe, data.COACHES.values())

    return list(recipes_iterator)
