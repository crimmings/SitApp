var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var nodemailer = require('nodemailer');
var FATALBERT = process.env.FATALBERT;
var jquery = require('jquery');

/* REQUEST A SITTER */
// GET
console.log(FATALBERT);

router.get('/', function(req, res){
    console.log('We got a get');
    res.render('request', {title: 'Sitter Request'});
}); // end of router get


//POST
router.post('/', function (req, res) {
    console.log('we got a post');


    // setup nodemailer transport (using gmail). Need to create app specific password for the.crimmings@gmail.com
    smtpTrans = nodemailer.createTransport('SMTP', {
        service: 'Gmail', // automatically sets host, port, and connection security settings
        auth: {
            user: "the.crimmings@gmail.com",
            pass: '1chalomot@' // add app specific pw later
        }
    });

    // Construct the email to send on form submit

    mailOpts = {
        from: 'the.crimmings@gmail.com',
        to: req.body.who, // grab form data from request body object (but ideally it would grab the email from marked checkboxes)
        subject: 'We Need A Babysitter!',
        text: 'Hello!\n\n We need a babysitter on ' + req.body.when + " from " + req.body.start + " to " +
        req.body.end + " at " + req.body.where + ".\n\n Please let us know as soon as you can if you're available!\n\n More details: " + req.body.message,


        //''"Hello! We need a babysitter on " + req.body.when + " from " + req.body.start + " to " + req.body.end + " at " +
        //req.body.where + ". More details: " + req.body.message
    };
    console.log('req.body.phone: ' + req.body.name);
    console.log('req.body.message: ' + req.body.message);
    console.log('req.body.who: ' + req.body.who);
    console.log('req.body.when: ' + req.body.when);
    console.log('req.body.start: ' + req.body.start);
    console.log('req.body.end: ' + req.body.end);
    console.log('req.body.where: ' + req.body.where);


    // Send the Email

    smtpTrans.sendMail(mailOpts, function (error, response) {
        console.log("mailOpts: " + mailOpts);
        // email not sent
        if (error) {
            console.log(error);
            res.render('request', {title: 'The Crimmings', msg: 'Uh, we have a problem.', err: true, page: 'request'});


        }
        // Email successful
        else {
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
             })
             }
            });

            var db = req.db;
            var collection = db.get('sitterrequests');
            collection.insert(req.body, function (err, result) {
                (console.log(('request', {
                    timestamp: req.body.timeField,
                    title: 'The Crimmings',
                    msg: 'Help is on the way!',
                    babysitters: 'Who: ' + req.body.who,
                    when: 'Date: ' + req.body.when,
                    time: "Time: " + req.body.start + " to " + req.body.end,
                    where: "Where: " + req.body.where,
                    details: 'Details: ' + req.body.message,
                    err: false,
                    page: 'request'
                })));
            });//end of db
/*
    //Initialize a REST client in a single line:

    var client = require('twilio')('AC2922b83396db0e8cac649fd001a6e5f5', '30baba464da647a22ad211569d9faf25');

// Use this convenient shorthand to send an SMS:
    client.sendSms({
        to: '+16125012030',//stu
        //+17635283464',//taylor
        //'+16514928011',//clayton
        //'+14057403563',//gwen
        from:'+17639511945',
        body: 'Picture messaging status:',
        mediaUrl: 'https://dl.dropboxusercontent.com/u/11489766/twilio/elearning/success.jpg'
    }, function(error, message) {
        console.log(error);
        if (!error) {
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);
            console.log('Message sent on:');
            console.log(message.dateCreated);
            console.log(message.dateSent);
            console.log(message.body);
            console.log(message.direction);
        } else {
            console.log('Oops! There was an error.');
        }
        */
    });


        //});



module.exports = router;

/** Ajax call info

 $.ajax({
            type: 'POST',
            data: req.body,
            url: '/appointments',
            dataType: 'JSON'
        }).done(function (response) {
            console.log("Request sent successfully");
            console.log("req");


            **/