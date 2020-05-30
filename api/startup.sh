#!/bin/sh
gunicorn --worker-class eventlet -w 1 --bind localhost:9000 app:app
