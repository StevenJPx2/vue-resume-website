import json
import os
import time

import requests
from github import Github, GithubException

DATABASE_PATH = '/database/projects_plchldr.json'


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

    rps_sorted = list(zip(*sorted(repo_list.items(),
                                  key=lambda x: x[0],
                                  reverse=True)))[1]

    json.dump(rps_sorted, open(DATABASE_PATH, 'w'))


if __name__ == "__main__":
    while True:
        time.sleep(10)
        try:
            load_all_repo_data()
        except requests.exceptions.ReadTimeout:
            time.sleep(20)
