from pathlib import Path


def access_secrets(file):
    return Path(f".secrets/{file}").open().read().strip()
