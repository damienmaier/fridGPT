import dataclasses

import config
from validation import errors
from validation.util import parse_and_validate_types

logger = config.logging.getLogger(__name__)


@dataclasses.dataclass
class ImageEndpointRequest:
    """The input expected by the image endpoint."""
    dishDescription: str


def parse_and_validate_image_endpoint_request(unstructured_request) -> ImageEndpointRequest:
    """Parses and validates a request data received by the image API endpoint.

        args
            `unstructured_request`: The data received by the API endpoint.

        raises
            `ValidationError` (or a subclass) if the request is invalid.

        """

    request: ImageEndpointRequest = parse_and_validate_types(unstructured_request, ImageEndpointRequest)

    if not 0 < len(request.dishDescription) < 1000:
        logger.error('received dish description has invalid length')
        raise errors.MalformedRequestError

    return request
