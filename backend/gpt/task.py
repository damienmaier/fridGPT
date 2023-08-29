import abc

import openai


class GptAssistedTask(abc.ABC):
    def __init__(self, model: str = 'gpt-3.5-turbo'):
        self.model = model

    def __call__(self, *args, **kwargs):
        prompt_messages = self.build_gpt_prompt(*args, **kwargs)
        gpt_response = openai.ChatCompletion.create(
            model=self.model,
            messages=prompt_messages,
            temperature = 1,
            max_tokens=1000,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        #print(self.post_process_gpt_response(gpt_response["choices"][0]["message"]["content"]))
        return self.post_process_gpt_response(gpt_response["choices"][0]["message"]["content"])

    @abc.abstractmethod
    def build_gpt_prompt(self, *args, **kwargs):
        pass

    @abc.abstractmethod
    def post_process_gpt_response(self, gpt_response_content: str):
        pass
