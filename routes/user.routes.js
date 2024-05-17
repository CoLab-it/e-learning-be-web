const express = require('express');
const router = express.Router();

const signupusercheck = require('../middlewares/signupcheck');
const tokenCheck = require('../middlewares/tokenCheck');
const user = require('../controllers/userController');
const upload = require('../middlewares/multer');

router.post('/signup', signupusercheck, user.signupuser);
router.post('/login', user.loginuser);

router.patch(
    '/updateProfile',
    upload.single('imageUrl'),
    tokenCheck,
    user.saveUserProfile,
);
router.patch(
    '/addOrRemoveFromWishlist',
    tokenCheck,
    user.addOrRemoveFromWishlist,
);

router.get('/getCourses', tokenCheck, user.getCourse);
router.get('/getSingleCourse/:courseId', tokenCheck, user.getCourseDetails);
router.get('/getUserProfile', tokenCheck, user.getUserProfile);
router.get('/getLikedCourses', tokenCheck, user.getLikedCourses);

module.exports = router;
