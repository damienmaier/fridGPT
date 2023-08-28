# noinspection PyUnresolvedReferences
import config
import gpt.recipe
import gpt.task

find_recipe = gpt.task.GptAssistedTask(
    prompt_builder=gpt.recipe.recipe_prompt_builder,
    post_processor=gpt.recipe.recipe_post_processor,
)
