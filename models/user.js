const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
const { Schema } = mongoose
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
}, { timestamps: true })

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
