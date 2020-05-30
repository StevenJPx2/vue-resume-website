import pymongo
from functions import access_secrets


class Db:
    password = access_secrets(".pymongo_access")
    client = pymongo.MongoClient(
        f"mongodb+srv://stevenjohn:{password}@cluster0-nszf9.mongodb.net/test?retryWrites=true&w=majority"
    )

    def __init__(self, name):
        self.db = self.client[name]

    def get_collection(self, collection):
        return self.db[collection]


if __name__ == "__main__":
    posts = Db("test").get_collection("posts")
    posts.insert_one({"post": "Hi"})
