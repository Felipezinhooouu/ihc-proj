var mongoose = require('mongoose');

var CounterSchema = new mongoose. Schema({
  _id: {type: String, required: true},
  seq: {type: Number, default: 0}
});

var counter = mongoose.model('counter', CounterSchema);

var AplicacaoSchema = new mongoose.Schema({
  data: Date,
  sort: Number,
  local: String,
  lote: {type: String, default: null},
  vacina: Object,
  meses_prox_dose: {type: Number, default: 0},
  idade_minima_meses: {type: Number, default: 0},
  efetivada: {type: Boolean, default: false},
  alarm: {type: Boolean, default: false},
  dose: Number,
  //vacina: {type: mongoose.Schema.Types.ObjectId, ref: 'Vacina'},
  cardeneta: {type: mongoose.Schema.Types.ObjectId, ref: 'Cardeneta'}
});


AplicacaoSchema.pre('save', function(next){
  var doc = this;
  counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: {seq: 1}}, {new: true, upsert:true}).then(function(count){
    console.log("...count: " + JSON.stringify(count));
    doc.sort = count.seq;
    next();
  }).catch(function(error){
    throw error;
  });
});
module.exports = mongoose.model('Aplicacao', AplicacaoSchema);
