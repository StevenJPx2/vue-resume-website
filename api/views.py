from datetime import datetime, timedelta
import random
import hashlib

from flask import request
from flask_restful import Resource
import jsonschema
import requests

from db import Db
from functions import access_secrets


class Projects(Resource):
    " Gathers all my projects from Github "

    auth_token = access_secrets(".github_token")
    schema = {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "created_at": {"type": "string"},
                "html_url": {"type": "string", "format": "uri"},
                "description": {"type": ["string", "null"]},
            },
        },
    }
    collection = Db("website").get_collection("projects")

    def __init__(self):
        try:
            self.entry = self.collection.find_one({"id": 0})
            self.project_list = list(self.entry["projects"])
            self.time = self.entry["time"]
        except TypeError:
            self.project_list = []
            self.time = datetime.utcnow()

    def update_db(self):
        res = requests.get(
            "https://api.github.com/user/repos",
            params={"sort": "pushed"},
            headers={"Authorization": f"token {self.auth_token}"},
        )
        if res.status_code == 200:
            full_json = res.json()
            self.project_list = [
                {
                    **{
                        key: project[key] for key in ["name", "html_url", "description"]
                    },
                    **{
                        "created_at": (
                            datetime.fromisoformat(project["created_at"][:-1]).strftime(
                                "%b %d, %Y"
                            )
                        )
                    },
                }
                for project in full_json
            ]
            jsonschema.validate(self.project_list, schema=self.schema)
            self.time = datetime.utcnow()
            self.collection.update_one(
                {"id": 0},
                {"$set": {"projects": self.project_list, "time": self.time, "id": 0}},
                upsert=True,
            )

    def get(self):
        " Gets all the projects from my Github repo "

        if self.project_list == [] or datetime.utcnow() - self.time >= timedelta(
            seconds=10
        ):
            self.update_db()
        else:
            print("304 Not Changed")

        return self.project_list


class CreateMeeting(Resource):
    collection = Db("website").get_collection("meetings")
    schema = {
        "type": "object",
        "properties": {
            "meeting_id": {"type": "string"},
            "host_password": {"type": "string"},
            "attendee_meeting": {"type": "string"},
        },
    }

    def get(self):
        mi_exists = True
        while mi_exists:
            mi = random.randint(1_000_000_000, 9_999_999_999)
            mi_exists = self.collection.find_one({"mi": mi}) and True
        return mi

    def post(self):
        response = request.get_json()
        print(response)
        meeting_id, host_password, attendee_password = (
            response["meeting_id"],
            response["host_password"],
            response["attendee_password"],
        )
        meeting_id = meeting_id.replace("-", "")
        response["meeting_id"] = int(meeting_id)
        errors = [
            ["Meeting ID is not ten digits", len(meeting_id) != 10],
            ["Host Password is empty", not host_password],
            ["Attendee Password is empty", not attendee_password],
        ]

        if any(list(zip(*errors))[1]):
            return errors, 400

        response["slides"] = {}

        self.collection.update_one(
            {"meeting_id": int(meeting_id)}, {"$set": response}, upsert=True
        )

        return hashlib.sha512((meeting_id + host_password).encode("utf-8")).hexdigest()


class CreateSlides(Resource):
    collection = Db("website").get_collection("meetings")
