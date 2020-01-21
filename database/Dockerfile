FROM python:3.7-alpine

WORKDIR /data

COPY update_db.py .
RUN pip install pygithub

ENTRYPOINT [ "python", "update_db.py" ]