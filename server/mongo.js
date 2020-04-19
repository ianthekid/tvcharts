var MongoClient = require('mongodb').MongoClient;

module.exports = function(callback) {
  var url = `mongodb://mongo:27017`;
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    let res = (err) ? err : client;
    return callback(res);
  });
};