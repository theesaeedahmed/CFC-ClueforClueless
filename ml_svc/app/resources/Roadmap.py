from flask_restful import Resource, reqparse
from flask import jsonify, request
import json
from config import Config
import google.generativeai as genai
from app.utils import fetch_official_documentation, process_documentation_data, create_enhanced_prompt, clean_json_response

gemini_api_key = Config.GEMINI_API_KEY
genai.configure(api_key=gemini_api_key)


class RoadmapGenerate(Resource):
    def post(self):
        try:
            # Parse incoming request JSON
            parser = reqparse.RequestParser()
            parser.add_argument("prompt", type=str, required=True, help="Prompt is required")
            args = parser.parse_args()

            prompt = args["prompt"]

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
            except Exception as error:
                print(f"Failed to parse AI response: {error}")
                print("Raw response:", response.text)
                return {"message": "Failed to parse AI response", "status": 500}, 500

            # Return the learning path as JSON
            return {"learningPath": structured_data}

        except Exception as error:
            print(f"Error in API route: {error}")
            return {"message": "An error occurred", "status": 500}, 500
