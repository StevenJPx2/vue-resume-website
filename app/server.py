from flask import jsonify
from app import app
import json
from app.models import ProjectPost, load_all_repo_data

# load_all_repo_data()


@app.route('/projects', methods=['GET'])
def return_projects():
    project_list = json.load(open('database/projects_plchldr.json', 'r'))
    return jsonify(
        {
            "status": "200",
            "content": project_list
        }
    )


if __name__ == '__main__':
    app.run()
