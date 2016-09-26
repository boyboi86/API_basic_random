const express = require('express');
const router = express.Router();

const Auth = require('../controllers/authenticate');
const passportService = require('../services/passport');
const passport = require('passport');
//session false will disable session based cookie esp since we are using tokens
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

//DB models
const User = require('../models/user');

/* GET users listing. */
router.get('/', requireAuth, function(req, res, next) {
  User.find({})
    .sort({createdAt: -1})
    .exec(function (users) {
    res.json({ users })
  });
});

/*Sign In Route */
router.post('/signin', requireSignin, Auth.SignIn);

/*Sign Up Route */
router.post('/signup', Auth.SignUp);

module.exports = router;
