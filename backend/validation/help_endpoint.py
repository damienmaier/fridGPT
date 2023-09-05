import dataclasses

import config
import errors
from validation.util import parse_and_validate_types

logger = config.logging.getLogger(__name__)


@dataclasses.dataclass
class HelpEndpointRequest:
    steps: list[str]
    stepIndex: int


def parse_and_validate_help_endpoint_request(unstructured_request) -> HelpEndpointRequest:
    request: HelpEndpointRequest = parse_and_validate_types(unstructured_request, HelpEndpointRequest)

    if not request.steps:
        logger.error('received empty recipe steps')
        raise errors.MalformedRequestError

    if not 0 <= request.stepIndex < len(request.steps):
        logger.error('received invalid step number')
        raise errors.MalformedRequestError

    if sum(map(len, request.steps)) > 1000:
        logger.error('received too large request')
        raise errors.TooLargeRequestError

    return request
