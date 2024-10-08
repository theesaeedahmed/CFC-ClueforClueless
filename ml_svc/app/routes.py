from app.resources import HelloWorld


def initialize_routes(api):
    api.add_resource(HelloWorld, "/")
