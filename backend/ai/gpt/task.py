import abc
import concurrent.futures

import ai.gpt
import config
from config import openai

logger = config.logging.getLogger(__name__)


class Task(abc.ABC):

    def __init__(
            self,
            temperature: float = 1,
            max_tokens: int = 1000,
            model: str = 'gpt-3.5-turbo',
            frequency_penalty: float = 0,
            presence_penalty: float = 0,
            timeout: int = 10,
            max_retry_count: int = 3,
    ):

        self._temperature = temperature
        self._max_tokens = max_tokens
        self._model = model
        self._frequency_penalty = frequency_penalty
        self._presence_penalty = presence_penalty
        self._timeout = timeout
        self._max_retry_count = max_retry_count

    def __call__(self, *args, **kwargs):
        prompt = self.build_gpt_prompt(*args, **kwargs)

        for retry_count in range(self._max_retry_count):
            if retry_count > 0:
                logger.warning(f'retrying gpt task {retry_count} ...')

            try:
                future_gpt_response_message = concurrent.futures.ThreadPoolExecutor().submit(self._send_gpt_request, prompt)
                gpt_response_message = future_gpt_response_message.result(timeout=self._timeout)
            except concurrent.futures.TimeoutError:
                logger.warning(f'GPT request timed out after {self._timeout} seconds')
                continue
            except openai.error.OpenAIError as e:
                logger.warning(f'Got OpenAIError during GPT request: {e}')
                continue

            try:
                post_processed_response = self.post_process_gpt_response(gpt_response_message)
            except self.PostProcessingError as e:
                logger.warning(f'GPT response post processing failed: {e}')
                continue

            break

        else:
            logger.error(f'GPT request failed after {retry_count} retries')
            raise self.MaxRetryReachedError

        return post_processed_response

    def _send_gpt_request(self, prompt: 'ai.gpt.Prompt'):
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

        return gpt_response_message

    @abc.abstractmethod
    def build_gpt_prompt(self, *args, **kwargs) -> 'ai.gpt.Prompt':
        pass

    @abc.abstractmethod
    def post_process_gpt_response(self, gpt_response_content: str):
        pass

    class MaxRetryReachedError(Exception):
        pass

    class PostProcessingError(Exception):
        pass
