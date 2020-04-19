/**
 * Process:
 * 1: Read entire ${file} as stream, and loop through each line
 * 2. Only create chunks for the batch from ${start} until ${max} line number
 * 3: Create chunks of files that are ${chunkSize} lines
 * 
 * node index.js $file $chunkSize $start $max
 * 
 * Arguments: 
 * var file (String) = .tsv file name generated from data.sh
 * var chunkSize (Int) = Number of lines to save to each file
 * var start (Int) = Batch starting line number
 * var max (Int) = Batch end line number
 */


var fs = require('fs');
var readline = require('readline');

//arguments received as ${args[file, chunkSize, start, max]} 
var args=process.argv.slice(2);
var file=args[0];
var chunkSize=args[1];
var start=args[2];
var max=args[3];

var dir='./files',
    tsvHeader='',
    chunk='', 
    fChunk='', 
    fJson='';
var count=0, 
    doneCnt=0, 
    total=0;

//Starting file numbering for batch
var fCnt=start/chunkSize;


function tsvJSON(tsv) {
  const lines = tsv.split('\n');
  const headers = lines.slice(0, 1)[0].split('\t');
  return lines.slice(1, lines.length).map(line => {
    const data = line.split('\t');
    return headers.reduce((obj, nextKey, index) => {
      var value = data[index];
      //parse values for mongoDB
      if(nextKey === "averageRating") value = parseFloat(data[index])
      if(nextKey === "numVotes") value = parseInt(data[index])
      if(nextKey === "seasonNumber") value = parseInt(data[index])
      if(nextKey === "episodeNumber") value = parseInt(data[index])
      obj[nextKey] = value;
      return obj;
    }, {});
  });
}


//Start processing information
readline.createInterface({
  input: fs.createReadStream(`${dir}/${file}.tsv`, {encoding: 'UTF-8'})
})
.on('line', function(line) {
  //ignore lines that have unwanted data
  if( !line.includes("\\N") || (file === "basics" && (line.includes("tvSeries") || line.includes("tvEpisode"))) ) {
    //First line of  IMDB .tsv file as JSON props
    if(total == 0) {
      tsvHeader = line;
      //Start counter for first file
      if(start == 0) count++;
    } else {
      //Only start chunks at specified batch interval
      if(total >= start && total < max) {
        count++;
        chunk += line+'\n';
        if(count == chunkSize) {
          //Chunk file as JSON obj
          let jsonChunk = tsvJSON(`${tsvHeader}\n${chunk}`);
          let jsonFile = `${dir}/chunks/${file}/${file}-${fCnt}.json`;
          //reset loop counter and chunk for next file
          chunk='';
          count=0;
          doneCnt++;
          fCnt++;
          //write chunk to file as JSON
          fs.writeFile(jsonFile, JSON.stringify(jsonChunk), () => {});
        }  
      }
    }
    total++;
  }
})
.on('close', function () {
  //Save the final chunk
  if(count > 0) {
    //Chunk file for batch
    let jsonChunk = tsvJSON(`${tsvHeader}\n${chunk}`);
    let jsonFile = `${dir}/chunks/${file}/${file}-${fCnt}.json`;
    //Get final counts
    doneCnt++;
    fCnt++;
    //write chunk to file as JSON
    fs.writeFile(jsonFile, JSON.stringify(jsonChunk), () => {});
  }
  console.log(`Done: ${args[0]} records ${start}-${max} / split into ${doneCnt} files`)
});