/**
 * Created by crimmings on 1/14/16.
 */


var express = require('express');
var router = express.Router();


/**
 * GET responses and put in sitterconfirmation collection
 */


router.get('/', function(req, res) {
    console.log('confirm get request at /response');
    console.log(req.query.Body);
    console.log(req.query.From);
    console.log(req.query.DateSent);

    var db = req.db;
    var collection = db.get('sitterconfirmation');

    collection.insert(req.query, function (err, result) {
        console.log(req.query);
    }); //
}); //router.get end



module.exports = router;

