const express = require('express');
const Entry = require('../models/entry');
const router = express.Router();

/* GET All Entries. */
router.get('/', function(req, res, next) {
  console.log('GET all entry');
    Entry.find({}).exec()
    .then(function(docs){
      res.json(docs)
    })
    .catch(function(err){
      res.json({ ERR : 'cannot GET ALL'})
    });
});

/*GET Single Entry. */
router.get('/:id', function(req, res, next){
  console.log('GET Single entry');
  Entry.findOne({
    _id: req.params.id
  }).exec()
  .then(function(docs){
    res.json(docs)
  })
  .catch(function(err){
    res.json({ ERR: 'cannot GET any'})
  })
})

/*POST single post */
router.post('/new', function(req, res, next) {
  console.log('POST ONE entry');
  const newEntry = new Entry();

  newEntry.title = req.body.title;
  newEntry.description = req.body.description;

  newEntry.save()
  .then(function(docs){
    res.json({docs})
  })
  .catch(function(err){
    res.json({err})
  })
})

/*PATCH single POST */
router.patch('/:id', function(req, res, next){
  console.log('PUT ONE entry: ', req.params.id);
  Entry.findOneAndUpdate({ _id: req.params.id },
    {$set: { title: req.body.title, description: req.body.description}},
    {upsert: true}).exec()
  .then(function(docs){
    res.json({docs})
    console.log('changes made');
  })
  .catch(function(err){
    res.json({err})
  })
})

/*DELETE single POST */
router.delete('/:id', function(req, res, next){
  console.log('DELETE ONE ENTRY', req.params.id);
  Entry.findOneAndRemove({ _id: req.params.id}).exec()
  .then(function(docs){
    res.json({item_deleted: docs._id})
  })
  .catch(function(err){
    res.json({err})
  })
})

module.exports = router;
