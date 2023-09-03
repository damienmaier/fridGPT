import unittest

import models
from .sufficient_ingredient import is_sufficient_ingredients


class GptAssistedSufficientIngredientsValidationTest(unittest.TestCase):
    def test_ok(self):
        ingredients = [
            models.RequestedIngredient(name='courgette', quantity=models.RequestedIngredientQuantity('pièce', 3)),
            models.RequestedIngredient(name='lentilles', quantity=models.RequestedIngredientQuantity('kg', 1)),
            models.RequestedIngredient(name='crème', quantity=models.RequestedIngredientQuantity('ml', 250)),
            models.RequestedIngredient(name='oeufs', quantity=models.RequestedIngredientQuantity('pièce', 4)),
            models.RequestedIngredient(name='sel', quantity=None),
            models.RequestedIngredient(name='poivre', quantity=None),
            models.RequestedIngredient(name='farine', quantity=None),
            models.RequestedIngredient(name='huile de cuisson', quantity=None),
            models.RequestedIngredient(name='vinaigre', quantity=None),
            models.RequestedIngredient(name="huile d'olive", quantity=None),
        ]

        self.assertTrue(is_sufficient_ingredients(ingredients))

    def test_nok(self):
        ingredients = [
            models.RequestedIngredient(name='sel', quantity=None),
            models.RequestedIngredient(name='poivre', quantity=None),
            models.RequestedIngredient(name='huile de cuisson', quantity=None),
            models.RequestedIngredient(name='vinaigre', quantity=None),
        ]

        self.assertFalse(is_sufficient_ingredients(ingredients))
