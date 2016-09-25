const express = require('express');
const mongoose = require('mongoose');
const Entry = require('../models/entry');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const router = express.Router();

/*Authentication privating routes */
const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

/* GET All Entries. */
router.get('/', requireAuth, function(req, res, next) {
  const user_id = jwt.verify(req.headers.authorization, config.secret).sub
  console.info('GET all entry');
    Entry.find({ _creator: user_id }).exec()
    .then(function(docs){
        res.json(docs)
    })
    .catch(function(err){
      res.json({ ERR : 'cannot GET ALL'})
    });
});

/*GET Single Entry. DID NOT PRIVATIZE*/
router.get('/:id', requireAuth, function(req, res, next){
  console.info('GET Single entry');
  const _id = req.params.id;
  Entry.findOne({_id}).exec()
  .then(function(docs){
    if(!docs){
      res.status(404).send({ ERR: `${_id} does not exist`})
    } else {
    res.json(docs)
    }
  })
  .catch(function(err){
    res.status(500).send({ ERR: 'cannot GET any'})
  })
})

/*POST single post */
router.post('/new', requireAuth, function(req, res, next) {
  const user_id = jwt.verify(req.headers.authorization, config.secret).sub
  console.info('POST ONE entry');
  const newEntry = new Entry();
  const { body } = req
  newEntry.title = body.title;
  newEntry.description = body.description;
  newEntry._creator = mongoose.Types.ObjectId(user_id);
  newEntry.save()
  .then(function(docs){
    docs? res.json({ docs }) : res.send('docs no valid')
    User.findOne({ _id: docs._creator })
    .then(function(doc){
      doc.entries.push(docs._id)
      doc.save();
    })
  })
  .catch(function(err){
    res.status(500).json({err})
  })
})

/*PATCH single POST */
router.patch('/:id', requireAuth, function(req, res, next){
  const { body } = req
  const _id = req.params.id
  console.info('PUT ONE entry: ', _id);
  Entry.findOneAndUpdate({ _id },
    {$set: { title: body.title, description: body.description}},
    {upsert: true}).exec()
  .then(function(docs){
    res.status(200).send(`item id: ${_id} has been updated`);
    console.log('changes made');
  })
  .catch(function(err){
    res.status(500).json({err})
  })
})

/*DELETE single POST */
router.delete('/:id', requireAuth, function(req, res, next){
  const _id = req.params.id
  console.info('DELETE ONE ENTRY', _id);
  Entry.findOneAndRemove({ _id }).exec()
  .then(function(docs){
    res.json({item_deleted: docs._id})
  })
  .catch(function(err){
    res.status(500).json({err})
  })
})

module.exports = router;
