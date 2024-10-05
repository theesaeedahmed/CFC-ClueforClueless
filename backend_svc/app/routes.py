from app.resources import User, HelloWorld

def initialize_routes(api):
    api.add_resource(HelloWorld, "/")
    api.add_resource(User, "/user/<int:user_id>")
