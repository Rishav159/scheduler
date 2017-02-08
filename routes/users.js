var express = require('express');
var router = express.Router();
var User = require('../models/users');
var bcrypt = require('bcryptjs');

var isauthenticated = function(req,res,next){
  if(req.session.user){
    next();
  }else {
    res.redirect('/');
  }
};

router.post('/signup', function(req, res, next) {
  var newUser = new User({
    email : req.body.email,
    name : req.body.name,
    pass : req.body.pass,
    dept : req.body.dept,
    contact : req.body.contact,
    classes : req.body.classes
  });
  newUser.save(function (err, user) {
    if (err){
      res.status = 502;
      res.send(err);
    }else{
      res.redirect('/success');
    }
  });
});

router.post('/signin',function(req,res,next){
  User.findOne({email:req.body.email},function(err,user){
    if(err){
      res.status=500;
      res.send(err);
    }else{
      if(user){
        bcrypt.compare(req.body.pass,user.pass,function(err,result){
          if(err){
            res.status=500;
            res.send(err);
          }else{
            if(result){
              req.session.user = {};
              req.session.user.id = user._id;
              req.session.user.name = user.name;
              req.session.user.email = user.email;
              res.status=200;
              res.redirect('/dashboard')
            }else{
              res.send("Password doesn't match");
            }
          }
        });
      }else{
        res.status=200;
        res.send("Username doesnt exist");
      }
    }
  });
});

router.get('/signout',isauthenticated,function(req,res,next){
  delete req.session.user;
  res.status=200;
  res.redirect('/');
});

module.exports = router;
