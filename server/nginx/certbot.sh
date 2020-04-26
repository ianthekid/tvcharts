#!/bin/bash

dir="/nginx";
# load .env variables
if [ -f $dir/.env ]
then
  export $(cat $dir/.env | sed 's/#.*//g' | xargs)
fi

if [[ "$BUILD" == "production" && "$DOMAIN" != "localhost" ]]
then

  if [[ -d $dir/letsencrypt/live ]]
  then
    echo "copying existing cert files"
    cp -R $dir/letsencrypt/* /etc/letsencrypt
    cp $dir/ssl.conf /etc/nginx/conf.d/default.conf
    service nginx restart
  else
    echo "running letsencrypt certbot"
    getCert="certbot certonly --webroot -w /var/www/html -d $DOMAIN --email $EMAIL --non-interactive --agree-tos"
    # dry run to confirm success before switching to SSL
    dryRun="$getCert --dry-run"
    $dryRun

    if [[ $($dryRun) == *" - The dry run was successful."* ]]
    then
      $getCert
      cp $dir/ssl.conf /etc/nginx/conf.d/default.conf
      service nginx restart
    else 
      echo "letsencrypt failed. see $(tput setaf 3)docker logs nginx$(tput sgr 0)"
    fi

  fi

else
  echo "To run letsencrypt .env needs to have $(tput setaf 3)BUILD=production, DOMAIN!=localhost$(tput sgr 0). Your settings: $(tput setaf 3)BUILD=$BUILD, DOMAIN=$DOMAIN$(tput sgr 0)"
fi