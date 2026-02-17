// Инициализация прогресса пользователя
const initializeUserProgress = (userId, userProgress) => {
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
      lessons: {}
    };
  }
  return userProgress[userId];
};

// Инициализация курсов пользователя
const initializeUserCourses = (userId, userCourses) => {
  if (!userCourses[userId]) {
    userCourses[userId] = [];
  }
  return userCourses[userId];
};

// Обновление общего прогресса
const updateOverallProgress = (userId, users, userCourses, userProgress) => {
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
  
  courses.forEach(course => {
    const courseId = course.courseId;
    const courseTotalLessons = course.totalLessons || 0;
    let completedInCourse = 0;
    
    for (let i = 1; i <= courseTotalLessons; i++) {
      const lessonKey = `${courseId}_${i}`;
      const lessonProgress = progress.lessons[lessonKey];
      
      if (lessonProgress && lessonProgress.completed) {
        completedInCourse++;
        totalCompletedLessons++;
        if (lessonProgress.timeSpent) totalTimeSpent += lessonProgress.timeSpent;
        if (lessonProgress.score) {
          totalScore += lessonProgress.score;
          scoredLessons++;
        }
      }
    }
    
    course.completedLessons = completedInCourse;
    course.percentage = courseTotalLessons > 0 ? 
      Math.round((completedInCourse / courseTotalLessons) * 100) : 0;
    totalLessons += courseTotalLessons;
    if (course.percentage === 100) completedCourses++;
  });
  
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
const getCourseProgress = (userId, courseId, userCourses, userProgress) => {
  const courses = userCourses[userId] || [];
  const progress = userProgress[userId];
  const course = courses.find(c => c.courseId === courseId);
  if (!course) return null;
  
  const courseTotalLessons = course.totalLessons || 0;
  let completedLessons = 0;
  for (let i = 1; i <= courseTotalLessons; i++) {
    const lessonKey = `${courseId}_${i}`;
    if (progress?.lessons[lessonKey]?.completed) completedLessons++;
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

module.exports = {
  initializeUserProgress,
  initializeUserCourses,
  updateOverallProgress,
  getCourseProgress
};