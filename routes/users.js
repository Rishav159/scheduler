var express = require('express');
var router = express.Router();
var User = require('../models/users');
var bcrypt = require('bcrypt');

router.post('/signup', function(req, res, next) {
  var newUser = new User({
    email : req.body.email,
    name : req.body.name,
    phone : req.body.phone,
    pass : req.body.pass
  });
  newUser.save(function (err, user) {
    if (err){
      res.status = 502;
      res.send(err);
    }else{
      req.session.user = {};
      req.session.user.id = user._id;
      req.session.user.name = user.name;
      req.session.user.email = user.email;
      res.redirect('/updatedetails');
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
              res.redirect('/')
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

router.get('/signout',function(req,res,next){
  delete req.session.user;
  res.status=200;
  res.redirect('/');
});

module.exports = router;
