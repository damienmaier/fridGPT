import pathlib
import sys
import unittest

if __name__ == '__main__':
    test_suite = unittest.defaultTestLoader.discover(start_dir=pathlib.Path(__file__).parent, pattern='*_test.py')
    test_result = unittest.TextTestRunner(verbosity=2).run(test_suite)
    sys.exit(not test_result.wasSuccessful())
