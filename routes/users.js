var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var Cardeneta = require('../models/Cardeneta.js');
var Aplicacao = require('../models/Aplicacao.js');
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

router.put('/:id', function(req, res, next){
  User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    if(err) next(err);
    user.set('password', req.body.password);
    user.save(req.params.id, function(err, updated_user){
      if(err) next(err);
      res.json(updated_user);
    });
  });
});

router.get('/:id/full', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    res.json(post);
  });
});

router.get('/:id', function (req, res, next){
  const select = "nome sobrenome authToken email sexo dt_nasc cardenetas pendings ";
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

router.get('/:id/pendings', function(req, res, next){
  User.findById(req.params.id, function(err, user_origin){
    Share.find({_id: {$in: user_origin['pendings']}}, function(err, pendings){
      if(err) next(err);
      res.json(pendings);
    });
  });
});

function monthDiff(d1, d2){
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

function get_aplicacoes_default(idade, callback){
  var criteria = {}
  Aplicacao.find({idade_minima_meses: {$gte: idade}}, function(err, post){
    callback(err, post);
  });
}

function get_aplicacoes_default(idade, callback){
  var criteria = {}
  Aplicacao.find({idade_minima_meses: {$gte: idade}}, function(err, post){
    var aplics = [];
    post.forEach(function(aplic){
      var newAplic = {};
      newAplic.data = aplic.data;
      newAplic.local = aplic.local;
      newAplic.lote = aplic.lote;
      newAplic.vacina = aplic.vacina;
      newAplic.efetivada = aplic.efetivada;
      newAplic.alarm = aplic.alarm;
      newAplic.dose = aplic.dose;
      Aplicacao.create(newAplic, function(err, savedAplic){
          callback(err, savedAplic);
      });
    });
  });
}

router.post('/:id/cardenetas', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    Cardeneta.create(req.body, function(err, cardeneta){
          var date = new Date();
          var months = monthDiff(new Date(cardeneta.dt_nasc), date);

          get_aplicacoes_default(months, function(err, saved_aplicacao){
            cardeneta.aplicacoes.push(saved_aplicacao);
            cardeneta.save(function(err, post){
              if(err) next(err);
            });
          });

          user.cardenetas.push(cardeneta);
          user.save(function(err, post){
            res.json(post);
          });
      });
  });
});

router.post('/', function(req, res, next){

  //user.save(function(err, post){
  //  res.json(post);
  //});
});



module.exports = router;
