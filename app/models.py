import json


def return_repo_data():
    return json.load(open('/database/projects_plchldr.json', 'r'))
