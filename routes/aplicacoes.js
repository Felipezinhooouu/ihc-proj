var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Aplicacao = require('../models/Aplicacao');
var Vacina = require('../models/Vacina');

function get_aplicacoes_default(idade, callback){
  var criteria = {}
  Aplicacao.find({idade_minima_meses: {$gte: idade}}, function(err, post){
    callback(err, post);
  });
}

router.get('/', function(req, res, next){
  Aplicacao.find(function(err, all){
    get_aplicacoes_default(2, function(err, post){
      console.log(post.vacina);
    });
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

router.put('/:id', function(req, res, next){
  Aplicacao.findByIdAndUpdate(req.params.id, req.body, function(err, post){
    if(err) return next(err);
    Aplicacao.findById(req.params.id, function(err, post){
      if (err) next(err);
      res.json(post);
    });
  })
});


router.delete('/:id', function(req, res, next){
  Aplicacao.findById(req.params.id, function(err, aplic){
    aplic.remove(function(err_delete, removed){
      res.json({message: 'deletado com sucesso!'});
    });
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
