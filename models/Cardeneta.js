var mongoose = require('mongoose');
var User = require('./User.js');
var relationship = require('mongoose-relationship');

var CardSchema = new mongoose.Schema({
  nome: String,
  sobrenome: String,
  sexo: String,
  dt_nasc: Date,
  updated_at: {type: Date, default: Date.now},
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', childPath: 'cardenetas'}],
  aplicacoes: [{type: mongoose.Schema.Types.ObjectId, ref:'Aplicacao', childPath: 'cardeneta'}]
});

CardSchema.plugin(relationship, {
  relationshipPathName: 'aplicacoes'
});

module.exports = mongoose.model('Cardeneta', CardSchema);
