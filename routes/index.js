const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

/* GET home page. if there is valid jwt(user didn't log out) redirect to entries if not redirect to users route*/
router.get('/', function(req, res, next) {
  res.send('welcome!!');
});

module.exports = router;
