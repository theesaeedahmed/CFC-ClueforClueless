# app/__init__.py

from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from pymongo import MongoClient
from config import Config
from app.routes import initialize_routes
from app.models import create_indexes


def create_app():
    app = Flask(__name__)

    CORS(app)

    api = Api(app)

    mongo_uri = Config.MONGO_URI
    db_name = Config.DB_NAME

    # Initialize MongoDB
    client = MongoClient(mongo_uri)
    app.db = client[db_name]

    # Create indexes
    create_indexes(app.db)

    initialize_routes(api)

    return app
