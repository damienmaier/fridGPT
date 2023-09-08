import flask

import data
import help
import recipe
import validation
from ai import dalle


def create_api(app: flask.Flask) -> None:
    """Adds the API endpoint methods to the Flask app.

    For each `POST` endpoints:
    - The request body is expected to be JSON.
    - The dataclass `validation.<endpoint_name>.<EndpointName>Request` describes the expected structure of the request body.
    - Keys that have a default value in the dataclass are optional.
    - There is a corresponding validation method `validation.<endpoint_name>.parse_and_validate_<endpoint_name>_request`
        that is used to parse and validate the request body.
    - If the validation fails, the endpoint returns a 400 error with a json body containing the error message.

    See also the validation tests in <endpoint_name>_test.py.
    """

    @app.post('/api/recipe')
    def recipe_endpoint():
        """API endpoint for generating recipes.

        This endpoint receives:
            A list of ingredients
                Each ingredient optionally has a quantity and a unit
                An ingredient can be mandatory or optional
            A list of parameters
                difficulty: 1, 2 or 3
                duration
                number of persons
                other ingredients allowed (boolean)

            See `validation.recipe_endpoint.RecipeEndpointRequest` and its sub dataclasses for the exact structure

        Before generating the recipes, the endpoint performs some validation
            The validation includes:
                It checks if the ingredient names really are ingredient names
                It checks if the ingredient units are appropriate for the ingredient
                It checks if the ingredients are sufficient to generate a recipe
            If the validation fails, the endpoint returns a 400 error with a json body containing the error message.
            If the validation error is specific to an ingredient, the json body contains the ingredient.
            See the validation tests in recipe_endpoint_test.py for the exact error format.

        The endpoint returns a json list of recipes. Each recipe contains:
            A name
            A description meant to be used as a prompt for an automatic image generation
            A list of ingredients
            A list of steps
            Information about the coach that is the author of the recipe:
                A name
                A presentation text
                An image url

            See `data.Recipe` for the exact structure.

        See also the integration tests in recipe_endpoint_test.py.
        """
        try:
            request = validation.parse_and_validate_recipe_endpoint_request(flask.request.json)
        except validation.ValidationError as error:
            return error.as_dict(), 400

        return {
            'recipes': [recipe_.as_dict() for recipe_ in recipe.create_recipes(request.ingredients, request.params)]
        }

    @app.get("/api/ingredients")
    def ingredients_endpoint():
        """API endpoint for getting the list of suggested ingredients.

        The endpoint returns a json list of suggested ingredients. Each suggested ingredient contains:
            A name
            A unit
            A default quantity
            Whether this is a "default" ingredient (sucre, farine, etc.) (boolean)

            See `data.suggested_ingredient` for the exact structure.

        See also the integration tests in ingredients_endpoint_test.py.
        """

        return {'ingredients': [ingredient.as_dict() for ingredient in data.SUGGESTED_INGREDIENTS.values()]}

    @app.post('/api/image')
    def image_endpoint():
        """API endpoint for generating images.

        This endpoint receives:
            A textual description of the dish to generate an image for

        The endpoint returns a json object containing:
            The url of the generated image

        See `image_endpoint_test.py` for the exact request and response structure.

        """
        try:
            request = validation.parse_and_validate_image_endpoint_request(flask.request.json)
        except validation.ValidationError as error:
            return error.as_dict(), 400

        image_url = dalle.create_image(f'photo professionnelle, gros plan, délicieux, {request.dishDescription}')

        return {'url': image_url}

    @app.post('/api/help')
    def help_endpoint():
        """API endpoint for generating a help message about a specific step of a recipe.

        The endpoint receives:
            A list of steps
            The index of the step to generate the help message for

            See `validation.help_endpoint.HelpEndpointRequest` for the exact structure.

        The endpoint returns a json object containing:
            The help message

        See `help_endpoint_test.py` for the exact request and response structure.
        """
        try:
            request = validation.parse_and_validate_help_endpoint_request(flask.request.json)
        except validation.ValidationError as error:
            return error.as_dict(), 400

        return {'helpText': help.create_help_message_for_step(request.steps, request.stepIndex)}
