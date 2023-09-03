import unittest

import data
from .sufficient_ingredient import is_sufficient_ingredients


class GptAssistedSufficientIngredientsValidationTest(unittest.TestCase):
    def test_ok(self):
        ingredients = [
            data.RequestedIngredient(name='courgette', quantity=data.RequestedIngredientQuantity('pièce', 3)),
            data.RequestedIngredient(name='lentilles', quantity=data.RequestedIngredientQuantity('kg', 1)),
            data.RequestedIngredient(name='crème', quantity=data.RequestedIngredientQuantity('ml', 250)),
            data.RequestedIngredient(name='oeufs', quantity=data.RequestedIngredientQuantity('pièce', 4)),
            data.RequestedIngredient(name='sel', quantity=None),
            data.RequestedIngredient(name='poivre', quantity=None),
            data.RequestedIngredient(name='farine', quantity=None),
            data.RequestedIngredient(name='huile de cuisson', quantity=None),
            data.RequestedIngredient(name='vinaigre', quantity=None),
            data.RequestedIngredient(name="huile d'olive", quantity=None),
        ]

        self.assertTrue(is_sufficient_ingredients(ingredients))

    def test_nok(self):
        ingredients = [
            data.RequestedIngredient(name='sel', quantity=None),
            data.RequestedIngredient(name='poivre', quantity=None),
            data.RequestedIngredient(name='huile de cuisson', quantity=None),
            data.RequestedIngredient(name='vinaigre', quantity=None),
        ]

        self.assertFalse(is_sufficient_ingredients(ingredients))
