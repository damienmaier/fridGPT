import unittest

import models


class RequestedIngredientTest(unittest.TestCase):

    def test_from_dict_without_quantity(self):
        ingredient_dict = {"name": "carotte"}
        ingredient = models.RequestedIngredient(name='carotte', quantity=None)
        self.assertEqual(models.RequestedIngredient.from_dict(ingredient_dict), ingredient)

    def test_from_dict_with_quantity(self):
        ingredient_dict = {"name": "carotte", "quantity": {"unit": "kg", "value": 4}}
        ingredient = models.RequestedIngredient(
            name='carotte',
            quantity=models.RequestedIngredientQuantity(unit='kg', value=4)
        )
        self.assertEqual(models.RequestedIngredient.from_dict(ingredient_dict), ingredient)

    def test_as_dict_without_quantity(self):
        ingredient = models.RequestedIngredient(name='carotte', quantity=None)
        ingredient_dict = {"name": "carotte"}
        self.assertEqual(ingredient.as_dict(), ingredient_dict)

    def test_as_dict_with_quantity(self):
        ingredient = models.RequestedIngredient(
            name='carotte',
            quantity=models.RequestedIngredientQuantity(unit='kg', value=4)
        )
        ingredient_dict = {"name": "carotte", "quantity": {"unit": "kg", "value": 4}}
        self.assertEqual(ingredient.as_dict(), ingredient_dict)

    def test_ingredient_list_to_json(self):

        ingredients = [
            models.RequestedIngredient(
                name='carotte',
                quantity=models.RequestedIngredientQuantity(unit='pièce', value=4)
            ),
            models.RequestedIngredient(
                name='pommes de terre',
                quantity=models.RequestedIngredientQuantity(unit='kg', value=2.5)
            ),
            models.RequestedIngredient(
                name='poireau',
                quantity=models.RequestedIngredientQuantity(unit='pièce', value=2)
            ),
            models.RequestedIngredient(
                name='oignon',
                quantity=models.RequestedIngredientQuantity(unit='pièce', value=2)
            ),
            models.RequestedIngredient(name='beurre', quantity=None),
            models.RequestedIngredient(name='lardons', quantity=None),
            models.RequestedIngredient(
                name='lait',
                quantity=models.RequestedIngredientQuantity(unit='l', value=0.5)
            ),
            models.RequestedIngredient(
                name='farine',
                quantity=models.RequestedIngredientQuantity(unit='g', value=50)
            ),
            models.RequestedIngredient(
                name='gruyère râpé',
                quantity=models.RequestedIngredientQuantity(unit='g', value=50)
            ),
            models.RequestedIngredient(name='sel', quantity=None),
            models.RequestedIngredient(name='poivre', quantity=None),
        ]

        ingredients_json = '''\
[
    {
        "name": "carotte",
        "quantity": {
            "unit": "pièce",
            "value": 4
        }
    },
    {
        "name": "pommes de terre",
        "quantity": {
            "unit": "kg",
            "value": 2.5
        }
    },
    {
        "name": "poireau",
        "quantity": {
            "unit": "pièce",
            "value": 2
        }
    },
    {
        "name": "oignon",
        "quantity": {
            "unit": "pièce",
            "value": 2
        }
    },
    {
        "name": "beurre"
    },
    {
        "name": "lardons"
    },
    {
        "name": "lait",
        "quantity": {
            "unit": "l",
            "value": 0.5
        }
    },
    {
        "name": "farine",
        "quantity": {
            "unit": "g",
            "value": 50
        }
    },
    {
        "name": "gruyère râpé",
        "quantity": {
            "unit": "g",
            "value": 50
        }
    },
    {
        "name": "sel"
    },
    {
        "name": "poivre"
    }
]'''

        self.assertEqual(models.RequestedIngredient.ingredient_list_to_json(ingredients), ingredients_json)
