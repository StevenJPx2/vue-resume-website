from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from views import Projects, CreateSlides, CreateMeeting

app = Flask(__name__)
CORS(app)
api = Api(app)


api.add_resource(Projects, "/projects")
api.add_resource(CreateMeeting, "/create_new")
api.add_resource(CreateSlides, "/create_new/<int:meeting_id>")

if __name__ == "__main__":
    app.run()
