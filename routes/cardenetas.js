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
Cardeneta.create(req.body, function(err, cardeneta){
      var date = new Date();
      var months = monthDiff(new Date(cardeneta.dt_nasc), date);
      get_aplicacoes_default(months, function(err, aplicacoes_default){
        console.log(aplicacoes_default);
        cardeneta.aplicacoes = aplicacoes_default;
        cardeneta.save(function(err, saved_card){
          if(err) next(err);
          res.json(saved_card);
        });
      });
  });
});

router.put('/:id', function(req, res, next){
  Cardeneta.findByIdAndUpdate(req.params.id, req.body, function(err, post){
    if(err) return next(err);
    Cardeneta.findById(req.params.id, function(err, post){
      if(err) return next(err);
      res.json(post);
    });
  });
});

router.delete('/:id', function(req, res, next){
  Cardeneta.findById(req.params.id, function(err, card){
    card.remove(function(err_delete, removed){
      res.json({message: 'deletado com sucesso!'});
    });
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
  Cardeneta.findById(req.params.id, function(error_card, card){
    Aplicacao.create(req.body, function(error_create_aplic, new_aplic){
      card.aplicacoes.push(new_aplic);
      card.save(function(error_create_aplic_rel, post){
        res.json(post);
      });
    });
  });
});

module.exports = router;
