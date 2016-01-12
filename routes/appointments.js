/**
 * Created by crimmings on 1/12/16.
 */

var express = require('express');
var router = express.Router();


/*
 * GET appointment requests list
 */

// doing an HTTP GET to /users/babysitters will return JSON listing all of the sitters in the db
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('sitterrequests');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

module.exports = router;
