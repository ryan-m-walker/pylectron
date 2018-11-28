from flask import Flask

app = Flask(__name__)


@app.route("/")
def index():
    return "Hello from python"


app.run(port=5000)
