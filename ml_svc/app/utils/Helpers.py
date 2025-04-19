# /app/utils/Helpers.py

import requests
from config import Config

serp_api_key = Config.SERP_API_KEY

doc_urls = {"react": "https://reactjs.org/docs/getting-started.html", "nextjs": "https://nextjs.org/docs", "python": "https://docs.python.org/3/"}


def search_for_documentation(technology: str) -> str:
    query = f"{technology} official documentation"
    url = f"https://serpapi.com/search.json?engine=google&q={query}&api_key={serp_api_key}"

    try:
        response = requests.get(url)
        organic_results = response.json().get("organic_results", [])
        if organic_results and len(organic_results) > 0:
            return organic_results[0]["link"]
    except Exception as error:
        print(f"Error searching for documentation: {error}")

    return ""


def fetch_official_documentation(technology: str) -> str:
    url = doc_urls.get(technology.lower(), "")
    if not url:
        url = search_for_documentation(technology)
    if not url:
        return ""

    response = requests.get(url)
    return response.text


def process_documentation_data(raw_docs: str) -> str:
    processed = " ".join(raw_docs.split())

    sections = ["Introduction", "Getting Started", "Core Concepts", "API Reference", "Advanced Guides"]
    result = ""

    for section in sections:
        index = processed.find(section)
        if index != -1:
            result += processed[index : index + 500] + "\n\n"

    if len(result) == 0:
        result = processed[:2000]

    return result


# Function to create an enhanced AI prompt based on the documentation
def create_enhanced_prompt(technology: str, docs: str) -> str:
    return f"""
          Based on the following excerpt from the official documentation for {technology}, create a comprehensive and detailed learning path. The path should be suitable for a beginner to become proficient in {technology}. Include the following:

          Documentation excerpt:
          {docs}

          1. Main topics: 5-7 core areas of study, referencing specific sections from the documentation where applicable.
          2. Subtopics: For each main topic, provide 3-5 specific subtopics or skills to learn.
          3. For each subtopic, include:
            - A brief description of what it covers, citing relevant parts of the documentation
            - Estimated time to learn (in hours)
            - Specific technologies, tools, or concepts to study
            - Any prerequisites or dependencies
            - Suggested resources (official documentation sections, books, courses, or websites)

          Ensure the learning path is logically structured, progressing from foundational concepts to more advanced topics. 

          The output should be in the following JSON format:
          {{
            "name": "Main Topic",
            "description": "Overall description of the learning path",
            "estimatedTime": "Total estimated time for the entire path",
            "topics": [
              {{
                "name": "Main Topic 1",
                "description": "Description of main topic 1",
                "estimatedTime": "Estimated time for main topic 1",
                "subtopics": [
                  {{
                    "name": "Subtopic 1.1",
                    "description": "Detailed description of subtopic 1.1",
                    "estimatedTime": "Estimated time for subtopic 1.1",
                    "technologiesAndConcepts": ["Tech 1", "Concept 1", "Tool 1"],
                    "prerequisites": ["Prerequisite 1", "Prerequisite 2"],
                    "resources": ["Documentation: Section X", "Book: Title", "Course: URL", "Website: URL"]
                  }}
                ]
              }}
            ]
          }}
          """


# Function to clean the JSON response
def clean_json_response(response: str) -> str:
    response = response.replace("```json\n", "").replace("\n```", "")
    return response.strip()
