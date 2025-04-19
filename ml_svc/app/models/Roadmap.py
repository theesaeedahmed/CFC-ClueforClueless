from datetime import datetime
from bson import ObjectId


class RoadmapModel:
    """
    Model for roadmap data structure
    """

    @staticmethod
    def to_json(roadmap):
        """Convert MongoDB document to JSON serializable format"""
        if roadmap.get("_id"):
            roadmap["id"] = str(roadmap["_id"])
            del roadmap["_id"]
        return roadmap

    @staticmethod
    def from_json(json_data):
        """Convert JSON data to MongoDB document format"""
        # Create a copy to avoid modifying the original
        data = json_data.copy()

        # Convert id to ObjectId if present
        if data.get("id"):
            data["_id"] = ObjectId(data["id"])
            del data["id"]

        return data

    @staticmethod
    def validate(data):
        """Validate roadmap data"""
        required_fields = ["name", "description", "topics"]
        for field in required_fields:
            if field not in data:
                return False, f"Missing required field: {field}"

        # Validate topics structure
        if not isinstance(data["topics"], list):
            return False, "Topics must be a list"

        for topic in data["topics"]:
            if not isinstance(topic, dict) or "name" not in topic or "subtopics" not in topic:
                return False, "Each topic must have a name and subtopics"

            if not isinstance(topic["subtopics"], list):
                return False, "Subtopics must be a list"

        return True, "Valid"
