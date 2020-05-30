import eventlet

eventlet.monkey_patch()

import random
import time

from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api
from flask_socketio import SocketIO
from flask_socketio import send, emit, join_room
from engineio.payload import Payload

from functions import access_secrets
from views import (
    Projects,
    AccessMeeting,
    CreateMeeting,
    UploadImage,
    ValidatePassword,
    JoinMeeting,
    MeetingNo,
    Attendee,
    AccessSlide,
    SlideResponse,
    meeting_collection,
    open_bson,
)

app = Flask(__name__)
app.config["SECRET_KEY"] = access_secrets(".secret_key")
CORS(app)
api = Api(app)
Payload.max_decode_packets = 100
socketio = SocketIO(
    app, cors_allowed_origins="http://localhost", logger=True, engineio_logger=True
)


api.add_resource(Projects, "/projects")
api.add_resource(CreateMeeting, "/create_new")
api.add_resource(AccessMeeting, "/meeting/<meeting_hash>")
api.add_resource(UploadImage, "/upload_image")
api.add_resource(ValidatePassword, "/validate_password")
api.add_resource(JoinMeeting, "/join")
api.add_resource(MeetingNo, "/join/meeting_no/<meeting_hash>")
api.add_resource(Attendee, "/join/attendee")
api.add_resource(AccessSlide, "/join/slide")
api.add_resource(SlideResponse, "/join/slide_response")


@socketio.on("disconnect")
def disconnect():
    client_list = open_bson(meeting_collection.find_one({"is_client_list": True}))
    meeting_hash = client_list["clients"][request.sid]

    del client_list["clients"][request.sid]
    del client_list["_id"]

    meeting_collection.update_one(
        {"is_client_list": True}, {"$set": client_list}, upsert=True
    )

    meeting_values = open_bson(
        meeting_collection.find_one({"meeting_hash": meeting_hash})
    )
    del meeting_values["live"]["attendees"][request.sid]
    del meeting_values["_id"]
    meeting_collection.update_one(
        {"meeting_hash": meeting_hash}, {"$set": meeting_values}
    )
    emit("updateMeetingMeta", room=meeting_hash)


@socketio.on("getSlideNo")
def get_slide_no(meeting_hash):
    meeting_values = open_bson(
        meeting_collection.find_one({"meeting_hash": meeting_hash})
    )
    emit("firstEmitHost", meeting_values["live"]["slide_no"], room=meeting_hash)


@socketio.on("setSlideNo")
def set_slide_no(values):
    meeting_collection.update_one(
        {"meeting_hash": values["hash"]}, {"$set": {"live.slide_no": values["slide"]}},
    )
    emit("slideChange", values["slide"], room=values["hash"])
    emit("updateMeetingMeta", room=values["hash"])


@socketio.on("triggerMeetingUpdate")
def update_meeting_values(meeting_hash):
    meeting_values = open_bson(
        meeting_collection.find_one({"meeting_hash": meeting_hash})
    )
    emit("updateMeetingMeta", meeting_values, room=meeting_hash)


@socketio.on("setSlideResponse")
def set_slide_response(data):
    meeting_values = open_bson(
        meeting_collection.find_one({"meeting_hash": data["hash"]})
    )
    meeting_values["live"]["attendees"][data["user_index"]]["slide_responses"][
        str(data["slide_no"])
    ] = data["slide"]

    del meeting_values["_id"]
    meeting_collection.update_one(
        {"meeting_hash": data["hash"]}, {"$set": meeting_values}
    )
    emit("updateMeetingMeta", room=data["hash"])


@socketio.on("join")
def join(data):
    join_room(data["meeting_hash"])

    client_list = meeting_collection.find_one({"is_client_list": True})
    client_list["clients"][request.sid] = data["meeting_hash"]

    meeting_collection.update_one(
        {"is_client_list": True}, {"$set": client_list},
    )

    if data["display_name"] is not False:
        user_data = {"name": data["display_name"], "slide_responses": {}}
        user_id = request.sid
        meeting_collection.update_one(
            {"meeting_hash": data["meeting_hash"]},
            {"$set": {f"live.attendees.{user_id}": user_data}},
        )
        meeting_values = open_bson(
            meeting_collection.find_one({"meeting_hash": data["meeting_hash"]})
        )

        emit("updateMeetingMeta", room=data["meeting_hash"])
        emit(
            "firstEmit", [user_id, meeting_values["live"]["slide_no"]],
        )


if __name__ == "__main__":
    socketio.run(app, debug=True)
