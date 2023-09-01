import json

import flask

import dalle
import recipe
import root
import validation


def create_api(app: flask.Flask) -> None:
    @app.post('/api/recipe')
    def recipe_endpoint():
        ingredients = validation.parse_and_validate_ingredients(flask.request.json)
        return {'recipes': recipe.create_recipes(ingredients)}

    @app.get("/api/ingredients")
    def ingredients_endpoint():
        with open(root.PROJECT_ROOT_PATH / 'data' / 'suggested_ingredients.json', 'r', encoding='utf-8') as file:
            ingredients = json.load(file)

        return ingredients

    @app.post('/api/image')
    def image_endpoint():
        dish_description = flask.request.json['dishDescription']
        if not dish_description:
            flask.abort(400)

        image_url = dalle.create_image(f'photo professionnelle, gros plan, délicieux, {dish_description}')
        return {'url': image_url}
