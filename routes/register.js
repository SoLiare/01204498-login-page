var express = require('express');
var router = express.Router();
var knex = require('../database/knex.js');
var random = require("randomstring");
var sha256 = require('sha256');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('register');
});

router.post('/', function (req, res, next) {
  var errors = [];
  knex('user').select('username').where('username', req.body.username).then(function (u) {
    if(u.length != 0) {
      errors.push("This username is already in use.");
    }
    if(req.body.password != req.body.confirm) {
      errors.push("The password doesn't match.")
    }
    if(errors.length != 0) {
      res.render('register', {
        failed: true,
        errors: errors
      });
    } else {
      var salt = random.generate();
      var pwd = req.body.password+salt;
      var hashed = sha256(pwd);
      console.log(hashed);
      console.log(salt+hashed);
      knex('user').insert({
        username: req.body.username,
        password: salt+hashed
      }).then(function(){
        res.redirect('/');
      });
    }
  });
});

module.exports = router;