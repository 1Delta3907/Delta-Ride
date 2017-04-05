var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

//mongoose initial connection
var mongoose = require('mongoose');
var connectionURL = 'mongodb://admin:admin@ds113630.mlab.com:13630/delta_ride';
var db = mongoose.connection;

//Schema for bike data
/*var dataSchema = new mongoose.Schema({
  "matrixNumber": Number,
  "time": Number
});

//bike data model
mongoose.model('bike_data_set', dataSchema);
var bike_data_set = mongoose.model('bike_data_set');*/

mongoose.connect(connectionURL);

//if we have any errors, show them in console
db.on('error', function (err) {
    console.log('connected ' + err.stack);
});
 
//when we disconnect from mongo, show this in console
db.on('disconnected', function(){
    console.log('disconnected');
});
 
//when we connect to mongo, show this in console
db.on('connected',function(){
    console.log('connected');
});

//start express application
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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
