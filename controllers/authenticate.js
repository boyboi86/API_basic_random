const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

/* JWT Sign Try to use sync method, async method has alot of fucking problem*/
const UserToken = function(user){
  const timestamp = Date.now();
  return jwt.sign({ sub: user.id, iat: timestamp }, config.secret)
}

/*Module for Sign in */
module.exports.SignIn = (req, res, next) => {
  res.send({ token: UserToken(req.body)})
}

/*Module for Sign up */
module.exports.SignUp = (req, res, next) => {
  const { Email } = req.body
  const { password } = req.body

  if(!Email || !password){
    res.status(422).send({ err: 'Email and password required' })
  }
  User.findOne({ email: Email })
    .then(function(email){
      if(email){
        return res.status(422).send({ err: 'Email has been used'})
      }
        const NewUser = new User({
          email: Email,
          password
        })
    NewUser.save()
      .then(function(user){
        return res.json({ token: UserToken(user) })
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
