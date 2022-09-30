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
    var myobj3 = [
        {
        firstname: "Admin Private",
        lastname: "Contact",
        street: "Reinickendorfer Straße 17",
        zipcode: "16761",
        city: "Hennigsdorf",
        country: "Deutschland",
        phone: "1",
        dob: "1991-01-17",
        privacy: true,
        owner: "admin",
        lon: "13.197754",
        lat: "52.6549528"
    },
        {
            firstname: "Normalo Private",
            lastname: "Contact",
            street: "Brienzer Straße 1",
            zipcode: "13407",
            city: "Berlin",
            country: "Deutschland",
            phone: "2",
            dob: "1991-01-17",
            privacy: true,
            owner: "normal",
            lon: "13.3608779",
            lat: "52.5578137"
        },
        {
            firstname: "Admina Public",
            lastname: "Contact",
            street: "Brienzer Straße 6",
            zipcode: "13407",
            city: "Berlin",
            country: "Deutschland",
            phone: "3",
            dob: "1945-07-19",
            privacy: false,
            owner: "admin",
            lon: "13.3614245",
            lat: "52.5581759"
        },
        {
            firstname: "Normalo Public",
            lastname: "Contact",
            street: "Breuer Street 10",
            zipcode: "4341",
            city: "Laidley",
            phone: "4",
            dob: "1946-12-19",
            privacy: false,
            owner: "normal",
            lon: "152.3975264",
            lat: "-27.6190567"
        },
    ];
    mongoClient.collection("contacts").insertMany(myobj3, function (err, res) {
        if (err) throw err;
        console.log("many objects were added in collection contacts")
        process.exit(1);
    });
})