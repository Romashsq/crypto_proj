const COURSE_PROGRESS_KEY = 'flow_course_progress';

const initializeProgress = () => {
  const defaultStructure = {
    crypto: {
      completedLessons: [],
      currentLesson: 1,
      totalLessons: 6
    },
    scams: {
      completedLessons: [],
      currentLesson: 1,
      totalLessons: 5
    },
    memecoins: {
      completedLessons: [],
      currentLesson: 1,
      totalLessons: 4
    },
    security: {
      completedLessons: [],
      currentLesson: 1,
      totalLessons: 3
    }
  };
  
  localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify(defaultStructure));
  return defaultStructure;
};

// Получить прогресс (инициализировать если нет)
export const getProgress = () => {
  const stored = localStorage.getItem(COURSE_PROGRESS_KEY);
  if (!stored) {
    return initializeProgress();
  }
  return JSON.parse(stored);
};

// Сохранить прогресс
export const saveProgress = (progress) => {
  localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify(progress));
};

// Отметить урок как пройденный
export const markLessonCompleted = (courseId, lessonNumber) => {
  const progress = getProgress();
  
  if (!progress[courseId]) {
    progress[courseId] = {
      completedLessons: [],
      currentLesson: 1,
      totalLessons: courseId === 'crypto' ? 6 : 
                   courseId === 'scams' ? 5 :
                   courseId === 'memecoins' ? 4 : 3
    };
  }
  
  const courseProgress = progress[courseId];
  
  // Добавляем урок если еще не добавлен
  if (!courseProgress.completedLessons.includes(lessonNumber)) {
    courseProgress.completedLessons.push(lessonNumber);
    
    // Разблокируем следующий урок если это был текущий
    if (lessonNumber === courseProgress.currentLesson) {
      courseProgress.currentLesson = lessonNumber + 1;
    }
    
    // Сортируем
    courseProgress.completedLessons.sort((a, b) => a - b);
    
    saveProgress(progress);
    window.dispatchEvent(new Event('progressUpdated'));
    return true;
  }
  
  return false;
};

// Проверить выполнен ли урок
export const isLessonCompleted = (courseId, lessonNumber) => {
  const progress = getProgress();
  return progress[courseId]?.completedLessons?.includes(lessonNumber) || false;
};

// Получить прогресс курса в процентах
export const getCourseProgressPercentage = (courseId) => {
  const progress = getProgress();
  const course = progress[courseId];
  if (!course || course.totalLessons === 0) return 0;
  return Math.round((course.completedLessons.length / course.totalLessons) * 100);
};

// Получить текущий доступный урок
export const getCurrentLesson = (courseId) => {
  const progress = getProgress();
  return progress[courseId]?.currentLesson || 1;
};

// Сбросить прогресс курса
export const resetCourseProgress = (courseId) => {
  const progress = getProgress();
  if (progress[courseId]) {
    progress[courseId] = {
      completedLessons: [],
      currentLesson: 1,
      totalLessons: progress[courseId].totalLessons
    };
    saveProgress(progress);
    window.dispatchEvent(new Event('progressUpdated'));
  }
};

// Слушатель изменений прогресса
export const subscribeToProgressUpdates = (callback) => {
  window.addEventListener('progressUpdated', callback);
  return () => window.removeEventListener('progressUpdated', callback);
};