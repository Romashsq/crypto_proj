import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../Context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import LessonCard from './LessonCard/LessonCard';
import ProgressBar from '../ProgressBar/ProgressBar';
import Toast from '../../Shared/Toast/Toast';
import styles from './LessonList.module.css';
import api from '../../../services/api';
import { lessonsData } from '../lessonData';

const LessonList = ({ courseId = "crypto" }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const lessons = lessonsData[courseId] || [];
  
  const [progress, setProgress] = useState({
    overall: { completed: 0, total: lessons.length, percentage: 0 },
    completedLessons: []
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
          completedLessons: []
        });
        return;
      }

      const response = await api.getCourseProgress(courseId);
      
      if (response.success) {
        const courseProgress = response.progress || {};
        
        let completedLessons = [];
        
        if (courseProgress.completedLessons) {
          if (Array.isArray(courseProgress.completedLessons)) {
            completedLessons = courseProgress.completedLessons;
          } 
          else if (typeof courseProgress.completedLessons === 'number') {
            for (let i = 1; i <= courseProgress.completedLessons; i++) {
              completedLessons.push(i);
            }
          }
          else if (typeof courseProgress.completedLessons === 'string') {
            completedLessons = courseProgress.completedLessons
              .split(',')
              .map(num => parseInt(num.trim()))
              .filter(num => !isNaN(num));
          }
        }
        
        const totalLessons = lessons.length;
        const completedCount = completedLessons.length;
        
        setProgress({
          overall: { 
            completed: completedCount, 
            total: totalLessons, 
            percentage: totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0 
          },
          completedLessons: completedLessons
        });
      } else {
        setProgress({
          overall: { completed: 0, total: lessons.length, percentage: 0 },
          completedLessons: []
        });
      }
    } catch (error) {
      console.error('Error loading progress:', error);
      setProgress({
        overall: { completed: 0, total: lessons.length, percentage: 0 },
        completedLessons: []
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLessonNumber = () => {
    const { completedLessons } = progress;
    
    const completedArray = Array.isArray(completedLessons) ? completedLessons : [];
    
    for (let i = 1; i <= lessons.length; i++) {
      if (!completedArray.includes(i)) {
        return i;
      }
    }
    
    return lessons.length;
  };

  const getNextLessonNumber = () => {
    const current = getCurrentLessonNumber();
    return Math.min(current + 1, lessons.length);
  };

  const getCourseProgress = () => {
    const currentLesson = getCurrentLessonNumber();
    const nextLesson = getNextLessonNumber();
    const { overall } = progress;
    
    return {
      completed: overall.completed,
      total: overall.total,
      percentage: overall.percentage,
      currentLesson: currentLesson,
      nextLesson: nextLesson
    };
  };

  const getLessonStatus = (lessonNumber) => {
    const { completedLessons } = progress;
    
    const completedArray = Array.isArray(completedLessons) ? completedLessons : [];
    
    const isCompleted = completedArray.includes(lessonNumber);
    
    if (lessonNumber === 1) {
      return {
        isLocked: false,
        isCompleted: isCompleted,
        canAccess: true
      };
    }
    
    const prevCompleted = completedArray.includes(lessonNumber - 1);
    const canAccess = prevCompleted || isCompleted;
    
    return {
      isLocked: !canAccess,
      isCompleted: isCompleted,
      canAccess: canAccess
    };
  };

  const handleLessonComplete = async (xpEarned, message) => {
    try {
      const newToast = {
        id: Date.now(),
        message: `${message} ${xpEarned > 0 ? `+${xpEarned} XP` : ''}`,
        type: 'success',
        duration: 3000
      };
      
      setToasts(prev => [...prev, newToast]);
      
      setTimeout(() => {
        loadUserProgress();
        
        const courseProgress = getCourseProgress();
        if (courseProgress.nextLesson <= lessons.length) {
          setTimeout(() => {
            const nextToast = {
              id: Date.now() + 1,
              message: `🎉 Next lesson unlocked! Continue to Lesson ${courseProgress.nextLesson}`,
              type: 'info',
              duration: 4000
            };
            setToasts(prev => [...prev, nextToast]);
          }, 1000);
        }
      }, 500);
      
    } catch (error) {
      console.error('Error handling lesson completion:', error);
    }
  };

  const handleRemoveToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleResetProgress = async () => {
    if (window.confirm("Are you sure you want to reset all progress for this course? This cannot be undone!")) {
      try {
        const currentUser = api.getCurrentUser();
        if (!currentUser) return;
        
        setProgress({
          overall: { completed: 0, total: lessons.length, percentage: 0 },
          completedLessons: []
        });
        
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
          Back to All Courses
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
      
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <h2 className={styles.progressTitle}>
            <i className="fas fa-trophy"></i>
            Course Progress
          </h2>
          <div className={styles.progressPercentage}>
            {Math.round(courseProgress.percentage)}%
          </div>
        </div>
        
        <div className={styles.progressBarWrapper}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${courseProgress.percentage}%` }}
            ></div>
          </div>
          <div className={styles.progressLabels}>
            <span className={styles.completedLabel}>
              {Math.round(courseProgress.percentage)}% Completed
            </span>
            <span className={styles.remainingLabel}>
              {Math.round(100 - courseProgress.percentage)}% Remaining
            </span>
          </div>
        </div>
        
        <div className={styles.progressStats}>
          <div className={styles.progressStat}>
            <div className={styles.statNumber}>{courseProgress.completed}</div>
            <div className={styles.statLabel}>Lessons Completed</div>
          </div>
          <div className={styles.progressStat}>
            <div className={styles.statNumber}>{courseProgress.total}</div>
            <div className={styles.statLabel}>Total Lessons</div>
          </div>
          <div className={styles.progressStat}>
            <div className={styles.statNumber}>{courseProgress.currentLesson}</div>
            <div className={styles.statLabel}>Current Lesson</div>
          </div>
        </div>
      </div>

      {/* Кнопка продолжить обучение - УПРОЩЕННАЯ ВЕРСИЯ */}
      {courseProgress.currentLesson <= lessons.length && (
        <div className={styles.continueSection}>
          <Link 
            to={`/lesson/${courseId}/${courseProgress.currentLesson}`}
            className={styles.continueButton}
          >
            <i className="fas fa-play-circle"></i>
            <span className={styles.continueText}>
              {courseProgress.completed > 0 ? 'Continue Learning' : 'Start Learning'}
            </span>
          </Link>
        </div>
      )}

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
              totalLessons={lessons.length}
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