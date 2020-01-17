import json
import os
import asyncio as a

from github import Github, GithubException

DATABASE_PATH = os.path.abspath('database/projects_plchldr.json')


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


def return_repo_data():
    return json.load(open(DATABASE_PATH, 'r'))


async def clock_update_repos(sleep_time=120):
    a.sleep(sleep_time)
    load_all_repo_data()
