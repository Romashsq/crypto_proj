// backend/controllers/courseController.js
const User = require('../models/User');

// ============ ЗАПИСАТЬСЯ НА КУРС ============
const enrollCourse = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { courseId, courseTitle, courseIcon, totalLessons } = req.body;

    console.log('🎯 Запись на курс:', { userId, courseId, courseTitle });

    if (!courseId) {
      return res.status(400).json({ success: false, error: 'courseId обязателен' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Пользователь не найден' });
    }

    // Если уже записан — просто возвращаем без изменений
    if (user.isCourseEnrolled(courseId)) {
      return res.json({
        success: true,
        message: 'Вы уже записаны на этот курс',
        course: user.getCourseProgress(courseId),
        isAlreadyEnrolled: true,
      });
    }

    user.enrollInCourse({
      courseId: String(courseId),
      courseTitle: courseTitle || String(courseId),
      courseIcon: courseIcon || '📚',
      totalLessons: Number(totalLessons) || 1,
    });

    await user.save();

    console.log('✅ Успешно записан на курс:', courseId);

    res.json({
      success: true,
      message: 'Успешно записан на курс',
      course: user.getCourseProgress(courseId),
      enrolledCourses: user.enrolledCourses,
    });
  } catch (error) {
    console.error('❌ Ошибка записи на курс:', error);
    res.status(500).json({ success: false, error: error.message || 'Внутренняя ошибка сервера' });
  }
};

// ============ ПОЛУЧИТЬ МОИ КУРСЫ ============
const getMyCourses = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log('📚 Получение курсов пользователя:', userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Пользователь не найден' });
    }

    const courses = user.getAllCourses();

    res.json({
      success: true,
      courses,
      enrolledCourses: courses.length,
      completedCourses: courses.filter((c) => c.isCompleted).length,
      totalCourses: courses.length,
    });
  } catch (error) {
    console.error('❌ Ошибка получения курсов:', error);
    res.status(500).json({ success: false, error: 'Внутренняя ошибка сервера' });
  }
};

// ============ ПРОВЕРИТЬ ЗАЧИСЛЕН ЛИ НА КУРС ============
const checkEnrollment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { courseId } = req.params;

    console.log('🔍 Проверка зачисления:', { userId, courseId });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Пользователь не найден' });
    }

    const isEnrolled = user.isCourseEnrolled(courseId);
    const progress = isEnrolled ? user.getCourseProgress(courseId) : null;

    res.json({ success: true, isEnrolled, isSaved: isEnrolled, course: progress, progress });
  } catch (error) {
    console.error('❌ Ошибка проверки зачисления:', error);
    res.status(500).json({ success: false, error: 'Внутренняя ошибка сервера' });
  }
};

// ============ СОХРАНИТЬ КУРС (алиас enrollCourse) ============
const saveCourse = async (req, res) => {
  return enrollCourse(req, res);
};

// ============ ПОЛУЧИТЬ ВСЕ КУРСЫ ПОЛЬЗОВАТЕЛЯ ============
const getUserCourses = async (req, res) => {
  return getMyCourses(req, res);
};

// ============ ПРОВЕРИТЬ СТАТУС КУРСА ============
const checkCourseStatus = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { courseId } = req.params;

    console.log('🔍 Проверка статуса курса:', { userId, courseId });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Пользователь не найден' });
    }

    const isSaved = user.isCourseEnrolled(courseId);
    const progress = isSaved ? user.getCourseProgress(courseId) : null;

    res.json({ success: true, isSaved, isEnrolled: isSaved, progress });
  } catch (error) {
    console.error('❌ Ошибка проверки курса:', error);
    res.status(500).json({ success: false, error: 'Внутренняя ошибка сервера' });
  }
};

// Заглушка — больше не нужна, но оставляем для совместимости
const setStorage = () => {
  console.warn('⚠️ setStorage больше не используется — данные хранятся в MongoDB');
};

module.exports = {
  setStorage,
  enrollCourse,
  getMyCourses,
  checkEnrollment,
  saveCourse,
  getUserCourses,
  checkCourseStatus,
};