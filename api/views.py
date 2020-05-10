from datetime import datetime

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
    collection = Db("website").get_collection("projects").find_one()
    try:
        project_list = list(collection["projects"])
        time = collection["time"]
    except TypeError:
        project_list = []
        time = datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S GMT")

    def get(self):
        " Gets all the projects from my Github repo "

        is_changed = requests.get(
            "https://api.github.com/user",
            headers={
                "Authorization": f"token {self.auth_token}",
                "If-Modified-Since": self.time,
            },
        ).status_code

        if is_changed == 200 or not self.project_list:
            res = requests.get(
                "https://api.github.com/user/repos",
                params={"sort": "updated"},
                headers={"Authorization": f"token {self.auth_token}"},
            )
            full_json = res.json()
            self.project_list = [
                {
                    key: project[key]
                    for key in ["name", "created_at", "html_url", "description"]
                }
                for project in full_json
            ]
            jsonschema.validate(self.project_list, schema=self.schema)
            self.collection.insert_one(
                {
                    "projects": self.project_list,
                    "time": datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S GMT"),
                }
            )
        else:
            print("304 Not Changed")

        return self.project_list
