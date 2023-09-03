import unittest

from models.requested_ingredient import RequestedIngredient, RequestedIngredientQuantity


class RequestedIngredientTest(unittest.TestCase):

    def test_from_dict_without_quantity(self):
        ingredient_dict = {"name": "carotte"}
        ingredient = RequestedIngredient(name='carotte', quantity=None)
        self.assertEqual(RequestedIngredient.from_dict(ingredient_dict), ingredient)

    def test_from_dict_with_quantity(self):
        ingredient_dict = {"name": "carotte", "quantity": {"unit": "kg", "value": 4}}
        ingredient = RequestedIngredient(
            name='carotte',
            quantity=RequestedIngredientQuantity(unit='kg', value=4)
        )
        self.assertEqual(RequestedIngredient.from_dict(ingredient_dict), ingredient)

    def test_as_dict_without_quantity(self):
        ingredient = RequestedIngredient(name='carotte', quantity=None)
        ingredient_dict = {"name": "carotte"}
        self.assertEqual(ingredient.as_dict(), ingredient_dict)

    def test_as_dict_with_quantity(self):
        ingredient = RequestedIngredient(
            name='carotte',
            quantity=RequestedIngredientQuantity(unit='kg', value=4)
        )
        ingredient_dict = {"name": "carotte", "quantity": {"unit": "kg", "value": 4}}
        self.assertEqual(ingredient.as_dict(), ingredient_dict)

    def test_ingredient_list_to_json(self):

        ingredients = [
            RequestedIngredient(
                name='carotte',
                quantity=RequestedIngredientQuantity(unit='pièce', value=4)
            ),
            RequestedIngredient(
                name='pommes de terre',
                quantity=RequestedIngredientQuantity(unit='kg', value=2.5)
            ),
            RequestedIngredient(
                name='poireau',
                quantity=RequestedIngredientQuantity(unit='pièce', value=2)
            ),
            RequestedIngredient(
                name='oignon',
                quantity=RequestedIngredientQuantity(unit='pièce', value=2)
            ),
            RequestedIngredient(name='beurre', quantity=None),
            RequestedIngredient(name='lardons', quantity=None),
            RequestedIngredient(
                name='lait',
                quantity=RequestedIngredientQuantity(unit='l', value=0.5)
            ),
            RequestedIngredient(
                name='farine',
                quantity=RequestedIngredientQuantity(unit='g', value=50)
            ),
            RequestedIngredient(
                name='gruyère râpé',
                quantity=RequestedIngredientQuantity(unit='g', value=50)
            ),
            RequestedIngredient(name='sel', quantity=None),
            RequestedIngredient(name='poivre', quantity=None),
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

        self.assertEqual(RequestedIngredient.ingredient_list_to_json(ingredients), ingredients_json)
