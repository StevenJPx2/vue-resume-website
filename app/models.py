from app import db
import datetime
import re


class Post(db.Document):
    title = db.String(db_field="Title", max_length=120, required=True)
    date = db.DateTimeField(db_field='Date', default=datetime.utcnow(),
                            required=True)
    body = db.StringField(db_field='Body')
    cover_img = db.StringField(db_field='Cover Image')
    imgs = db.ListField(db.StringField(db_field='Images'))

    meta = {'allow_inheritance': True}

    def body_preview(self, n=45, remove_imgs=True):
        preview = " ".join(self.body.split(" ")[:n]) + "..." if self.body else\
                  '...'
        if remove_imgs:
            preview = re.sub(r"!\[.*\]\(.*\)", "", preview)
        return preview

    def return_date(self):
        return (self.date.strftime("%a"), self.date.strftime("%b %d, %Y"))


class ProjectPost(Post):
    github_url = db.URLField(db_field='GitHub URL')
    last_updated = db.DateTimeField(db_field='Last Updated', 
                                    default=datetime.utcnow())
    live_demo = db.StringField(db_field='Live Demo')

    meta = {'ordering': ['-last_updated']}
