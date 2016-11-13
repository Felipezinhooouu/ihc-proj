var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

var LocalSchema = new mongoose.Schema({
  nome: String,
  cnpj: String,
  razao_social: String,
  location: Object,
  vacinas_disponiveis: [{type: mongoose.Schema.Types.ObjectId, ref: 'Vacina', childPath: 'vacinas_disponiveis'}]
});

LocalSchema.plugin(relationship, {
    relationshipPathName: 'vacinas_disponiveis'
});

module.exports = mongoose.model('Local', LocalSchema);
