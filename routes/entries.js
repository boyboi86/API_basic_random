const express = require('express');
const Entry = require('../models/entry');
const router = express.Router();

/* GET All Entries. */
router.get('/', function(req, res, next) {
  console.info('GET all entry');
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
  console.info('GET Single entry');
  const _id = req.params.id;
  Entry.findOne({
    _id
  }).exec()
  .then(function(docs){
    if(!docs){
      res.json({ ERR: `${_id} does not exist`})
    } else {
    res.json(docs)
    }
  })
  .catch(function(err){
    res.json({ ERR: 'cannot GET any'})
  })
})

/*POST single post */
router.post('/new', function(req, res, next) {
  console.info('POST ONE entry');
  const newEntry = new Entry();
  const { body } = req
  newEntry.title = body.title;
  newEntry.description = body.description;

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
  const { body } = req
  const _id = req.params.id
  console.info('PUT ONE entry: ', _id);
  Entry.findOneAndUpdate({ _id },
    {$set: { title: body.title, description: body.description}},
    {upsert: true}).exec()
  .then(function(docs){
    res.status(200).send(`${_id} has been updated`);
    console.log('changes made');
  })
  .catch(function(err){
    res.json({err})
  })
})

/*DELETE single POST */
router.delete('/:id', function(req, res, next){
  const _id = req.params.id
  console.log('DELETE ONE ENTRY', _id);
  Entry.findOneAndRemove({ _id }).exec()
  .then(function(docs){
    res.json({item_deleted: docs._id})
  })
  .catch(function(err){
    res.json({err})
  })
})

module.exports = router;
