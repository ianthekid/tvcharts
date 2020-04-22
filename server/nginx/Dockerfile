FROM nginx
RUN mkdir -p /var/www/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./frontend/. /var/www/html