FROM node:13
WORKDIR /app
RUN apt-get update
RUN apt install -y mongodb
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
RUN chmod +x start.sh
CMD /app/start.sh
