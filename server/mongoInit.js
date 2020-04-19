var mongo = require('./mongo.js');

mongo(async client => {

  try {
    const db = client.db("tvratings");
    await db.createCollection("episode");
    await db.createCollection("ratings");
    await db.createCollection("basics");
    await db.collection("episode").createIndex({parentTconst: 1})
    await db.collection("ratings").createIndex({tconst: 1})
    await db.collection("basics").createIndex({tconst: 1})
    await db.collection("basics").createIndex({"primaryTitle": "text"})
  } catch (err) {
    console.log(err)
  }

  if(client) client.close();

})