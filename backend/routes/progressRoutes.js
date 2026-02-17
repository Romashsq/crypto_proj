const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authenticateToken = require('../middleware/auth');

router.post('/user/complete-lesson', authenticateToken, progressController.completeLesson);
router.get('/user/overall-progress', authenticateToken, progressController.getOverallProgress);
router.get('/user/course/:courseId/progress', authenticateToken, progressController.getCourseProgress);
router.get('/user/lesson-status/:courseId/:lessonId', authenticateToken, progressController.getLessonStatus);

module.exports = router;