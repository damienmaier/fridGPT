import cattrs

import config
from validation import errors

logger = config.logging.getLogger(__name__)


def parse_and_validate_types(destructured_data, target_type):
    """Parses and validates destructured data to target data class

    args
        destructured_data: some combination of dicts, lists, and primitives obtained from deserializing a json
        target_type: a data class. It can be a nested data class (i.e. a data class with data classes as fields)

    raises
        MalformedRequestError: if the destructured data cannot be parsed to the target type. To pass the validation,
        the destructured data types must be compatible with the target types. The error will also be raised if the
        destructured data contains extra keys that are not in the target type (this is useful to detect typos
        in a key that has a default value in the target type)

    returns
        the data as a `target_type` instance

    """
    try:
        structured_data = cattrs.Converter(forbid_extra_keys=True).structure(destructured_data, target_type)
    except cattrs.BaseValidationError:
        logger.error('unable to parse data to type')
        raise errors.MalformedRequestError

    return structured_data
