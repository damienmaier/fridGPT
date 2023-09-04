import flask

import data
import recipe
import validation
from ai import dalle


def create_api(app: flask.Flask) -> None:
    @app.post('/api/recipe')
    def recipe_endpoint():
        ingredients = validation.parse_and_validate_ingredients(flask.request.json)
        return {'recipes': recipe.create_recipes(ingredients)}

    @app.get("/api/ingredients")
    def ingredients_endpoint():
        return {'ingredients': [ingredient.as_dict() for ingredient in data.SUGGESTED_INGREDIENTS.values()]}

    @app.post('/api/image')
    def image_endpoint():
        dish_description = validation.parse_and_validate_dish_description(flask.request.json)

        image_url = dalle.create_image(f'photo professionnelle, gros plan, délicieux, {dish_description}')

        return {'url': image_url}

    @app.post('/api/help')
    def help_endpoint():
        recipe_steps, step_index = validation.parse_and_validate_step_help(flask.request.json)
        return {'helpText': recipe.create_help_message_for_step(recipe_steps, step_index)}
