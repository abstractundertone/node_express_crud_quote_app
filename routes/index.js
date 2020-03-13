var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('quotes');

  collection.find({}, function(e, result) {
    if(e) return console.log(e);
    
    res.render('index', {quotes: result})
  })
});

router.post('/quotes', function(req, res, next) {
  var db = req.db;
  var collection = db.get('quotes');

  //Get our form values. These rely on the "name" attributes
  var name = req.body.name;
  var quote = req.body.quote;

  //Submit to the DB
  collection.insert({
    "name": name,
    "quote": quote
  }, function (err, doc) {
    if(err) {
      //If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      //And forwared to home page
      res.redirect("/");
    }
  });
})


router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});

/* GET UserList page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function(e, docs) {
    res.render('userlist', {
      title: 'Users',
      userlist: docs
    });
  });
});

/* GET New User page */
router.get('/newuser', function(req, res) {
  res.render('newuser', {title: 'Add New User'})
})

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

  //Set our internal DB variable
  var db = req.db;

  //Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  //Set our collection
  var collection = db.get('usercollection');

  //Submit to the DB
  collection.insert({
    "username": userName,
    "email": userEmail
  }, function (err, doc) {
    if(err) {
      //If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      //And forwared to success page
      res.redirect("userlist");
    }
    
  });
});

module.exports = router;
