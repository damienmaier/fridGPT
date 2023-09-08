import dataclasses

import config
import errors
from validation.util import parse_and_validate_types

logger = config.logging.getLogger(__name__)


@dataclasses.dataclass
class HelpEndpointRequest:
    """The input expected by the help endpoint."""

    # The recipe steps
    steps: list[str]

    # The index of the step to get help for
    stepIndex: int


def parse_and_validate_help_endpoint_request(unstructured_request) -> HelpEndpointRequest:
    """Parses and validates a request data received by the help API endpoint.

    args
        `unstructured_request`: The data received by the API endpoint.

    raises
        `ValidationError` (or a subclass) if the request is invalid.

    """

    request: HelpEndpointRequest = parse_and_validate_types(unstructured_request, HelpEndpointRequest)

    if not request.steps:
        logger.error('received empty recipe steps')
        raise errors.MalformedRequestError

    if not 0 <= request.stepIndex < len(request.steps):
        logger.error('received invalid step number')
        raise errors.MalformedRequestError

    return request
