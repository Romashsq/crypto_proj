import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../Context_TEMP/ThemeContext';
import { useSavedLessons } from '../../../hooks/useSavedLessons';
import { useToast } from '../../../hooks/useToast';
import { Heart, Wallet, LockNoOpen, Rocket, Nft, Schedule } from '../../../assets/Icons';
import styles from './SavedLessonCard.module.css';

const SavedLessonCard = ({ lesson }) => {
  const { theme } = useTheme();
  const { removeLesson, updateLessonProgress } = useSavedLessons();
  const { showToast } = useToast();

  const getCourseIcon = (courseId) => {
    switch(courseId) {
      case 'crypto': return <Wallet width={24} height={24} />;
      case 'scams': return <LockNoOpen width={24} height={24} />;
      case 'memecoins': return <Rocket width={24} height={24} />;
      case 'security': return <LockOpen width={24} height={24} />;
      default: return <Schedule width={24} height={24} />;
    }
  };

  const getCourseColor = (courseId) => {
    switch(courseId) {
      case 'crypto': return '#9B2FFF';
      case 'scams': return '#FF4081';
      case 'memecoins': return '#00BCD4';
      case 'security': return '#4CAF50';
      default: return '#FF9800';
    }
  };

  const getCourseName = (courseId) => {
    switch(courseId) {
      case 'crypto': return 'Crypto Fundamentals';
      case 'scams': return 'Scams Protection';
      case 'memecoins': return 'Memecoins';
      case 'security': return 'Security Essentials';
      default: return 'Unknown Course';
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeLesson(lesson.courseId, lesson.id);
    showToast('Lesson removed from your list', 'info');
  };

  const handleProgressClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newProgress = lesson.progress >= 100 ? 0 : lesson.progress + 25;
    updateLessonProgress(lesson.courseId, lesson.id, newProgress);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Link 
      to={`/lesson/${lesson.courseId}/${lesson.id}`}
      className={`${styles.savedLessonCard} ${theme === 'dark' ? styles.darkMode : ''}`}
      style={{ borderLeftColor: getCourseColor(lesson.courseId) }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.courseBadge} style={{ background: getCourseColor(lesson.courseId) }}>
          {getCourseIcon(lesson.courseId)}
          <span className={styles.courseName}>{getCourseName(lesson.courseId)}</span>
        </div>
        
        <button 
          className={styles.removeBtn}
          onClick={handleRemove}
          aria-label="Remove from saved lessons"
        >
          <Heart 
            width={18} 
            height={18} 
            style={{ 
              filter: 'brightness(0) invert(1)',
              opacity: 0.8 
            }} 
          />
        </button>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.lessonTitle}>{lesson.title}</h3>
        <p className={styles.lessonDescription}>{lesson.description}</p>
        
        <div className={styles.lessonMeta}>
          <span className={styles.metaItem}>
            <i className="far fa-clock"></i>
            {lesson.duration}
          </span>
          <span className={styles.metaItem}>
            <i className="far fa-calendar"></i>
            Saved {formatDate(lesson.savedAt)}
          </span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.progressSection}>
          <div className={styles.progressLabel}>
            <span>Progress</span>
            <span className={styles.progressPercent}>{lesson.progress}%</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ 
                width: `${lesson.progress}%`,
                background: `linear-gradient(90deg, ${getCourseColor(lesson.courseId)}, ${getCourseColor(lesson.courseId)}80)`
              }}
            ></div>
          </div>
          <button 
            className={styles.updateProgressBtn}
            onClick={handleProgressClick}
          >
            {lesson.progress >= 100 ? 'Restart' : 'Mark +25%'}
          </button>
        </div>
        
        <div className={styles.actionButtons}>
          <Link 
            to={`/courses/${lesson.courseId}`}
            className={styles.viewCourseBtn}
            onClick={(e) => e.stopPropagation()}
          >
            View Course
          </Link>
          <Link 
            to={`/lesson/${lesson.courseId}/${lesson.id}`}
            className={styles.continueBtn}
          >
            {lesson.progress > 0 ? 'Continue' : 'Start Lesson'}
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default SavedLessonCard;