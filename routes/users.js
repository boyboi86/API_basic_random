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
router.get('/', requireAuth, function(req, res) {
  User.find({}).sort({createdAt: -1}).exec()
    .then(function (users) {
    res.json({ users })
  })
  .catch(function(err){
    console.error({err})
  })
});

/*Sign In Route */
router.post('/signin', requireSignin, Auth.SignIn);

/*Sign Up Route */
router.post('/signup', Auth.SignUp);

/*List of post from user id*/
router.get('/:id', function(req, res){
  const {id} = req.params
  User.findOne({ _id: id })
      .populate('entries')
      .exec()
      .then(function(user){
        if(!user){
          console.log(`user ${id} does not exist or user does not have post yet`)
        }
        console.log(`data retrieved from user ${id}`);
        console.log(`data retrieved: ${user.entries}`)
        res.json({ user });
      })
      .catch(function(err){
        res.json({err})
      })
})

module.exports = router;
