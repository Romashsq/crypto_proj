// CoursesCard.jsx - ИСПРАВЛЕННАЯ ВЕРСИЯ
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import styles from './CoursesCard.module.css';

const courseStatusCache = {};

const CoursesCard = ({ course }) => {
  const navigate = useNavigate();
  const hasChecked = useRef(false);
  
  if (!course) {
    return null;
  }

  // Функция для получения корректного courseId и ссылки
  const getCourseInfo = () => {
    // Если в курсе уже есть courseId - используем его
    if (course.courseId) return { 
      courseId: course.courseId, 
      route: course.buttonLink || `/course/${course.courseId}` 
    };
    
    // Генерируем courseId из title
    const generatedId = course.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/&/g, '')
      .replace(/[^a-z0-9-]/g, '');
    
    // Сопоставляем с существующими маршрутами
    const routeMap = {
  'crypto-fundamentals': '/crypto',
  'scams-protection': '/scams',
  'memecoins': '/memecoins',
  'security-essentials': '/security',
  'additional-materials': '/additional',
  'defi-&-staking': '/defi',
  'crypto': '/crypto',
  'scams': '/scams',
  'security': '/security'
};
    
    return {
      courseId: generatedId,
      route: routeMap[generatedId] || `/course/${generatedId}`
    };
  };

  const { courseId, route } = getCourseInfo();
  
  const safeCourse = {
    courseId: courseId,
    title: course.title || 'Без названия',
    icon: course.icon || 'fa-book',
    description: course.description || 'Описание отсутствует',
    totalLessons: course.totalLessons || 6,
    buttonLink: route, // Используем правильный маршрут
    lessons: course.lessons || []
  };

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState({
    percentage: 0,
    completedLessons: 0,
    totalLessons: safeCourse.totalLessons
  });

  useEffect(() => {
    if (hasChecked.current || isLoading) return;
    
    checkEnrollmentStatus();
  }, [courseId]);

  const checkEnrollmentStatus = async () => {
    if (courseStatusCache[safeCourse.courseId]) {
      const cached = courseStatusCache[safeCourse.courseId];
      setIsEnrolled(cached.isEnrolled);
      setProgress(cached.progress);
      hasChecked.current = true;
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await api.checkEnrollment(safeCourse.courseId);
      
      if (response.success) {
        courseStatusCache[safeCourse.courseId] = {
          isEnrolled: response.isEnrolled,
          progress: response.progress || {
            percentage: 0,
            completedLessons: 0,
            totalLessons: safeCourse.totalLessons
          }
        };
        
        setIsEnrolled(response.isEnrolled);
        
        if (response.progress) {
          setProgress({
            percentage: response.progress.percentage || 0,
            completedLessons: response.progress.completedLessons || 0,
            totalLessons: response.progress.totalLessons || safeCourse.totalLessons
          });
        }
      }
    } catch (error) {
      console.error('❌ Ошибка сети:', error);
    } finally {
      setIsLoading(false);
      hasChecked.current = true;
    }
  };

  const handleEnrollAndNavigate = async () => {
    console.log('🎯 Запись на курс:', safeCourse.courseId, 'Маршрут:', safeCourse.buttonLink);
    
    // Если не авторизован - на логин
    if (!api.isAuthenticated()) {
      setMessage('Войдите в систему для записи на курсы');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }

    setEnrollLoading(true);
    setMessage('Запись на курс...');

    try {
      // Записываемся на курс
      const response = await api.enrollCourse({
        courseId: safeCourse.courseId,
        courseTitle: safeCourse.title,
        courseIcon: safeCourse.icon,
        totalLessons: safeCourse.totalLessons
      });
      
      if (response.success) {
        // Обновляем кэш и состояние
        courseStatusCache[safeCourse.courseId] = {
          isEnrolled: true,
          progress: {
            percentage: 0,
            completedLessons: 0,
            totalLessons: safeCourse.totalLessons
          }
        };
        
        setIsEnrolled(true);
        
        setMessage('🎉 Вы успешно записались! Перенаправление...');
        
        // Переходим на страницу курса после записи
        setTimeout(() => {
          navigate(safeCourse.buttonLink);
        }, 1000);
        
      } else if (response.error?.includes('уже записан') || response.isAlreadyEnrolled) {
        // Если уже записан - просто переходим
        setIsEnrolled(true);
        setMessage('Вы уже записаны. Переход...');
        
        setTimeout(() => {
          navigate(safeCourse.buttonLink);
        }, 1000);
        
      } else {
        setMessage(response.error || 'Ошибка записи на курс');
      }
    } catch (error) {
      console.error('❌ Исключение при записи:', error);
      setMessage('Ошибка сети. Проверьте соединение.');
    } finally {
      setEnrollLoading(false);
    }
  };

  const handleNavigateToCourse = () => {
    if (!api.isAuthenticated()) {
      setMessage('Войдите в систему для начала курса');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }

    console.log('📖 Переход к курсу:', safeCourse.buttonLink);
    
    // Если не записан - сначала записываемся
    if (!isEnrolled) {
      handleEnrollAndNavigate();
      return;
    }
    
    // Если уже записан - переходим сразу
    navigate(safeCourse.buttonLink);
  };

  const getButtonText = () => {
    if (enrollLoading) return 'Запись...';
    if (isLoading) return 'Проверка...';
    
    if (!api.isAuthenticated()) return 'Войти для записи';
    if (!isEnrolled) return 'Записаться и начать';
    if (progress.completedLessons === 0) return 'Начать обучение';
    if (progress.completedLessons < progress.totalLessons) return 'Продолжить курс';
    return 'Повторить курс';
  };

  return (
    <div className={styles.courseCard}>
      <div className={styles.courseHeader}>
        <div className={styles.courseIcon}>
          <i className={`fas ${safeCourse.icon}`}></i>
        </div>
        <div className={styles.courseInfo}>
          <h3 className={styles.courseTitle}>{safeCourse.title}</h3>
          <p className={styles.courseDescription}>{safeCourse.description}</p>
        </div>
        
        <div className={`${styles.statusBadge} ${
          isEnrolled ? styles.enrolled : styles.notEnrolled
        }`}>
          {isEnrolled ? '✓ Записан' : 'Не записан'}
        </div>
      </div>

      {isEnrolled && (
        <div className={styles.courseProgress}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
          <div className={styles.progressInfo}>
            <span className={styles.progressPercentage}>
              {progress.percentage}%
            </span>
            <span className={styles.progressLessons}>
              {progress.completedLessons}/{safeCourse.totalLessons} уроков
            </span>
          </div>
        </div>
      )}

      {message && (
        <div className={`${styles.message} ${
          message.includes('🎉') || message.includes('Переход') 
            ? styles.successMessage 
            : styles.errorMessage
        }`}>
          {message}
        </div>
      )}

      <div className={styles.courseActions}>
        <button
          className={`${styles.actionButton} ${
            !api.isAuthenticated() ? styles.loginButton :
            !isEnrolled ? styles.enrollButton :
            progress.completedLessons === 0 ? styles.startButton :
            styles.continueButton
          } ${(isLoading || enrollLoading) ? styles.disabledButton : ''}`}
          onClick={handleNavigateToCourse}
          disabled={isLoading || enrollLoading}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default CoursesCard;