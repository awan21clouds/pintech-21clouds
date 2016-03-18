var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
  console.log('Save Post');
  var user = new User({
    nickname:req.body.nickname,
    password:req.body.password,
    email:req.body.email
  });

  user.save(function (err) {
    if (!err) {
      res.json('created');
    } else {
      res.json(err);
    }
  });
});

router.post('/login', function(req, res, next) {
  console.log('Login Post');
  User.findOne({email:req.body.email, password:req.body.password},function(err, docs){
    if(docs==null){
      res.json(null);
    }else{
      res.json(docs);
    }
  });
});

router.get('/logout',function(req, res, next){
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
