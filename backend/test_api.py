import unittest

import requests

import json

import main


class ApiEndpointTest(unittest.TestCase):
    def setUp(self) -> None:
        self.app = main.create_app()
        self.client = self.app.test_client()


@unittest.skip("Not implemented")
class RecipeEndpointTest(ApiEndpointTest):

    def test_empty_ingredients_list(self):
        json_request = {
            "ingredients": []
        }
        response = self.client.post('/api/recipe', json=json_request)
        self.assertEqual(response.status_code, 400, 'Should return 400')
        self.assertEqual(
            response.json,
            {"error": "no ingredients"},
            'Should return no ingredients error'
        )

    def test_too_many_ingredients(self):
        json_request = [
            {f"name": f"ingredient{i}"} for i in range(101)
        ]
        response = self.client.post('/api/recipe', json=json_request)
        self.assertEqual(response.status_code, 400, 'Should return 400')
        self.assertEqual(
            response.json,
            {"error": "too many ingredients"},
            'Should return too many ingredients error'
        )

    def test_ingredient_in_list_wrong_unit(self):
        json_request = {
            "ingredients": [{"name": "carottes", "quantity": {"unit": "kg", "value": 4}}]
        }
        response = self.client.post('/api/recipe', json=json_request)
        self.assertEqual(response.status_code, 400, 'Should return 400')
        self.assertEqual(
            response.json,
            {
                "error": "wrong ingredient",
                "ingredient": {"name": "carottes", "quantity": {"unit": "kg", "value": 4}}
            },
            'Should return wrong ingredient error with ingredient'
        )

    def test_too_long_custom_ingredient(self):
        json_request = {
            "ingredients": [
                {"name": "carottes", "quantity": {"unit": "kg", "value": 4}},
                {"name": "a" * 51, "quantity": {"unit": "kg", "value": 4}}
            ]
        }
        response = self.client.post('/api/recipe', json=json_request)
        self.assertEqual(response.status_code, 400, 'Should return 400')
        self.assertEqual(
            response.json,
            {
                "error": "wrong ingredient",
                "ingredient": {"name": "a" * 51, "quantity": {"unit": "kg", "value": 4}}
            },
            'Should return wrong ingredient error with ingredient'
        )

    def test_custom_ingredient_unsuitable_unit(self):
        json_request = {
            "ingredients": [
                {"name": "carottes", "quantity": {"unit": "kg", "value": 4}},
                {"name": "ananas", "quantity": {"unit": "l", "value": 4}}
            ]
        }
        response = self.client.post('/api/recipe', json=json_request)
        self.assertEqual(response.status_code, 400, 'Should return 400')
        self.assertEqual(
            response.json,
            {
                "error": "wrong ingredient",
                "ingredient": {"name": "ananas", "quantity": {"unit": "l", "value": 4}}
            },
            'Should return wrong ingredient error with ingredient'
        )

    def test_inappropriate_custom_ingredient(self):
        json_request = {
            "ingredients": [
                {"name": "carottes", "quantity": {"unit": "kg", "value": 4}},
                {"name": "brique", "quantity": {"unit": "kg", "value": 4}}
            ]
        }
        response = self.client.post('/api/recipe', json=json_request)
        self.assertEqual(response.status_code, 400, 'Should return 400')
        self.assertEqual(
            response.json,
            {
                "error": "wrong ingredient",
                "ingredient": {"name": "brique", "quantity": {"unit": "kg", "value": 4}}
            },
            'Should return wrong ingredient error with ingredient'
        )

    def test_insufficient_ingredients(self):
        json_request = {
            "ingredients": [
                {"name": "sel"},
                {"name": "poivre"}
            ]
        }
        response = self.client.post('/api/recipe', json=json_request)
        self.assertEqual(response.status_code, 400, 'Should return 400')
        self.assertEqual(
            response.json,
            {"error": "insufficient ingredients"},
            'Should return insufficient ingredients error'
        )

    def test_correct_request(self):
        json_request = {
            "ingredients": [
                {"name": "carottes", "quantity": {"unit": "pièces", "value": 4}},
                {"name": "pommes de terre", "quantity": {"unit": "kg", "value": 2.5}},
                {"name": "poireaux", "quantity": {"unit": "pièce", "value": 2}},
                {"name": "oignons", "quantity": {"unit": "pièce", "value": 2}},
                {"name": "beurre"},
                {"name": "lardons"},
                {"name": "lait", "quantity": {"unit": "l", "value": 0.5}},
                {"name": "farine", "quantity": {"unit": "g", "value": 50}},
                {"name": "gruyère râpé", "quantity": {"unit": "g", "value": 50}},
                {"name": "sel"},
                {"name": "poivre"},
            ]
        }
        response = self.client.post('/api/recipe', json=json_request)

        self.assertEqual(response.status_code, 200, 'Should return 200')

        self.assertIsInstance(response.json['recipes'], list, 'Should return recipes list')
        self.assertTrue(1 <= len(response.json['recipes']) <= 10, 'Should return recipes list of correct length')

        for recipe in response.json['recipes']:
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

            self.assertIsInstance(recipe['coach']['name'], str, 'Should return a coach name')
            self.assertTrue(3 <= len(recipe['coach']['name']) <= 50, 'Should return a coach name of correct length')

            self.assertIsInstance(recipe['coach']['description'], str, 'Should return a coach description')
            self.assertTrue(3 <= len(recipe['coach']['description']) <= 500,
                            'Should return a coach description of correct length')


@unittest.skip("Image endpoint is expensive and thus we don't want to run its tests automatically.")
class ImageEndpointTest(ApiEndpointTest):

    def test_empty_image_request(self):
        json_request = {
            "dishDescription": ""
        }
        response = self.client.post('/api/image', json=json_request)
        self.assertEqual(response.status_code, 400, 'Should return 400')

    def test_correct_request(self):
        json_request = {
            "dishDescription": "lasagnes aux légumes"
        }
        response = self.client.post('/api/image', json=json_request)

        self.assertEqual(response.status_code, 200, 'Should return 200')

        image_url = response.json['url']
        self.assertTrue(requests.head(image_url).headers['content-type'].startswith('image/'),
                        'Should return an image url')


# @unittest.skip("Not implemented")
class IngredientsEndpointTest(ApiEndpointTest):

    def test_result(self):
        response = self.client.get('/api/ingredients')

        self.assertEqual(response.status_code, 200, 'Should return 200')

        self.assertIsInstance(response.json['ingredients'], list, 'Should return ingredients list')
        for ingredient in response.json['ingredients']:
            self.assertIsInstance(ingredient["name"], str, 'Should return ingredient name')
            self.assertTrue(3 <= len(ingredient["name"]) <= 50, 'Should return ingredient name of correct length')

            self.assertIsInstance(ingredient["unit"], str, 'Should return ingredient unit')
            self.assertTrue(1 <= len(ingredient["unit"]) <= 50, 'Should return ingredient unit of correct length')

            self.assertIsInstance(ingredient["defaultQuantity"], float, 'Should return ingredient quantity')
            self.assertTrue(0 < ingredient["defaultQuantity"], 'Should return positive ingredient quantity')

            self.assertIsInstance(ingredient["autoAdd"], bool, 'Should return ingredient auto add status')
