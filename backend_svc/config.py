from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI_PROD") if os.getenv("IS_PROD") == "True" else os.getenv("MONGO_URI_LOCAL", "mongodb://localhost:27017/")
    DB_NAME = os.getenv("DB_NAME", "CFC")
    DEBUG = False if os.getenv("IS_Prod") == "True" else True
