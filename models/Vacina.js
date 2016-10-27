var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

var VacinaSchema = new mongoose.Schema({
  nome: String,
  idades_dose: [{type: mongoose.Schema.Types.ObjectId, ref:'Idade', childPath: 'idades_dose'}],
  doencas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Doenca', childPath: 'doencas'}],
  aplicacoes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Aplicacao', childPath: 'aplicacoes'}],
  locais: [{type: mongoose.Schema.Types.ObjectId, ref: 'Local', childPath: 'locais'}]
});

VacinaSchema.plugin(relationship, {
  relationshipPathName: 'aplicacoes'
});

VacinaSchema.plugin(relationship, {
  relationshipPathName: 'doencas'
});

module.exports = mongoose.model('Vacina', VacinaSchema);
