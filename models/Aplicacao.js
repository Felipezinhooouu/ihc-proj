var mongoose = require('mongoose');

var AplicacaoSchema = new mongoose.Schema({
  data: Date,
  local: String,
  lote: String,
  vacina: String,
  efetivada: {type: Boolean, default: false},
  alarm: {type: Boolean, default: false},
  dose: String,
  //vacina: {type: mongoose.Schema.Types.ObjectId, ref: 'Vacina'},
  cardeneta: {type: mongoose.Schema.Types.ObjectId, ref: 'Cardeneta'}
});


module.exports = mongoose.model('Aplicacao', AplicacaoSchema);
