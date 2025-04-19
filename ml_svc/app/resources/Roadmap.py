# /app/resources/Roadmap.py

from flask_restful import Resource, reqparse
from flask import jsonify, request, current_app
import json
from bson import ObjectId
from datetime import datetime
from config import Config
import google.generativeai as genai
from app.utils import fetch_official_documentation, process_documentation_data, create_enhanced_prompt, clean_json_response
from app.models import RoadmapModel

gemini_api_key = Config.GEMINI_API_KEY
genai.configure(api_key=gemini_api_key)


class RoadmapGenerate(Resource):
    def post(self):
        try:
            # Parse incoming request JSON
            parser = reqparse.RequestParser()
            parser.add_argument("prompt", type=str, required=True, help="Prompt is required")
            parser.add_argument("userId", type=str, help="User ID for saving the roadmap")
            args = parser.parse_args()

            prompt = args["prompt"]
            user_id = args.get("userId")

            # Fetch and process documentation based on the provided prompt
            official_docs = fetch_official_documentation(prompt)
            processed_docs = process_documentation_data(official_docs)

            # Create enhanced prompt for AI model
            enhanced_prompt = create_enhanced_prompt(prompt, processed_docs)

            # Call AI model (Gemini in this case)
            model = genai.GenerativeModel("gemini-1.5-flash")
            response = model.generate_content(enhanced_prompt)

            # Clean and parse the AI response
            cleaned_response = clean_json_response(response.text)

            try:
                structured_data = json.loads(cleaned_response)
                print("Structured data:", json.dumps(structured_data, indent=2))

                # If userId is provided, save the roadmap to the database
                roadmap_id = None
                if user_id:
                    # Add metadata
                    roadmap_data = {"userId": user_id, "createdAt": datetime.utcnow(), "lastModified": datetime.utcnow(), "prompt": prompt, "learningPath": structured_data}

                    # Insert into MongoDB
                    result = current_app.db.roadmaps.insert_one(roadmap_data)
                    roadmap_id = str(result.inserted_id)

                # Return the learning path as JSON
                return {"learningPath": structured_data, "roadmapId": roadmap_id}

            except Exception as error:
                print(f"Failed to parse AI response: {error}")
                print("Raw response:", response.text)
                return {"message": "Failed to parse AI response", "status": 500}, 500

        except Exception as error:
            print(f"Error in API route: {error}")
            return {"message": "An error occurred", "status": 500}, 500


class RoadmapResource(Resource):
    def get(self, roadmap_id=None):
        """Get a specific roadmap by ID or list all roadmaps for a user"""
        try:
            if roadmap_id:
                # Get specific roadmap
                roadmap = current_app.db.roadmaps.find_one({"_id": ObjectId(roadmap_id)})
                if not roadmap:
                    return {"message": "Roadmap not found"}, 404

                return {"roadmap": RoadmapModel.to_json(roadmap)}
            else:
                # List roadmaps for a user
                parser = reqparse.RequestParser()
                parser.add_argument("userId", type=str, required=True, help="User ID is required")
                args = parser.parse_args()

                user_id = args["userId"]
                roadmaps = list(current_app.db.roadmaps.find({"userId": user_id}).sort("lastModified", -1))

                return {"roadmaps": [RoadmapModel.to_json(r) for r in roadmaps]}

        except Exception as error:
            print(f"Error retrieving roadmap: {error}")
            return {"message": "An error occurred", "status": 500}, 500

    def post(self):
        """Store the roadmap in db"""
        try:
            parser = reqparse.RequestParser()
            parser.add_argument("userId", type=str, required=True, help="User ID is required")
            parser.add_argument("learningPath", type=dict, required=True, help="Learning path data is required")
            parser.add_argument("prompt", type=str, help="Original prompt")
            args = parser.parse_args()

            # Validate the learning path data
            is_valid, message = RoadmapModel.validate(args["learningPath"])
            if not is_valid:
                return {"message": message}, 400

            # Create roadmap document
            roadmap_data = {"userId": args["userId"], "createdAt": datetime.utcnow(), "lastModified": datetime.utcnow(), "prompt": args.get("prompt", ""), "learningPath": args["learningPath"]}

            # Insert into MongoDB
            result = current_app.db.roadmaps.insert_one(roadmap_data)

            # Return the created roadmap with ID
            roadmap_data["id"] = str(result.inserted_id)
            del roadmap_data["_id"]

            return {"roadmap": roadmap_data, "message": "Roadmap created successfully"}, 201

        except Exception as error:
            print(f"Error creating roadmap: {error}")
            return {"message": "An error occurred", "status": 500}, 500

    def put(self, roadmap_id):
        """Update an existing roadmap"""
        try:
            # Check if roadmap exists
            roadmap = current_app.db.roadmaps.find_one({"_id": ObjectId(roadmap_id)})
            if not roadmap:
                return {"message": "Roadmap not found"}, 404

            # Parse request data
            data = request.get_json()
            if not data:
                return {"message": "No data provided"}, 400

            # Update fields
            update_data = {}

            if "learningPath" in data:
                # Validate learning path if provided
                is_valid, message = RoadmapModel.validate(data["learningPath"])
                if not is_valid:
                    return {"message": message}, 400
                update_data["learningPath"] = data["learningPath"]

            if "nodes" in data:
                update_data["nodes"] = data["nodes"]

            if "edges" in data:
                update_data["edges"] = data["edges"]

            # Always update lastModified timestamp
            update_data["lastModified"] = datetime.utcnow()

            # Update in MongoDB
            current_app.db.roadmaps.update_one({"_id": ObjectId(roadmap_id)}, {"$set": update_data})

            # Get updated roadmap
            updated_roadmap = current_app.db.roadmaps.find_one({"_id": ObjectId(roadmap_id)})

            return {"roadmap": RoadmapModel.to_json(updated_roadmap), "message": "Roadmap updated successfully"}

        except Exception as error:
            print(f"Error updating roadmap: {error}")
            return {"message": "An error occurred", "status": 500}, 500

    def delete(self, roadmap_id):
        """Delete a roadmap"""
        try:
            # Check if roadmap exists
            roadmap = current_app.db.roadmaps.find_one({"_id": ObjectId(roadmap_id)})
            if not roadmap:
                return {"message": "Roadmap not found"}, 404

            # Delete from MongoDB
            current_app.db.roadmaps.delete_one({"_id": ObjectId(roadmap_id)})

            return {"message": "Roadmap deleted successfully"}

        except Exception as error:
            print(f"Error deleting roadmap: {error}")
            return {"message": "An error occurred", "status": 500}, 500


class RoadmapProgress(Resource):
    def put(self, roadmap_id):
        """Update progress for a roadmap"""
        try:
            # Check if roadmap exists
            roadmap = current_app.db.roadmaps.find_one({"_id": ObjectId(roadmap_id)})
            if not roadmap:
                return {"message": "Roadmap not found"}, 404

            # Parse request data
            data = request.get_json()
            if not data or "progress" not in data:
                return {"message": "Progress data is required"}, 400

            # Update progress in MongoDB
            current_app.db.roadmaps.update_one({"_id": ObjectId(roadmap_id)}, {"$set": {"progress": data["progress"], "lastModified": datetime.utcnow()}})

            return {"message": "Progress updated successfully"}

        except Exception as error:
            print(f"Error updating progress: {error}")
            return {"message": "An error occurred", "status": 500}, 500
