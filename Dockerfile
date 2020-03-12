FROM python:3.7-alpine as python-stage

WORKDIR /app

COPY app/ app
COPY setup.py .

FROM node:latest as build-stage
WORKDIR /client
COPY ./client/package*.json ./
RUN npm install
COPY ./client .
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN mkdir /client
RUN apk update && apk add --no-cache python3
RUN python3 -m ensurepip 
RUN rm -r /usr/lib/python*/ensurepip 
RUN pip3 install --upgrade pip setuptools 
RUN if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi 
RUN if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi 
RUN rm -r /root/.cache
COPY --from=build-stage /client/dist /client
COPY --from=python-stage app/app app
COPY --from=python-stage app/setup.py .

ENV FLASK_APP setup.py

RUN pip install -r app/requirement.txt
COPY ./client/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD gunicorn -b :5000 -w 4 --daemon app:app && nginx -g 'daemon off;'
