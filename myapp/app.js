var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var config = require('./config')();

var app = express();

// all the pages routes by get -- will add posts and other such if we need it later
app.get('/', function(req, res) { res.render('index', {title : 'Main Page'})})
// methods need to support: GET
app.get('/main', function(req, res) { res.render('index', {title : 'Main Page'})})
// methods need to support: GET
app.get('/agreement', function(req, res) { res.render('agreement', {title: 'Agreement'})})
// methods need to support: GET POST
app.route('/chat') 
    .get(function(req, res) { res.render('chat', {title: 'Chat'})})
    .post(function(req, res) { res.send('should be the chat post page')})
// methods need to support: GET POST
app.route('/roster') 
    .get(function(req, res) { res.render('roster', {title: 'Roster'})})
    .post(function(req, res) { res.send('should be the roster post page')})
// methods need to support: GET POST
app.route('/tips') 
    .get(function(req, res) { res.render('tips', {title: 'Tips'})})
    .post(function(req, res) { res.send('should be the tips post page')})
// methods need to support: GET POST
app.route('/login') 
    .get(function(req, res) { res.render('login', {title: 'Login'})})
    .post(function(req, res) { res.send('should be the login post page')})
// methods need to support: GET POST
app.route('/calendar') 
    .get(function(req, res) { res.render('calendar', {title: 'Calendar'})})
    .post(function(req, res) { res.send('should be the calendar post page')})

// start the app listening on port 3000
app.listen(config.port, function() { console.log("listening on port " + config.port)})
/*
MongoClient.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/peinv', function(err, db) {
    if (err) { 
        console.log('Sorry, no db running'); 
    } else {
    var attachDB = function(req, res, next) {
        req.db = db;
        next();
    };
    app.listen(config.port, function() { console.log("listening on port " + config.port)})
    }
});
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
// using bower for boostrap
app.use(express.static(path.join(__dirname, '/bower_components')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
