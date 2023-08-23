# fridGPT

## How to setup

Follow the instructions below to build and run the project locally.

### Prerequisites

To run this project, you need to have the following installed on your system:
- nodejs 20 and npm
- python 3.10 and pip
- Google Chrome (for Angular tests)

### Run the project

#### Backend

In a terminal, cd to the `backend` folder:

```bash
cd fridGPT/backend
```

Optionally, create a virtual environment. Then install the dependencies:

```bash
pip install -r requirements.txt
```

Run the backend server:

```bash
flask --app main run --debug
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
python3 -m unittest
```

Run the frontend tests :

```bash
npm test
```