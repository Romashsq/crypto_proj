// src/components/Main/LessonList/LessonList.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../Context/ThemeContext';
import { Link } from 'react-router-dom';
import LessonCard from './LessonCard/LessonCard';
import ProgressBar from '../ProgressBar/ProgressBar';
import ResetProgress from '../ResetProgress/ResetProgress';
import styles from './LessonList.module.css';
// ИМПОРТИРУЕМ ДАННЫЕ ИЗ НОВОГО ФАЙЛА
import { 
  lessonsData, 
  getTotalLessons 
} from '../../../components/Lessons/lessonData';
// ИМПОРТИРУЕМ ПРОГРЕСС
import { 
  getProgress,
  markLessonCompleted,
  isLessonCompleted,
  getCurrentLesson,
  getCourseProgressPercentage,
  resetCourseProgress,
  subscribeToProgressUpdates
} from '../../../utils/progressStorage';

const LessonList = ({ courseId = "crypto" }) => {
  const { theme } = useTheme();
  
  // БЕРЕМ УРОКИ ИЗ НОВОГО ФАЙЛА
  const lessons = lessonsData[courseId] || [];
  
  // ПРОГРЕСС (остается как было)
  const [progress, setProgress] = useState(() => {
    const stored = getProgress();
    const courseProgress = stored[courseId] || {
      completedLessons: [],
      currentLesson: 1,
      totalLessons: lessons.length
    };
    return courseProgress;
  });

  useEffect(() => {
    const stored = getProgress();
    const courseProgress = stored[courseId] || {
      completedLessons: [],
      currentLesson: 1,
      totalLessons: lessons.length
    };
    
    if (courseProgress.totalLessons !== lessons.length) {
      const updatedProgress = {
        ...courseProgress,
        totalLessons: lessons.length
      };
      
      const allProgress = { ...stored };
      allProgress[courseId] = updatedProgress;
      localStorage.setItem('flow_course_progress', JSON.stringify(allProgress));
      
      setProgress(updatedProgress);
    } else {
      setProgress(courseProgress);
    }
  }, [courseId, lessons.length]);

  // СЛУШАЕМ ИЗМЕНЕНИЯ ПРОГРЕССА
  useEffect(() => {
    const unsubscribe = subscribeToProgressUpdates(() => {
      const stored = getProgress();
      const courseProgress = stored[courseId] || {
        completedLessons: [],
        currentLesson: 1,
        totalLessons: lessons.length
      };
      setProgress(courseProgress);
    });
    
    return () => unsubscribe();
  }, [courseId, lessons.length]);

  // Обработчик старта урока
  const handleStartLesson = (lessonId) => {
    if (lessonId > progress.currentLesson) {
      return;
    }

    markLessonCompleted(courseId, lessonId);
    
    const stored = getProgress();
    const updatedProgress = stored[courseId];
    setProgress(updatedProgress);
  };

  const handleResetProgress = () => {
    resetCourseProgress(courseId);
    
    const stored = getProgress();
    const updatedProgress = stored[courseId] || {
      completedLessons: [],
      currentLesson: 1,
      totalLessons: lessons.length
    };
    setProgress(updatedProgress);
  };

  const getLessonStatus = (lessonId) => {
    const completed = isLessonCompleted(courseId, lessonId);
    const current = getCurrentLesson(courseId);
    
    return {
      isCompleted: completed,
      isLocked: lessonId > current,
      isActive: lessonId === current
    };
  };

  const progressPercentage = getCourseProgressPercentage(courseId);

  const getCourseTitle = () => {
    const titles = {
      crypto: 'Crypto Fundamentals',
      scams: 'Scams Protection',
      memecoins: 'Memecoins',
      security: 'Security Essentials'
    };
    return titles[courseId] || 'Crypto Fundamentals';
  };

  return (
    <div className={`${styles.lessonsContainer} ${theme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.courseHeader}>
        <Link to="/courses" className={styles.backButton}>
          <i className="fas fa-arrow-left"></i>
          Back to Courses
        </Link>
        
        <h1 className={styles.courseTitle}>
          {getCourseTitle()}
        </h1>
        
        <div className={styles.courseStats}>
          <div className={styles.stat}>
            <i className="far fa-clock"></i>
            <span>{lessons.reduce((acc, lesson) => {
              const time = parseInt(lesson.duration);
              return acc + (isNaN(time) ? 30 : time);
            }, 0)} min</span>
          </div>
          <div className={styles.stat}>
            <i className="fas fa-book-open"></i>
            <span>{lessons.length} Lessons</span>
          </div>
          <div className={styles.stat}>
            <i className="fas fa-chart-line"></i>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
        </div>
      </div>
      
      <ProgressBar progress={progressPercentage} />

      <div className={styles.lessonsList}>
        {lessons.map((lesson) => {
          const { isCompleted, isLocked, isActive } = getLessonStatus(lesson.id);
          
          return (
          <LessonCard
            key={lesson.id}
            lessonNumber={lesson.id}
            title={lesson.title}
            duration={lesson.duration}
            level={lesson.level}
            isCompleted={isCompleted}
            isLocked={isLocked}
            isActive={isActive}
            onStartLesson={() => handleStartLesson(lesson.id)}
            courseId={courseId}
          />
        );
        })}
      </div>
      
      <div className={styles.actionsContainer}>
        <Link to="/courses" className={styles.backToCourses}>
          <i className="fas fa-arrow-left"></i>
          Back to All Courses
        </Link>
        
        <button 
          className={styles.resetButton}
          onClick={handleResetProgress}
        >
          <i className="fas fa-redo"></i>
          Reset Course Progress
        </button>
      </div>
    </div>
  );
};

export default LessonList;