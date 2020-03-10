FROM node:latest as build-stage
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /client
COPY --from=build-stage /client/dist /client
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80