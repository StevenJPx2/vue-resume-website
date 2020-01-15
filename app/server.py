from flask import jsonify
from app import app
from app.models import ProjectPost

DEBUG = True


@app.route('/projects', methods=['GET'])
def return_projects():
    return jsonify(
        {
            "status": "200",
            "content": ProjectPost(title="Hi")
        }
    )


if __name__ == '__main__':
    app.run()
