import flask

import dalle
import models
import validation


def create_api(app: flask.Flask) -> None:
    @app.post('/api/recipe')
    def recipe_endpoint():
        ingredients = validation.parse_and_validate_ingredients(flask.request.json)
        # return {'recipes': recipe.create_recipes(ingredients)}
        return {}

    @app.get("/api/ingredients")
    def ingredients_endpoint():
        return {'ingredients': [ingredient.as_dict() for ingredient in models.SUGGESTED_INGREDIENTS.values()]}

    @app.post('/api/image')
    def image_endpoint():
        dish_description = flask.request.json['dishDescription']
        if not dish_description:
            flask.abort(400)

        image_url = dalle.create_image(f'photo professionnelle, gros plan, délicieux, {dish_description}')
        return {'url': image_url}
