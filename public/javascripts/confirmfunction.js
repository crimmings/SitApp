/**
 * Created by crimmings on 1/13/16.
 */

/** Copy & Paste of request.js function, which I may adapt to send a confirmation email to babysitter once chosen.


function confirmEmail() {



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
    console.log('req.body.phone: ' + req.body.phone);
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
                babysitters: 'Who: ' + req.body.who,
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

} //function end

*/