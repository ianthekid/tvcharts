#!/bin/bash
echo "Running startup script"

## STEP 1: Download source files
echo "Downloading data source files..."
dir="./files"
files="basics ratings episode"
for file in $files
do
  mkdir -p $dir/chunks/$file
  wget -q -O $file.tsv.gz https://datasets.imdbws.com/title.$file.tsv.gz
  gunzip $file.tsv.gz
  mv $file.tsv $dir
done
echo "Data source files downloaded"


## STEP 2: Make smaller file chunks that are faster to process
echo "Start creating file chunks..."
chunkSize=100000
chunkGroup=500000
for file in $files
do
  lines=$(cat $dir/$file.tsv | wc -l)
  loops=$(((lines/chunkGroup)+1))
  for (( i=0; i<loops; i++ ))
  do
    start=$(( i*chunkGroup ))
    max=$(( start+chunkGroup ))
    node chunks.js $file $chunkSize $start $max &
  done
done
wait
echo "file chunks created"

## STEP 3: Setup database and insert from source data (as chunks)
echo "Initializing mongoDB"
node mongoInit.js &
wait

echo "import into mongodb"
for file in $files
do
  echo "importing collection $file"
  for filename in $dir/chunks/$file/*.json
  do
    echo "import $filename into $file"
    mongoimport -h mongo:27017 --jsonArray -d tvratings -c $file --file $filename &> /dev/null &
  done
done
echo "Waiting on mongodb import to finish. This may take a few mins..."
wait

echo "Deleted all source and chunk files now that we have a DB"
rm -rf $dir

echo "all done."