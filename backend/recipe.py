import models


def create_recipes(ingredients: [models.RequestedIngredient]):
    recipes = RECIPES
    return [
        {
            'dishName': recipe['dishName'],
            'dishDescription': recipe['dishDescription'],
            'ingredients': recipe['ingredients'],
            'steps': recipe['steps'],
            'coach': models.COACHES[recipe['coach']]
        }
        for recipe in recipes
    ]


RECIPES = [
    {
        'dishName': 'tarte aux pommes',
        'dishDescription': 'une tarte aux pommes',
        'ingredients': 'pommes, succe, farine, beurre',
        'steps': ['Couper les pommes', 'Mettre les pommes dans la pate', 'Mettre au four'],
        'coach': 'Germaine'
    },
    {
        'dishName': 'tarte aux pommes', 'dishDescription':
        'une tarte aux pommes',
        'ingredients': 'pommes, succe, farine, beurre',
        'steps': ['Couper les pommes', 'Mettre les pommes dans la pate', 'Mettre au four'],
        'coach': 'Bernardo'
    },
    {
        'dishName': 'tarte aux pommes',
        'dishDescription': 'une tarte aux pommes',
        'ingredients': 'pommes, succe, farine, beurre',
        'steps': ['Couper les pommes', 'Mettre les pommes dans la pate', 'Mettre au four'],
        'coach': 'Travis'
    },
    {
        'dishName': 'tarte aux pommes',
        'dishDescription': 'une tarte aux pommes',
        'ingredients': 'pommes, succe, farine, beurre',
        'steps': ['Couper les pommes', 'Mettre les pommes dans la pate', 'Mettre au four'],
        'coach': 'Stewen'
    },
    {
        'dishName': 'tarte aux pommes',
        'dishDescription': 'une tarte aux pommes',
        'ingredients': 'pommes, succe, farine, beurre',
        'steps': ['Couper les pommes', 'Mettre les pommes dans la pate', 'Mettre au four'],
        'coach': 'Miggin'
    }
]
