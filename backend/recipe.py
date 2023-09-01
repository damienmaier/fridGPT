import gpt
import models


def create_recipes(ingredients: [models.RequestedIngredient]):
    recipes = gpt.find_recipe(ingredients)

    for recipe in recipes:
        recipe['coach'] = models.COACHES[recipe['coach']]

    return recipes
