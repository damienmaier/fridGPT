import unittest

from .prompt import Prompt


class PromptTest(unittest.TestCase):

    def test_prompt(self):
        prompt = Prompt('system message')
        prompt.add_user_message('user message 1')
        prompt.add_assistant_message('assistant message 1')
        prompt.add_user_message('user message 2')
        prompt.add_assistant_message('assistant message 2')

        self.assertEqual(
            prompt.messages,
            [
                {'role': 'system', 'content': 'system message'},
                {'role': 'user', 'content': 'user message 1'},
                {'role': 'assistant', 'content': 'assistant message 1'},
                {'role': 'user', 'content': 'user message 2'},
                {'role': 'assistant', 'content': 'assistant message 2'},
            ]
        )
