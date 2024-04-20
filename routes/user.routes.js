const express = require('express');
const router = express.Router();

const signupusercheck= require('../middlewares/signupcheck');
const tokenCheck = require('../middlewares/tokenCheck');
const user = require('../controllers/userController');

router.post('/signup', signupusercheck, user.signupuser);
router.post('/login', user.loginuser);

router.patch('/updateProfile', tokenCheck, user.saveUserProfile);

router.get('/getCourses', tokenCheck, user.getCourse);
router.get('/getSingleCourse/:courseId', tokenCheck, user.getCourseDetails);
router.get('/getUserProfile', tokenCheck, user.getUserProfile);

module.exports= router;
