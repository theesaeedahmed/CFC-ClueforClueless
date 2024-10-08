# app/__init__.py

from flask import Flask
from flask_restful import Api
from pymongo import MongoClient
from config import Config
from app.routes import initialize_routes


def create_app():
    app = Flask(__name__)
    api = Api(app)

    mongo_uri = Config.MONGO_URI
    db_name = Config.DB_NAME

    # Initialize MongoDB
    client = MongoClient(mongo_uri)
    app.db = client[db_name]

    initialize_routes(api)

    return app
