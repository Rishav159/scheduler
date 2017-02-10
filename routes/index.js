var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.render('dashboard');
  }
  else {
    res.render('index');
  }
});

router.get('/updatedetails', function(req, res, next) {
  res.render('update');
});

router.get('/passwordreset', function(req, res, next) {
  res.render('reset');
});

module.exports = router;
