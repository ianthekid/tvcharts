FROM node:13
WORKDIR /app
RUN apt-get update
RUN apt install -y mongodb
COPY ./package.json /app
RUN npm install
COPY ./mongo.js /app
COPY ./data /app
RUN chmod +x start.sh
CMD /app/start.sh