import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { Notes, Rocket, Schedule } from '../../assets/Icons';
import styles from './ComingSoon.module.css';

const AdditionalCourse = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const planned = [
    { icon: '📰', title: 'Crypto News & How to Read It', desc: 'Learn to filter signal from noise in crypto media.' },
    { icon: '📱', title: 'Social Media Strategies', desc: 'Twitter, Telegram and Discord for crypto traders.' },
    { icon: '📖', title: 'Crypto Slang Dictionary', desc: 'HODL, DYOR, WAGMI — master the language of crypto.' },
  ];

  return (
    <div className={`${styles.page} ${isDark ? styles.darkMode : ''}`}>
      <div className={styles.heroBg} />

      <div className={styles.container}>
        <div className={styles.badge}>
          <Notes width={14} height={14} />
          <span>Bonus Content</span>
        </div>

        <div className={styles.comingSoonLabel}>Coming Soon</div>

        <h1 className={styles.title}>
          Additional <span className={styles.accent}>Materials</span>
        </h1>

        <p className={styles.subtitle}>
          Crypto news guides, social media tips, slang dictionary, and ongoing market
          updates — all in one place. We're putting the finishing touches on this course.
        </p>

        <div className={styles.timeline}>
          <Schedule width={18} height={18} />
          <span>Expected: Q2 2025</span>
        </div>

        <div className={styles.plannedGrid}>
          {planned.map((item, i) => (
            <div key={i} className={styles.plannedCard}>
              <div className={styles.plannedEmoji}>{item.icon}</div>
              <h3 className={styles.plannedTitle}>{item.title}</h3>
              <p className={styles.plannedDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Link to="/courses" className={styles.btnPrimary}>
            <Rocket width={18} height={18} />
            Browse Available Courses
          </Link>
          <Link to="/community" className={styles.btnSecondary}>
            Get Notified in Community
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdditionalCourse;
