#!/bin/bash
dir="/nginx"
frontend="/var/www/html"
# load .env variables
if [ -f $dir/.env ]
then
  export $(cat $dir/.env | sed 's/#.*//g' | xargs)
fi

if [[ "$BUILD" != "production" || -z $AWS_KEY || -z $AWS_SECRET || -z $S3BUCKET || -z $S3DIR || -z $CLOUDFRONT ]]
then
  echo "To upload to aws/s3, .env needs to have $(tput setaf 3)BUILD=production + all AWS CDN variables$(tput sgr 0) defined"

else

  ## Use CDN, but keep manifest.json local
  sed -i "s,href=\"/,href=\"//$CLOUDFRONT/,g" $frontend/index.html
  sed -i "s,src=\"/,src=\"//$CLOUDFRONT/,g" $frontend/index.html
  sed -i "s,//$CLOUDFRONT/manifest.json,/manifest.json,g" $frontend/index.html

  ## Use CDN in asset manifests
  sed -i "s,/static/,//$CLOUDFRONT/static/,g" $frontend/asset-manifest.json
  sed -i "s,/static/,//$CLOUDFRONT/static/,g" $frontend/precache-manifest*

  ## Use CDN in static assets
  find $frontend/static -type f -exec sed -i "s,static/,//$CLOUDFRONT/static/,g" {} \;

  ## Upload to S3 Bucket. `sync --delete` mirrors source (frontend/) to target ($S3DIR)
  AWS_ACCESS_KEY_ID=$AWS_KEY AWS_SECRET_ACCESS_KEY=$AWS_SECRET aws s3 sync --delete --cache-control='public, max-age=31536000, immutable' $frontend s3://$S3BUCKET/$S3DIR --acl public-read

  echo "Done. Files sent to $CLOUDFRONT"
fi