#!/bin/bash

dir="/nginx";
# load .env variables
if [ -f $dir/.env ]
then
  export $(cat $dir/.env | sed 's/#.*//g' | xargs)
fi

# init nginx
if [ "$BUILD" == "production" ]
then
  echo "generating SSL cert"
  certbot certonly --nginx --email $EMAIL --non-interactive --agree-tos -d $DOMAIN
  cp $dir/ssl.conf /etc/nginx/conf.d/default.conf
  nginx -g "daemon off;"
else
  nginx -g "daemon off;"
fi