#!/bin/bash

dir="/nginx";
# load .env variables
if [ -f $dir/.env ]
then
  export $(cat $dir/.env | sed 's/#.*//g' | xargs)
fi

# Set domain for nginx conf
sed -i "s/_DOMAIN_/$DOMAIN/g" $dir/nginx.conf &
sed -i "s/_DOMAIN_/$DOMAIN/g" $dir/ssl.conf &

# Set config
mv $dir/nginx.conf /etc/nginx/conf.d/default.conf &
wait