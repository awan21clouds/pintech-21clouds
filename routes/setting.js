var express = require('express');
var router = express.Router();

//var session = require('express-session');
//var FileStore = require('session-file-store')(session);

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(req.session.username);
  if((req.session.email!=undefined) && (req.session.password!=undefined)){
    res.render('setting');
  }else{
    res.redirect('/');
  }
});


router.put('/update/:id', function(req, res){
  var id = req.params.id;
  User.findByIdAndUpdate(id, { $set: {
    nickname:req.body.nickname,
    password:req.body.password,
    email:req.body.email,
    city:req.body.city,
    state:req.body.state
  }}, function (err, docs) {
    res.json(docs);
  });
});


router.get('/read', function(req, res, next) {
  console.log('Login Post');
  User.findOne({_id:req.session._id},function(err, docs){
    res.json(docs);
  });
});

router.get('/logout',function(req, res, next){
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
