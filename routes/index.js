const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

/* GET home page. if there is valid jwt(user didn't log out) redirect to entries if not redirect to users route*/
router.get('/', function(req, res, next) {
  res.send('welcome!!');
  const auth = req.header.authorization
  if(!auth){
    res.redirect('/users')
  }
  const _id = jwt.verify(auth, config.secret)
  User.findOne({ _id }).exec(function(err, validUser){
    if(err || !validUser) {
      res.redirect('/users')
    }
    res.redirect('/entries')
  })
});

module.exports = router;
