FROM nginx
RUN apt-get update
RUN apt install -y certbot

# config domain settings
WORKDIR /nginx
COPY ./.env /nginx
COPY ./nginx /nginx
RUN chmod +x config.sh
RUN chmod +x certbot.sh
RUN /nginx/config.sh

# frontend assets
RUN mkdir -p /var/www/html
COPY ./frontend/. /var/www/html