//Needed: db.grantRolesToUser("applica", [{role: "userAdmin", db: "applica"}])
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const seeder = require('./models/seeder.js');

var routes = require('./routes/index');
var users = require('./routes/users');
var cardenetas = require('./routes/cardenetas');
var aplicacoes = require('./routes/aplicacoes');
var vacinas = require('./routes/vacinas');
var share = require('./routes/share');
var doencas = require('./routes/doencas');
var locais = require('./routes/locais');

var auth = require('./routes/authenticate');
var jwt = require('jsonwebtoken');
var config = require('./config');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('secretToken', config.secretToken);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/authenticate', auth);
app.use('/api', routes);
app.use('/api/users', users);
app.use('/api/cardenetas', cardenetas);
app.use('/api/aplicacoes', aplicacoes);
app.use('/api/vacinas', vacinas);
app.use('/api/share', share);
app.use('/api/doencas', doencas);
app.use('/api/locais', locais);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//////// Mongodb ftw

var mongoose = require('mongoose')

mongoose.Promise = global.Promise;

////
//
//Configurations for openshift:
var url = 'mongodb://' + process.env.MONGODB_SERVICE_HOST;

//Openshift options!
if (process.env.OPENSHIFT_MONGODB_DB_URL){
  url = process.env.OPENSHIFT_MONGODB_DB_URL + '/' +
  process.env.OPENSHIFT_APP_NAME;
}

var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();

var options = {
  user: process.env[mongoServiceName + '_USER'],
  pass: process.env[mongoServiceName + '_PASSWORD']
}
//Check control access
console.log("CONNECTING TO: " + url);
console.log("WITH USER: " + options.user);
console.log("WITH PASS: " + options.pass);

var connect = function() {
  mongoose.connect(url, options).then(() => {
    console.log("CONNECTED SUCCESSFULLY");
    //Applying seedes
    //seeder();
    console.log("------------");
  }).catch((err) => console.error(err));
}

connect();

 var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
   ip = process.env.IP || process.env.OPENSHFT_NODEJS_IP || '0.0.0.0',
   mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
   mongoURLLabel = "";

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

//Configurations for local use:
// mongoose.connect('mongodb://localhost/applica')
//   .then(() => {
//       console.log('connected succesfully');
//       seeder();
//   }).catch((err) => {console.error(err)});

module.exports = app;
