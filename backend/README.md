# FridGPT Flask Backend

## Tests

To run all the backend tests, cd into the `backend` folder and run :

```bash
python3 run_tests.py
```

You will see some warnings and error message, this is an expected behavior due to the fact that some tests are here to check that the backend correctly handles invalid inputs. As long as you see something like `Ran X tests in 79.144s OK (skipped=X)` at the end, the tests are passing.

### Integration tests

The integration tests for the API endpoints are located in `api/<endpoint_name>_test.py`.

Those tests are useful both for testing the API and for documenting it.

### Unit tests

The tests for a module are located in the same folder as the module, in a file named `<module_name>_test.py`.

## Code organization

Here is some information about the main modules of the backend.

### API endpoints

The API endpoints are implemented in `api.endpoints`.

For each `POST` endpoint, there is a corresponding validation function in the `validation` package.

Each endpoint validation function has an associated dataclass that models the expected input format. The received data is validated and converted to a dataclass instance.

### GPT Tasks

The class `ai.gpt.task.Task` is an abstract class that provides a nice wrapper around the OpenAI API to perform a task with the help of GPT.

To create a task, you create a subclass of this class and implement a method to convert the input to a prompt, and optionally a method to post process and/or validate the result received from GPT. An instance of your subclass can then be called like a function to perform the task.

### GPT classifiers

The class `ai.gpt.classifier.Classifier` is an abstract class used to build GPT assisted binary classifiers.