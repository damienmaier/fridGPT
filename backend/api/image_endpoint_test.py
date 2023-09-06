import unittest

import requests

from .util import ApiEndpointTest


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
