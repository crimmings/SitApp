/**
 * Created by crimmings on 1/14/16.
 */
var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('sitterconfirmation');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

module.exports = router;