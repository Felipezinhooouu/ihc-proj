var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Doenca = require('../models/Doenca');

router.get('/', function(req, res, next){
  Doenca.find(function(err, all){
    if(err) return next(err);
    res.json(all);
  })
});

module.exports = router;
