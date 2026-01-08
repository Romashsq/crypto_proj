// LessonCard.jsx - ИСПРАВЛЕННАЯ ВЕРСИЯ
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../../Context/ThemeContext';
import SaveButton from '../../../Shared/SaveButton/SaveButton';
import styles from './LessonCard.module.css';

const LessonCard = ({ 
  lessonNumber, 
  title, 
  duration, 
  level, 
  isLocked = false,
  isCompleted = false,
  isActive = false,
  courseId = 'crypto'
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const lesson = {
    id: lessonNumber,
    courseId: courseId,
    title: title,
    duration: duration,
    level: level,
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
    <div className={`${styles.lessonCard} ${isLocked ? styles.locked : ''} ${isCompleted ? styles.completed : ''} ${isActive ? styles.active : ''} ${isDarkMode ? styles.darkMode : ''}`}>
      <div className={styles.lessonHeader}>
        <div className={styles.lessonInfo}>
          <div className={styles.lessonNumberContainer}>
            <span className={styles.lessonNumber}>{lessonNumber}</span>
          </div>
          <div className={styles.lessonContent}>
            <h3 className={styles.lessonTitle}>
              {title}
              <SaveButton 
                lesson={lesson}
                size="small"
                showLabel={false}
              />
            </h3>
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
        ) : (
          <Link 
            to={`/lesson/${courseId}/${lessonNumber}`}
            className={`${styles.btn} ${isCompleted ? styles.btnCompleted : styles.btnPrimary}`}
          >
            <i className={`fas ${isCompleted ? 'fa-redo' : 'fa-play'}`}></i>
            <span>{isCompleted ? 'Review Lesson' : 'Start Lesson'}</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LessonCard;