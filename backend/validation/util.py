import errors


def get_and_validate_type(dict_: dict, key: str, type_: type):
    validate_type(dict_, dict)

    if key not in dict_:
        raise errors.MalformedRequestError

    validate_type(dict_[key], type_)

    return dict_[key]


def validate_type(var, type_: type):
    if not isinstance(var, type_):
        raise errors.MalformedRequestError
