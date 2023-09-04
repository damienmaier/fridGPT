import config
import errors
from validation.util import get_and_validate_type, validate_type

logger = config.logging.getLogger(__name__)


def parse_and_validate_step_help(json_request) -> ([str], int):
    recipe_steps = get_and_validate_type(json_request, 'steps', list)
    step_index = get_and_validate_type(json_request, 'stepIndex', int)

    for step in recipe_steps:
        validate_type(step, str)

    if not recipe_steps:
        logger.error('received empty recipe steps')
        raise errors.MalformedRequestError

    if not 0 <= step_index < len(recipe_steps):
        logger.error('received invalid step number')
        raise errors.MalformedRequestError

    if sum(map(len, recipe_steps)) > 1000:
        logger.error('received too large request')
        raise errors.TooLargeRequestError

    return recipe_steps, step_index

