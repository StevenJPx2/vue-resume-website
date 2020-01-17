from flask import jsonify
import asyncio as a

from app import app
from app.models import return_repo_data, clock_update_repos

a.tasks(clock_update_repos())
a.run()


@app.route('/projects', methods=['GET'])
def return_projects():
    return jsonify(return_repo_data())
