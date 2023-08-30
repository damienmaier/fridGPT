import dalle
import gpt
import flask
import json

import main


def create_api(app: flask.Flask) -> None:
    @app.post('/api/recipe')
    def recipe_endpoint():
        ingredients = flask.request.json['ingredients']
        if not ingredients:
            flask.abort(400)
        return gpt.find_recipe(ingredients)

    @app.get("/api/ingredients")
    def ingredients_endpoint():
        with open(main.PROJECT_ROOT_PATH / 'data' / 'ingredients_fr.json', 'r', encoding='utf-8') as file:
            ingredients = json.load(file)

        return ingredients

    @app.post('/api/image')
    def image_endpoint():
        dish_description = flask.request.json['dishDescription']
        if not dish_description:
            flask.abort(400)

        image_url = dalle.create_image(f'photo professionnelle, gros plan, délicieux, {dish_description}')
        return {'url': image_url}
