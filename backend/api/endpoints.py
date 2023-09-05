import flask

import data
import recipe
import validation
from ai import dalle


def create_api(app: flask.Flask) -> None:
    @app.post('/api/recipe')
    def recipe_endpoint():
        request = validation.parse_and_validate_recipe_endpoint_request(flask.request.json)
        return {'recipes': recipe.create_recipes(request.ingredients)}

    @app.get("/api/ingredients")
    def ingredients_endpoint():
        return {'ingredients': [ingredient.as_dict() for ingredient in data.SUGGESTED_INGREDIENTS.values()]}

    @app.post('/api/image')
    def image_endpoint():
        request = validation.parse_and_validate_image_endpoint_request(flask.request.json)

        image_url = dalle.create_image(f'photo professionnelle, gros plan, délicieux, {request.dishDescription}')

        return {'url': image_url}

    @app.post('/api/help')
    def help_endpoint():
        request = validation.parse_and_validate_help_endpoint_request(flask.request.json)
        return {'helpText': recipe.create_help_message_for_step(request.steps, request.stepIndex)}
