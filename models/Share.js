var mongoose = require('mongoose');

var ShareSchema = new mongoose.Schema({
  user_origin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  user_dest: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  cardeneta: {type: mongoose.Schema.Types.ObjectId, ref: 'Cardeneta'},
  date: Date
});

module.exports = mongoose.model('Share', ShareSchema);
