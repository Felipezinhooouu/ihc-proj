var mongoose = require('mongoose');

var LocationScheme = new mongoose.Schema({
  address: String,
  cep: String,
  bairro: String,
  cidade: String,
  estado: String,
  coordinates: [Number],
  type: '2d'
});

module.exports = mongoose.model('Location', LocationSchema);
