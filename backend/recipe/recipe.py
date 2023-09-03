import concurrent.futures

import data
from . import recipe_creator


def create_recipes(ingredients: [data.RequestedIngredient]):
    def create_recipe(coach: data.coach.Coach):
        return (recipe_creator.create_recipe(coach_description=coach.descriptionForGpt, ingredients=ingredients) |
                {'coach': coach.as_dict()})

    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        recipes_iterator = executor.map(create_recipe, data.COACHES.values(), timeout=30)

    return list(recipes_iterator)
