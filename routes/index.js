const express = require('express');
const router = express.Router();

/* GET home page public static files*/
router.get('/', function(req, res, next) {
  res.json({message: 'welcome!!'});

});

// router.get('/*', function(req, res){
//   res.sendFile(path.resolve(__dirname, 'index.html'))
// });

module.exports = router;
