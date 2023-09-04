import abc

import flask

import data


class FridGptError(Exception, abc.ABC):

    @abc.abstractmethod
    def error_name(self) -> str:
        pass

    def as_dict(self) -> dict:
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

    def __init__(self, ingredient: 'data.RequestedIngredient'):
        self.ingredient = ingredient

    def as_dict(self) -> dict:
        return super().as_dict() | {'ingredient': self.ingredient.as_dict()}


class WrongIngredientUnitError(IngredientError):

    def error_name(self) -> str:
        return 'wrong ingredient unit'


class InvalidCustomIngredientError(IngredientError):

    def error_name(self) -> str:
        return 'invalid custom ingredient'


class InvalidCustomIngredientUnitError(IngredientError):

    def error_name(self) -> str:
        return 'invalid custom ingredient unit'


class InsufficientIngredientsError(FridGptError):

    def error_name(self) -> str:
        return 'insufficient ingredients'


class TooLargeRequestError(FridGptError):

    def error_name(self) -> str:
        return 'too large request'


def create_exception_handlers(app: flask.Flask) -> None:
    @app.errorhandler(FridGptError)
    def handle_fridgpt_error(error: FridGptError):
        return error.as_dict(), 400
