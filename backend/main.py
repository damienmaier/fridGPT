import flask
from flask import Flask


def create_app():
    app = Flask(__name__)

    @app.route("/api/hello")
    def hello_world():
        return flask.jsonify({'greetings': 'Hello from backend !'})

    return app


app = create_app()
