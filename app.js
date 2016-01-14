var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var jquery = require('jquery');
var fs = require('fs');
var client = require('twilio')('AC2922b83396db0e8cac649fd001a6e5f5','30baba464da647a22ad211569d9faf25');


//Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/sitapp');
var mongoose = require('mongoose');

// Routes
var routes = require('./routes/index');
var users = require('./routes/users');
var request = require('./routes/request');
var babysitters = require('./routes/babysitters');
var addsitter = require('./routes/addsitter');
var updatesitter = require('./routes/updatesitter');
var deletesitter = require('./routes/deletesitter');
var appointments = require('./routes/appointments');
var deleteappointment = require('./routes/deleteappointment');


var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/testtwilio', function(req,res){
  client.sendMessage({
    to: '+16125012030',
    from: '+17639511945',
    body: "twilio test"
  }, function(err, data){
    if(err)
      console.log(err);
    console.log(data);
  });
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// make db accessible to our router
app.use(function(req, res, next){
  req.db = db;
  next();
});

//
app.use('/', routes);
app.use('/users', users);
app.use('/request', request);
app.use('/babysitters', babysitters);
app.use('/addsitter', addsitter);
app.use('/updatesitter', updatesitter);
app.use('/deletesitter', deletesitter);
app.use('/appointments', appointments);
app.use('/deleteappointment', deleteappointment);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
