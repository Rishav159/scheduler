var express = require('express');
var router = express.Router();
var User = require('../models/users')
/* GET home page. */
router.post('/add_new',function(req,res,next){
  day = req.body['day']
  var new_event = {
    'subject' : req.body.subject,
    'room' : req.body.room,
    'start_time' : req.body.start_time,
    'end_time' : req.body.end_time
  }
  var key = 'schedule.'+day
  var obj = {}
  obj[key] = new_event
  console.log(obj);
  User.update({_id:req.session.user.id},{$push:obj},{upsert:true},function(err,user){
    if(err){
      console.log(err);
      res.send(err)
    }else{
      console.log(user);
      res.redirect('/')
    }
  })

});

module.exports = router;
