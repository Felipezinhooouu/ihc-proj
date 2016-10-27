var Idade = require('./Idade.js');
var Doenca = require('./Doenca.js');
var Vacina = require('./Vacina.js');
var seeder = require('mongoose-seeder');
var data = require('./seed.json');
var mongoose = require('mongoose');

var seed = function(){
  console.log('-------------\nApplying seeds...');

  Doenca.remove({}, function(){
    console.log("deleted");
  })

  seeder.seed(data).then(function(dbData){
    console.log("seeded com sucesso!\n------------");

    //** Find Vacinas by idade exemplo:
    // Idade.find({idade: 0}, function(err, idade){
    //   Vacina.find({idades_dose: { $elemMatch: {$in: idade }}}, function(err, vacinas){
    //     console.log(vacinas);
    //   })
    // });

  }).catch(function(err){
    console.log("erro ao inserir: " + err);
  });

}

module.exports = seed;
