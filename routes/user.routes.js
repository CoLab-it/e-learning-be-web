const express = require('express');
const router = express.Router();

const signupusercheck= require('../middlewares/signupcheck');

const {signupuser} = require('../controllers/userController');

router.post('/signup', signupusercheck, signupuser);

module.exports= router;
