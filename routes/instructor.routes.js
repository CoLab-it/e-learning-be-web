const express = require('express');
const router = express.Router();
const instructor = require('../controllers/instructorController');

router.post('/addCourse', instructor.addCourse);

module.exports=router;
