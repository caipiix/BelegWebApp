var express = require('express');
var router = express.Router();

var mongo = require("../mongoDBClient");


/**
 * handle the post request on db side - checks username/pw - return success200 or 401 unauthorized
 */
router.post('/', function (req, res, next) {
    if (req.query != null) {
        if (req.query.username && req.query.password && req.query.username !== "" && req.query.password !== "") {
            mongo().collection("users").findOne({
                username: req.query.username,
                password: req.query.password
            }, function (err, result) {
                if (result != null) {
                    res.status(200).json(result);
                } else {
                    res.status(401).end("unauthorized");
                }
            })
        }
    } else {
        mongo().collection("users").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.status(200).json(result)
        });
    }
});

module.exports = router;