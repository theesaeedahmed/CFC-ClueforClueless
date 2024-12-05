from flask import current_app
from bson import ObjectId
from datetime import datetime, timezone
from app.utils import Education, Skill, Social, Language, Course, Roadmap
import re


class UserModel:
    def __init__(self, user_document):
        self._id = user_document.get("_id", ObjectId())  # Required, ObjectId, MongoDB ObjectId
        self.uid = user_document.get("uid", None)  # Required, String, firebaseUserId
        self.name = user_document.get("name", None)  # Required, String, Full Name
        self.email = user_document.get("email", None)  # Required, String, Email to login
        self.created_at = user_document.get("created_at", datetime.now(timezone.utc))  # Required, Date
        self.phone_number = user_document.get("phone_number", None)  # Optional, String, Country code + phone number (eg. +11234567890)
        self.account_type = user_document.get("account_type", None)  # Required, String, ("instructor", "student", "admin")
        self.summary = user_document.get("summary", None)  # Optional, String, User summary
        self.profile_picture_url = user_document.get("profile_picture_url", None)  # Optional, String, Profile picture URL stored on cloud
        self.gender = user_document.get("gender", None)  # Optional, String, ("male", "femaile", "other")
        self.location = user_document.get("location", None)  # Optional, String
        self.date_of_birth = user_document.get("date_of_birth", None)  # Optional, Date
        self.subscribed_at = user_document.get("subscribed_at", None)  # Optional, Date

        # Education, Skill, Social, Language, and Course objects initialization
        self.education_history = [Education(**edu) for edu in user_document.get("education_history", [])]
        self.skills = [Skill(**skill) for skill in user_document.get("skills", [])]
        self.socials = [Social(**social) for social in user_document.get("socials", [])]
        self.languages = [Language(**language) for language in user_document.get("languages", [])]
        self.courses_enrolled_in = [Course(**course) for course in user_document.get("courses_enrolled_in", [])]
        self.roadmaps = [Roadmap(**roadmap) for roadmap in user_document.get("roadmaps", [])]

    def toDict(self):
        return {
            "_id": str(self._id),
            "uid": self.uid,
            "name": self.name,
            "email": self.email,
            "created_at": self.created_at.isoformat(),
            "phone_number": self.phone_number,
            "account_type": self.account_type,
            "summary": self.summary,
            "profile_picture_url": self.profile_picture_url,
            "gender": self.gender,
            "location": self.location,
            "date_of_birth": self.date_of_birth.isoformat() if self.date_of_birth else None,
            "subscribed_at": self.subscribed_at.isoformat() if self.subscribed_at else None,
            "education": [edu.toDict() for edu in self.education],
            "skills": [skill.toDict() for skill in self.skills],
            "socials": [social.toDict() for social in self.socials],
            "languages": [language.toDict() for language in self.languages],
            "courses_enrolled_in": [course.toDict() for course in self.courses_enrolled_in],
            "roadmaps": [roadmap.toDict() for roadmap in self.roadmaps],
        }

    def validateAttributes(self):
        required_attributes = ["_id", "uid", "name", "email", "account_type", "created_at"]
        optional_attributes = [
            "phone_number",
            "summary",
            "profile_picture_url",
            "gender",
            "location",
            "date_of_birth",
            "subscribed_at",
            "education",
            "skills",
            "socials",
            "languages",
            "courses_enrolled_in",
            "roadmaps",
        ]
        email_regex = r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
        account_types = {"instructor", "student", "admin"}

        for attribute, data_type in required_attributes.items():
            value = getattr(self, attribute)

            if attribute == "_id":
                if not isinstance(value, ObjectId):
                    raise Exception(f"Invalid _id: {value}")

            elif attribute == "uid":
                if not isinstance(value, str) or len(value) != 12:
                    raise Exception(f"Invalid uid: {value}")

            elif attribute == "account_type":
                if value not in account_types:
                    raise Exception(f"Invalid account_type: {value}")

            elif attribute == "email":
                if not re.match(email_regex, value):
                    raise Exception("Invalid email")

            elif value is None:
                raise Exception(f"Missing required attribute: {attribute}")

        for attribute in optional_attributes:
            value = getattr(self, attribute)

            if value is not None and not isinstance(value, str):
                raise Exception(f"Invalid {attribute}: {value}")

        return True

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
        return {"message": "Updated successfully"} if result.matched_count else {"message": "User not found"}, 404

    @staticmethod
    def deleteUser(user_id):
        db = current_app.db
        result = db.users.delete_one({"user_id": user_id})
        return {"message": "Deleted successfully"} if result.deleted_count else {"message": "User not found"}, 404
