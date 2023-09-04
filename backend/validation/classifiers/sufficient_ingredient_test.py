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
            data.RequestedIngredient(name='sel'),
            data.RequestedIngredient(name='poivre'),
            data.RequestedIngredient(name='farine'),
            data.RequestedIngredient(name='huile de cuisson'),
            data.RequestedIngredient(name='vinaigre'),
            data.RequestedIngredient(name="huile d'olive"),
        ]

        self.assertTrue(is_sufficient_ingredients(ingredients))

    def test_ok2(self):
        ingredients = [
            data.RequestedIngredient(name='courgette'),
            data.RequestedIngredient(name='lentilles'),
            data.RequestedIngredient(name='crème'),
            data.RequestedIngredient(name='oeufs'),
            data.RequestedIngredient(name='sel'),
            data.RequestedIngredient(name='poivre'),
            data.RequestedIngredient(name='farine'),
            data.RequestedIngredient(name='huile de cuisson'),
            data.RequestedIngredient(name='vinaigre'),
            data.RequestedIngredient(name="huile d'olive"),
        ]

        self.assertTrue(is_sufficient_ingredients(ingredients))

    def test_ok3(self):
        ingredients = [
            data.RequestedIngredient(name='pâtes', quantity=data.RequestedIngredientQuantity('g', 500)),
            data.RequestedIngredient(name='crème', quantity=data.RequestedIngredientQuantity('ml', 100)),
            data.RequestedIngredient(name='sel'),
            data.RequestedIngredient(name='poivre'),
            data.RequestedIngredient(name='farine'),
            data.RequestedIngredient(name='huile de cuisson'),
            data.RequestedIngredient(name='vinaigre'),
            data.RequestedIngredient(name="huile d'olive"),
        ]

        self.assertTrue(is_sufficient_ingredients(ingredients))

    def test_nok(self):
        ingredients = [
            data.RequestedIngredient(name='sel'),
            data.RequestedIngredient(name='poivre'),
            data.RequestedIngredient(name='huile de cuisson'),
            data.RequestedIngredient(name='vinaigre'),
        ]

        self.assertFalse(is_sufficient_ingredients(ingredients))

    def test_too_small_quantities(self):
        ingredients = [
            data.RequestedIngredient(name='pâtes', quantity=data.RequestedIngredientQuantity('g', 1)),
            data.RequestedIngredient(name='crème', quantity=data.RequestedIngredientQuantity('ml', 2)),
            data.RequestedIngredient(name='sel'),
            data.RequestedIngredient(name='poivre'),
            data.RequestedIngredient(name='farine'),
            data.RequestedIngredient(name='huile de cuisson'),
            data.RequestedIngredient(name='vinaigre'),
            data.RequestedIngredient(name="huile d'olive"),
        ]

        self.assertFalse(is_sufficient_ingredients(ingredients))

    def test_default(self):
        ingredients = [
            data.RequestedIngredient(name="armoire à épices complète"),
            data.RequestedIngredient(name='huile d\'olive'),
            data.RequestedIngredient(name='poivre'),
            data.RequestedIngredient(name='sel'),
            data.RequestedIngredient(name='sucre'),
            data.RequestedIngredient(name='huile de cuisson'),
            data.RequestedIngredient(name='vinaigre'),
        ]

        self.assertFalse(is_sufficient_ingredients(ingredients))
