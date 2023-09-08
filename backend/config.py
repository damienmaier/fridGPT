import os

import dotenv
import openai

import logging

# Load environment variables from .env file
dotenv.load_dotenv()

if 'LOG_LEVEL' in os.environ:
    logging.basicConfig(level=os.environ['LOG_LEVEL'])

if 'OPENAI_API_KEY' not in os.environ:
    raise Exception('''
    OPENAI_API_KEY environment variable is not set.
    To run the backend, you need to provide an OpenAI API key in the OPENAI_API_KEY environment variable.
    You can set it in the .env file in the root of the backend:
    create a file named .env and put OPENAI_API_KEY=<your_key_here> in it.
    ''')
openai.api_key = os.environ["OPENAI_API_KEY"]
