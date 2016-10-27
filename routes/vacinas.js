var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Vacina = require('../models/Vacina');

router.get('/', function(req, res, next){
  Vacina.find(function(err, all){
    if(err) return next(err);
    res.json(all);
  });
});

module.exports = router;
