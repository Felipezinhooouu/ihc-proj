var mongoose = require('mongoose');

var ShareSchema = new mongoose.Schema({
  user_origin: Object,
  user_dest: Object,
  cardeneta: Object,
  date: Date
});

module.exports = mongoose.model('Share', ShareSchema);
