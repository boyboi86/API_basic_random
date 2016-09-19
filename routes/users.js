const express = require('express');
const router = express.Router();

const Auth = require('../controllers/authenticate');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*Sign In Route */
router.post('/signin', Auth.SignIn);

/*Sign Up Route */
router.post('/signup', Auth.SignUp);

module.exports = router;
