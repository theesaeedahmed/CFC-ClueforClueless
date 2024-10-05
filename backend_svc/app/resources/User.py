from flask import request
from flask_restful import Resource
from app.models import UserModel

class User(Resource):
    def get(self, user_id):
        response = UserModel.find_user_by_id(user_id)
        # if user:
        #     return {"user_id": user["user_id"], "name": user["name"], "email": user.get("email")}, 200
        # else:
        #     return {"message": "User not found"}, 404
        return response

    def post(self):
        data = request.get_json()
        if not data or "user_id" not in data or "name" not in data:
            return {"message": "Bad request, missing user_id or name"}, 400

        response = UserModel.create_user(data)
        return response

    def put(self, user_id):
        data = request.get_json()
        response = UserModel.update_user(user_id, data)
        return response

    def delete(self, user_id):
        response = UserModel.delete_user(user_id)
        return response
