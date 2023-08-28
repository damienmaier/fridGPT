import gpt
import flask


def create_api(app: flask.Flask) -> None:
    @app.route("/api/hello")
    def hello_world():
        return flask.jsonify({'greetings': 'Hello from backend !'})

    @app.post('/api/recipe')
    def recipe_endpoint():
        ingredients = flask.request.json['ingredients']
        if not ingredients:
            flask.abort(400)
        return gpt.find_recipe(ingredients)
