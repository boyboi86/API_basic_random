const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Auth = require('../controllers/authenticate');
const passportService = require('../services/passport');
const passport = require('passport');
//session false will disable session based cookie esp since we are using tokens
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const config = require('../config.js');

//DB models
const User = require('../models/user');

/* GET users listing. */
router.get('/', requireAuth, function(req, res) {
  const tokenId = jwt.verify(req.headers.authorization, config.secret).sub
  User.find({}).sort({createdAt: -1}).exec()
    .then(function (users) {
    res.setHeader('user', tokenId);  
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
        console.log(`data retrieved: ${user.entries}`);
        res.json({ user });
      })
      .catch(function(err){
        res.json({err})
      })
    })

/*Follow single user if you did not place proper model earlier on you will need upsert field*/
router.post('/connect', requireAuth, function(req, res){
  const {id} = req.body
  console.log(id)
  const followId = mongoose.Types.ObjectId(id);
  const tokenId = jwt.verify(req.headers.authorization, config.secret).sub
  const followerId = mongoose.Types.ObjectId(tokenId);
  User.findOneAndUpdate({ _id: tokenId }, { $push: { 'follow': followId}}, { upsert: true, new : true})
      .exec()
      .then(function(doc){
        if(!doc){
          console.error('cannot establish relationship')
        }
        return User.findOneAndUpdate({ _id: id }, {$push: {'followers': followerId}}, { upsert: true, new : true})
      })
      .then(function(doc){
        if(!doc){
          console.error('cannot follow up relationship')
        }
        return User.find({})
      })
      .then(function(doc){
        console.info('Need connection data sent');
        res.json({doc});
      })
      .catch(function(err){
        res.json({err})
      })
    });

/*Unfollow user*/
  router.post('/disconnect', requireAuth, function(req, res){
    const {id} = req.body
    const followId = mongoose.Types.ObjectId(id);
    const tokenId = jwt.verify(req.headers.authorization, config.secret).sub
    const followerId = mongoose.Types.ObjectId(tokenId);
    User.findOneAndUpdate({ _id: tokenId }, { $pull: { 'follow': followId}}, { new: true})
        .then(function(doc){
          if(!doc){
            console.error('cannot remove relationship')
          }
          console.log(doc)
          return User.findOneAndUpdate({ _id: id }, { $pull: {'followers': followerId}}, { new: true })
        })
        .then(function(doc){
          if(!doc){
            console.error('cannot remove other relationship')
          }
          console.log(doc)
          res.json({doc})
        })
        .catch(function(err){
          console.log({err})
        })
      })




module.exports = router;
