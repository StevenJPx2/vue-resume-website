from flask import jsonify
from app import app
from app.models import return_repo_data


@app.route('/projects', methods=['GET'])
def return_projects():
    return jsonify(return_repo_data())
