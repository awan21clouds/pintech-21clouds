var express = require('express');
var router = express.Router();
var Pin = require('../models/pin');
/* GET users listing. */

router.get('/', function(req, res, next) {
  if((req.session.email!=undefined) && (req.session.password!=undefined)){
    res.render('pin');
  }else{
    res.redirect('/');
  }
});

router.get('/read', function(req, res, next) {
  Pin.find(function (err, docs) {
    res.json(docs);
  });
});

router.get('/readMyPins', function(req, res, next) {
  Pin.find({user_id:req.session._id},function (err, docs) {
    if(err)
      console.log(err);
    res.json(docs);
    console.log(docs);
  });
});

router.post('/save', function(req, res, next) {
  console.log('Save Post');
  var pin = new Pin({
    title:req.body.title,
    url:req.body.url,
    user_id:req.session._id
  });

  pin.save(function (err) {
    if (!err) {
      res.json('created');
    } else {
      res.json(err);
    }
  });
});

router.delete('/delete/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  Pin.remove({ _id: id }, function(err) {
    if (!err) {
      res.json('deleted!');
    } else {
      res.json(err);
    }
  });
});

module.exports = router;
