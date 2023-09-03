import unittest
from .ingredient_unit import is_valid_unit_for_ingredient


class GptAssistedIngredientUnitValidationTest(unittest.TestCase):
    def test_banane_piece(self):
        self.assertTrue(is_valid_unit_for_ingredient('banane', 'piece'))

    def test_lentilles_kg(self):
        self.assertTrue(is_valid_unit_for_ingredient('lentilles', 'kg'))

    def test_lentilles_g(self):
        self.assertTrue(is_valid_unit_for_ingredient('lentilles', 'g'))

    def test_lentilles_piece(self):
        self.assertFalse(is_valid_unit_for_ingredient('lentilles', 'piece'))

    def test_creme_kg(self):
        self.assertFalse(is_valid_unit_for_ingredient('creme', 'kg'))

    def test_creme_ml(self):
        self.assertTrue(is_valid_unit_for_ingredient('creme', 'ml'))
