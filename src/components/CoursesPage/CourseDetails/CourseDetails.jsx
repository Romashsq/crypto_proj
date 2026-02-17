import React from 'react';
import { useTheme } from '../../../Context_TEMP/ThemeContext'
import styles from './CourseDetails.module.css';

const CourseDetails = () => {
  const { theme } = useTheme(); 
  
  const headerGradient = theme === 'dark' 
    ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B8DD6 100%)';

  return (
    <section 
      className={styles.pageHeader}
      style={{ background: headerGradient }}
    >
      <div className={styles.container}>
        <div className={`${styles.badge} ${theme === 'dark' ? styles.darkBadge : ''}`}>
          🚀 Start Your Crypto Journey
        </div>
        <h1>Crypto Courses</h1>
        <p>
          Your comprehensive guide to understanding blockchain technology, 
          cryptocurrencies, and navigating the Web3 space safely and effectively.
        </p>
        <div className={`${styles.pageSubtitle} ${theme === 'dark' ? styles.darkSubtitle : ''}`}>
          <p>
            From blockchain fundamentals to advanced trading strategies, 
            our structured learning path will help you build the knowledge 
            and confidence needed to succeed in the crypto world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;