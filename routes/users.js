var express = require('express');
var router = express.Router();
const controller = require('../controller/userController')
const registerValidation = require('../middleware/validation')
const authenticateUser = require('../middleware/authenticateUser')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', registerValidation, controller.registerUser);
router.post('/login', controller.logIn); // Get your Authtoken after logging-in...
router.get('/profile', authenticateUser ,controller.getProfile); //Give Authtoken under Authorization header ('Bearer Authtoken')  to access this route

module.exports = router;
