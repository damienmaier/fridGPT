import unittest

import gpt
import models


class GptAssistedIngredientNameValidationTest(unittest.TestCase):
    def test_recipes(self):

        ingredients = [
            models.RequestedIngredient('carotte', models.RequestedIngredientQuantity('pièce', 4)),
            models.RequestedIngredient('pommes de terre', models.RequestedIngredientQuantity('kg', 2.5)),
            models.RequestedIngredient('poireau', models.RequestedIngredientQuantity('pièce', 2)),
            models.RequestedIngredient('oignon', models.RequestedIngredientQuantity('pièce', 2)),
            models.RequestedIngredient('beurre', None),
            models.RequestedIngredient('lardons', None),
            models.RequestedIngredient('lait', models.RequestedIngredientQuantity('l', 0.5)),
            models.RequestedIngredient('farine', models.RequestedIngredientQuantity('g', 50)),
            models.RequestedIngredient('gruyère râpé', models.RequestedIngredientQuantity('g', 50)),
            models.RequestedIngredient('sel', None),
            models.RequestedIngredient('poivre', None),
        ]

        recipes = gpt.find_recipe(ingredients)

        self.assertEqual(len(recipes), len(models.COACHES))
        self.assertEqual(set(recipe['coach'] for recipe in recipes), set(coach for coach in models.COACHES))

        for recipe in recipes:
            self.assertIsInstance(recipe['dishName'], str, 'Should return a dish name')
            self.assertTrue(3 <= len(recipe['dishName']) <= 50, 'Should return a dish name of correct length')

            self.assertIsInstance(recipe['dishDescription'], str, 'Should return a dish description')
            self.assertTrue(3 <= len(recipe['dishDescription']) <= 100,
                            'Should return a dish description of correct length')

            self.assertIsInstance(recipe['ingredients'], str, 'Should return ingredients list')
            self.assertTrue(3 <= len(recipe['ingredients']) <= 500,
                            'Should return ingredients list of correct length')

            self.assertIsInstance(recipe['steps'], list, 'Should return steps list')
            self.assertTrue(1 <= len(recipe['steps']) <= 20, 'Should return steps list of correct length')
            for step in recipe['steps']:
                self.assertIsInstance(step, str, 'Should return steps content')
                self.assertTrue(3 <= len(step) <= 500, 'Steps should have correct length')
