import json
import os
import time

import requests
from github import Github, GithubException

DATABASE_PATH = '/database/projects_plchldr.json'
SAVED_TIME_PATH = '/database/time.txt'
TIME_BEF_UPDATE = 10


def load_all_repo_data():
    g = Github(os.getenv("GITHUB_USER"), os.getenv("GITHUB_PASS"))
    repo_list = {}
    for repo in g.get_user('StevenJPx2').get_repos():
        try:
            json_d = {
                "title": repo.name,
                "date": repo.created_at.strftime(format="%b %d, %Y"),
                "github_url": repo.html_url,
                "body": repo.description
            }
        except GithubException:
            pass
        repo_list[repo.updated_at] = json_d

    rps_sorted = list(
        zip(*sorted(repo_list.items(), key=lambda x: x[0], reverse=True)))[1]

    json.dump(rps_sorted, open(DATABASE_PATH, 'w'))
    print(rps_sorted)


def return_repo_data():
    start_time = None
    try:
        start_time = float(open(SAVED_TIME_PATH, 'r').read())
        current_time = time.time()
        if start_time < current_time - 10:
            open(SAVED_TIME_PATH, 'w').write(str(current_time))
            load_all_repo_data()

    except FileNotFoundError:
        start_time = time.time()
        open(SAVED_TIME_PATH, 'w').write(str(start_time))
        load_all_repo_data()
    return json.load(open(DATABASE_PATH, 'r'))
