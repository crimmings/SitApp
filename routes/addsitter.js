/**
 * Created by crimmings on 1/6/16.
 */

var express = require('express');
var router = express.Router();


/**
 * POST to add new sitter to sitterlist collection in SitApp db.
 *
 */


router.post('/', function(req, res){
    var db = req.db;
    var collection = db.get('sitterlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: ''} : {msg: err}
        );
    });

});




module.exports = router;


