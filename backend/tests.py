import sys
import unittest

import root

if __name__ == '__main__':
    test_suite = unittest.defaultTestLoader.discover(start_dir=root.PROJECT_ROOT_PATH, pattern='*_test.py')
    test_result = unittest.TextTestRunner(verbosity=2).run(test_suite)
    sys.exit(not test_result.wasSuccessful())
