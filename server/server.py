from flask import Flask
import sys

app = Flask(__name__)


@app.before_first_request
def startup():
    sys.stdout.write('server_started')


@app.route("/")
def index():
    return "Hello from python"


app.run(port=5000)
