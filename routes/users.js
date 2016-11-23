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
  User.findByIdAndUpdate(req.params.id, function(err, user){
    if(err) next(err);
    res.json(user);
  })
});

router.get('/:id/full', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    res.json(post);
  });
});

router.get('/:id', function (req, res, next){
  const select = "nome sobrenome authToken email cardenetas pendings ";
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
    callback(err, post);
  });
}

router.post('/:id/cardenetas', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    Cardeneta.create(req.body, function(err, cardeneta){
          var date = new Date();
          var months = monthDiff(new Date(cardeneta.dt_nasc), date);
          console.log(months);
          get_aplicacoes_default(months, function(err, aplicacoes_default){
            console.log(aplicacoes_default);
            cardeneta.aplicacoes = aplicacoes_default;
            cardeneta.save(function(err, saved_card){
              if(err) next(err);

              user.cardenetas.push(saved_card);
              user.save(function(err, post){
                res.json(post);
              });
            });
          });
      });
  });
});
//
// router.get('/:id/pendings', function(req, res, next){
//   User.findById(req.params.id, function(err, user){
//     if(err) next(err);
//     Share.find({_id: {$in: user.pendings}}).exec(function(err, pending){
//       res.json(post);
//       User.findById()
//     })
//   });
// });

router.post('/', function(req, res, next){

  //user.save(function(err, post){
  //  res.json(post);
  //});
});



module.exports = router;
