/**
 * Created by RizqyFahmi on 18/03/2016.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if((req.session.email!=undefined) && (req.session.password!=undefined)){
        res.render('dashboard', { username:req.session.nickname });
    }else{
        res.redirect('/');
    }
});

module.exports = router;
