import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../Context/ThemeContext';
import { Heart } from '../../../assets/Icons';
import styles from './EmptyState.module.css';

const EmptyState = ({ filter = 'all' }) => {
  const { theme } = useTheme();

  const getMessage = () => {
    if (filter !== 'all') {
      return `No saved lessons found in ${filter} category`;
    }
    return 'No saved lessons yet';
  };

  const getSubmessage = () => {
    if (filter !== 'all') {
      return 'Try exploring other categories or save some lessons first';
    }
    return 'Start exploring courses and save lessons you want to revisit';
  };

  return (
    <div className={`${styles.emptyState} ${theme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.emptyIcon}>
        <Heart width={64} height={64} />
      </div>
      
      <h3 className={styles.emptyTitle}>{getMessage()}</h3>
      <p className={styles.emptySubtitle}>{getSubmessage()}</p>
      
      <div className={styles.emptyActions}>
        <Link to="/courses" className={styles.exploreBtn}>
          <i className="fas fa-compass"></i>
          Explore Courses
        </Link>
        
        <Link to="/" className={styles.homeBtn}>
          <i className="fas fa-home"></i>
          Back to Home
        </Link>
      </div>
      
      <div className={styles.emptyTips}>
        <h4>How to save lessons:</h4>
        <ul>
          <li>Click the heart icon on any lesson card</li>
          <li>Click "Save" button on lesson page</li>
          <li>Your saved lessons will appear here</li>
        </ul>
      </div>
    </div>
  );
};

export default EmptyState;