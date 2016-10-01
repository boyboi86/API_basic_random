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

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined', { stream: accessLogStream }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/users', users);
app.use('/entries', entries);
/*Route reserved for all static assets must be last route to run */
app.use('/', routes);

module.exports = app;
