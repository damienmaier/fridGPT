import abc

import gpt


class Classifier(gpt.Task, abc.ABC):
    def __init__(self, system_message: str, ok_cases: list, nok_cases: list):
        super().__init__(temperature=0)
        self._system_message = system_message
        self._ok_cases = ok_cases
        self._nok_cases = nok_cases

    @staticmethod
    @abc.abstractmethod
    def convert_case_to_gpt_message(*args, **kwargs) -> str:
        pass

    def build_gpt_prompt(self, *args, **kwargs) -> 'gpt.Prompt':
        prompt = gpt.Prompt(self._system_message + "\n Tu dois simplement répondre par oui ou non.")

        for ok_case in self._ok_cases:
            prompt.add_user_message(self.convert_case_to_gpt_message(*ok_case))
            prompt.add_assistant_message('oui')

        for nok_case in self._nok_cases:
            prompt.add_user_message(self.convert_case_to_gpt_message(*nok_case))
            prompt.add_assistant_message('non')

        prompt.add_user_message(self.convert_case_to_gpt_message(*args, **kwargs))

        return prompt

    def post_process_gpt_response(self, gpt_response_content: str):
        return gpt_response_content == "oui"
