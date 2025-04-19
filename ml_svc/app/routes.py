from app.resources import HelloWorld, RoadmapGenerate, RoadmapResource, RoadmapProgress


def initialize_routes(api):
    api.add_resource(HelloWorld, "/")
    api.add_resource(RoadmapGenerate, "/roadmap")
    api.add_resource(RoadmapResource, "/roadmaps", "/roadmaps/<string:roadmap_id>")
    api.add_resource(RoadmapProgress, "/roadmaps/<string:roadmap_id>/progress")
