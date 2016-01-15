var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var client = require('twilio')('AC2922b83396db0e8cac649fd001a6e5f5','30baba464da647a22ad211569d9faf25');

/* REQUEST A SITTER */
// GET


router.get('/', function(req, res){
    console.log('We got a get');
    res.render('request', {title: 'Sitter Request'});
}); // end of router get


//POST
router.post('/', function (req, res) {

    console.log('My Name is Corntwilio!');


    client.sendMessage({
        to: req.body.who,
        from: process.env.TWILIO_NUMBER,
        body: "Hello! We need a sitter on " + req.body.when + " from " +
        req.body.start + " to " + req.body.end + " at " + req.body.where
        + ". Please respond Yes, No, or Maybe if you are free. (Fyi, this is an automated text from the Crimmings)."
    }, function (err, data) {
        if (err) {
            console.log(err);
        }
        console.log("req.body.name: " + req.body.name);
        console.log(data)
    });


        res.render('request', {
            title: 'The Crimmings',
            msg: 'Help is on the way!',
            babysitters: 'Who: ' + req.body.name + '<' + req.body.who + '>',
            when: 'Date: ' + req.body.when,
            time: "Time: " + req.body.start + " to " + req.body.end,
            where: "Where: " + req.body.where,
            details: 'Details: ' + req.body.message,
            err: false,
            page: 'request'
        }); // end of res.render
    // end of else





    var db = req.db;
    var collection = db.get('sitterrequests');
    collection.insert(req.body, function (err, result) {
        console.log(req.body);
    });//end of db

});// end of post


    module.exports = router;