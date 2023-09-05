import dataclasses

import config
import errors
import cattrs

logger = config.logging.getLogger(__name__)


@dataclasses.dataclass
class ImageEndpointRequest:
    dishDescription: str


def parse_and_validate_image_endpoint_request(json_request) -> str:
    dish_description = cattrs.structure(json_request, ImageEndpointRequest).dishDescription

    if not 0 < len(dish_description) < 1000:
        logger.error('received dish description has invalid length')
        raise errors.MalformedRequestError

    return dish_description
