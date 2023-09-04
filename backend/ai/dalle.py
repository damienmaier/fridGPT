import config
from config import openai

logger = config.logging.getLogger(__name__)


def create_image(prompt, size='512x512') -> str:
    logger.info(f'Creating image for prompt: {prompt}')
    image_url = openai.Image.create(prompt=prompt, n=1, size=size)['data'][0]['url']
    logger.info(f'Image created: {image_url}')

    return image_url
