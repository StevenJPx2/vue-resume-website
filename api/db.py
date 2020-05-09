import pymongo


class Db:
    password = None
    client = pymongo.MongoClient(
        f"mongodb+srv://stevenjohn:{password}@cluster0-nszf9.mongodb.net/test?retryWrites=true&w=majority"
    )

    def __init__(self, name):
        self.db = self.client[name]
