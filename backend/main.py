import dotenv
import flask
from flask import Flask

dotenv.load_dotenv()


def create_app():
    app = Flask(__name__)

    @app.route("/api/hello")
    def hello_world():
        return flask.jsonify({'greetings': 'Hello from backend !'})

    @app.post('/api/recipe')
    def recipe_endpoint():
        ingredients = flask.request.json['ingredients']
        if not ingredients:
            flask.abort(400)
        return {
            'dishDescription': 'This is a dish description',
            'instructions': 'This is some instruction',
        }

    return app


app = create_app()
