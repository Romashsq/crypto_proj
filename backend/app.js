// backend/app.js

const express = require('express');
const cors = require('cors');
const path = require('path');

// ОДИН ИМПОРТ - ВСЕ РОУТЫ
const routes = require('./routes');
const { authController, courseController, progressController } = require('./controllers');
const { authenticateToken } = require('./middleware');
const helpers = require('./utils');

const app = express();

// Хранилища для памяти
const users = [];
const userCourses = {};
const userProgress = {};

// Передаем хранилища в контроллеры памяти
authController.setStorage({ users, userCourses, userProgress });
courseController.setStorage({ users, userCourses, userProgress });
progressController.setStorage({ users, userCourses, userProgress });

// Настройки CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://crypto-proj.onrender.com'],
  credentials: true
}));

app.use(express.json());

// Подключаем ВСЕ роуты
app.use('/api', routes.authRoutes);      // регистрация/логин (память)
app.use('/api', routes.courseRoutes);    // курсы (память)
app.use('/api', routes.progressRoutes);  // прогресс (память)
app.use('/api', routes.userRoutes);      // МонгоДБ версия (пока не используется)

// Раздача статических файлов (фронтенда)
app.use(express.static(path.join(__dirname, '../dist')));

// Все остальные запросы отдаём index.html - ИСПРАВЛЕНО!
app.get('*', (req, res) => {
  // Если запрос начинается с /api, но не найден - 404
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ 
      success: false, 
      error: 'API endpoint not found' 
    });
  }
  // Иначе отдаём фронтенд
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

module.exports = app;