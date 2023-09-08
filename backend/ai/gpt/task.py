import abc
import multiprocessing.pool

import ai.gpt
import config
from config import openai

logger = config.get_logger(__name__)


class Task(abc.ABC):
    """This is an abstract class that represents a convenient wrapper around the OpenAI API to perform a task using GPT.

    An instance of this class can be called like a traditional function. If you have an instance of this class
    called `task`, calling `task(input1, input2, ...)` will transparently transform the inputs into a GPT prompt,
    send it to the OpenAI API, and return the response.

    To use this class, you need to subclass it and implement the following methods:
        `build_gpt_prompt` : this method is responsible for transforming the task inputs into a GPT prompt
        `post_process_gpt_response` : this is optional. You can override this method to post-process the GPT response
            before returning it to the caller. This method can also be used to perform some validation on the GPT
            response.
    """

    def __init__(
            self,
            temperature: float = 1,
            max_tokens: int = 1000,
            model: str = 'gpt-3.5-turbo',
            frequency_penalty: float = 0,
            presence_penalty: float = 0,
            timeout: int = 10,
            max_retry_count: int = 5,
    ):
        """Initializes a new Task instance.

        Args
            `temperature`, `max_tokens`, `model`, `frequency_penalty` and `presence_penalty` are passed to the
                OpenAI API each time a request is done.
                See https://platform.openai.com/docs/api-reference/chat/create for more information.
            `timeout` : maximum time in seconds to wait for the OpenAI API to respond when sending a request.
            `max_retry_count` : maximum number of times to retry a request if it fails.
        """

        self._temperature = temperature
        self._max_tokens = max_tokens
        self._model = model
        self._frequency_penalty = frequency_penalty
        self._presence_penalty = presence_penalty
        self._timeout = timeout
        self._max_retry_count = max_retry_count

    def __call__(self, *args, **kwargs):
        """Performs the task by sending a prompt to GPT and returning the (potentially post-processed) response.

        This method is called when an instance of this class is called like a function (`task(input1, input2, ...)`).

        This method passes its arguments as-is to the `build_gpt_prompt` method, which is responsible for transforming
        the input into a GPT prompt. The prompt is then sent to GPT. The response is passed as-is to the
        `post_process_gpt_response` method. The return value of this method is then returned to the caller.

        If any of the following problem occurs, the request is retried up to `max_retry_count` times:
            - the GPT request times out (it is not uncommon for the OpenAI API requests to hang forever)
            - the OpenAI API returns an error (this also happens quite often)
            - the GPT response post processing rejects the response

        Raises
            `MaxRetryReachedError` if the request fails after `max_retry_count` retries.

        """

        prompt = self.build_gpt_prompt(*args, **kwargs)

        for retry_count in range(self._max_retry_count):
            if retry_count > 0:
                logger.warning(f'retrying gpt task {retry_count} ...')

            try:
                # we make the request in a separate thread to be able to timeout the request
                with multiprocessing.pool.ThreadPool() as pool:
                    gpt_response_message = pool.apply_async(self._send_gpt_request, (prompt,)).get(timeout=self._timeout)
            except multiprocessing.TimeoutError:
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

            # if we reach this point, everything went fine. We can break out of the retry loop.
            break

        else:
            # this is not executed if we leave the loop with the break statement
            # if we reach this point, it means that the request failed after max_retry_count retries
            logger.error(f'GPT request failed after {retry_count} retries')
            raise self.MaxRetryReachedError

        return post_processed_response

    def _send_gpt_request(self, prompt: 'ai.gpt.Prompt') -> str:
        """Sends a prompt to GPT and returns the response message.

        args
            `prompt` : the prompt to send to GPT
        """

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
        """Given the task inputs, builds a GPT prompt.

        This method is called by the `__call__` method. When an instance of this class is called like a function
        (`task(input1, input2, ...)`), the arguments are passed as-is to this method. This method is responsible
        for transforming the inputs into a GPT prompt.

        You need to implement this method in your subclass.
        """
        pass

    def post_process_gpt_response(self, gpt_response_content: str) -> str:
        """Post processes and/or validates the GPT response.

        Args
            `gpt_response_content` : the message returned by GPT after sending the prompt

        This method is called by the `__call__` method. When an instance of this class is called like a function
        (`task(input1, input2, ...)`), the GPT response is passed as-is to this method.

        By default, this method does nothing and returns the GPT response as-is. You can optionally override this
        method in your subclass to post-process or validate the GPT response.

        When validating the response, you can raise a `PostProcessingError` to reject the response. This will cause
        the `__call__` method to retry the request.
        """

        return gpt_response_content

    class MaxRetryReachedError(Exception):
        """Raised by the `__call__` method when the request fails after `max_retry_count` retries."""
        pass

    class PostProcessingError(Exception):
        """Raised by the `post_process_gpt_response` method to reject the GPT response."""
        pass
