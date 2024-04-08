const express = require('express');
const router = express.Router();

const signupusercheck= require('../middlewares/signupcheck');

const usercontroller = require('../controllers/userController');

router.post('/signup', signupusercheck, usercontroller.signupuser);
router.post('/login', usercontroller.loginuser);

module.exports= router;
