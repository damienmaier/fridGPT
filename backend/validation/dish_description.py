import config
import errors

logger = config.logging.getLogger(__name__)


def parse_and_validate_dish_description(json_request) -> str:
    if not json_request['dishDescription']:
        logger.error('received empty dish description')
        raise errors.MalformedRequestError

    if len(json_request['dishDescription']) > 1000:
        logger.error('received dish description longer than 1000 characters')
        raise errors.MalformedRequestError

    return json_request['dishDescription']
