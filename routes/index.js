var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/success', function(req, res, next) {
  res.render('success');
});

module.exports = router;
