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
    Entry.find({ _creator: user_id }).sort({ updatedAt: -1 }).exec()
    .then(function(docs){
      return res.json(docs)
    })
    .catch(function(err){
      res.json({ ERR : 'cannot GET ALL'})
    });
});

/*GET Single Entry. */
router.get('/:id', requireAuth, function(req, res, next){
  console.info('GET Single entry');
  const _id = req.params.id;
  Entry.findOne({_id}).exec()
  .then(function(docs){
    if(!docs){
      return res.status(404).send({ ERR: `${_id} does not exist`})
    } else {
    return res.json(docs)
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
    return new Promise(function(resolve, reject){
      User.findOne({ _id: docs._creator })
      .then(function(doc){
        if(!doc){
          return reject('There is no update on entry id for user')
        }
        doc.entries.push(docs._id)
        return resolve(doc.save().exec());
      })
      .catch(function(err){
        res.status(422).json({err})
      })
    })
  })
  .catch(function(err){
    res.status(500).json({err: 'Word count exceeded'})
  })
})

/*PATCH single POST */
router.patch('/:id', requireAuth, function(req, res, next){
  const { body } = req
  const _id = req.params.id
  const user_id = jwt.verify(req.headers.authorization, config.secret).sub
  const creator_id = mongoose.Types.ObjectId(user_id);
  console.info('PATCH ONE entry: ', _id);
  Entry.findOneAndUpdate({ _id , _creator: creator_id},
    {$set: { title: body.title, description: body.description}},
    {upsert: true, runValidators: true}).exec()
  .then(function(docs){
    if(!docs){
      return res.status(404).send(`item id: ${_id} not found`)
    }
    console.info(`item id: ${_id} has been updated`);
    return Entry.findOne({ _id })
  })
  .then(function(data){
    res.json({data})
    console.info("data sent after patch!")
  })
  .catch(function(err){
    res.status(500).json({err})
  })
})

/*DELETE single POST */
router.delete('/:id', requireAuth, function(req, res, next){
  const _id = req.params.id
  const user_id = jwt.verify(req.headers.authorization, config.secret).sub
  const creator_id = mongoose.Types.ObjectId(user_id);
  console.info('DELETE ONE ENTRY', _id);
  Entry.findOneAndRemove({ _id , _creator: creator_id }).exec()
  .then(function(docs){
    if(!docs){
      return res.status(404).send(`item id: ${_id} not found`)
    }
    console.info('deletion made');
    return Entry.find({ _creator: creator_id }).exec()
  })
  .then(function(data){
    console.info('Data after deletion sent')
    res.json({ data });
    return User.update({ _id: creator_id },
      { $pull: { 'entries': _id } }
    );
  })
  .catch(function(err){
    res.status(500).json({err})
  })
})

module.exports = router;
