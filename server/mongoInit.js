var mongo = require('./mongo.js');

mongo(async client => {

  var list = ["episode", "ratings", "basics"];

  try {
    const db = client.db("tvratings");

    //init collections
    list.map(item => {
      let collection = db.collection(item);
      collection.countDocuments().then(res => {
        if(res != 0)
          col.drop()
        else
          db.createCollection(item)
      })
    })

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