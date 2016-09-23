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
        console.error('invalid user auth')
        return done(null, false)
      }
      user.comparePassword(password, function(err, isMatch){
          if(err){
              console.error('error while comparing')
              return done(err)
            }
          if(!isMatch){
             console.error('not matching password')
             return done(null, false)
           }
           console.log('local strategy resolved');
           return resolve(done(null, isMatch))
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
        console.error('token does not match')
        return done(null, false)
      }
      console.log('JWT Strategy resolve')
      return resolve(done(null, user))
    })
  })
  .catch(function(err){
    return done(err)
  })
})

passport.use(localAuth);
passport.use(JwtAuth);
