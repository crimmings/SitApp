var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jquery = require('jquery');
var fs = require('fs');
var client = require('twilio')('xx','xx');
//var bootstrap = require('bootstrap');


//Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('ds047095.mongolab.com:47095/sitapp');


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
var testtwilio = require('./routes/testtwilio');
var response = require('./routes/response');
var responsetable = require('./routes/responsetable');
var deleteresponse = require('./routes/deleteresponse');
var confirm = require('./routes/confirm');
var About = require('./routes/about');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


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
app.use('/testtwilio', testtwilio);
app.use('/response', response);
app.use('/responsetable', responsetable);
app.use('/deleteresponse', deleteresponse);
app.use('/confirm', confirm);
app.use('/about', About);


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
    res.status(err.status || process.env.PORT);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || process.env.PORT);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
