var express = require("express");
var mongo = require('./mongo.js');
var cors = require('cors');
var request = require('request');
const dotenv = require('dotenv');
dotenv.config();

var app = express();
app.use(cors());
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get('/api', function(req, res){
  res.send("What's up my nerdz?!?")
})

app.get('/api/poster/:tconst', function(req, res){
  var url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API}&i=${req.params.tconst}`;
  var placeholder = 'https://via.placeholder.com/300x450';
  request(url, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      let data = JSON.parse(body);
      let img = data.Poster;
      //placeholder for empty/null results
      let result = (img && img !== "N/A") ? img : placeholder;
      res.send(result)
    } else {
      res.send(placeholder)
    }
  });
})

app.get('/api/count/:type', function(req, res){
  mongo(client => {
    const db = client.db('tvratings');
    const col = db.collection(req.params.type);
    col.countDocuments().then(data => res.send(`${data} records`))
  });
})

app.get('/api/find/:type/:tconst', function(req, res){
  mongo(client => {
    const db = client.db('tvratings');
    const collection = db.collection(req.params.type);

    collection.findOne({'tconst': req.params.tconst})
    .then(function(doc) {
      var result = (!doc) ? 'No record found.' : doc;
      client.close();
      res.send(result)
    });
  })
})

app.get('/api/show/:tconst', function(req, res){
  mongo(client => {
    const db = client.db('tvratings');
    const basics = db.collection('basics');

    basics.aggregate([
      { $match : {'tconst': req.params.tconst} },
      //get rating
      { $lookup: {
        from: 'ratings',
        localField: 'tconst',
        foreignField: 'tconst',
        as: 'rating'
      }},
      { $unwind: "$rating" },
      //get episodes for entire series
      { $lookup: {
          from: 'episode',
          localField: 'tconst',
          foreignField: 'parentTconst',
          as: 'episodes'
      }},
      { $project: {
          _id : 1,
          tconst : 1,
          primaryTitle : 1,
          startYear: 1,
          endYear: 1,
          averageRating: "$rating.averageRating",
          numVotes: "$rating.numVotes",
          episodeCount: { $size: "$episodes" }
      }}
    ]).toArray().then(data => {
      var results = (data) ? data : 500;
      res.send(results);
      if(client) client.close();
    });
  });
})


app.get('/api/search/:query', function(req, res){
  mongo(client => {
    const db = client.db('tvratings');
    const basics = db.collection('basics');
    var query = decodeURIComponent(req.params.query);
  
    basics.aggregate([{
      $match: {
        $and: [{
          $text: {
            $search: `"\"${query}\""`,
            $caseSensitive: false
          }},
          //limit query to only series titles
          {"titleType": "tvSeries"}
        ]}
      },
      //get episodes for entire series 
      { $lookup: {
          from: 'episode',
          localField: 'tconst',
          foreignField: 'parentTconst',
          as: 'episodes'
      }},
      //get rating for entire series 
      { $lookup: {
          from: 'ratings',
          localField: 'tconst',
          foreignField: 'tconst',
          as: 'rating'
      }}, 
      { $sort: { "rating.numVotes": -1 } }, 
      { $limit: 32 }, 
      { $unwind: "$rating" }, 
      { $project: {
          _id : 1,
          tconst : 1,
          primaryTitle : 1,
          startYear: 1,
          endYear: 1,
          genres: 1,
          averageRating: "$rating.averageRating",
          numVotes: "$rating.numVotes",
          episodeCount: { $size: "$episodes" }
      }},
      //only output shows that have episodes
      { $match: { "episodeCount": { $gt: 0 } } },
    ])
    .toArray().then(data => {
      let results = (data) ? {
        response: (data.length > 0) ? true : false,
        results: data
      } : 500;
      //console.log(results);
      res.send(results);
      if(client) client.close();
    });
  });
})


app.get('/api/seasons/:parentTconst', function(req, res){
  mongo(client => {
    const db = client.db('tvratings');
    const episode = db.collection('episode');

    episode.aggregate([
      { $match : {'parentTconst': req.params.parentTconst} },
      //get rating
      { $lookup: {
        from: 'ratings',
        localField: 'tconst',
        foreignField: 'tconst',
        as: 'rating'
      }},
      { $unwind: "$rating" },
      //get title info
      { $lookup: {
        from: 'basics',
        localField: 'tconst',
        foreignField: 'tconst',
        as: 'title'
      }},
      { $unwind: "$title" },
      //format output
      { $project: {
          _id : 1,
          tconst : 1,
          parentTconst : 1,
          seasonNumber: 1,
          episodeNumber: 1,
          averageRating: "$rating.averageRating",
          numVotes: "$rating.numVotes",
          title : "$title.primaryTitle"
      }}
    ]).toArray().then(data => {
      var results = (data) ? data : 500;
      res.send(results);
      if(client) client.close();
    });
  });
});
