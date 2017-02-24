var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var MeetingMinutes = require('../models/meeting_minutes')
var Agreement = require('../models/agreement')

// all the pages routes by get -- will add posts and other such if we need it later
router.get('/', function(req, res) { res.redirect('/login') })
 
// methods need to support: GET
router.get('/main', function(req, res) {  
    res.render('index', {title : 'Main Page'});
})

// methods need to support: GET
router.get('/agreement', function(req, res) { res.render('agreement', {title: 'Agreement'})})

// methods need to support: GET POST
router.route('/chat') 
    .get(function(req, res) { res.render('chat', {title: 'Chat'})})
    .post(function(req, res) { res.send('should be the chat post page')})
    
// methods need to support: GET POST
router.route('/roster') 
    .get(function(req, res) { 
        var MongoClient = mongo.MongoClient;
        var url = 'mongodb://localhost:27017/peinv';
        MongoClient.connect(url, function(err, db) {
            if(err){
                console.log('unable to connect to DB', err);
            } else {
                console.log('Connected');
                var collection = db.collection('roster');
                    
                collection.find({}).toArray(function(err, result){
                    if(err){
                        res.send(err);
                    } else if (result.length) {
                        res.render('roster', {title: 'Roster', memberlist: result})
                    } else {
                        res.send("No DB info Found");
                }});
                db.close();
            }});
        })
        
    .post(function(req, res) { res.send('should be the roster post page')})
    
// methods need to support: GET POST
router.route('/tips') 
    .get(function(req, res) { res.render('tips', {title: 'Tips'})})
    .post(function(req, res) { res.send('should be the tips post page')})
    
// methods need to support: GET POST
router.route('/login') 
    .get(function(req, res) { res.render('login', {title: 'Login'})})
    .post(function(req, res) { res.redirect('/main')})

router.route('/new-user') 
    .get(function(req, res) { res.render('newUser', {title: 'New User Sign Up'})})
    .post(function(req, res) { 
        var MongoClient = mongo.MongoClient;
        var url = 'mongodb://localhost:27017/peinv';
        MongoClient.connect(url, function(err, db) {
            if(err){
                console.log('unable to connect to DB', err);
            } else {
                console.log('Connected');
                var collection = db.collection('roster');
                console.log("here");
                
                var new_member = {
                    name: req.body.User,
                    address: req.body.Address,
                    password: req.body.Password,
                    phone: req.body.Phone,
                    spouse: req.body.Spouse,
                    email: req.body.Email,
                    birthday: req.body.Birthday,
                };
                console.log("and here");
                console.log(new_member);
                collection.insert([new_member], function(err, result){
                if (err){
                    console.log(err);
                } else {
                    res.redirect('roster')
                }
                db.close();
            });
            }});
    })
    
module.exports = router;
