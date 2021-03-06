var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var config = require('./config')();

var app = express();
mongoose.connect('mongodb://localhost/peinv')

// start the app listening on port 3000
var io = require('socket.io').app.listen(config.port, function() { console.log("listening on port " + config.port)})

// set up messaging socket
io.sockets.on('connection', function (socket) {
    socket.emit('message', {message: 'welcome to the Pennisula Investors Chat Room'});
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    })
});

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
