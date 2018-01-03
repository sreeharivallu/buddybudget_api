FROM node:7

WORKDIR /nodeServer

COPY package.json .
RUN npm install
COPY . /nodeServer

EXPOSE 3000
CMD node app.js
