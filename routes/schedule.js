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
router.get('/render_event/:day/:index',function(req,res,next){
  User.findById(req.session.user.id,function(err,user){
    if(err){
      console.log(err);
      res.send(err)
    }else{
      render_obj = user.schedule[req.params.day][parseInt(req.params.index)];
      console.log(render_obj);
      res.render('event_template',render_obj)
    }
  })
})
module.exports = router;
