# fridGPT

## How to setup

Follow the instructions below to build and run the project locally.

### Prerequisites

To run this project, you need to have the following installed on your system:
- nodejs 20 and npm
- python 3.10 and pip
- Google Chrome (for Angular tests)

**Added on 06.09.2023 : There is an issue with node js 20.06 released today (see [here](https://github.com/angular/angular-cli/issues/25782)). To run our project, use a previous node version like 20.5.1**

### OpenAI API key

You will also need an OpenAI API key.

API keys linked to a free OpenAI account have strong rate restrictions. Thus, you will need to provide an API key associated to a paid account for the application to work correctly.

### Run the project

You will need to run both the backend and the frontend, each in a separate terminal.

#### Backend

In a terminal, cd to the `backend` folder:

```bash
cd fridGPT/backend
```

Optionally, create a Python virtual environment.

Install the dependencies:

```bash
pip install -r requirements.txt
```

Create a local copy of `.env_template` named `.env`
```bash
cp .env_template .env
```

**Edit `.env` to set your OpenAI API key**

Run the backend server:

```bash
python3 -m flask --app main run --debug
```

The backend server will automatically reload if you change any of the source files.

#### Frontend

In an other terminal, cd to the `frontend` folder:

```bash
cd fridGPT/frontend
```

Install the dependencies:

```bash
npm install
```

Run the frontend server:

```bash
npm start
```

Navigate to [http://localhost:4200/](http://localhost:4200/) to access the app.

The app will automatically reload if you change any of the source files.

The frontend server automatically proxies all API requests (/api/...) to the backend server.

### Run the tests

Run the backend tests :

```bash
python3 run_tests.py
```

Run the frontend tests :

```bash
npm test
```

## Tests

### Backend

To run all the backend tests, cd into the `backend` folder and run :

```bash
python3 run_tests.py
```

You will see some warnings and error message, this is an expected behavior due to the fact that some tests are here to check that the backend correctly handles invalid inputs. As long as you see something like `Ran X tests in 79.144s OK (skipped=X)` at the end, the tests are passing.

#### Integration tests

The integration tests for the API endpoints are located in `backend/api/<endpoint_name>_test.py`.

Those tests are useful both for testing the API and for documenting it.

#### Unit tests

The tests for a module are located in the same folder as the module, in a file named `<module_name>_test.py`.

### Frontend

To run all the frontend tests, cd into the `frontend` folder and run :

```bash
npm test
```

The test files are located next to the files they test. They are named `<file_name>.spec.ts`.

## How to contribute

### Code style

Here are some guidelines that we follow to keep the code clean and consistent:

- Code, comments, commit messages and documentations are written in English.
- Write code that is easy to read and understand. Use explicit names for variables, functions, classes, etc.
- Use comments when something is not obvious.
- When you add a new feature, write tests to protect against regressions.
  - If you add a new API endpoint, write integration tests for it.

### Pull requests

If you want to contribute to the project as an external contributor, feel free to fork the project and submit a pull request. We will review it and merge it if it fits the project.

