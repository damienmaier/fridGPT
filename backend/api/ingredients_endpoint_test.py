from .endpoint_test import ApiEndpointTest


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