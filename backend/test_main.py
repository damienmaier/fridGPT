import unittest

import main


class ApiEndpointTest(unittest.TestCase):
    def setUp(self) -> None:
        self.app = main.create_app()
        self.client = self.app.test_client()


class RecipeEndpointTest(ApiEndpointTest):
    JSON_RECIPE_REQUEST = '''
            "ingredients": [
                "carottes",
                "pommes de terre",
                "poireaux",
                "oignons",
                "beurre",
                "lardons",
            ]
            '''

    JSON_WRONG_RECIPE_REQUEST = '''
            "ingredients": []
            '''

    def test_should_return_200_for_correct_request(self):
        response = self.client.post('/api/recipe', json=self.JSON_RECIPE_REQUEST)
        self.assertEqual(response.status_code, 200)

    def test_should_return_400_for_wrong_request(self):
        response = self.client.post('/api/recipe', json=self.JSON_WRONG_RECIPE_REQUEST)
        self.assertEqual(response.status_code, 400)

    def test_should_return_dish_description(self):
        response = self.client.post('/api/recipe', json=self.JSON_RECIPE_REQUEST)
        self.assertIsInstance(response.json['dishDescription'], str)

    def test_should_return_recipe(self):
        response = self.client.post('/api/recipe', json=self.JSON_RECIPE_REQUEST)
        self.assertIsInstance(response.json['recipe'], str)
