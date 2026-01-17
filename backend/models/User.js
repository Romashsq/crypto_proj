const mongoose = require('mongoose');

// Упрощенная схема прогресса урока
const simpleLessonSchema = new mongoose.Schema({
  lessonId: Number,
  completed: { type: Boolean, default: false },
  completedAt: Date,
  score: { type: Number, default: 0 }
}, { _id: false });

// Упрощенная схема курса
const simpleCourseSchema = new mongoose.Schema({
  courseId: String,
  courseTitle: String,
  courseIcon: { type: String, default: '📚' },
  enrolledAt: { type: Date, default: Date.now },
  lastAccessed: { type: Date, default: Date.now },
  completedLessons: { type: Number, default: 0 },
  totalLessons: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  lessons: [simpleLessonSchema]
}, { _id: false });

const simpleUserSchema = new mongoose.Schema({
  // Основная информация
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  username: { type: String, unique: true },
  
  // Уровень и XP
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  
  // Курсы пользователя (самое важное!)
  courses: [simpleCourseSchema],
  
  // Статистика
  totalCompletedLessons: { type: Number, default: 0 },
  enrolledCourses: { type: Number, default: 0 },
  completedCourses: { type: Number, default: 0 },
  
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});

// Метод для зачисления на курс
simpleUserSchema.methods.enrollInCourse = function(courseData) {
  const { courseId, courseTitle, courseIcon, totalLessons } = courseData;
  
  // Проверяем, не записан ли уже на курс
  const existingCourse = this.courses.find(c => c.courseId === courseId);
  
  if (!existingCourse) {
    // Добавляем новый курс
    this.courses.push({
      courseId,
      courseTitle: courseTitle || `Course ${courseId}`,
      courseIcon: courseIcon || '📚',
      enrolledAt: new Date(),
      lastAccessed: new Date(),
      completedLessons: 0,
      totalLessons: totalLessons || 1,
      percentage: 0,
      lessons: []
    });
    
    this.enrolledCourses = this.courses.length;
  }
  
  return this;
};

// Метод для завершения урока
simpleUserSchema.methods.completeLesson = function(courseId, lessonId, score = 100) {
  const course = this.courses.find(c => c.courseId === courseId);
  
  if (!course) {
    throw new Error(`Course ${courseId} not found`);
  }
  
  // Находим или создаем урок
  let lesson = course.lessons.find(l => l.lessonId === lessonId);
  
  if (!lesson) {
    lesson = { lessonId, completed: false, score: 0 };
    course.lessons.push(lesson);
  }
  
  // Если урок еще не завершен
  if (!lesson.completed) {
    lesson.completed = true;
    lesson.completedAt = new Date();
    lesson.score = score;
    
    // Обновляем статистику курса
    course.completedLessons = course.lessons.filter(l => l.completed).length;
    course.totalLessons = Math.max(course.totalLessons, course.lessons.length);
    course.percentage = course.totalLessons > 0 
      ? Math.round((course.completedLessons / course.totalLessons) * 100) 
      : 0;
    course.lastAccessed = new Date();
    
    // Обновляем общую статистику
    this.totalCompletedLessons++;
    this.xp += 100;
    this.level = Math.floor(this.xp / 1000) + 1;
    
    // Проверяем, завершен ли курс
    if (course.percentage === 100) {
      this.completedCourses = this.courses.filter(c => c.percentage === 100).length;
    }
  }
  
  return {
    courseProgress: {
      completedLessons: course.completedLessons,
      totalLessons: course.totalLessons,
      percentage: course.percentage
    },
    xpEarned: 100,
    newXp: this.xp,
    newLevel: this.level
  };
};

// Метод для получения прогресса курса
simpleUserSchema.methods.getCourseProgress = function(courseId) {
  const course = this.courses.find(c => c.courseId === courseId);
  
  if (!course) return null;
  
  return {
    courseId: course.courseId,
    courseTitle: course.courseTitle,
    courseIcon: course.courseIcon,
    completedLessons: course.completedLessons,
    totalLessons: course.totalLessons,
    percentage: course.percentage,
    enrolledAt: course.enrolledAt,
    lastAccessed: course.lastAccessed,
    isEnrolled: true
  };
};

// Метод для проверки, записан ли на курс
simpleUserSchema.methods.isCourseEnrolled = function(courseId) {
  return this.courses.some(c => c.courseId === courseId);
};

// Метод для получения всех курсов
simpleUserSchema.methods.getAllCourses = function() {
  return this.courses.map(course => ({
    courseId: course.courseId,
    courseTitle: course.courseTitle,
    courseIcon: course.courseIcon,
    completedLessons: course.completedLessons,
    totalLessons: course.totalLessons,
    percentage: course.percentage,
    enrolledAt: course.enrolledAt,
    lastAccessed: course.lastAccessed,
    isCompleted: course.percentage === 100
  }));
};

module.exports = mongoose.model('SimpleUser', simpleUserSchema);