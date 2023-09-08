from .prompt import Prompt
from .task import Task


class Classifier(Task):
    """Represents a binary classifiers that uses GPT to make predictions.

    When creating an instance of this class, you simply provide some instruction in natural language and optionally
    some examples of positive and negative cases.

    You can then use an instance of this class like a regular function to make predictions :
    If you have a class instance named `classifier`, calling `classifier(case)` will return either `True` or `False`
    depending on the prediction.

    When you make suche a call, the `case` argument you pass to the instance will be used together with the instruction
    and the examples given on initialization to build a prompt that will be sent to GPT. The response from GPT will
    then be used to make a prediction.

    This class expects the cases to be strings and will send them as-is to GPT. If you want your classification cases
    to be something else than a single string, you can optionally create a subclass of this class and override the
    `convert_case_to_gpt_message` method. This method will be used to preprocess the cases before sending them to GPT.

    This class is built on top of the `Task` class. See the documentation of `Task` for more details about the
    inner workings of this class.
    """

    def __init__(self, system_message: str, ok_cases: list, nok_cases: list):
        """Initializes the classifier.

        Args:
            `system_message`: some instruction in natural language that describes the classification task.
            `ok_cases`: a list of case examples that should be classified as `True`. Each case should be a tuple
                representing the arguments that should be passed to the classifier instance.
            `nok_cases`: a list of case examples that should be classified as `False`. Each case should be a tuple
                representing the arguments that should be passed to the classifier instance.
        """

        # we want the classifier to have a deterministic behavior
        super().__init__(temperature=0)

        self._system_message = system_message
        self._ok_cases = ok_cases
        self._nok_cases = nok_cases

    @staticmethod
    def convert_case_to_gpt_message(case: str) -> str:
        """Converts a case to a string appropriate to be sent to GPT.

        When `classifier(arg1, arg2, ...)` is called, the arguments are passed as-is to this method. This method
        should return a string that is appropriate to be sent to GPT.

        By default, this method expects the case to be a single string and returns it without modification.
        You can override this method in a subclass to allow for more complex cases and to preprocess them before
        sending them to GPT.
        """
        return case

    def build_gpt_prompt(self, *args, **kwargs) -> 'Prompt':
        """From the arguments passed to the classifier, builds a prompt to be sent to GPT.

        This method receives the arguments passed to the classifier when it is called like a function.
        See the documentation of the `Task` class for more details about when this method is called.

        This method calls the `convert_case_to_gpt_message` method to preprocess the case that will be classified.
        It then builds a prompt using the instruction and the examples provided when the classifier was initialized,
        together with the preprocessed case.
        """

        prompt = Prompt(self._system_message + "\n Tu dois simplement répondre par oui ou non.")

        for ok_case in self._ok_cases:
            prompt.add_user_message(self.convert_case_to_gpt_message(*ok_case))
            prompt.add_assistant_message('oui')

        for nok_case in self._nok_cases:
            prompt.add_user_message(self.convert_case_to_gpt_message(*nok_case))
            prompt.add_assistant_message('non')

        prompt.add_user_message(self.convert_case_to_gpt_message(*args, **kwargs))

        return prompt

    def post_process_gpt_response(self, gpt_response_content: str) -> bool:
        """Uses the response from GPT to make a prediction.

        See the documentation of the `Task` class for more details about when this method is called.
        """

        return gpt_response_content == "oui"
