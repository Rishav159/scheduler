var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

router.get('/update', function(req, res, next) {
  res.render('update');
});

router.get('/passwordreset', function(req, res, next) {
  res.render('reset');
});

module.exports = router;
