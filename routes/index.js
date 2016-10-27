var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/User.js');
/* GET home page. */

router.post('/signUp', function(req, res, next){
  var user = new User(req.body);
  user.provider = 'local';
  user.validate(function(err){
    if(err)
    res.json({
      'success': 'false',
      'message': 'e-mail inválido'
    });
    else{
      user.save(function(err, post){
        if(err) next(err);
        console.log("New user created");
        //307 vai indicar que vou redirecionar com msm metodo (POST)
        res.redirect(307, '/authenticate');
      });
    }
  });
});

router.use(function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token){
    jwt.verify(token, req.app.get('secretToken'), function(err, decoded){
      if(err){
        return res.json({success: false, message: 'Failed to authentcate token.'});
      }else{
        req.decoded = decoded;
        next();
      }
    });
  }else{
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  };
});

module.exports = router;
