const mongoose = require('mongoose');

// Схема для урока
const lessonProgressSchema = new mongoose.Schema({
  lessonId: {
    type: Number,
    required: true
  },
  lessonTitle: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  timeSpent: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0
  },
  xpEarned: {
    type: Number,
    default: 0
  }
}, { _id: false });

// Схема для курса
const courseProgressSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true
  },
  courseTitle: {
    type: String,
    required: true
  },
  courseIcon: {
    type: String,
    default: '📚'
  },
  lessons: [lessonProgressSchema],
  completedLessons: {
    type: Number,
    default: 0
  },
  totalLessons: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    default: 0
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
}, { _id: false });

const userSchema = new mongoose.Schema({
  // Основная информация
  fullName: {
    type: String,
    required: [true, 'Full name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true
  },
  bio: {
    type: String,
    default: 'Crypto learner'
  },
  
  // XP и уровень
  xp: { 
    type: Number, 
    default: 0 
  },
  level: { 
    type: Number, 
    default: 1 
  },
  streak: { 
    type: Number, 
    default: 0 
  },
  joinedDate: { 
    type: Date, 
    default: Date.now 
  },
  
  // Массив сохраненных уроков
  savedLessons: [{
    courseId: String,
    lessonId: Number,
    savedAt: { 
      type: Date, 
      default: Date.now 
    },
    lessonTitle: String,
    courseTitle: String,
    thumbnail: String
  }],
  
  // Прогресс по курсам - МАССИВ вместо Map
  coursesProgress: [courseProgressSchema],
  
  // Общая статистика
  overallStats: {
    totalLessonsCompleted: { 
      type: Number, 
      default: 0 
    },
    totalLessons: { 
      type: Number, 
      default: 0 
    },
    completionRate: { 
      type: Number, 
      default: 0 
    },
    enrolledCourses: { 
      type: Number, 
      default: 0 
    },
    completedCourses: { 
      type: Number, 
      default: 0 
    },
    totalTimeSpent: { 
      type: Number, 
      default: 0 
    },
    averageScore: { 
      type: Number, 
      default: 0 
    },
    averageTimePerLesson: { 
      type: Number, 
      default: 0 
    },
    lastActivity: Date,
    currentStreak: { 
      type: Number, 
      default: 0 
    },
    longestStreak: { 
      type: Number, 
      default: 0 
    },
    daysActive: { 
      type: Number, 
      default: 0 
    },
    lastLoginDate: { type: Date, default: Date.now }
  },
  
  // Достижения
  achievements: [{
    id: String,
    title: String,
    description: String,
    earnedAt: { 
      type: Date, 
      default: Date.now 
    },
    icon: String,
    xpBonus: Number,
    category: String
  }],
  
  // Цели
  goals: [{
    id: String,
    title: String,
    description: String,
    target: Number,
    current: { 
      type: Number, 
      default: 0 
    },
    unit: String,
    deadline: Date,
    completed: { 
      type: Boolean, 
      default: false 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    completedAt: Date
  }],
  
  // Активность (логи)
  activityLog: [{
    type: {
      type: String,
      enum: [
        'lesson_completed', 
        'course_enrolled', 
        'achievement_earned', 
        'login', 
        'profile_updated',
        'lesson_started',
        'xp_earned',
        'level_up'
      ]
    },
    courseId: String,
    lessonId: Number,
    xpEarned: Number,
    timestamp: { 
      type: Date, 
      default: Date.now 
    },
    details: mongoose.Schema.Types.Mixed
  }],
  
  // Настройки
  settings: {
    notifications: {
      email: { 
        type: Boolean, 
        default: true 
      },
      push: { 
        type: Boolean, 
        default: true 
      },
      achievementAlerts: { 
        type: Boolean, 
        default: true 
      },
      lessonReminders: { 
        type: Boolean, 
        default: true 
      }
    },
    privacy: {
      showProfile: { 
        type: Boolean, 
        default: true 
      },
      showProgress: { 
        type: Boolean, 
        default: true 
      },
      showAchievements: { 
        type: Boolean, 
        default: true 
      },
      showLevel: { 
        type: Boolean, 
        default: true 
      }
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    }
  },
  
  // Аватар
  avatar: {
    type: String,
    default: ''
  },
  
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// ============ MIDDLEWARE ============
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Автоматически рассчитываем общий прогресс перед сохранением
  this.calculateOverallProgress();
  next();
});

userSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// ============ МЕТОДЫ ДЛЯ ПРОГРЕССА ============

// Метод для расчета общего прогресса ВСЕХ курсов
userSchema.methods.calculateOverallProgress = function() {
  let totalCompleted = 0;
  let totalLessons = 0;
  let completedCourses = 0;
  let totalTimeSpent = 0;
  let totalScore = 0;
  let scoredLessons = 0;
  
  // Проходим по всем курсам
  this.coursesProgress.forEach(course => {
    let completedInCourse = 0;
    let timeSpentInCourse = 0;
    let courseScoreTotal = 0;
    let scoredInCourse = 0;
    
    // Считаем завершенные уроки и время в курсе
    course.lessons.forEach(lesson => {
      if (lesson.completed) {
        completedInCourse++;
        totalCompleted++;
        
        if (lesson.timeSpent) {
          timeSpentInCourse += lesson.timeSpent;
          totalTimeSpent += lesson.timeSpent;
        }
        
        if (lesson.score) {
          courseScoreTotal += lesson.score;
          totalScore += lesson.score;
          scoredInCourse++;
          scoredLessons++;
        }
      }
    });
    
    // Обновляем статистику курса
    course.completedLessons = completedInCourse;
    course.totalLessons = course.lessons.length;
    course.percentage = course.totalLessons > 0 ? Math.round((completedInCourse / course.totalLessons) * 100) : 0;
    
    // Проверяем, завершен ли курс полностью
    if (course.percentage === 100) {
      completedCourses++;
      if (!course.completedAt) {
        course.completedAt = new Date();
      }
    }
    
    totalLessons += course.totalLessons;
  });
  
  // Обновляем общую статистику
  this.overallStats.totalLessonsCompleted = totalCompleted;
  this.overallStats.totalLessons = totalLessons;
  this.overallStats.completionRate = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;
  this.overallStats.completedCourses = completedCourses;
  this.overallStats.enrolledCourses = this.coursesProgress.length;
  this.overallStats.totalTimeSpent = totalTimeSpent;
  this.overallStats.averageScore = scoredLessons > 0 ? Math.round(totalScore / scoredLessons) : 0;
  this.overallStats.averageTimePerLesson = totalCompleted > 0 ? Math.round(totalTimeSpent / totalCompleted) : 0;
  this.overallStats.lastActivity = new Date();
  
  return this;
};

// Метод для зачисления на курс
userSchema.methods.enrollInCourse = function(courseData) {
  const { courseId, courseTitle, courseIcon, lessons = [] } = courseData;
  
  // Проверяем, не зачислен ли уже на курс
  const existingCourseIndex = this.coursesProgress.findIndex(course => course.courseId === courseId);
  
  if (existingCourseIndex !== -1) {
    // Обновляем существующий курс
    const existingCourse = this.coursesProgress[existingCourseIndex];
    
    // Добавляем новые уроки, если их нет
    lessons.forEach(newLesson => {
      const existingLessonIndex = existingCourse.lessons.findIndex(
        lesson => lesson.lessonId === newLesson.lessonId
      );
      
      if (existingLessonIndex === -1) {
        existingCourse.lessons.push({
          lessonId: newLesson.lessonId,
          lessonTitle: newLesson.lessonTitle || `Урок ${newLesson.lessonId}`,
          completed: false,
          timeSpent: 0,
          score: 0,
          xpEarned: 0
        });
      }
    });
    
    existingCourse.totalLessons = existingCourse.lessons.length;
    existingCourse.lastAccessed = new Date();
    
    return this;
  }
  
  // Создаем новый курс
  const newCourse = {
    courseId,
    courseTitle: courseTitle || courseId,
    courseIcon: courseIcon || '📚',
    lessons: lessons.map(lesson => ({
      lessonId: lesson.lessonId,
      lessonTitle: lesson.lessonTitle || `Урок ${lesson.lessonId}`,
      completed: false,
      timeSpent: 0,
      score: 0,
      xpEarned: 0
    })),
    completedLessons: 0,
    totalLessons: lessons.length,
    percentage: 0,
    lastAccessed: new Date(),
    enrolledAt: new Date(),
    completedAt: null
  };
  
  this.coursesProgress.push(newCourse);
  
  // Добавляем активность
  this.activityLog.push({
    type: 'course_enrolled',
    courseId: courseId,
    timestamp: new Date(),
    details: {
      courseTitle: courseTitle,
      lessonsCount: lessons.length
    }
  });
  
  // Обновляем общую статистику
  this.calculateOverallProgress();
  
  return this;
};

// Метод для завершения урока
userSchema.methods.completeLesson = function(courseId, lessonId, lessonData = {}) {
  const { timeSpent = 0, score = 100 } = lessonData;
  
  // Находим курс
  const courseIndex = this.coursesProgress.findIndex(course => course.courseId === courseId);
  
  if (courseIndex === -1) {
    throw new Error(`Course ${courseId} not found`);
  }
  
  const course = this.coursesProgress[courseIndex];
  
  // Находим урок
  const lessonIndex = course.lessons.findIndex(lesson => lesson.lessonId === lessonId);
  
  if (lessonIndex === -1) {
    // Если урока нет, создаем его
    course.lessons.push({
      lessonId,
      lessonTitle: lessonData.lessonTitle || `Урок ${lessonId}`,
      completed: true,
      completedAt: new Date(),
      timeSpent,
      score,
      xpEarned: 100
    });
  } else {
    // Обновляем существующий урок
    const lesson = course.lessons[lessonIndex];
    
    if (!lesson.completed) {
      lesson.completed = true;
      lesson.completedAt = new Date();
      lesson.timeSpent = timeSpent;
      lesson.score = score;
      lesson.xpEarned = 100;
    }
  }
  
  // Начисляем XP
  this.xp += 100;
  this.level = Math.floor(this.xp / 1000) + 1;
  
  // Добавляем активность
  this.activityLog.push({
    type: 'lesson_completed',
    courseId,
    lessonId,
    xpEarned: 100,
    timestamp: new Date(),
    details: {
      timeSpent,
      score,
      lessonTitle: lessonData.lessonTitle || `Урок ${lessonId}`
    }
  });
  
  // Обновляем статистику курса
  const completedInCourse = course.lessons.filter(lesson => lesson.completed).length;
  course.completedLessons = completedInCourse;
  course.totalLessons = course.lessons.length;
  course.percentage = course.totalLessons > 0 ? Math.round((completedInCourse / course.totalLessons) * 100) : 0;
  course.lastAccessed = new Date();
  
  // Если курс завершен на 100%
  if (course.percentage === 100 && !course.completedAt) {
    course.completedAt = new Date();
  }
  
  // Обновляем общий прогресс
  this.calculateOverallProgress();
  
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
userSchema.methods.getCourseProgress = function(courseId) {
  const course = this.coursesProgress.find(c => c.courseId === courseId);
  
  if (!course) {
    return null;
  }
  
  return {
    courseId: course.courseId,
    courseTitle: course.courseTitle,
    courseIcon: course.courseIcon,
    completedLessons: course.completedLessons,
    totalLessons: course.totalLessons,
    percentage: course.percentage,
    lessons: course.lessons.map(lesson => ({
      ...lesson,
      progress: lesson.completed ? 100 : 0
    }))
  };
};

// Метод для получения общей статистики прогресса
userSchema.methods.getOverallProgressStats = function() {
  let totalCompletedLessons = 0;
  let totalLessons = 0;
  let completedCourses = 0;
  const courses = [];
  
  this.coursesProgress.forEach(course => {
    const courseObj = {
      id: course.courseId,
      title: course.courseTitle,
      icon: course.courseIcon,
      completedLessons: course.completedLessons,
      totalLessons: course.totalLessons,
      percentage: course.percentage,
      lastAccessed: course.lastAccessed,
      enrolledAt: course.enrolledAt
    };
    
    courses.push(courseObj);
    totalCompletedLessons += course.completedLessons;
    totalLessons += course.totalLessons;
    
    if (course.percentage === 100) {
      completedCourses++;
    }
  });
  
  const totalProgress = totalLessons > 0 
    ? Math.round((totalCompletedLessons / totalLessons) * 100) 
    : 0;
  
  return {
    totalProgress,
    completedCourses,
    enrolledCourses: this.coursesProgress.length,
    completedLessons: totalCompletedLessons,
    totalLessons,
    courses,
    xp: this.xp,
    level: this.level,
    streak: this.streak,
    overallStats: this.overallStats
  };
};

// Метод для проверки, сохранен ли курс
userSchema.methods.isCourseSaved = function(courseId) {
  return this.coursesProgress.some(course => course.courseId === courseId);
};

// ============ ИНДЕКСЫ ============
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ xp: -1 });
userSchema.index({ level: -1 });
userSchema.index({ 'coursesProgress.courseId': 1 });

module.exports = mongoose.model('User', userSchema);