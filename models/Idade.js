var mongoose = require('mongoose');
var relationship = require('mongoose-relationship');

var IdadeSchema = new mongoose.Schema({
  idade: Number,
  tipo: String,
  vacinas: [{type: mongoose.Schema.Types.ObjectId, ref: 'Vacina', childPath: 'vacinas'}]
});

IdadeSchema.plugin(relationship, {
  relationshipPathName: 'vacinas'
});

module.exports = mongoose.model('Idade', IdadeSchema);
