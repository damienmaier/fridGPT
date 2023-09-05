import config
import errors
from validation.util import get_and_validate_type

logger = config.logging.getLogger(__name__)


def parse_and_validate_dish_description(json_request) -> str:
    dish_description = get_and_validate_type(json_request, 'dishDescription', str)

    if len(dish_description) > 1000:
        logger.error('received dish description longer than 1000 characters')
        raise errors.MalformedRequestError

    return dish_description
