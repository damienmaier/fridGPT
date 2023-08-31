import abc

import openai

import gpt.prompt


class GptAssistedTask(abc.ABC):

    def __call__(self, *args, **kwargs):
        prompt = self.build_gpt_prompt(*args, **kwargs)
        gpt_response = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=prompt.messages,
            temperature=self.temperature(),
            max_tokens=1000,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
        )
        return self.post_process_gpt_response(gpt_response["choices"][0]["message"]["content"])

    def temperature(self):
        return 1

    @abc.abstractmethod
    def build_gpt_prompt(self, *args, **kwargs) -> gpt.prompt.Prompt:
        pass

    @abc.abstractmethod
    def post_process_gpt_response(self, gpt_response_content: str):
        pass
