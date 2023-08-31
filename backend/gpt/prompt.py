class Prompt:

    def __init__(self, system_message: str):
        self.messages = [{'role': 'system', 'content': system_message}]

    def add_user_message(self, message: str):
        self.messages.append({'role': 'user', 'content': message})

    def add_assistant_message(self, message: str):
        self.messages.append({'role': 'assistant', 'content': message})
