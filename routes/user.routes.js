const express = require('express');
const router = express.Router();

const signupusercheck= require('../middlewares/signupcheck');
const tokenCheck = require('../middlewares/tokenCheck');
const user = require('../controllers/userController');

router.post('/signup', signupusercheck, user.signupuser);
router.post('/login', user.loginuser);

router.get('/getCourses', tokenCheck, user.getCourse);

module.exports= router;
