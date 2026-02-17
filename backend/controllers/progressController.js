// backend/controllers/progressController.js
const helpers = require('../utils/helper');

// Глобальные хранилища (будут переданы из app.js)
let users, userCourses, userProgress;

// Функция для инициализации хранилищ
const setStorage = (storage) => {
  users = storage.users;
  userCourses = storage.userCourses;
  userProgress = storage.userProgress;
};

// ============ ЗАВЕРШИТЬ УРОК ============
const completeLesson = (req, res) => {
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
    
    const courses = userCourses[userId] || [];
    const course = courses.find(c => c.courseId === courseId);
    
    if (!course) {
      return res.status(400).json({ 
        success: false, 
        error: 'Курс не найден. Сначала добавьте курс.' 
      });
    }
    
    const progress = helpers.initializeUserProgress(userId, userProgress);
    const lessonKey = `${courseId}_${lessonId}`;
    const wasCompleted = progress.lessons[lessonKey]?.completed || false;
    
    progress.lessons[lessonKey] = {
      completed: true,
      completedAt: new Date().toISOString(),
      timeSpent,
      score,
      xpEarned: 100
    };
    
    let xpEarned = 0;
    if (!wasCompleted) {
      xpEarned = 100 + Math.floor(timeSpent / 60) * 10;
      user.xp = (user.xp || 0) + xpEarned;
      user.level = Math.floor(user.xp / 1000) + 1;
    }
    
    course.lastAccessed = new Date().toISOString();
    
    const overallStats = helpers.updateOverallProgress(userId, users, userCourses, userProgress);
    const courseProgress = helpers.getCourseProgress(userId, courseId, userCourses, userProgress);
    
    console.log('✅ Урок завершен:', { 
      xpEarned, 
      newXp: user.xp, 
      newLevel: user.level,
      courseProgress: courseProgress?.percentage 
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
};

// ============ ПОЛУЧИТЬ ОБЩИЙ ПРОГРЕСС ============
const getOverallProgress = (req, res) => {
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
    
    const coursesWithProgress = courses
      .map(course => helpers.getCourseProgress(userId, course.courseId, userCourses, userProgress))
      .filter(Boolean);
    
    let totalCompletedLessons = 0;
    let totalLessons = 0;
    let completedCourses = 0;
    
    coursesWithProgress.forEach(course => {
      totalCompletedLessons += course.completedLessons;
      totalLessons += course.totalLessons;
      if (course.percentage === 100) completedCourses++;
    });
    
    const totalProgress = totalLessons > 0 
      ? Math.round((totalCompletedLessons / totalLessons) * 100) 
      : 0;
    
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
};

// ============ ПОЛУЧИТЬ ПРОГРЕСС КУРСА ============
const getCourseProgress = (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    
    const courseProgress = helpers.getCourseProgress(userId, courseId, userCourses, userProgress);
    
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
};

// ============ СТАТУС УРОКА ============
const getLessonStatus = (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, lessonId } = req.params;
    
    const progress = userProgress[userId];
    const lessonKey = `${courseId}_${lessonId}`;
    const isCompleted = progress?.lessons[lessonKey]?.completed || false;
    
    if (parseInt(lessonId) === 1) {
      return res.json({ 
        success: true, 
        status: isCompleted ? 'completed' : 'available', 
        canAccess: true, 
        isCompleted 
      });
    }
    
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
};

module.exports = {
  setStorage,
  completeLesson,
  getOverallProgress,
  getCourseProgress,
  getLessonStatus
};