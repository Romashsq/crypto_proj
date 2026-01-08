import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../Context/ThemeContext';
import { Link } from 'react-router-dom';
import LessonCard from './LessonCard/LessonCard';
import ProgressBar from '../ProgressBar/ProgressBar';
import ResetProgress from '../ResetProgress/ResetProgress';
import Toast from '../../Shared/Toast/Toast';
import styles from './LessonList.module.css';
import api from '../../../services/api';
import { lessonsData } from '../lessonData';

const LessonList = ({ courseId = "crypto" }) => {
  const { theme } = useTheme();
  
  const lessons = lessonsData[courseId] || [];
  
  const [progress, setProgress] = useState({
    overall: { completed: 0, total: lessons.length, percentage: 0 },
    courses: {}
  });
  
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    loadUserProgress();
  }, [courseId]);

  const loadUserProgress = async () => {
    try {
      setLoading(true);
      const currentUser = api.getCurrentUser();
      
      if (!currentUser) {
        setProgress({
          overall: { completed: 0, total: lessons.length, percentage: 0 },
          courses: {}
        });
        return;
      }

      const response = await api.getUserProgress(currentUser.id);
      
      if (response.success) {
        setProgress({
          overall: response.overall,
          courses: response.courses || {}
        });
      }
    } catch (error) {
      console.error('Error loading progress:', error);
      setProgress({
        overall: { completed: 0, total: lessons.length, percentage: 0 },
        courses: {}
      });
    } finally {
      setLoading(false);
    }
  };

  const getCourseProgress = () => {
    return progress.courses[courseId] || {
      completed: 0,
      total: lessons.length,
      percentage: 0,
      currentLesson: 1,
      nextLesson: 1
    };
  };

  const getLessonStatus = (lessonNumber) => {
    try {
      const courseProgress = progress.courses[courseId];
      
      if (!courseProgress) {
        // Если прогресса нет, только первый урок доступен
        return {
          isLocked: lessonNumber !== 1,
          isCompleted: false,
          canAccess: lessonNumber === 1
        };
      }
      
      // Проверяем завершен ли урок
      const lessonKey = `lesson_${lessonNumber}`;
      const isCompleted = !!courseProgress[lessonKey];
      
      // Первый урок всегда доступен
      if (lessonNumber === 1) {
        return {
          isLocked: false,
          isCompleted: isCompleted,
          canAccess: true
        };
      }
      
      // Проверяем доступность на основе предыдущего урока
      const prevLessonKey = `lesson_${lessonNumber - 1}`;
      const prevCompleted = !!courseProgress[prevLessonKey];
      
      return {
        isLocked: !prevCompleted && !isCompleted,
        isCompleted: isCompleted,
        canAccess: prevCompleted || isCompleted
      };
      
    } catch (error) {
      console.error('Error checking lesson status:', error);
      return {
        isLocked: lessonNumber !== 1,
        isCompleted: false,
        canAccess: lessonNumber === 1
      };
    }
  };

  const handleLessonComplete = (xpEarned, message) => {
    const newToast = {
      id: Date.now(),
      message: `${message} ${xpEarned > 0 ? `+${xpEarned} XP` : ''}`,
      type: 'success',
      duration: 3000
    };
    
    setToasts(prev => [...prev, newToast]);
    loadUserProgress(); // Обновляем прогресс после завершения урока
  };

  const handleRemoveToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleResetProgress = async () => {
    if (window.confirm("Are you sure you want to reset all progress for this course? This cannot be undone!")) {
      try {
        const currentUser = api.getCurrentUser();
        if (!currentUser) return;
        
        await api.resetProgress(currentUser.id, courseId);
        await loadUserProgress();
        
        // Показываем тост о сбросе прогресса
        const newToast = {
          id: Date.now(),
          message: '✅ Course progress has been reset!',
          type: 'success',
          duration: 3000
        };
        setToasts(prev => [...prev, newToast]);
      } catch (error) {
        console.error('Error resetting progress:', error);
        const newToast = {
          id: Date.now(),
          message: `❌ Failed to reset progress: ${error.message}`,
          type: 'error',
          duration: 4000
        };
        setToasts(prev => [...prev, newToast]);
      }
    }
  };

  const getCourseTitle = () => {
    const titles = {
      crypto: 'Crypto Fundamentals',
      scams: 'Scams Protection',
      memecoins: 'Memecoins',
      security: 'Security Essentials',
      additional: 'Additional Topics',
      defi: 'DeFi Fundamentals'
    };
    return titles[courseId] || 'Crypto Fundamentals';
  };

  if (loading) {
    return (
      <div className={`${styles.lessonsContainer} ${theme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading course progress...</p>
        </div>
      </div>
    );
  }

  const courseProgress = getCourseProgress();
  const totalDuration = lessons.reduce((acc, lesson) => {
    const time = parseInt(lesson.duration) || 30;
    return acc + time;
  }, 0);

  return (
    <div className={`${styles.lessonsContainer} ${theme === 'dark' ? styles.darkMode : ''}`}>
      {/* Toast контейнер */}
      <div className={styles.toastContainer}>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => handleRemoveToast(toast.id)}
          />
        ))}
      </div>
      
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
            <span>{totalDuration} min</span>
          </div>
          <div className={styles.stat}>
            <i className="fas fa-book-open"></i>
            <span>{lessons.length} Lessons</span>
          </div>
          <div className={styles.stat}>
            <i className="fas fa-chart-line"></i>
            <span>{Math.round(courseProgress.percentage)}% Complete</span>
          </div>
        </div>
      </div>
      
      <ProgressBar progress={courseProgress.percentage} />

      <div className={styles.lessonsList}>
        {lessons.map((lesson) => {
          const lessonStatus = getLessonStatus(lesson.id);
          
          return (
            <LessonCard
              key={lesson.id}
              lessonNumber={lesson.id}
              title={lesson.title}
              duration={lesson.duration}
              level={lesson.level}
              courseId={courseId}
              isLocked={lessonStatus.isLocked}
              isCompleted={lessonStatus.isCompleted}
              isActive={lesson.id === courseProgress.currentLesson}
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