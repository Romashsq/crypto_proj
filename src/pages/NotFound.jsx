import React, { useState, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(10);

  // Автоматический редирект на курсы через 10 секунд
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/courses');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);

  // Получаем путь, по которому пытались перейти
  const attemptedPath = location.pathname;

  return (
    <div className={`${styles.notFoundPage} ${theme === 'dark' ? styles.darkMode : ''}`}>
      {/* Анимационный фон */}
      <div className={styles.backgroundAnimation}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
      </div>

      <div className={styles.notFoundContainer}>
        {/* Число 404 с анимацией */}
        <div className={styles.errorNumber}>
          <span className={styles.number}>4</span>
          <div className={styles.zeroContainer}>
            <div className={styles.zero}>
              <div className={styles.zeroInner}></div>
            </div>
          </div>
          <span className={styles.number}>4</span>
        </div>

        {/* Заголовок и описание */}
        <div className={styles.textContent}>
          <h1 className={styles.title}>Page Not Found</h1>
          <h2 className={styles.subtitle}>Lost in the Digital Void</h2>
          <p className={styles.description}>
            The page you're looking for has either been moved, deleted, or never existed.
            But don't worry! Let's get you back on track with your crypto learning journey.
          </p>
        </div>

        {/* Информация об ошибке */}
        <div className={styles.errorCodes}>
          <h3>Error Details:</h3>
          <div className={styles.codeBlock}>
            <code>
              <span className={styles.codeLine}>$ Attempted path: <strong>{attemptedPath}</strong></span>
              <span className={`${styles.codeLine} ${styles.error}`}>✗ Error 404: Resource not found</span>
              <span className={`${styles.codeLine} ${styles.solution}`}>✓ Status: Auto-redirecting to courses...</span>
              <span className={styles.codeLine}>$ Countdown: {countdown} seconds</span>
            </code>
          </div>
        </div>

        {/* Основные кнопки действий */}
        <div className={styles.actionButtons}>
          <Link to="/courses" className={styles.primaryButton}>
            <i className={`fas fa-book-open ${styles.buttonIcon}`}></i>
            Go to Courses
          </Link>
          
          <Link to="/" className={styles.secondaryButton}>
            <i className={`fas fa-home ${styles.buttonIcon}`}></i>
            Back to Home
          </Link>
        </div>

        {/* Быстрые ссылки */}
        <div className={styles.quickLinks}>
          <h3>Popular Pages:</h3>
          <div className={styles.linkGrid}>
            <Link to="/courses/crypto" className={styles.quickLink}>
              <i className="fas fa-coins"></i>
              <span>Crypto Fundamentals</span>
            </Link>
            
            <Link to="/courses/security" className={styles.quickLink}>
              <i className="fas fa-shield-alt"></i>
              <span>Security Essentials</span>
            </Link>
            
            <Link to="/your-lessons" className={styles.quickLink}>
              <i className="fas fa-bookmark"></i>
              <span>Your Lessons</span>
            </Link>
            
            <Link to="/dashboard" className={styles.quickLink}>
              <i className="fas fa-chart-line"></i>
              <span>Progress Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;