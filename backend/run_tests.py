import pathlib
import sys
import unittest

if __name__ == '__main__':
    # discover and run all tests in project files ending with _test.py
    test_suite = unittest.defaultTestLoader.discover(start_dir=pathlib.Path(__file__).parent, pattern='*_test.py')
    test_result = unittest.TextTestRunner(verbosity=2).run(test_suite)

    # Exit with 0 if all tests passed, 1 otherwise. This is needed for the GitHub Actions workflow.
    sys.exit(not test_result.wasSuccessful())
