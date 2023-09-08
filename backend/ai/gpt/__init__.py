"""Provides classes for performing tasks using GPT.

`Task` is an abstract class to build a wrapper around the GPT API that provides a simple interface for transforming an
input to a prompt, sending it to the API, and returning the result.

`Prompt` is a class that represents a GPT prompt and provides methods for manipulating it.

`Classifier` is an abstract class for building binary classifiers that use GPT to make predictions.
"""

from .classifier import Classifier
from .prompt import Prompt
from .task import Task
