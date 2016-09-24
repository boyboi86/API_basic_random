const passport = require('passport');
const LocalStrategy = require('passport-local');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

const config = require('../config');
const User = require('../models/user');

const localOptions = { usernameField: 'email' }
const localAuth = new LocalStrategy( localOptions, function(email, password, done){
  User.findOne({ email: email })
  .then(function(user){
    return new Promise(function(resolve, reject){
      if(!user){
        console.error('Passport: invalid user auth')
        reject(done(null, false))
      }
      user.comparePassword(password, function(err, isMatch){
          if(err){
              console.error('Passport: error while comparing')
              return reject(done(err))
            }
          if(!isMatch){
             console.error('Passport: not matching password')
             return reject(done(null, false))
           }

           resolve(done(null, isMatch))
           console.log('local strategy resolved');
        })
      })
    })
  .catch(function(err){
    return done(err)
  })
})

const JwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const JwtAuth = new JwtStrategy( JwtOptions, function(payload, done){
  User.findById( payload.sub )
  .then(function(user){
    return new Promise(function(resolve, reject){
      if(!user){
        console.error('Passport: token does not match')
        return reject(done(null, false))
      }
      resolve(done(null, user))
      console.log('JWT Strategy resolve')
    })
  })
  .catch(function(err){
    return done(err)
  })
})

passport.use(localAuth);
passport.use(JwtAuth);
