var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if((req.session.email!=undefined) && (req.session.password!=undefined)){
    res.redirect('dashboard');
  }else{
    res.render('index');
  }
});

module.exports = router;
