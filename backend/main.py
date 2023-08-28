from flask import Flask

import api


def create_app():
    app = Flask(__name__)

    api.create_api(app)

    return app


app = create_app()
