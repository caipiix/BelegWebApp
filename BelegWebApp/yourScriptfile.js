var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

var mongoClient = null;

MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
    if (err) throw err;
    mongoClient = client.db("advizDB");
    console.log("MongoDB successfully created database 'advizDB'");

// add admina
    var myobj = {username: "admina", password: "password", role: "admin"};
    mongoClient.collection('users').insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("admina was added in collection users");
    })

// add normalo
    var myobj2 = {username: "normalo", password: "password", role: "normal"};
    mongoClient.collection('users').insertOne(myobj2, function (err, res) {
        if (err) throw err;
        console.log("normalo was added in collection users");
    })

    // add many users
    var myobj3 = [{
        firstname: "Kevin",
        lastname: "Lisse",
        street: "Reinickendorfer Straße 17",
        zipcode: "16761",
        city: "Hennigsdorf",
        phone: "65432132",
        dob: "1991-01-17",
        privacy: false,
        owner: "normal",
        lon: "13.197754",
        lat: "52.6549528"
    },
        {
            firstname: "Marcus",
            lastname: "Lisse",
            street: "Schwyzer Straße 22c",
            zipcode: "13349",
            city: "Berlin",
            phone: "65432132",
            dob: "1991-01-17",
            privacy: false,
            owner: "admin",
            lon: "14.197754",
            lat: "53.6549528"
        },
        {
            firstname: "Max",
            lastname: "Mustermann",
            street: "Brienzer Straße 3",
            zipcode: "13407",
            city: "Berlin",
            phone: "65432132",
            dob: "1945-07-19",
            privacy: true,
            owner: "admin",
            lon: "14.197754",
            lat: "53.6549528"
        },
        {
            firstname: "Mariane",
            lastname: "Musterfrau",
            street: "Brienzer Straße 3",
            zipcode: "13407",
            city: "Berlin",
            phone: "65432132",
            dob: "1946-12-19",
            privacy: true,
            owner: "normal",
            lon: "14.197754",
            lat: "53.6549528"
        },
    ];
    mongoClient.collection("contacts").insertMany(myobj3, function (err, res) {
        if (err) throw err;
        console.log("many objects were added in collection contacts")
    });
})