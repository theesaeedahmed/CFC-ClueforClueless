from flask import request
from flask_restful import Resource
from app.models import UserModel

class User(Resource):
    def get(self, user_id):
        response = UserModel.findUserById(user_id)
        return response

    def post(self, user_id):
        data = request.get_json()
        if not data or "user_id" not in data or "name" not in data:
            return {"message": "Bad request, missing user_id or name"}, 400

        response = UserModel.createUser(data)
        return response

    def put(self, user_id):
        data = request.get_json()
        response = UserModel.updateUser(user_id, data)
        return response

    def delete(self, user_id):
        response = UserModel.deleteUser(user_id)
        return response
