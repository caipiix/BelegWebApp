let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/";

let mongoClient = null;


/**
 * connect and create mongo-db without any content - gets deleted without adding content
 * also counts documents in the two different project collections
 */
MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
    if (err) throw err;
    mongoClient = client.db("advizDB");
    console.log("MongoDB started");

    mongoClient.collection('users').count(function (err, count) {
        if (err) throw err;
        console.log('Total Rows in Users-Collection: ' + count);
    })

    mongoClient.collection('contacts').count(function (err, count) {
        if (err) throw err;
        console.log('Total Rows in Contacts-Collection: ' + count);
    })
})

function mongo() {
    return mongoClient;
}

module.exports = mongo;