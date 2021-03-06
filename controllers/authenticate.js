const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

/* JWT Sign Try to use sync method*/
const UserToken = function(user){
  const timestamp = Date.now();
  return jwt.sign({ sub: user.id, iat: timestamp }, config.secret)
}

/*Module for Sign in */
module.exports.SignIn = (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then(function(data){
    const _Token = UserToken(data)
    res.setHeader('authorization',_Token)
    return res.send({ token: _Token})
    next()
  })
  .catch(function(err){
    console.error({err})
  })
}

/*Module for Sign up */
module.exports.SignUp = (req, res, next) => {
  const  _email  = req.body.email
  const { password } = req.body

  if(!_email || !password){
    res.status(422).send({ err: 'Email and password required' })
  }
  User.findOne({ email: _email })
    .then(function(email){
      if(email){
        return res.status(422).send({ err: 'Email has been used'})
      }
        const NewUser = new User({
          email: _email,
          password
        })
    NewUser.save()
      .then(function(user){
        console.log(user)
        const _Token = UserToken(user)
        res.setHeader('authorization',_Token)
        return res.send({ token: _Token })
      })
      .catch(function(err){
        console.log(err)
        return next(err);
      })
  })
  .catch(function(err){
    console.error('DB did not save new user')
  })
}
