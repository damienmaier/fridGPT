# noinspection PyUnresolvedReferences
import config
import gpt.recipe
import gpt.task

find_recipe = gpt.task.GptAssistedTask(
    prompt_builder=gpt.recipe.prompt_builder,
    post_processor=gpt.recipe.post_processor,
)
