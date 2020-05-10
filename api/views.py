from datetime import datetime, timedelta

from flask import request, jsonify
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
        full_json = res.json()
        self.project_list = [
            {
                **{key: project[key] for key in ["name", "html_url", "description"]},
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
