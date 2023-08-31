import unittest

import root

if __name__ == '__main__':
    test_suite = unittest.defaultTestLoader.discover(start_dir=root.PROJECT_ROOT_PATH, pattern='*_test.py')
    unittest.TextTestRunner(verbosity=2).run(test_suite)
