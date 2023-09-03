import abc

import ai.gpt
import config
from config import openai

logger = config.logging.getLogger(__name__)


class Task(abc.ABC):

    def __init__(self, temperature: float = 1, max_tokens: int = 1000, model: str = 'gpt-3.5-turbo',
                 frequency_penalty: float = 0, presence_penalty: float = 0):
        self._temperature = temperature
        self._max_tokens = max_tokens
        self._model = model
        self._frequency_penalty = frequency_penalty
        self._presence_penalty = presence_penalty

    def __call__(self, *args, **kwargs):
        prompt = self.build_gpt_prompt(*args, **kwargs)

        logger.debug(f'Sending prompt to GPT:')
        for message in prompt.messages:
            logger.debug(f'    {message["role"]}')
            logger.debug(f'    {message["content"]}')

        gpt_response = openai.ChatCompletion.create(
            model=self._model,
            messages=prompt.messages,
            temperature=self._temperature,
            max_tokens=self._max_tokens,
            top_p=1,
            frequency_penalty=self._frequency_penalty,
            presence_penalty=self._presence_penalty,
        )
        gpt_response_message = gpt_response["choices"][0]["message"]["content"]

        logger.debug(f'GPT response: {gpt_response_message}')

        return self.post_process_gpt_response(gpt_response_message)

    @abc.abstractmethod
    def build_gpt_prompt(self, *args, **kwargs) -> 'ai.gpt.Prompt':
        pass

    @abc.abstractmethod
    def post_process_gpt_response(self, gpt_response_content: str):
        pass
