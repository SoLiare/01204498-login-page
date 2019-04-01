var express = require('express');
var passport = require("passport");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next){
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("/", {
        failed: true
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      if (req.query.redirect == undefined) {
        return res.redirect("/");
      }
      return res.redirect(req.query.redirect);
    });
  })(req, res, next);
});

module.exports = router;