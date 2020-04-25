FROM nginx
RUN apt-get update
RUN apt install -y certbot python-certbot-nginx

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

# only runs if .env[BUILD] == production
#CMD ["/nginx/certbot.sh"]
CMD /nginx/certbot.sh