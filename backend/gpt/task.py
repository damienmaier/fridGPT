from typing import Callable

import openai


class GptAssistedTask:
    def __init__(self, prompt_builder: Callable, post_processor: Callable, model: str = 'gpt-3.5-turbo'):
        self.prompt_builder = prompt_builder
        self.post_processor = post_processor
        self.model = model

    def __call__(self, *args, **kwargs):
        prompt_messages = self.prompt_builder(*args, **kwargs)
        gpt_response = openai.ChatCompletion.create(
            model=self.model,
            messages=prompt_messages,
        )
        return self.post_processor(gpt_response["choices"][0]["message"]["content"])
