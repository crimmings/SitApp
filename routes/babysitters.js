/**
 * Created by crimmings on 1/6/16.
 */

var express = require('express');
var router = express.Router();

/**
 * GET babysitter list from sitterlist collection
 */


router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('sitterlist');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

module.exports = router;
