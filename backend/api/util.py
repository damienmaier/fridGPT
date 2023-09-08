import unittest

import main


class ApiEndpointTest(unittest.TestCase):
    """Provides a method to set up the API endpoint tests.

    This class exists to avoid code duplication in the API endpoint tests.
    The API endpoint tests classes should inherit from this class.
    """
    def setUp(self) -> None:
        """Creates a Flask app and a test client for the API endpoint tests.

        This method is automatically called by the testing framework before each test method.
        """
        self.app = main.create_app()
        self.client = self.app.test_client()

