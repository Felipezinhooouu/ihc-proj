var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Aplicacao = require('../models/Aplicacao');
var Vacina = require('../models/Vacina');

router.get('/', function(req, res, next){
  Aplicacao.find(function(err, all){
    if(err) return next(err);
    res.json(all);
  })
});

router.get('/:id', function(req, res, next){
  Aplicacao.findById(req.params.id, function(err, post){
    if (err) next(err);
    res.json(post);
  });
});

router.post('/:id/vacina', function(req, res, next){
  Aplicacao.findById(req.params.id, function(err, aplic){
    if(err) next(err);
    Vacina.create(req.body, function(err, vacina){
      aplic.vacina = vacina;
      aplic.save(function(err, post){
        res.json(post);
      });
    });
  });
});

router.get('/:id/vacina', function(req, res, next){
  Aplicacao.findById(req.params.id, function(err, aplic){
    if(err) next(err);
    Vacina.findById(aplic['vacina'], function(err, vacina){
      if(err) next(err);
      res.json(vacina);
    });
  });
});

module.exports = router;
