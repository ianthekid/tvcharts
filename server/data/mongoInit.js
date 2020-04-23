var mongo = require('./mongo.js');

mongo(async client => {

  try {
    const dbDrop = client.db("tvratings");

    //drop collections if they already exist
    await dbDrop.dropDatabase().then(async () => {
      const db = client.db("tvratings");

      //init collections
      await db.createCollection("episode")
      await db.createCollection("ratings")
      await db.createCollection("basics")

      //init indexing
      await db.collection("episode").createIndex({parentTconst: 1})
      await db.collection("ratings").createIndex({tconst: 1, numVotes: -1})
      await db.collection("basics").createIndex({tconst: 1})
      await db.collection("basics").createIndex({"primaryTitle": "text"})
    })

  } catch (err) {
    console.log(err)
  }

  if(client) client.close();

})