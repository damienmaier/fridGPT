import flask
from flask import Flask

app = Flask(__name__)

@app.route("/api/hello")
def hello_world():
    return flask.jsonify({'greetings': 'Hello from backend !'})
