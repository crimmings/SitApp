/**
 * Created by crimmings on 1/6/16.
 */

var express = require('express');
var router = express.Router();


/** PUT updated sitter information into sitterlist collection
 *
 */


router.put('/:id', function(req,res){
    var db = req.db;
    var sitterToUpdate = req.params.id;
    var doc = {$set: req.body};
    var collection = db.get('sitterlist');
    collection.updateById(sitterToUpdate, doc, function(err, result){
        //console.log(sitterToUpdate, doc);
        res.send((result === 1) ? {msg: ''} : { msg:'error: ' + err});
    });
});



module.exports = router;
