FROM node:13
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
RUN chmod +x start.sh
CMD /app/start.sh
