# fridGPT

## How to setup

Follow the instructions below to build and run the project locally.

### Prerequisites

Install nodejs 20 and npm by running this command as root (this command comes from [here](https://github.com/nodesource/distributions)) :
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash - &&\
apt-get install -y nodejs
```

Install angular :
```bash
sudo npm install -g @angular/cli
```

Install frontend dependencies :
```bash
cd fridGPT/frontend
npm install
```

Install Chrome (this is needed for angular tests):
```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt install -y ./google-chrome-stable_current_amd64.deb
```

Install flask :
```bash
pip install flask
```

### Run the project

Run the backend :
```bash
flask run --debug
```

Run the backend tests :
```bash
python3 -m unittest
```

Run the frontend :
```bash
npm start
```

Run the frontend tests :
```bash
npm test
```
