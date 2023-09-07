import config
from config import openai

logger = config.logging.getLogger(__name__)

FORBIDDEN_STRINGS = ['râper', 'raper', 'rape', 'râpe', 'rapé', 'râpé']


def create_image(prompt, size='512x512') -> str:
    logger.info(f'Creating image for prompt: {prompt}')

    if any(forbidden_string in prompt for forbidden_string in FORBIDDEN_STRINGS):
        logger.warning(f'Removing forbidden strings from prompt: {FORBIDDEN_STRINGS}')

        for forbidden_string in FORBIDDEN_STRINGS:
            prompt = prompt.replace(forbidden_string, '')

    image_url = openai.Image.create(prompt=prompt, n=1, size=size)['data'][0]['url']
    logger.info(f'Image created: {image_url}')

    return image_url
