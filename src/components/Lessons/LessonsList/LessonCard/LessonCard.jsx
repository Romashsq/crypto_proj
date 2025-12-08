import React from 'react';
import { useTheme } from '../../../../Context/ThemeContext';
import styles from './LessonCard.module.css';

const LessonCard = ({ 
  lessonNumber, 
  title, 
  duration, 
  level, 
  status = 'available', // 'available', 'locked', 'completed'
  isLocked = false,
  isCompleted = false,
  onStartLesson,
  isActive = false
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleClick = () => {
    if (!isLocked && onStartLesson) {
      onStartLesson(lessonNumber);
    }
  };

  const getStatusText = () => {
    if (isCompleted) return 'Completed';
    if (isLocked) return 'Locked';
    return 'Available';
  };

  const getStatusClass = () => {
    if (isCompleted) return styles.statusCompleted;
    if (isLocked) return styles.statusLocked;
    return styles.statusAvailable;
  };

  return (
    <div className={`${styles.lessonCard} ${isLocked ? styles.locked : ''} ${isCompleted ? styles.completed : ''} ${isActive ? styles.active : ''}`}>
      <div className={styles.lessonHeader}>
        <div className={styles.lessonInfo}>
          <div className={styles.lessonNumberContainer}>
            <span className={styles.lessonNumber}>{lessonNumber}</span>
          </div>
          <div className={styles.lessonContent}>
            <h3 className={styles.lessonTitle}>{title}</h3>
            <div className={styles.lessonMeta}>
              <div className={styles.metaItem}>
                <i className="far fa-clock"></i>
                <span>{duration}</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-signal"></i>
                <span>{level}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.lessonStatusContainer}>
          <span className={`${styles.lessonStatus} ${getStatusClass()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>
      
      <div className={styles.lessonActions}>
        {isLocked ? (
          <button className={`${styles.btn} ${styles.btnDisabled}`} disabled>
            <i className="fas fa-lock"></i>
            <span>Complete Previous Lesson</span>
          </button>
        ) : isCompleted ? (
          <button className={`${styles.btn} ${styles.btnCompleted}`}>
            <i className="fas fa-redo"></i>
            <span>Review Lesson</span>
          </button>
        ) : (
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleClick}>
            <i className="fas fa-play"></i>
            <span>Start Lesson</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonCard;