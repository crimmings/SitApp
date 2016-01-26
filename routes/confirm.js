/**
 * Created by crimmings on 1/15/16.
 */

var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var client = require('twilio')('xx', 'xx');

/** POST confirm message when sitter is chosen
 *
 *
 */

router.post('/', function (req, res) {

    console.log('My Name is Corntwilio! I confirm you.');

    client.sendMessage({
        to: req.body.who,
        // from: process.env.TWILIO_NUMBER,
        from: process.env.TWILIO_NUMBER,
        body: req.body.message + '  ** This is an automated SMS from the Crimmings. Please use our cells if you have questions. ** '
    }, function (err, data) {
        if (err) {
            console.log(err);
        }

        console.log("req.body.name: " + req.body.name);
        console.log(data);
        console.log(req.body.who);

    });

    res.render('confirm', {title: "Confirmation Sent"});

    var db = req.db;
    var collection = db.get('sitterconfirmation');
    collection.update({From: req.body.who}, {$set: {confirm: "confirmed"}}, function (err, result){
        console.log(req.body);
        console.log(req.body.mediaUrl);
    }); // end of db



});// end of router post

module.exports = router;

