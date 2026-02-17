import React from 'react';
import { useTheme } from '../../../Context_TEMP/ThemeContext';
import styles from '../LessonsList/LessonList.module.css'

const ProgressBar = ({ progress = 0 }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className={`${styles.progressContainer} ${isDarkMode ? styles.darkMode : ''}`}>
      <div className={styles.progressHeader}>
        <div className={styles.progressTitle}>
          <i className="fas fa-chart-line"></i>
          <span>Course Progress</span>
        </div>
        <div className={styles.progressPercentage}>
          {Math.round(progress)}%
        </div>
      </div>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className={styles.progressStats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{Math.round(progress)}%</span>
          <span className={styles.statLabel}>Completed</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{Math.round(100 - progress)}%</span>
          <span className={styles.statLabel}>Remaining</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;