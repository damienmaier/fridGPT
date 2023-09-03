from config import openai


def create_image(prompt, size='512x512') -> str:
    return openai.Image.create(prompt=prompt, n=1, size=size)['data'][0]['url']
