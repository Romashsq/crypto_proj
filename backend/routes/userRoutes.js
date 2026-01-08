const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'crypto-learning-secret-2024';

// ============ РЕГИСТРАЦИЯ ============
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Проверяем существующего пользователя
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Пользователь с таким email или username уже существует'
      });
    }

    // Хешируем пароль
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Создаем пользователя
    const user = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      joinedDate: new Date(),
      xp: 0,
      level: 1,
      streak: 0
    });

    await user.save();

    // Создаем JWT токен
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Убираем пароль из ответа
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      token,
      user: userResponse,
      message: 'Регистрация успешна'
    });

  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера при регистрации'
    });
  }
});

// ============ ЛОГИН ============
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ищем пользователя
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Неверный email или пароль'
      });
    }

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Неверный email или пароль'
      });
    }

    // Обновляем последний вход
    user.lastLoginDate = new Date();
    await user.save();

    // Создаем JWT токен
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Убираем пароль из ответа
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      token,
      user: userResponse,
      message: 'Вход выполнен успешно'
    });

  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера при входе'
    });
  }
});

// ============ ПОЛУЧИТЬ ПРОФИЛЬ ============
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Пользователь не найден'
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Ошибка получения профиля:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
});

// ============ СОХРАНИТЬ КУРС ============
router.post('/save-course', auth, async (req, res) => {
  try {
    const { courseId, courseTitle, courseIcon, lessons } = req.body;
    
    if (!courseId) {
      return res.status(400).json({
        success: false,
        error: 'courseId обязателен'
      });
    }

    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Пользователь не найден'
      });
    }

    // Зачисляем на курс
    user.enrollInCourse({
      courseId,
      courseTitle: courseTitle || courseId,
      courseIcon: courseIcon || '📚',
      lessons: lessons || []
    });

    await user.save();

    // Получаем обновленный прогресс
    const overallStats = user.getOverallProgressStats();

    res.json({
      success: true,
      message: 'Курс успешно сохранен',
      course: user.coursesProgress.find(c => c.courseId === courseId),
      overallProgress: overallStats
    });

  } catch (error) {
    console.error('Ошибка сохранения курса:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Ошибка сохранения курса'
    });
  }
});

// ============ ЗАВЕРШИТЬ УРОК ============
router.post('/complete-lesson', auth, async (req, res) => {
  try {
    const { courseId, lessonId, timeSpent = 0, score = 100 } = req.body;
    
    if (!courseId || !lessonId) {
      return res.status(400).json({
        success: false,
        error: 'courseId и lessonId обязательны'
      });
    }

    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Пользователь не найден'
      });
    }

    // Завершаем урок
    const result = user.completeLesson(courseId, lessonId, {
      timeSpent,
      score
    });

    await user.save();

    // Получаем обновленный прогресс
    const overallStats = user.getOverallProgressStats();

    res.json({
      success: true,
      message: 'Урок успешно завершен',
      xpEarned: 100,
      ...result,
      overallProgress: overallStats
    });

  } catch (error) {
    console.error('Ошибка завершения урока:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Ошибка завершения урока'
    });
  }
});

// ============ ПОЛУЧИТЬ ПРОГРЕСС КУРСА ============
router.get('/course/:courseId/progress', auth, async (req, res) => {
  try {
    const { courseId } = req.params;

    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Пользователь не найден'
      });
    }

    const courseProgress = user.getCourseProgress(courseId);

    if (!courseProgress) {
      return res.json({
        success: true,
        isEnrolled: false,
        progress: null
      });
    }

    res.json({
      success: true,
      isEnrolled: true,
      progress: courseProgress
    });

  } catch (error) {
    console.error('Ошибка получения прогресса:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка получения прогресса'
    });
  }
});

// ============ ПОЛУЧИТЬ ОБЩИЙ ПРОГРЕСС ============
router.get('/overall-progress', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Пользователь не найден'
      });
    }

    const overallStats = user.getOverallProgressStats();

    res.json({
      success: true,
      ...overallStats
    });

  } catch (error) {
    console.error('Ошибка получения общего прогресса:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка получения общего прогресса'
    });
  }
});

// ============ ПОЛУЧИТЬ ВСЕ КУРСЫ ПОЛЬЗОВАТЕЛЯ ============
router.get('/courses', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Пользователь не найден'
      });
    }

    const courses = user.coursesProgress.map(course => ({
      courseId: course.courseId,
      courseTitle: course.courseTitle,
      courseIcon: course.courseIcon,
      completedLessons: course.completedLessons,
      totalLessons: course.totalLessons,
      percentage: course.percentage,
      lastAccessed: course.lastAccessed,
      enrolledAt: course.enrolledAt,
      isCompleted: course.percentage === 100
    }));

    res.json({
      success: true,
      courses,
      enrolledCourses: courses.length,
      completedCourses: courses.filter(c => c.isCompleted).length
    });

  } catch (error) {
    console.error('Ошибка получения курсов:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка получения курсов'
    });
  }
});

// ============ ПРОВЕРИТЬ СТАТУС КУРСА ============
router.get('/check-course/:courseId', auth, async (req, res) => {
  try {
    const { courseId } = req.params;

    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Пользователь не найден'
      });
    }

    const isEnrolled = user.isCourseSaved(courseId);
    let progress = null;

    if (isEnrolled) {
      progress = user.getCourseProgress(courseId);
    }

    res.json({
      success: true,
      isEnrolled,
      progress
    });

  } catch (error) {
    console.error('Ошибка проверки курса:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка проверки курса'
    });
  }
});

// ============ ОБНОВИТЬ ПРОФИЛЬ ============
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = ['fullName', 'bio', 'avatar', 'settings'];
    
    // Фильтруем только разрешенные поля
    const filteredUpdates = {};
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: filteredUpdates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Пользователь не найден'
      });
    }

    res.json({
      success: true,
      user,
      message: 'Профиль успешно обновлен'
    });

  } catch (error) {
    console.error('Ошибка обновления профиля:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка обновления профиля'
    });
  }
});

module.exports = router;