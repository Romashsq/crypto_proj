// backend/routes/index.js
const authRoutes = require('./authRoutes');
const courseRoutes = require('./courseRoutes');
const progressRoutes = require('./progressRoutes');
const userRoutes = require('./userRoutes'); 

module.exports = {
  authRoutes,
  courseRoutes,
  progressRoutes,
  userRoutes  
};