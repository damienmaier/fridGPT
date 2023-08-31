import abc

import flask


class FridGptError(Exception, abc.ABC):

    @abc.abstractmethod
    def error_name(self) -> str:
        pass

    def to_json(self) -> dict:
        return {
            'error': self.error_name(),
        }


class MalformedRequestError(FridGptError):

    def error_name(self) -> str:
        return 'malformed request'


class TooManyIngredientsError(FridGptError):

    def error_name(self) -> str:
        return 'too many ingredients'


class IngredientError(FridGptError, abc.ABC):

    def __init__(self, ingredient: str):
        self.ingredient = ingredient

    def to_json(self) -> dict:
        return super().to_json() | {'ingredient': self.ingredient}


class WrongIngredientUnitError(IngredientError):

    def error_name(self) -> str:
        return 'wrong ingredient unit'


class InvalidCustomIngredientError(IngredientError):

    def error_name(self) -> str:
        return 'invalid custom ingredient'


class InsufficientIngredients(FridGptError):

    def error_name(self) -> str:
        return 'insufficient ingredients'


def create_exception_handlers(app: flask.Flask) -> None:
    @app.errorhandler(FridGptError)
    def handle_fridgpt_error(error: FridGptError):
        return error.to_json(), 400
