var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Local = require('../models/Local');
var Vacina = require('../models/Vacina');

router.get('/', function(req, res, next){
  Local.find(function(err, all){
    if(err) return next(err);
    res.json(all);
  })
});

router.get('/:doenca', function(req, res, next){
  Vacina.find({"nome": {"$regex": req.params.doenca, "$options": "i"}}
      , function(err, post){
        res.json(post);
      });
});

module.exports = router;
