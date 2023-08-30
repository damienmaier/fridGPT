import unittest

import requests

import json

import main


class ApiEndpointTest(unittest.TestCase):
    def setUp(self) -> None:
        self.app = main.create_app()
        self.client = self.app.test_client()


class RecipeEndpointTest(ApiEndpointTest):

    def test_empty_ingredients_list(self):
        json_request = {
            "ingredients": []
        }
        response = self.client.post('/api/recipe', json=json_request)
        self.assertEqual(response.status_code, 400, 'Should return 400')

    def test_correct_request(self):
        json_request = {
            "ingredients": [
                "carottes",
                "pommes de terre",
                "poireaux",
                "oignons",
                "beurre",
                "lardons"
            ]
        }
        response = self.client.post('/api/recipe', json=json_request)
        self.assertEqual(response.status_code, 200, 'Should return 200')
        self.assertIsInstance(response.json['dishDescription'], str, 'Should return dish description')
        self.assertIsInstance(response.json['instructions'], str, 'Should return instructions')


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


class IngredientsEndpointTest(ApiEndpointTest):

    def test_a(self):
        response = self.client.get('/api/ingredients')

        self.assertEqual(response.status_code, 200, 'Should return 200')

        with open(main.PROJECT_ROOT_PATH / 'data' / 'ingredients_fr.json', 'r', encoding='utf-8') as file:
            ingredients = json.load(file)
        response = self.client.get('/api/ingredients')
        self.assertEqual(response.json, ingredients, 'Should return ingredients list')
