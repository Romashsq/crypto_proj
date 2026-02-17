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

app.use(cors({
  origin: 'http://localhost:5173',
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

// Все остальные запросы отдаём index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

module.exports = app;