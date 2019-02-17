FROM node:8
RUN npm install --global bower
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
WORKDIR /app/public
RUN bower install --allow-root
WORKDIR /app
CMD node server.js
EXPOSE 7001