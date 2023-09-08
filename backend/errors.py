import abc

import flask

import data


class ValidationError(Exception, abc.ABC):

    @abc.abstractmethod
    def error_name(self) -> str:
        pass

    def as_dict(self) -> dict:
        return {
            'error': self.error_name(),
        }


class MalformedRequestError(ValidationError):

    def error_name(self) -> str:
        return 'malformed request'


class IngredientError(ValidationError, abc.ABC):

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


class InsufficientIngredientsError(ValidationError):

    def error_name(self) -> str:
        return 'insufficient ingredients'



def create_exception_handlers(app: flask.Flask) -> None:
    @app.errorhandler(ValidationError)
    def handle_fridgpt_error(error: ValidationError):
        return error.as_dict(), 400
