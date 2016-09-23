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
    if(err){
      next(err)
    }
    bcrypt.hash(user.password, salt, null, function(err, hash_password){
        if(err){
          next(err)
        }
        user.password = hash_password
        next();
    })
  })
})

/*Create method for verification for signin */
userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err){
      console.error('ComparePW: err during compare pw')
      return callback(err)
    }
    if(!isMatch){
        console.error('ComparePW: not matching password');
        return done(null, false);
      }
    console.log('ComparePW: compare successful');
    return callback(null, isMatch)
  })
}



const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;
