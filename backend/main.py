from flask import Flask

import api
import errors


def create_app() -> Flask:
    app = Flask(__name__)

    api.create_api(app)
    errors.create_exception_handlers(app)

    return app


if __name__ == '__main__':
    app = create_app()
