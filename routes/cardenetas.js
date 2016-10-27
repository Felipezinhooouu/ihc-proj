var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Cardeneta = require('../models/Cardeneta.js');
var Aplicacao = require('../models/Aplicacao.js');
var Share = require('../models/Share.js');
var User = require('../models/User.js');

router.get('/', function(req, res, next){
  Cardeneta.find(function(err, all){
    if(err) return next(err);
    res.json(all);
  });
});

router.get('/:id', function(req, res, next){
  Cardeneta.findById(req.params.id, function(err, post){
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/', function(req, res, next){
  Cardeneta.create(req.body, function(err, post){
      if(err) return next(err);
      res.json(post);
  });
});

router.put('/:id', function(req, res, next){
  Cardeneta.findByIdAndUpdate(req.params.id, req.body, function(err, post){
    if(err) return next(err);
    res.json(post);
  });
});

router.post('/:id/share', function(req, res, next){
  Cardeneta.findById(req.params.id, function(err, card){
    var share = {}
    User.findOne({email: req.body.email_orig}, function(err, user_origin){
      share.user_origin = user_origin;
      share.cardeneta = card;
      User.findOne({email: req.body.email_dest}).exec(function(err, user_dest){
        share.user_dest = user_dest;
        Share.create(share, function(err, share){
          user_dest.pendings.push(share);
          user_dest.save(function(err, post){
            if(err) next(err);
            res.json(share);
          });
        });
      });
    });
  });
});


router.get('/:id/aplicacoes', function(req, res, next){
  Cardeneta.findById(req.params.id, function(err, card){
    Aplicacao.find({_id: {$in: card['aplicacoes']}}).exec(function(err, post){
      res.json(post);
    });
  });
});

router.post('/:id/aplicacoes', function(req, res, next){
  Cardeneta.findById(req.params.id, function(err, card){
    Aplicacao.create(req.body, function(err, new_aplic){
      card.aplicacoes.push(new_aplic);
      card.save(function(err, post){
        res.json(post);
      });
    });
  });
});

module.exports = router;
