const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
const { Schema } = mongoose

const entrySchema = new Schema({
  title: {
    type: String,
    maxlength: 20,
    required: true,
    unique: true
  },
  description: {
    type: String,
    maxlength: 160,
    required: true
  }
}, { timestamps: true })

const EntryModel = mongoose.model('Entry', entrySchema);

module.exports = EntryModel;
