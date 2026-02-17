// backend/controllers/courseController.js
const helpers = require('../utils/helper');

// Глобальные хранилища (будут переданы из app.js)
let users, userCourses, userProgress;

// Функция для инициализации хранилищ
const setStorage = (storage) => {
  users = storage.users;
  userCourses = storage.userCourses;
  userProgress = storage.userProgress;
};

// ============ ЗАПИСАТЬСЯ НА КУРС ============
const enrollCourse = (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, courseTitle, courseIcon, totalLessons } = req.body;
    
    console.log('🎯 Запись на курс:', { userId, courseId, courseTitle });
    
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
    
    const courses = helpers.initializeUserCourses(userId, userCourses);
    const existingCourse = courses.find(c => c.courseId === courseId);
    
    if (existingCourse) {
      return res.json({ 
        success: true, 
        message: 'Вы уже записаны на этот курс', 
        course: existingCourse, 
        isAlreadyEnrolled: true 
      });
    }
    
    const newCourse = {
      courseId,
      courseTitle: courseTitle || `Course ${courseId}`,
      courseIcon: courseIcon || '📚',
      totalLessons: totalLessons || 1,
      enrolledAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString(),
      completedLessons: 0,
      percentage: 0
    };
    
    courses.push(newCourse);
    console.log('✅ Успешно записан на курс:', courseId);
    
    if (userProgress[userId]) {
      helpers.updateOverallProgress(userId, users, userCourses, userProgress);
    }
    
    res.json({ 
      success: true, 
      message: 'Успешно записан на курс', 
      course: newCourse, 
      enrolledCourses: courses.length 
    });
    
  } catch (error) {
    console.error('❌ Ошибка записи на курс:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Внутренняя ошибка сервера' 
    });
  }
};

// ============ ПОЛУЧИТЬ МОИ КУРСЫ ============
const getMyCourses = (req, res) => {
  try {
    const userId = req.user.id;
    console.log('📚 Получение курсов пользователя:', userId);
    
    const courses = userCourses[userId] || [];
    const progress = userProgress[userId];
    
    const coursesWithProgress = courses.map(course => {
      let completedLessons = 0;
      
      if (progress && progress.lessons) {
        for (let i = 1; i <= course.totalLessons; i++) {
          const lessonKey = `${course.courseId}_${i}`;
          if (progress.lessons[lessonKey] && progress.lessons[lessonKey].completed) {
            completedLessons++;
          }
        }
      }
      
      const percentage = course.totalLessons > 0 
        ? Math.round((completedLessons / course.totalLessons) * 100) 
        : 0;
      
      return {
        courseId: course.courseId,
        courseTitle: course.courseTitle,
        courseIcon: course.courseIcon,
        enrolledAt: course.enrolledAt,
        lastAccessed: course.lastAccessed,
        totalLessons: course.totalLessons,
        completedLessons,
        percentage,
        isCompleted: percentage === 100
      };
    });
    
    const completedCourses = coursesWithProgress.filter(c => c.isCompleted).length;
    
    res.json({
      success: true,
      courses: coursesWithProgress,
      enrolledCourses: courses.length,
      completedCourses,
      totalCourses: courses.length
    });
    
  } catch (error) {
    console.error('❌ Ошибка получения курсов:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Внутренняя ошибка сервера' 
    });
  }
};

// ============ ПРОВЕРИТЬ ЗАЧИСЛЕН ЛИ НА КУРС ============
const checkEnrollment = (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    
    console.log('🔍 Проверка зачисления:', { userId, courseId });
    
    const courses = userCourses[userId] || [];
    const isEnrolled = courses.some(c => c.courseId === courseId);
    
    if (!isEnrolled) {
      return res.json({ 
        success: true, 
        isEnrolled: false, 
        course: null, 
        progress: null 
      });
    }
    
    const memoryCourse = courses.find(c => c.courseId === courseId);
    const userProg = userProgress[userId];
    let completedLessons = 0;
    
    if (userProg && memoryCourse) {
      for (let i = 1; i <= memoryCourse.totalLessons; i++) {
        const lessonKey = `${courseId}_${i}`;
        if (userProg.lessons[lessonKey] && userProg.lessons[lessonKey].completed) {
          completedLessons++;
        }
      }
    }
    
    const percentage = memoryCourse.totalLessons > 0 
      ? Math.round((completedLessons / memoryCourse.totalLessons) * 100) 
      : 0;
    
    const progress = { 
      completedLessons, 
      totalLessons: memoryCourse.totalLessons, 
      percentage, 
      isCompleted: percentage === 100 
    };
    
    const courseData = { 
      ...memoryCourse, 
      completedLessons, 
      percentage, 
      isCompleted: percentage === 100 
    };
    
    res.json({ 
      success: true, 
      isEnrolled: true, 
      course: courseData, 
      progress 
    });
    
  } catch (error) {
    console.error('❌ Ошибка проверки зачисления:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Внутренняя ошибка сервера' 
    });
  }
};

// ============ СОХРАНИТЬ КУРС ============
const saveCourse = (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, courseTitle, courseIcon, totalLessons } = req.body;
    
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
    
    const courses = helpers.initializeUserCourses(userId, userCourses);
    helpers.initializeUserProgress(userId, userProgress);
    
    const existingCourseIndex = courses.findIndex(c => c.courseId === courseId);
    
    if (existingCourseIndex !== -1) {
      courses[existingCourseIndex] = {
        ...courses[existingCourseIndex],
        courseTitle: courseTitle || courses[existingCourseIndex].courseTitle,
        courseIcon: courseIcon || courses[existingCourseIndex].courseIcon,
        totalLessons: totalLessons || courses[existingCourseIndex].totalLessons,
        lastAccessed: new Date().toISOString()
      };
      console.log('ℹ️ Курс обновлен:', courseId);
    } else {
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
    
    const overallStats = helpers.updateOverallProgress(userId, users, userCourses, userProgress);
    
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
};

// ============ ПОЛУЧИТЬ ВСЕ КУРСЫ ПОЛЬЗОВАТЕЛЯ ============
const getUserCourses = (req, res) => {
  try {
    const userId = req.user.id;
    console.log('📚 Получение курсов для:', userId);
    
    const courses = userCourses[userId] || [];
    const coursesWithProgress = courses.map(course => ({ 
      ...course, 
      ...helpers.getCourseProgress(userId, course.courseId, userCourses, userProgress) 
    }));
    
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
};

// ============ ПРОВЕРИТЬ СТАТУС КУРСА ============
const checkCourseStatus = (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    
    console.log('🔍 Проверка статуса курса:', { userId, courseId });
    
    const courses = userCourses[userId] || [];
    const isSaved = courses.some(c => c.courseId === courseId);
    
    let courseProgress = null;
    if (isSaved) {
      courseProgress = helpers.getCourseProgress(userId, courseId, userCourses, userProgress);
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
};

module.exports = {
  setStorage,
  enrollCourse,
  getMyCourses,
  checkEnrollment,
  saveCourse,
  getUserCourses,
  checkCourseStatus
};