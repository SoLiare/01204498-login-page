var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user) {
    res.render('index');
  }
  else {
    res.redirect('/login');
  }
});

router.post('/', function(req, res, next){
  
});

module.exports = router;