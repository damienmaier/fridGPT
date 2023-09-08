# FridGPT Flask Backend

## Tests

To run all the backend tests, cd into the `backend` folder and run :

```bash
python3 run_tests.py
```

You will see some warnings and error message, this is an expected behavior due to the fact that some tests are here to check that the backend correctly handles invalid inputs. As long as you see something like `Ran X tests in Xs OK (skipped=X)` at the end, the tests are passing.

### Integration tests

The integration tests for the API endpoints are located in `api/<endpoint_name>_test.py`.

Those tests are useful both for testing the API and for documenting it.

### Unit tests

The tests for a module are located in the same folder as the module, in a file named `<module_name>_test.py`.

## Logs

The logs printed in the terminal by the backend are useful to watch the backend in action. You can set the log level in the `.env` file at the root of the backend. 

## Code organization

Here is some information about the main modules of the backend.

### API endpoints

The API endpoints are implemented in the `api.endpoints` module.

For each `POST` endpoint, there is a corresponding validation function in the `validation` package.

Each endpoint validation function has an associated dataclass that models the expected input format. The received json data is validated to check that it has the expected structure and is then converted to a dataclass instance.

### Recipe creation

The module `recipe` contains the code responsible for creating recipes, and the GPT prompt.

### GPT Tasks and classifiers

The class `ai.gpt.task.Task` is an abstract class that provides a nice wrapper around the OpenAI API to perform a task with the help of GPT.

To create a task, you create a subclass of this class and implement a method to convert some input to a prompt. Optionally, you also write a method to post process and/or validate the result received from GPT. An instance of your subclass can then be called like a normal function to perform the task.

The class `ai.gpt.classifier.Classifier` is a class used to build GPT assisted binary classifiers.

We use it to perform input validation, including for checking if a name entered by the user is an acceptable ingredient name.

## Code documentation

The modules, classes and methods are documented using docstrings. The tests are also useful for understanding how the classes and methods are used.