import dataclasses

import config
import errors
from validation.util import parse_and_validate_types

logger = config.logging.getLogger(__name__)


@dataclasses.dataclass
class ImageEndpointRequest:
    dishDescription: str


def parse_and_validate_image_endpoint_request(unstructured_request) -> ImageEndpointRequest:
    request: ImageEndpointRequest = parse_and_validate_types(unstructured_request, ImageEndpointRequest)

    if not 0 < len(request.dishDescription) < 1000:
        logger.error('received dish description has invalid length')
        raise errors.MalformedRequestError

    return request
