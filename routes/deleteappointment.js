/**
 * Created by crimmings on 1/12/16.
 */

var express = require('express');
var router = express.Router();



/*
 * DELETE to appointment
 */

router.delete('/:id', function(req, res){
    var db = req.db;
    var collection = db.get('sitterrequests');
    var appointmentToDelete = req.params.id;
    collection.removeById(appointmentToDelete, function(err, result){
        res.send((result === 1) ? {msg: ''} : {msg: 'error: ' + err});
    });
});


module.exports = router;

