const mongoose = require('mongoose');
const Schema = mongoose.Schema

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
  },
  dateCreated: {
    type: Date,
    default: new Date().toISOString()
  }
})

const EntryModel = mongoose.model('Entry', entrySchema);

module.exports = EntryModel;
