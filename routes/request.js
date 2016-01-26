var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var client = require('twilio')('xxx', 'xx');


/** GET sitter request template
 *
 */

router.get('/', function(req, res){
    console.log('We got a get');
    res.render('request', {title: 'Sitter Request'});
}); // end of router get



/** POST twilio text message response to sitterrequests collection
 *
 */

router.post('/', function (req, res) {

    console.log('My Name is Corntwilio!');


    client.sendMessage({
        to: req.body.who,
       // from: process.env.TWILIO_NUMBER,
        from: process.env.TWILIO_NUMBER,
        body: "Hello! We need a sitter on " + req.body.when + " from " +
        req.body.start + " to " + req.body.end + ". " + req.body.message + "  Please respond " +
        "with your availability, and include your name. ** This is an automated text from the Crimmings. Use our cells if " +
            "you have questions. **"

    }, function (err, data) {
        if (err) {
            console.log(err);
        }
        console.log("req.body.name: " + req.body.name);
        console.log(data)
    });


        res.render('request', {
            title: 'Request Confirmation',
            msg: 'Help is on the way!',
            babysitters: 'WHO: ' + req.body.name,
            when: 'DATE: ' + req.body.when,
            time: 'TIME: ' + req.body.start + " to " + req.body.end,
            where: 'WHERE: ' + req.body.where,
            details: 'DETAILS: ' + req.body.message,
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