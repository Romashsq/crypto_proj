// server.js - ПОЛНАЯ РАБОЧАЯ ВЕРСИЯ С СОХРАНЕНИЕМ КУРСОВ И OVERALL PROGRESS
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'crypto-learning-platform-secret-key-2024';

// Хранилище данных в памяти
let users = [];
let userCourses = {}; // { userId: [courseData] }
let userProgress = {}; // { userId: { overallStats, lessons } }

// Настройки CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// ============ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ============

// Инициализация прогресса пользователя
const initializeUserProgress = (userId) => {
  if (!userProgress[userId]) {
    userProgress[userId] = {
      overallStats: {
        totalLessonsCompleted: 0,
        totalLessons: 0,
        completionRate: 0,
        enrolledCourses: 0,
        completedCourses: 0,
        totalTimeSpent: 0,
        averageScore: 0,
        averageTimePerLesson: 0,
        lastActivity: new Date().toISOString(),
        currentStreak: 0,
        longestStreak: 0,
        daysActive: 1
      },
      lessons: {} // { courseId_lessonId: { completed, timeSpent, score } }
    };
  }
  return userProgress[userId];
};

// Инициализация курсов пользователя
const initializeUserCourses = (userId) => {
  if (!userCourses[userId]) {
    userCourses[userId] = [];
  }
  return userCourses[userId];
};

// Обновление общего прогресса
const updateOverallProgress = (userId) => {
  const user = users.find(u => u.id === userId);
  if (!user) return;

  const courses = userCourses[userId] || [];
  const progress = userProgress[userId];
  
  if (!progress) return;
  
  let totalCompletedLessons = 0;
  let totalLessons = 0;
  let completedCourses = 0;
  let totalTimeSpent = 0;
  let totalScore = 0;
  let scoredLessons = 0;
  
  // Проходим по всем курсам пользователя
  courses.forEach(course => {
    const courseId = course.courseId;
    const courseTotalLessons = course.totalLessons || 0;
    let completedInCourse = 0;
    let timeSpentInCourse = 0;
    let scoreInCourse = 0;
    let scoredInCourseInCourse = 0;
    
    // Проверяем прогресс по урокам этого курса
    for (let i = 1; i <= courseTotalLessons; i++) {
      const lessonKey = `${courseId}_${i}`;
      const lessonProgress = progress.lessons[lessonKey];
      
      if (lessonProgress && lessonProgress.completed) {
        completedInCourse++;
        totalCompletedLessons++;
        
        if (lessonProgress.timeSpent) {
          timeSpentInCourse += lessonProgress.timeSpent;
          totalTimeSpent += lessonProgress.timeSpent;
        }
        
        if (lessonProgress.score) {
          scoreInCourse += lessonProgress.score;
          totalScore += lessonProgress.score;
          scoredInCourseInCourse++;
          scoredLessons++;
        }
      }
    }
    
    // Обновляем прогресс курса
    course.completedLessons = completedInCourse;
    course.percentage = courseTotalLessons > 0 ? 
      Math.round((completedInCourse / courseTotalLessons) * 100) : 0;
    
    totalLessons += courseTotalLessons;
    
    if (course.percentage === 100) {
      completedCourses++;
    }
  });
  
  // Обновляем общую статистику
  progress.overallStats = {
    totalLessonsCompleted: totalCompletedLessons,
    totalLessons: totalLessons,
    completionRate: totalLessons > 0 ? Math.round((totalCompletedLessons / totalLessons) * 100) : 0,
    enrolledCourses: courses.length,
    completedCourses: completedCourses,
    totalTimeSpent: totalTimeSpent,
    averageScore: scoredLessons > 0 ? Math.round(totalScore / scoredLessons) : 0,
    averageTimePerLesson: totalCompletedLessons > 0 ? Math.round(totalTimeSpent / totalCompletedLessons) : 0,
    lastActivity: new Date().toISOString(),
    currentStreak: progress.overallStats.currentStreak || 0,
    longestStreak: progress.overallStats.longestStreak || 0,
    daysActive: progress.overallStats.daysActive || 1
  };
  
  return progress.overallStats;
};

// Получить прогресс курса
const getCourseProgress = (userId, courseId) => {
  const courses = userCourses[userId] || [];
  const progress = userProgress[userId];
  
  const course = courses.find(c => c.courseId === courseId);
  if (!course) return null;
  
  const courseTotalLessons = course.totalLessons || 0;
  let completedLessons = 0;
  
  for (let i = 1; i <= courseTotalLessons; i++) {
    const lessonKey = `${courseId}_${i}`;
    if (progress?.lessons[lessonKey]?.completed) {
      completedLessons++;
    }
  }
  
  const percentage = courseTotalLessons > 0 ? 
    Math.round((completedLessons / courseTotalLessons) * 100) : 0;
  
  return {
    courseId,
    courseTitle: course.courseTitle || courseId,
    courseIcon: course.courseIcon || '📚',
    completedLessons,
    totalLessons: courseTotalLessons,
    percentage,
    lastAccessed: course.lastAccessed || new Date().toISOString(),
    enrolledAt: course.enrolledAt || new Date().toISOString()
  };
};

// Аутентификация токена
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Токен доступа требуется' 
    });
  }
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('❌ Ошибка верификации токена:', err.message);
      return res.status(403).json({ 
        success: false, 
        error: 'Неверный или просроченный токен' 
      });
    }
    
    const userExists = users.find(u => u.id === decoded.id);
    if (!userExists) {
      return res.status(404).json({ 
        success: false, 
        error: 'Пользователь не найден' 
      });
    }
    
    req.user = decoded;
    next();
  });
};

// ============ API МАРШРУТЫ ============

// Регистрация
app.post('/api/register', (req, res) => {
  try {
    console.log('📝 Запрос регистрации:', req.body);
    
    const { username, password, fullName, email } = req.body;
    
    if (!username || !password || !fullName || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Все поля обязательны' 
      });
    }
    
    const existingUser = users.find(u => 
      u.username === username || u.email === email
    );
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'Пользователь с таким именем или email уже существует' 
      });
    }
    
    const newUser = {
      id: Date.now().toString(),
      username: username.trim(),
      password: password,
      fullName: fullName.trim(),
      email: email.trim(),
      xp: 0,
      level: 1,
      streak: 0,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    users.push(newUser);
    console.log('✅ Пользователь создан:', newUser.id, newUser.username);
    
    // Инициализируем прогресс
    initializeUserProgress(newUser.id);
    initializeUserCourses(newUser.id);
    
    // Создаем токен
    const token = jwt.sign(
      { 
        id: newUser.id, 
        username: newUser.username,
        email: newUser.email
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.json({
      success: true,
      token: token,
      user: userWithoutPassword,
      message: 'Регистрация успешна'
    });
    
  } catch (error) {
    console.error('❌ Ошибка регистрации:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Внутренняя ошибка сервера' 
    });
  }
});

// Логин
app.post('/api/login', (req, res) => {
  try {
    console.log('🔑 Запрос логина:', req.body);
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email и пароль обязательны' 
      });
    }
    
    const user = users.find(u => 
      (u.email === email || u.username === email) && 
      u.password === password
    );
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Неверный email или пароль' 
      });
    }
    
    console.log('✅ Пользователь найден:', user.id);
    
    user.lastLogin = new Date().toISOString();
    
    // Инициализируем прогресс если его нет
    initializeUserProgress(user.id);
    initializeUserCourses(user.id);
    
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username,
        email: user.email
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );
    
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      token: token,
      user: userWithoutPassword,
      message: 'Вход выполнен успешно'
    });
    
  } catch (error) {
    console.error('❌ Ошибка логина:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Внутренняя ошибка сервера' 
    });
  }
});

// Проверка авторизации
app.get('/api/verify-auth', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ 
      success: false, 
      error: 'Пользователь не найден' 
    });
  }
  
  const { password, ...userWithoutPassword } = user;
  
  res.json({
    success: true,
    user: userWithoutPassword,
    message: 'Токен валиден'
  });
});

// ============ КУРСЫ И ПРОГРЕСС ============

// Сохранить курс (добавить к пользователю)
app.post('/api/user/save-course', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      courseId, 
      courseTitle, 
      courseIcon, 
      totalLessons, 
      lessons = [] 
    } = req.body;
    
    console.log('💾 Сохранение курса:', { userId, courseId, courseTitle });
    
    if (!courseId) {
      return res.status(400).json({ 
        success: false, 
        error: 'courseId обязателен' 
      });
    }
    
    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'Пользователь не найден' 
      });
    }
    
    const courses = initializeUserCourses(userId);
    const progress = initializeUserProgress(userId);
    
    // Проверяем, есть ли уже такой курс
    const existingCourseIndex = courses.findIndex(c => c.courseId === courseId);
    
    if (existingCourseIndex !== -1) {
      // Обновляем существующий курс
      courses[existingCourseIndex] = {
        ...courses[existingCourseIndex],
        courseTitle: courseTitle || courses[existingCourseIndex].courseTitle,
        courseIcon: courseIcon || courses[existingCourseIndex].courseIcon,
        totalLessons: totalLessons || courses[existingCourseIndex].totalLessons,
        lastAccessed: new Date().toISOString()
      };
      
      console.log('ℹ️ Курс обновлен:', courseId);
      
    } else {
      // Добавляем новый курс
      const newCourse = {
        courseId,
        courseTitle: courseTitle || courseId,
        courseIcon: courseIcon || '📚',
        totalLessons: totalLessons || 1,
        enrolledAt: new Date().toISOString(),
        lastAccessed: new Date().toISOString(),
        completedLessons: 0,
        percentage: 0
      };
      
      courses.push(newCourse);
      console.log('✅ Курс добавлен:', courseId);
    }
    
    // Обновляем общий прогресс
    const overallStats = updateOverallProgress(userId);
    
    res.json({
      success: true,
      message: 'Курс успешно сохранен',
      course: courses.find(c => c.courseId === courseId),
      overallProgress: overallStats
    });
    
  } catch (error) {
    console.error('❌ Ошибка сохранения курса:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Внутренняя ошибка сервера' 
    });
  }
});

// Получить все курсы пользователя
app.get('/api/user/courses', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    
    console.log('📚 Получение курсов для:', userId);
    
    const courses = userCourses[userId] || [];
    
    // Обновляем прогресс для каждого курса
    const coursesWithProgress = courses.map(course => {
      return {
        ...course,
        ...getCourseProgress(userId, course.courseId)
      };
    });
    
    const overallStats = userProgress[userId]?.overallStats || {
      completionRate: 0,
      enrolledCourses: 0,
      completedCourses: 0
    };
    
    res.json({
      success: true,
      courses: coursesWithProgress,
      overallProgress: overallStats.completionRate || 0,
      enrolledCourses: courses.length,
      completedCourses: courses.filter(c => c.percentage === 100).length
    });
    
  } catch (error) {
    console.error('❌ Ошибка получения курсов:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Внутренняя ошибка сервера' 
    });
  }
});

// Проверить статус курса (сохранен ли)
app.get('/api/user/check-course/:courseId', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    
    console.log('🔍 Проверка статуса курса:', { userId, courseId });
    
    const courses = userCourses[userId] || [];
    const isSaved = courses.some(c => c.courseId === courseId);
    
    let courseProgress = null;
    if (isSaved) {
      courseProgress = getCourseProgress(userId, courseId);
    }
    
    res.json({
      success: true,
      isSaved,
      progress: courseProgress
    });
    
  } catch (error) {
    console.error('❌ Ошибка проверки курса:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Внутренняя ошибка сервера' 
    });
  }
});

// Завершить урок
app.post('/api/user/complete-lesson', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, lessonId, timeSpent = 0, score = 100 } = req.body;
    
    console.log('✅ Завершение урока:', { userId, courseId, lessonId });
    
    if (!courseId || !lessonId) {
      return res.status(400).json({ 
        success: false, 
        error: 'courseId и lessonId обязательны' 
      });
    }
    
    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'Пользователь не найден' 
      });
    }
    
    // Проверяем, есть ли курс у пользователя
    const courses = userCourses[userId] || [];
    const course = courses.find(c => c.courseId === courseId);
    
    if (!course) {
      return res.status(400).json({ 
        success: false, 
        error: 'Курс не найден. Сначала добавьте курс.' 
      });
    }
    
    const progress = initializeUserProgress(userId);
    
    // Ключ для хранения прогресса урока
    const lessonKey = `${courseId}_${lessonId}`;
    
    // Проверяем, был ли урок уже завершен
    const wasCompleted = progress.lessons[lessonKey]?.completed || false;
    
    // Обновляем прогресс урока
    progress.lessons[lessonKey] = {
      completed: true,
      completedAt: new Date().toISOString(),
      timeSpent,
      score,
      xpEarned: 100
    };
    
    // Начисляем XP только если урок не был завершен ранее
    let xpEarned = 0;
    if (!wasCompleted) {
      xpEarned = 100 + Math.floor(timeSpent / 60) * 10;
      user.xp = (user.xp || 0) + xpEarned;
      user.level = Math.floor(user.xp / 1000) + 1;
    }
    
    // Обновляем курс
    course.lastAccessed = new Date().toISOString();
    
    // Обновляем общий прогресс
    const overallStats = updateOverallProgress(userId);
    const courseProgress = getCourseProgress(userId, courseId);
    
    console.log('✅ Урок завершен:', { 
      xpEarned, 
      newXp: user.xp, 
      newLevel: user.level,
      courseProgress: courseProgress.percentage 
    });
    
    res.json({
      success: true,
      message: 'Урок успешно завершен',
      xpEarned,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        xp: user.xp,
        level: user.level
      },
      courseProgress,
      overallProgress: overallStats
    });
    
  } catch (error) {
    console.error('❌ Ошибка завершения урока:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Внутренняя ошибка сервера' 
    });
  }
});

// Получить общий прогресс (для OverallProgress.jsx)
app.get('/api/user/overall-progress', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    
    console.log('📊 Получение общего прогресса для:', userId);
    
    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'Пользователь не найден' 
      });
    }
    
    const courses = userCourses[userId] || [];
    const progress = userProgress[userId];
    
    if (!progress) {
      return res.json({
        success: true,
        totalProgress: 0,
        completedCourses: 0,
        enrolledCourses: 0,
        completedLessons: 0,
        totalLessons: 0,
        courses: [],
        xp: user.xp || 0,
        level: user.level || 1,
        streak: user.streak || 0,
        overallStats: {
          completionRate: 0,
          totalLessonsCompleted: 0,
          enrolledCourses: 0,
          completedCourses: 0
        }
      });
    }
    
    // Получаем прогресс для каждого курса
    const coursesWithProgress = courses.map(course => {
      return getCourseProgress(userId, course.courseId);
    }).filter(Boolean);
    
    // Считаем общую статистику
    let totalCompletedLessons = 0;
    let totalLessons = 0;
    let completedCourses = 0;
    
    coursesWithProgress.forEach(course => {
      totalCompletedLessons += course.completedLessons;
      totalLessons += course.totalLessons;
      if (course.percentage === 100) {
        completedCourses++;
      }
    });
    
    const totalProgress = totalLessons > 0 ? 
      Math.round((totalCompletedLessons / totalLessons) * 100) : 0;
    
    res.json({
      success: true,
      totalProgress,
      completedCourses,
      enrolledCourses: courses.length,
      completedLessons: totalCompletedLessons,
      totalLessons,
      courses: coursesWithProgress,
      xp: user.xp || 0,
      level: user.level || 1,
      streak: user.streak || 0,
      overallStats: progress.overallStats || {
        completionRate: 0,
        totalLessonsCompleted: 0,
        enrolledCourses: 0,
        completedCourses: 0
      }
    });
    
  } catch (error) {
    console.error('❌ Ошибка получения общего прогресса:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Внутренняя ошибка сервера' 
    });
  }
});

// Получить прогресс конкретного курса
app.get('/api/user/course/:courseId/progress', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    
    const courseProgress = getCourseProgress(userId, courseId);
    
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
    console.error('❌ Ошибка получения прогресса курса:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Внутренняя ошибка сервера' 
    });
  }
});

// Статус урока (заблокирован/доступен/завершен)
app.get('/api/user/lesson-status/:courseId/:lessonId', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, lessonId } = req.params;
    
    const progress = userProgress[userId];
    const lessonKey = `${courseId}_${lessonId}`;
    
    const isCompleted = progress?.lessons[lessonKey]?.completed || false;
    
    // Если это первый урок, он всегда доступен
    if (parseInt(lessonId) === 1) {
      return res.json({
        success: true,
        status: isCompleted ? 'completed' : 'available',
        canAccess: true,
        isCompleted
      });
    }
    
    // Проверяем, завершен ли предыдущий урок
    const prevLessonKey = `${courseId}_${parseInt(lessonId) - 1}`;
    const prevCompleted = progress?.lessons[prevLessonKey]?.completed || false;
    
    const canAccess = prevCompleted || isCompleted;
    const status = isCompleted ? 'completed' : (canAccess ? 'available' : 'locked');
    
    res.json({
      success: true,
      status,
      canAccess,
      isCompleted
    });
    
  } catch (error) {
    console.error('❌ Ошибка проверки статуса урока:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Внутренняя ошибка сервера' 
    });
  }
});

// ============ ОБЩИЕ ЭНДПОЙНТЫ ============

// Проверка здоровья сервера
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Сервер работает',
    timestamp: new Date().toISOString(),
    usersCount: users.length,
    activeUsers: Object.keys(userProgress).length
  });
});

// Отладка (только для разработки)
app.get('/api/debug/users', (req, res) => {
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  res.json({
    success: true,
    users: usersWithoutPasswords,
    count: users.length,
    userCourses,
    userProgress
  });
});

// ============ ЗАПУСК СЕРВЕРА ============
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
  console.log('🌐 CORS настроен для: http://localhost:5173');
  console.log('📚 ДОСТУПНЫЕ ЭНДПОЙНТЫ:');
  console.log('   POST /api/register           - Регистрация');
  console.log('   POST /api/login              - Вход');
  console.log('   GET  /api/verify-auth        - Проверка токена');
  console.log('   POST /api/user/save-course   - Сохранить курс');
  console.log('   GET  /api/user/courses       - Все курсы пользователя');
  console.log('   GET  /api/user/check-course/:courseId - Проверить курс');
  console.log('   POST /api/user/complete-lesson - Завершить урок');
  console.log('   GET  /api/user/overall-progress - Общий прогресс');
  console.log('   GET  /api/user/course/:courseId/progress - Прогресс курса');
  console.log('   GET  /api/user/lesson-status/:courseId/:lessonId - Статус урока');
  console.log('   GET  /api/health             - Проверка сервера');
  console.log('   GET  /api/debug/users        - Отладка (только dev)');
  console.log('\n⚠️  ВНИМАНИЕ: Данные хранятся в памяти и сбросятся при перезапуске!');
});