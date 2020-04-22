FROM node:13
WORKDIR /api
COPY ../package.json /api
RUN npm install
COPY ../mongo.js /app
COPY . /api
EXPOSE 3000
CMD node api.js