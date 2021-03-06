const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
const User = require('./user');
const { Schema } = mongoose

const config = require('../config');

const entrySchema = new Schema({
  _creator : { type: String, ref: 'User' },
  title: {
    type: String,
    maxlength: 50,
    required: true
  },
  description: {
    type: String,
    maxlength: 300,
    required: true
  }
}, { timestamps: true })

const EntryModel = mongoose.model('Entry', entrySchema);

module.exports = EntryModel;
