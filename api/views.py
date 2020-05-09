from flask import request
from flask_restful import Resource


class Projects(Resource):
    " Gathers all my projects from Github "

    def __init__(self):
        self.g = Github(open(""))

    def get(self):
        """ Returns a list of quotes """
        query = "SELECT * FROM quote ORDER BY created DESC"
        rows = res.fetchall()
        keys = res.keys()
        quotes = self.db.clean_select_results(rows, keys)

        return {"quotes": quotes}
