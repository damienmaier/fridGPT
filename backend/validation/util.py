import cattrs

import config
import errors

logger = config.logging.getLogger(__name__)


def parse_and_validate_types(destructured_data, target_type):
    try:
        structured_data = cattrs.Converter(forbid_extra_keys=True).structure(destructured_data, target_type)
    except cattrs.BaseValidationError:
        logger.error('unable to parse data to type')
        raise errors.MalformedRequestError

    return structured_data
