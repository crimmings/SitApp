/**
 * Created by crimmings on 1/6/16.
 */

var express = require('express');
var router = express.Router();




/*
 * DELETE to deletesitter
 */

router.delete('/:id', function(req, res){
    var db = req.db;
    var collection = db.get('sitterlist');
    var sitterToDelete = req.params.id;
    collection.removeById(sitterToDelete, function(err, result){
        res.send((result === 1) ? {msg: ''} : {msg: 'error: ' + err});
    });
});


module.exports = router;
