from app import db
from datetime import datetime
import re
from github import Github
import os
import json


class Post(db.Document):
    title = db.StringField(db_field="Title", max_length=120, required=True)
    date = db.StringField(db_field="Date",
                          default=datetime.utcnow()
                          .strftime(format="%b %d, %Y"),
                          required=True)
    body = db.StringField(db_field="Body")
    cover_img = db.StringField(db_field="Cover Image")
    imgs = db.ListField(db.StringField(db_field="Images"))

    meta = {"allow_inheritance": True}

    def body_preview(self, n=45, remove_imgs=True):
        preview = " ".join(self.body.split(" ")[:n]) + "..." if self.body else\
                  "..."
        if remove_imgs:
            preview = re.sub(r"!\[.*\]\(.*\)", "", preview)
        return preview

    def return_date(self):
        return (self.date.strftime("%a"), self.date.strftime("%b %d, %Y"))


class ProjectPost(Post):
    github_url = db.URLField(db_field="GitHub URL")
    live_demo = db.StringField(db_field="Live Demo")

    meta = {"ordering": ["-last_updated"]}


def load_all_repo_data():
    g = Github(os.getenv("GITHUB_USER"), os.getenv("GITHUB_PASS"))
    repo_list = []
    for repo in g.get_repos():
        json_d = {
            "title": repo.name,
            "date": repo.created_at.strftime(format="%b %d, %Y"),
            "github_url": repo.url,
            "body": repo.description
        }
        repo_list.append(json_d)

        p = ProjectPost(title=repo.name,
                        date=repo.created_at.strftime(format="%b %d, %Y"),
                        github_url=repo.url,
                        body=repo.description
                        )
        p.save()

    json.dump(repo_list, open('../database/projects_plchldr.json'))
