// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

// Публичные роуты
router.post('/register', authController.register);
router.post('/login', authController.login);

// Защищенные роуты (требуют токен)
router.get('/verify-auth', authenticateToken, authController.verifyAuth);

// Роут для получения всех пользователей (тоже защищенный)
router.get('/users', authenticateToken, authController.getAllUsers);

module.exports = router;