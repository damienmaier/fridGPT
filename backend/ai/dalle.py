import config
from config import openai

logger = config.logging.getLogger(__name__)

FORBIDDEN_STRINGS = ['rape', 'râpe', 'rapé', 'râpé']


def create_image(prompt: str, size='512x512') -> str:
    """This creates an image from a prompt using Dall-E.

    Args:
        prompt: A text description of the image to be created.
        size: The size of the image.

    Returns:
        The URL of the image.
    """

    # The Dall-E content filters occasionally produces false positives and refuses to create an image.
    # This happens particularly when the prompt contains the French word 'râpé' or its variants, as it is
    # flagged as then English word 'rape'.
    # The code below is a workaround.
    # Note that it is not perfect and that legitimate prompts are still occasionally rejected.
    for forbidden_string in FORBIDDEN_STRINGS:
        if forbidden_string in prompt:
            logger.warning(f'removing forbidden string: {forbidden_string}')
            prompt = prompt.replace(forbidden_string, '')

    logger.info(f'Creating image for prompt: {prompt}')

    try:
        image_url = openai.Image.create(prompt=prompt, n=1, size=size)['data'][0]['url']
    except openai.error.InvalidRequestError:
        logger.warning('The image prompt was flagged by the Dall-E content filters. A default image will be used instead.')
        image_url = '/assets_app/empty.jpg'

    logger.info(f'Image created: {image_url}')

    return image_url
