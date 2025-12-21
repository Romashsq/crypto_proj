import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../Context/ThemeContext';
import { Link } from 'react-router-dom';
import LessonCard from './LessonCard/LessonCard';
import ProgressBar from '../ProgressBar/ProgressBar';
import ResetProgress from '../ResetProgress/ResetProgress';
import styles from './LessonList.module.css';
// ИМПОРТИРУЕМ ЕДИНУЮ СИСТЕМУ ПРОГРЕССА
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
  
  // ИСПОЛЬЗУЕМ ЕДИНУЮ СИСТЕМУ ПРОГРЕССА
  const [progress, setProgress] = useState(() => {
    const stored = getProgress();
    const courseProgress = stored[courseId] || {
      completedLessons: [],
      currentLesson: 1,
      totalLessons: 0
    };
    return courseProgress;
  });

  const lessonsData = {
    crypto: [
      { id: 1, title: "SOL - Solana Fundamentals", duration: "45 min", level: "Beginner" },
      { id: 2, title: "BTC - Bitcoin Basics", duration: "35 min", level: "Beginner" },
      { id: 3, title: "ETH - Ethereum Ecosystem", duration: "50 min", level: "Intermediate" },
      { id: 4, title: "SUI - New Generation Blockchain", duration: "30 min", level: "Intermediate" },
      { id: 5, title: "BASE - Coinbase Layer 2", duration: "25 min", level: "Intermediate" },
      { id: 6, title: "BNB - Binance Ecosystem", duration: "40 min", level: "Intermediate" }
    ],
    scams: [
      { id: 1, title: "PUMP n DUMP Schemes", duration: "30 min", level: "Beginner" },
      { id: 2, title: "BUNDLES Scams", duration: "25 min", level: "Beginner" },
      { id: 3, title: "RUGPULL Identification", duration: "35 min", level: "Intermediate" },
      { id: 4, title: "FISHING Attacks", duration: "20 min", level: "Intermediate" },
      { id: 5, title: "Fake CALLS Protection", duration: "15 min", level: "Beginner" }
    ],
    memecoins: [
      { id: 1, title: "How to Create Memecoins", duration: "40 min", level: "Beginner" },
      { id: 2, title: "How Memecoins Work", duration: "35 min", level: "Beginner" },
      { id: 3, title: "How to Trade Memecoins", duration: "50 min", level: "Intermediate" },
      { id: 4, title: "Where to Trade Memecoins", duration: "25 min", level: "Intermediate" }
    ],
    security: [
      { id: 1, title: "How to Avoid Being Larped", duration: "30 min", level: "Beginner" },
      { id: 2, title: "How to Avoid Being Drowned", duration: "25 min", level: "Beginner" },
      { id: 3, title: "Best Security Options", duration: "40 min", level: "Intermediate" }
    ]
  };

  const lessons = lessonsData[courseId] || lessonsData.crypto;

  // УСТАНАВЛИВАЕМ totalLessons ПРИ ЗАГРУЗКЕ
  useEffect(() => {
    const stored = getProgress();
    const courseProgress = stored[courseId] || {
      completedLessons: [],
      currentLesson: 1,
      totalLessons: lessons.length
    };
    
    // Обновляем totalLessons если не совпадает
    if (courseProgress.totalLessons !== lessons.length) {
      const updatedProgress = {
        ...courseProgress,
        totalLessons: lessons.length
      };
      
      // Сохраняем в localStorage
      const allProgress = { ...stored };
      allProgress[courseId] = updatedProgress;
      localStorage.setItem('flow_course_progress', JSON.stringify(allProgress));
      
      setProgress(updatedProgress);
    } else {
      setProgress(courseProgress);
    }
  }, [courseId, lessons.length]);

  // СЛУШАЕМ ИЗМЕНЕНИЯ ПРОГРЕССА ИЗ LessonPage
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

  // Обработчик старта урока - ОТМЕЧАЕМ УРОК КАК ПРОЙДЕННЫЙ
  const handleStartLesson = (lessonId) => {
    // Проверяем, доступен ли урок
    if (lessonId > progress.currentLesson) {
      return; // Ничего не делаем
    }

    // Отмечаем урок как пройденный через единую систему
    markLessonCompleted(courseId, lessonId);
    
    // Обновляем локальное состояние
    const stored = getProgress();
    const updatedProgress = stored[courseId];
    setProgress(updatedProgress);
  };

  const handleResetProgress = () => {
    resetCourseProgress(courseId);
    
    // Обновляем локальное состояние
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

  return (
    <div className={`${styles.lessonsContainer} ${theme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.courseHeader}>
        <Link to="/courses" className={styles.backButton}>
          <i className="fas fa-arrow-left"></i>
          Back to Courses
        </Link>
        
        <h1 className={styles.courseTitle}>
          {courseId === 'crypto' ? 'Crypto Fundamentals' : 
           courseId === 'scams' ? 'Scams Protection' :
           courseId === 'memecoins' ? 'Memecoins' : 'Security Essentials'}
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