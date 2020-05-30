from datetime import datetime, timedelta
import random
import hashlib
import json

import jsonschema
import requests
from flask import request
from flask_restful import Resource
from bson.json_util import dumps
import boto3

from db import Db
from functions import access_secrets

project_collection = Db("website").get_collection("projects")
meeting_collection = Db("website").get_collection("meetings")

aws_access, aws_secret = list(map(lambda x: x.strip(), access_secrets(".s3").split()))

s3 = boto3.client("s3", aws_access_key_id=aws_access, aws_secret_access_key=aws_secret)


def open_bson(bson_obj):
    return json.loads(dumps(bson_obj))


def either_or_password_validate(meeting_values, validation_values):
    if validation_values["is_host"] is True:
        if meeting_values["host_password"] == validation_values["password"]:
            return True, 200
        else:
            return False, 400
    else:
        if meeting_values["attendee_password"] == validation_values["password"]:
            return True, 200
        else:
            return False, 400


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
    collection = project_collection

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
                            datetime.strptime(
                                project["created_at"][:-1], "%Y-%m-%dT%H:%M:%S"
                            ).strftime("%b %d, %Y")
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


class MeetingNo(Resource):
    collection = meeting_collection

    def get(self, meeting_hash):
        return open_bson(self.collection.find_one({"meeting_hash": meeting_hash}))[
            "meeting_id"
        ]


class CreateMeeting(Resource):
    collection = meeting_collection
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
            mi_exists = self.collection.find_one({"meeting_id": mi}) and True
        return mi

    def post(self):
        response = request.json
        print(response)
        meeting_id, host_password, attendee_password = (
            response["meeting_id"],
            response["host_password"].strip(),
            response["attendee_password"].strip(),
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

        response["slides"] = [[]]

        meeting_hash = hashlib.sha512(
            (meeting_id + host_password).encode("utf-8")
        ).hexdigest()[:20]

        response["meeting_hash"] = meeting_hash
        response["meeting_name"] = ""
        response["live"] = {"attendees": {}, "slide_no": 0}

        self.collection.update_one(
            {"meeting_hash": meeting_hash}, {"$set": response}, upsert=True
        )

        return meeting_hash


class SlideResponse(Resource):
    collection = meeting_collection

    def post(self):
        data = request.json
        meeting_values = open_bson(
            self.collection.find_one({"meeting_hash": data["hash"]})
        )
        try:
            return meeting_values["live"]["attendees"][data["user_index"]][
                "slide_responses"
            ][str(data["slide_no"])]
        except IndexError as e:
            print(e, data)
            return None


class AccessMeeting(Resource):
    collection = meeting_collection

    def get(self, meeting_hash):
        out = open_bson(self.collection.find_one({"meeting_hash": meeting_hash}))
        if out is None:
            return "Meeting does not exist", 404

        return out

    def post(self, meeting_hash):
        updated_slides = request.json["slides"]
        meeting_name = request.json["meeting_name"]

        self.collection.update_one(
            {"meeting_hash": meeting_hash},
            {"$set": {"slides": updated_slides, "meeting_name": meeting_name}},
        )


class UploadImage(Resource):
    def post(self):
        img_binary = request.json
        print(img_binary)
        generated_file_name = str(random.randint(1_000_000_000, 9_999_999_999)) + ".png"
        s3.upload_fileobj("website-meetings", img_binary, generated_file_name)

        return {
            "url": "https://website-meetings.s3-ap-south-1.amazonaws.com/"
            + generated_file_name
        }


class ValidatePassword(Resource):
    collection = meeting_collection

    def post(self):
        validation_values = request.json
        meeting_values = open_bson(
            self.collection.find_one({"meeting_hash": validation_values["hash"]})
        )
        return either_or_password_validate(meeting_values, validation_values)


class JoinMeeting(Resource):
    collection = meeting_collection

    def post(self):
        login_credentials = request.json
        validation_id = int(login_credentials["id"].replace("-", ""))

        meeting_values = open_bson(
            self.collection.find_one({"meeting_id": validation_id})
        )
        if meeting_values is None:
            return ["id", "This meeting ID does not exist."], 400

        validated = either_or_password_validate(meeting_values, login_credentials)
        if validated[0] is True:
            return meeting_values["meeting_hash"], 200
        else:
            return ["password", "This password is incorrect"], 400


class Attendee(Resource):
    collection = meeting_collection

    def post(self):
        data = request.json
        if data["action"] == "new":
            user_data = {"name": data["display_name"], "slide_responses": []}
            user_id = f"user{random.randint(1_000_000, 9_999_999)}"
            self.collection.update_one(
                {"meeting_hash": data["meeting_hash"]},
                {"$set": {f"live.attendees.{user_id}": user_data}},
            )
            meeting_values = self.collection.find_one(
                {"meeting_hash": data["meeting_hash"]}
            )

            return (
                (user_id, meeting_values["live"]["slide_no"],),
                200,
            )


class AccessSlide(Resource):
    collection = meeting_collection

    def post(self):
        values = request.json
        meeting_meta = open_bson(
            self.collection.find_one({"meeting_hash": values["hash"]})
        )
        return meeting_meta["slides"][values["slide_no"]]

    def get(self):
        meeting_hash = request.args.get("hash")
        meeting_meta = open_bson(
            self.collection.find_one({"meeting_hash": meeting_hash})
        )

        return meeting_meta["live"]["slide_no"]
