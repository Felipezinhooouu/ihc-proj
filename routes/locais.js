var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Local = require('../models/Local');

router.get('/', function(req, res, next){
  Local.find(function(err, all){
    if(err) return next(err);
    res.json(all);
  })
});

module.exports = router;
