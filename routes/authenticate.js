var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User.js');
var jwt = require('jsonwebtoken');

function failed_to_login(res){
    res.json({success: false, message: 'Incorrect e-mail or password'});
}

router.post('/', function(req, res){
  var user_email = req.body.email
  var user_pass = req.body.password

  User.findOne({email: user_email}, function(err, user){
  if(err) throw err;

    if(!user || (!user.authenticate(user_pass)) || (user_email === undefined || user_pass === undefined)){
      failed_to_login(res);
    }else{
      var token = jwt.sign(user, req.app.get('secretToken'));

      res.json({
        success: true,
        message: 'Authentication passed!',
        token: token,
        user_id: user.id
      });
    }
  });
});

module.exports = router;
