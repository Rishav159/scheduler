var express = require('express');
var router = express.Router();
var User = require('../models/users')
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    console.log(req.session.user.id);
    User.findById(req.session.user.id,function(err,user){
      if(err){
        console.log(err);
        res.send(err)
      }else{
        res.render('dashboard',user);
      }
    })
  }
  else {
    res.render('index');
  }
});

router.get('/update_profile',function(req,res,next){
  res.render('profile')
})
router.get('/update_schedule',function(req,res,next){
  res.render('update')
})
router.get('/passwordreset', function(req, res, next) {
  res.render('reset');
});

module.exports = router;
