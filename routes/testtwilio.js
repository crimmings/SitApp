/**
 * Created by crimmings on 1/14/16.
 */

var express = require('express');
var router = express.Router();


// testtwilio GET

router.get('/', function(req, res){
    res.json();
    //console.log(req.body);
});

router.get('/yes', function(req, res){
    console.log('YES');
})

router.get('/no', function(req, res){
    console.log('NO');
});



module.exports = router;

/* testtwilio

ajax call on /testtwilio and add req.body.to or req.body.from and and req.body.dateCreated, etc. to a table

can i do /testtwilio/yes or /testtwilio/no in the same table?
 */