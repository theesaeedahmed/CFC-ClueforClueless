from pymongo import MongoClient
from bson.json_util import dumps
from flask import current_app
# from app import db

client = MongoClient("mongodb://localhost:27017/")
db = client.CFC
class UserModel:
    def __init__(self, user_document):
        self.user_id = user_document["user_id"]
        self.name = user_document["name"]
        self.email = user_document.get("email", None)
    
    def toDict(self):
        return {
            "user_id": str(self.user_id),
            "name": self.name,
            "email": self.email
        }

    @staticmethod
    def createUser(user_data):
        if db.users.find_one({"user_id": user_data["user_id"]}):
            return {"message": "User already exists"}, 409
        db.users.insert_one(user_data)
        return {"message": "User created successfully"}, 201

    @staticmethod
    def findUserById(user_id):
        db = current_app.db
        user = db.users.find_one({"user_id": user_id})
        if user:
            return UserModel(user).toDict() # Convert user document to JSON
        return None  

    @staticmethod
    def updateUser(user_id, updated_data):
        result = db.users.update_one({"user_id": user_id}, {"$set": updated_data})
        return {"message": "Updated successfully"} if result.matched_count else {"message": "User not found"}, 404

    @staticmethod
    def deleteUser(user_id):
        result = db.users.delete_one({"user_id": user_id})
        return {"message": "Deleted successfully"} if result.deleted_count else {"message": "User not found"}, 404
