from app import app
from flask import jsonify


@app.errorhandler(404)
def not_found_error(error):
    return jsonify((error, 404))


@app.errorhandler(500)
def internal_error(error):
    return jsonify(("error", 500))
