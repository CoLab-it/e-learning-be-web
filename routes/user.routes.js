const express = require('express');
const router = express.Router();

const signupusercheck= require('../middlewares/signupcheck');

const {signupuser} = require('../controllers/userController');
const {loginuser} = require('../controllers/userController');

router.post('/signup', signupusercheck, signupuser);
router.post('/login', loginuser);

module.exports= router;
