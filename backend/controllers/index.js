// backend/controllers/index.js
const authController = require('./authController');
const courseController = require('./courseController');
const progressController = require('./progressController');

module.exports = {
  authController,
  courseController,
  progressController
};