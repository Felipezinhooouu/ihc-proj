var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Local = require('../models/Local');
var Vacina = require('../models/Vacina');
var User = require('../models/User');

router.post('/', function(req, res, next){
  Local.create(req.body, function(err, post){
    if(err) next(err);
    res.json(post);
  });
});

router.get('/near/:id', function(req, res, next){
  User.findById(req.params.id, function(err, user){
    if(err) next(err);
    var coordinates = user.location.coordinates;
      Local.find({
        location: {$near: {$geometry: {
                            type: "Point",
                            coordinates: [coordinates[0], coordinates[1]]
                          },
                          $maxDistance: 5000
                        }
                      }
      }).exec(function(err, locais){
        if(err) next(err);

        res.json(locais);
      });
    // res.json({latitude: coordinates[0], long: coordinates[1]});
  });
});

router.get('/', function(req, res, next){
  Local.find(function(err, all){
    if(err) return next(err);
    res.json(all);
  });
});

router.get('/:doenca', function(req, res, next){
  Vacina.find({"nome": {"$regex": req.params.doenca, "$options": "i"}}
      , function(err, post){
        res.json(post);
      });
});

module.exports = router;
