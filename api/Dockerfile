FROM python:3.6
WORKDIR /app
ADD . /app
RUN pip install -r requirements.txt
CMD ["gunicorn", "--worker-class", "eventlet", "-w", "1", "--bind", "0.0.0.0:9000", "app:app"]
