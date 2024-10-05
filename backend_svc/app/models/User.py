from pymongo import MongoClient
from bson.json_util import dumps
# from app import db

client = MongoClient("mongodb://localhost:27017/")
db = client.CFC
class UserModel:
    def __init__(self, user_id, name, email=None):
        self.user_id = user_id
        self.name = name
        self.email = email

    @staticmethod
    def create_user(user_data):
        if db.users.find_one({"user_id": user_data["user_id"]}):
            return {"message": "User already exists"}, 409
        db.users.insert_one(user_data)
        return {"message": "User created successfully"}, 201

    @staticmethod
    def find_user_by_id(user_id):
        user = db.users.find_one({"user_id": user_id})
        if user:
            return dumps(user) # Convert user document to JSON
        return None  

    @staticmethod
    def update_user(user_id, updated_data):
        result = db.users.update_one({"user_id": user_id}, {"$set": updated_data})
        return {"message": "Updated successfully"} if result.matched_count else {"message": "User not found"}, 404

    @staticmethod
    def delete_user(user_id):
        result = db.users.delete_one({"user_id": user_id})
        return {"message": "Deleted successfully"} if result.deleted_count else {"message": "User not found"}, 404
