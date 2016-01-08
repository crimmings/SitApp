/**
 * Created by crimmings on 1/6/16.
 */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var Babysitter = require('../models/sitters');


/*
 * POST to addSitter
 */

// POST data (req.body) and insert it into 'sitterlist' collection in sitapp db.
// returns an empty string if it works, an error message if it doesn't.

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


/* wouldbe for Mongoose
 var sitter = new Babysitter();
 sitter.babysitter = req.body.babysitter;
 sitter.phone = req.body.phone;
 sitter.email = req.body.email;

 sitter.save(function(err, data){
 if(err){
 console.log("Derp: ", err);
 }
 })

 console.log(req.body.babysitter);


 */