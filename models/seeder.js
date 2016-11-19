var Idade = require('./Idade.js');
var Doenca = require('./Doenca.js');
var Aplicacao = require('./Aplicacao.js');
var Vacina = require('./Vacina.js');
var seeder = require('mongoose-seeder');
var data = require('./seed.json');
var aplicacoes_data = require('./seeder_aplicacoes.json');
var mongoose = require('mongoose');

var seed = function(){
  console.log('-------------\nApplying seeds...');

  Doenca.remove({}, function(){
    console.log("database Doenças deletado com sucesso!");
  });

  Aplicacao.remove({}, function(){
    console.log("database Aplicacoes deletado com sucesso!");
  });

  seeder.seed(aplicacoes_data).then(function(dbData){
    console.log("aplicacoes seed com sucesso!");
  }).catch(function(err){
    console.log("erro ao inserir aplicacoes: " + err);
  });

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
