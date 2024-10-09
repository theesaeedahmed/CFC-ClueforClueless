from app.resources import HelloWorld, RoadmapGenerate


def initialize_routes(api):
    api.add_resource(HelloWorld, "/")
    api.add_resource(RoadmapGenerate, "/roadmap")
