const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authenticateToken = require('../middleware/auth');

router.post('/enroll-course', authenticateToken, courseController.enrollCourse);
router.get('/my-courses', authenticateToken, courseController.getMyCourses);
router.get('/check-enrollment/:courseId', authenticateToken, courseController.checkEnrollment);
router.post('/user/save-course', authenticateToken, courseController.saveCourse);
router.get('/user/courses', authenticateToken, courseController.getUserCourses);
router.get('/user/check-course/:courseId', authenticateToken, courseController.checkCourseStatus);

module.exports = router;