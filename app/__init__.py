from flask import Flask
from flask_cors import CORS
from flask_mongoengine import MongoEngine

DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})
db = MongoEngine(app)

from app import server, models