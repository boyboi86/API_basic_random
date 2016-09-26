const express = require('express');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/index');
const users = require('./routes/users');
const entries = require('./routes/entries');

const config = require('./config');

const app = express();
const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
const db_Option = { db: {
    safe: true
  }
};
const db_URI = process.env.DB_URI || config.DB_URI || config.mLab

//mongoose setup
mongoose.connect(db_URI, db_Option, function(err){
  if(err){
    console.log('db connection error: ', err)
  }
  console.log('db connection established')
})

app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined', { stream: accessLogStream }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', routes);
app.use('/users', users);
app.use('/entries', entries);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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


module.exports = app;
