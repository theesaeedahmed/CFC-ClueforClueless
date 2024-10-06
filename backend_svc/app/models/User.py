from flask import current_app


class UserModel:
    def __init__(self, user_document):
        self.user_id = user_document["user_id"]
        self.name = user_document["name"]
        self.email = user_document.get("email", None)

    def toDict(self):
        return {"user_id": str(self.user_id), "name": self.name, "email": self.email}

    @staticmethod
    def createUser(user_data):
        db = current_app.db
        if db.users.find_one({"user_id": user_data["user_id"]}):
            return {"message": "User already exists"}, 409
        db.users.insert_one(user_data)
        return {"message": "User created successfully"}, 201

    @staticmethod
    def findUserById(user_id):
        db = current_app.db
        user = db.users.find_one({"user_id": user_id})
        if user:
            return UserModel(user).toDict()
        return None

    @staticmethod
    def updateUser(user_id, updated_data):
        db = current_app.db
        result = db.users.update_one({"user_id": user_id}, {"$set": updated_data})
        return {"message": "Updated successfully"} if result.matched_count else {
            "message": "User not found"
        }, 404

    @staticmethod
    def deleteUser(user_id):
        db = current_app.db
        result = db.users.delete_one({"user_id": user_id})
        return {"message": "Deleted successfully"} if result.deleted_count else {
            "message": "User not found"
        }, 404
