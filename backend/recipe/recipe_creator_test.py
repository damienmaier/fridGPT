import unittest

import data
from .recipe_creator import create_recipe


class RecipeCreatorTest(unittest.TestCase):
    def test_create_recipe(self):

        ingredients = [
            data.RequestedIngredient('carotte', data.RequestedIngredientQuantity('pièce', 4)),
            data.RequestedIngredient('pommes de terre', data.RequestedIngredientQuantity('kg', 2.5)),
            data.RequestedIngredient('poireau', data.RequestedIngredientQuantity('pièce', 2)),
            data.RequestedIngredient('oignon', data.RequestedIngredientQuantity('pièce', 2)),
            data.RequestedIngredient('beurre', None),
            data.RequestedIngredient('lardons', None),
            data.RequestedIngredient('lait', data.RequestedIngredientQuantity('l', 0.5)),
            data.RequestedIngredient('farine', data.RequestedIngredientQuantity('g', 50)),
            data.RequestedIngredient('gruyère râpé', data.RequestedIngredientQuantity('g', 50)),
            data.RequestedIngredient('sel', None),
            data.RequestedIngredient('poivre', None),
        ]

        recipe = create_recipe(
            coach_description='Germaine, une grand-mère spécialiste en cuisine traditionnelle française.',
            ingredients=ingredients
        )

        self.assertIsInstance(recipe['dishName'], str, 'Should return a dish name')
        self.assertTrue(3 <= len(recipe['dishName']) <= 50, 'Should return a dish name of correct length')

        self.assertIsInstance(recipe['dishDescription'], str, 'Should return a dish description')
        self.assertTrue(3 <= len(recipe['dishDescription']) <= 200,
                        'Should return a dish description of correct length')

        self.assertIsInstance(recipe['ingredients'], str, 'Should return ingredients list')
        self.assertTrue(3 <= len(recipe['ingredients']) <= 500,
                        'Should return ingredients list of correct length')

        self.assertIsInstance(recipe['steps'], list, 'Should return steps list')
        self.assertTrue(1 <= len(recipe['steps']) <= 20, 'Should return steps list of correct length')
        for step in recipe['steps']:
            self.assertIsInstance(step, str, 'Should return steps content')
            self.assertTrue(3 <= len(step) <= 500, 'Steps should have correct length')


