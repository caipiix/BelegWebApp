let express = require('express');
let router = express.Router();

const mongo = require("../mongoDBClient");
const {ObjectId} = require("mongodb");

/**
 * handle get req on db side - get contacts from specific user
 */
router.get('/', function (req, res, next) {
    if (req.query?.userID != null) {
        let userID = req.query.userID;
        mongo().collection("contacts").find({owner: userID}).toArray(function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    } else {
        mongo().collection("contacts").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    }
});

/**
 * handle get req on db side - get single specific contact
 */
router.get('/:id', function (req, res, next) {
    if (req.params?.id != null) {
        let id = req.params.id;
        mongo().collection("contacts").findOne({"_id": ObjectId(id)}, function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        })
    } else {
        res.status(400).end();
    }
});

/**
 * update contact in database-contacts-collection
 */
router.put('/:id', function (req, res, next) {
    if (req.params?.id != null && req.body != null) {
        let id = req.params.id;
        let userToUpdate = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            street: req.body.street,
            zipcode: req.body.zipcode,
            city: req.body.city,
            country: req.body.country,
            phone: req.body.phone,
            dob: req.body.dob,
            privacy: req.body.privacy,
            owner: req.body.owner,
            lon: req.body.lon,
            lat: req.body.lat
        }
        mongo().collection("contacts").replaceOne({"_id": ObjectId(id)}, userToUpdate, function (err, result) {
            if (err) throw err;
            res.status(204).end();
        });
    }
});

/**
 * delete contact in database-contacts-collection
 */
router.delete('/:id', function (req, res, err) {
    if (req.params?.id != null) {
        let id = req.params.id;
        console.log(id)
        mongo().collection("contacts").deleteOne({"_id": ObjectId(id)}, function (err, result) {
            if (err) throw err;
            if (result.deletedCount > 0) {
                res.status(204).end();
            } else {
                res.status(404).end();
            }
        });
    }
})

/**
 * add contact in database-contacts-collection
 */
router.post("/", function (req, res, next) {
    if (req.body != null) {
        let contactToInsert = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            street: req.body.street,
            zipcode: req.body.zipcode,
            city: req.body.city,
            country: req.body.country,
            phone: req.body.phone,
            dob: req.body.dob,
            privacy: req.body.privacy,
            owner: req.body.owner,
            lon: req.body.lon,
            lat: req.body.lat
        }
        console.log(contactToInsert);
        mongo().collection("contacts").findOne(contactToInsert, function (err, result) {
            if (err) throw err;
            if (result != null) {
                res.status(400).end();
            } else {
                mongo().collection("contacts").insertOne(contactToInsert, function (err, result) {
                    if (err) throw err;
                    let contactToInsertID = contactToInsert._id;
                    res.status(201).json(contactToInsertID);
                });
            }
        });
    }
});

module.exports = router;
