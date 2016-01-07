var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/*
 * REQUEST babysitter
 */

router.post('/', function (req, res){
    var mailOpts, smtpTrans;

    // setup nodemailer transport (using gmail). Need to create app specific password for the.crimmings@gmail.com
    smtpTrans = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
            user: "the.crimmings@gmail.com",
            pass: "1chalomot@" // add app specific pw later
        }
    });

    // Mail options
    mailOpts = {
        from: 'the.crimmings@gmail.com',
        to: 'john.crimmings@gmail.com', // grab form data from request body object (but ideally it would grab the email from marked checkboxes)
        subject: 'We Need A Babysitter!',
        text: req.body.message
    };
    console.log("req.body.message: " + req.body.message);

    smtpTrans.sendMail(mailOpts, function(error, response){
        console.log("mailOpts: " + mailOpts);
        // email not sent
        if(error){
            res.render('request', {title: 'The Crimmings', msg: 'Uh, we have a problem.', err: true, page: 'request'})
        }
        // Email successful
        else {
            res.render('request', {title: 'The Crimmings', msg: 'Help is on the way!', err: false, page: 'request'})
        }
    });

});

module.exports = router;