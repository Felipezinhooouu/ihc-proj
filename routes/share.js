var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Share = require('../models/Share.js');
var User = require('../models/User.js');

router.put('/:id/accept', function(req, res, next){
  Share.findById(req.params.id, function(err, share){
    User.findById(share.user_dest, function(err, user){
      user.cardenetas.push(share.cardeneta);
      user.pendings.pull(share);
      user.save(function(err, post){
        res.json(post);
      })
    });
  });
});

module.exports = router;
