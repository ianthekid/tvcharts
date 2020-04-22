FROM node:13
WORKDIR /api
COPY ./package.json /api
RUN npm install
COPY ./mongo.js /api
COPY ./api /api
EXPOSE 3000
CMD node api.js