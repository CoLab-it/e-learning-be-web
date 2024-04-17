const express = require('express');
const router = express.Router();

const signupusercheck= require('../middlewares/signupcheck');

const user = require('../controllers/userController');

router.post('/signup', signupusercheck, user.signupuser);
router.post('/login', user.loginuser);

router.get('/getCourses', user.getCourse);

module.exports= router;
