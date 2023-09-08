class Prompt:
    """Represents a prompt to be sent to GPT.

    The GPT API expects prompts to be a list of messages, like for example :
    [
        {'role': 'system', 'content': 'system message'},
        {'role': 'user', 'content': 'user message 1'},
        {'role': 'assistant', 'content': 'assistant message 1'},
        {'role': 'user', 'content': 'user message 2'},
        {'role': 'assistant', 'content': 'assistant message 2'},
    ]
    The system message is a general instruction to the model.
    The user and assistant messages are used to build a fake a conversation history between the user and the assistant.

    This class provides convenient method to build such prompts. To get the prompt, use the `messages` attribute.
    """

    def __init__(self, system_message: str):
        """Initializes a prompt.

        Args:
            `system_message`: The system message to be sent to GPT.
        """
        self.messages = [{'role': 'system', 'content': system_message}]

    def add_user_message(self, message: str):
        """Adds a user message to the prompt.

        Args:
            `message`: The user message to be added.
        """
        self.messages.append({'role': 'user', 'content': message})

    def add_assistant_message(self, message: str):
        """Adds an assistant message to the prompt.

        Args:
            `message`: The assistant message to be added.
        """
        self.messages.append({'role': 'assistant', 'content': message})
