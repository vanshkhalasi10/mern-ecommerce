const expess = require('express');
const { register } = require('../controllers/authController');
const router = expess.Router();


router.post('/register',register);


module.exports = router