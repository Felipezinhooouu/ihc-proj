var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var Cardeneta = require('../models/Cardeneta.js');
var Share = require('../models/Share.js');

var failed_to_login = function(res){
  res.json({success: false, message: 'Authentication failed. Wrong user or wrong password.'});
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, all){
    if(err) return next(err);
    res.json(all);
  });
});

router.get('/:id', function (req, res, next){
  const select = "nome authToken email cardenetas";
  var criteria = {_id: req.params.id};
  User.load({criteria, select}, function(err, post){
    res.json(post);
  });
});

router.get('/:id/cardenetas', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    Cardeneta.find({_id: {$in: user['cardenetas']}}, function(err, post){
      res.json(post);
    });
  });
});

router.post('/:id/cardenetas', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    Cardeneta.create(req.body, function(err, new_card){
      user.cardenetas.push(new_card);
      user.save(function(err, post){
        res.json(post);
      });
    });
  });
});

router.get('/:id/pendings', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    if(err) next(err);
    Share.find({_id: {$in: user.pendings}}).exec(function(err, post){
      res.json(post);
    })
  });
});

router.post('/', function(req, res, next){

  //user.save(function(err, post){
  //  res.json(post);
  //});
});



module.exports = router;
