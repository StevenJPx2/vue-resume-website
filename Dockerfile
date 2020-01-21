FROM python:3.7-alpine

WORKDIR /app

COPY app/ app
COPY setup.py .
RUN pip install -r app/requirement.txt

ENV FLASK_APP setup.py

EXPOSE 5000
ENTRYPOINT [ "gunicorn", "-b", ":5000", "-w", "4", "app:app" ]
