FROM node

WORKDIR /app
ADD . /app/

# global install & update
RUN npm i -g npm
RUN npm install

RUN npm run build
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

# start the app
CMD [ "npm", "start" ]
