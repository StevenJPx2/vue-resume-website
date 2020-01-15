from flask import jsonify
from app import app
import json
from app.models import return_repo_data 


@app.route('/projects', methods=['GET'])
def return_projects():
    return jsonify(
        {
            "status": "200",
            "content": return_repo_data()
        }
    )
