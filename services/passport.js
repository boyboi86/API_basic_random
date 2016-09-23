const passport = require('passport');
const LocalStrategy = require('passport-local');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

const config = require('../config');
const User = require('../models/user');

const localOptions = { usernameField: 'email' }
const localAuth = new LocalStrategy( localOptions, function(email, password, done){
  User.findOne({ email: email })
  .then(function(!user){
    return done(null, false);
  })
  .then(function(user){
    return user.comparePassword(password)
  })
  .then(function(!isMatch){
    return done(null, false)
  })
  .then(function(isMatch){
    done(null, isMatch)
  })
  .catch(function(err){
    return done(err)
  })
})

const JwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
  secretOrKey: config.secret
};

const JwtAuth = new JwtStrategy( JwtOptions, function(payload, done){
  User.findById({ payload.sub })
  .then(function(user){
    user ? return done(null, user) : return done(null, false)
  })
  .catch(function(err){
    return done(err)
  })
})

passport.use(localAuth);
passport.use(JwtAuth);
