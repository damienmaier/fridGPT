import openai

# noinspection PyUnresolvedReferences
import config


def create_image(prompt, size='512x512'):
    return openai.Image.create(prompt=prompt, n=1, size=size)['data'][0]['url']
