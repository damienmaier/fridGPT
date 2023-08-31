import pathlib

from flask import Flask

import api
import errors

PROJECT_ROOT_PATH = pathlib.Path(__file__).parent


def create_app() -> Flask:
    app = Flask(__name__)

    api.create_api(app)
    errors.create_exception_handlers(app)

    return app


app = create_app()
