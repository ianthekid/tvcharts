var mongo = require('../mongo.js');

mongo(async client => {

  try {
    const db = client.db("tvratings");

    //drop collections if they already exist
    db.listCollections().toArray().then(res => {
      var list = ["episode", "ratings", "basics"];
      list.map(item => {
        if( res.find(x => x.name === item) )
          db.collection(item).drop()
      })
    })

    //init collections
    await db.createCollection("episode")
    await db.createCollection("ratings")
    await db.createCollection("basics")

    //init indexing
    await db.collection("episode").createIndex({parentTconst: 1})
    await db.collection("ratings").createIndex({tconst: 1})
    await db.collection("basics").createIndex({tconst: 1})
    await db.collection("basics").createIndex({"primaryTitle": "text"})
  } catch (err) {
    console.log(err)
  }

  if(client) client.close();

})