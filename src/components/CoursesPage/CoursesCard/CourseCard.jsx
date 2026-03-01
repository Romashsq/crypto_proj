// CoursesCard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import styles from './CoursesCard.module.css';

const courseStatusCache = {};

const CoursesCard = ({ course }) => {
  const navigate = useNavigate();
  const hasChecked = useRef(false);

  if (!course) return null;

  const getCourseInfo = () => {
    if (course.courseId) return {
      courseId: course.courseId,
      route: course.buttonLink || `/course/${course.courseId}`
    };

    // Маппинг title → courseId (должен совпадать с тем что передаёт LessonPage через URL)
    const titleToIdMap = {
      'Crypto Fundamentals': 'crypto',
      'Scams Protection': 'scams',
      'Memecoins': 'memecoins',
      'Security Essentials': 'security',
      'Additional Materials': 'additional',
      'DeFi & Staking': 'defi',
    };

    const routeMap = {
      'crypto': '/crypto',
      'scams': '/scams',
      'memecoins': '/memecoins',
      'security': '/security',
      'additional': '/additional',
      'defi': '/defi',
    };

    const courseId = titleToIdMap[course.title] || course.title.toLowerCase().replace(/\s+/g, '-');
    const route = routeMap[courseId] || course.buttonLink || `/course/${courseId}`;

    return { courseId, route };
  };

  const { courseId, route } = getCourseInfo();

  const safeCourse = {
    courseId,
    title: course.title || 'Без названия',
    icon: course.icon || 'fa-book',
    description: course.description || 'Описание отсутствует',
    totalLessons: course.totalLessons || 6,
    buttonLink: route,
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
    if (!api.isAuthenticated()) {
      setMessage('Войдите в систему для записи на курсы');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    setEnrollLoading(true);
    setMessage('Запись на курс...');

    try {
      const response = await api.enrollCourse({
        courseId: safeCourse.courseId,
        courseTitle: safeCourse.title,
        courseIcon: '📚',
        totalLessons: safeCourse.totalLessons
      });

      if (response.success || response.isAlreadyEnrolled) {
        courseStatusCache[safeCourse.courseId] = {
          isEnrolled: true,
          progress: { percentage: 0, completedLessons: 0, totalLessons: safeCourse.totalLessons }
        };
        setIsEnrolled(true);
        setMessage('🎉 Вы успешно записались! Перенаправление...');
        setTimeout(() => navigate(safeCourse.buttonLink), 1000);
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
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    if (!isEnrolled) {
      handleEnrollAndNavigate();
      return;
    }

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

        <div className={`${styles.statusBadge} ${isEnrolled ? styles.enrolled : styles.notEnrolled}`}>
          {isEnrolled ? '✓ Записан' : 'Не записан'}
        </div>
      </div>

      {isEnrolled && (
        <div className={styles.courseProgress}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress.percentage}%` }}></div>
          </div>
          <div className={styles.progressInfo}>
            <span className={styles.progressPercentage}>{progress.percentage}%</span>
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