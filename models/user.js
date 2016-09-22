const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
const { Schema } = mongoose;
const Q = require('q');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
}, { timestamps: true })

/* Async salt/hash for each signup before saving user details */
userSchema.pre('save', function(next){
  let user = this;
  bcrypt.genSalt(10,function(err, salt){
    if(err){ next(err) }
    bcrypt.hash(user.password, salt, null, function(err, hash_password){
      if(err){ next(err) }
        user.password = hash_password
        next();
    })
  })
})

const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;
