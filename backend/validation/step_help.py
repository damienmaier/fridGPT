import config
import errors

logger = config.logging.getLogger(__name__)


def parse_and_validate_step_help(json_request) -> ([str], int):
    try:
        recipe_steps = json_request['steps']
        step_number = json_request['stepNumber']
    except KeyError:
        logger.error('received malformed request')
        raise errors.MalformedRequestError

    if not recipe_steps:
        logger.error('received empty recipe steps')
        raise errors.MalformedRequestError

    if not 0 <= step_number < len(recipe_steps):
        logger.error('received invalid step number')
        raise errors.MalformedRequestError

    if sum(map(len, recipe_steps)) > 1000:
        logger.error('received too large request')
        raise errors.TooLargeRequestError

    return recipe_steps, step_number

