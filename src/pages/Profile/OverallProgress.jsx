// /frontend/components/OverallProgress.jsx - РАБОЧАЯ ВЕРСИЯ
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import styles from './OverallProgress.module.css';

const OverallProgress = () => {
  const [stats, setStats] = useState({
    totalProgress: 0,
    completedCourses: 0,
    enrolledCourses: 0,
    completedLessons: 0,
    totalLessons: 0,
    courses: [],
    xp: 0,
    level: 1,
    streak: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOverallProgress();
  }, []);

  const fetchOverallProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.getOverallProgress();
      
      if (response.success) {
        setStats({
          totalProgress: response.totalProgress || 0,
          completedCourses: response.completedCourses || 0,
          enrolledCourses: response.enrolledCourses || 0,
          completedLessons: response.completedLessons || 0,
          totalLessons: response.totalLessons || 0,
          courses: response.courses || [],
          xp: response.xp || 0,
          level: response.level || 1,
          streak: response.streak || 0
        });
      } else {
        setError(response.error || 'Не удалось загрузить прогресс');
      }
    } catch (error) {
      console.error('Ошибка получения прогресса:', error);
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  // Функция для получения цвета прогресса
  const getProgressColor = (percentage) => {
    if (percentage === 0) return '#E2E8F0';
    if (percentage < 30) return '#FF6B6B';
    if (percentage < 70) return '#FFD93D';
    if (percentage < 90) return '#6BCF7F';
    return '#9B2FFF';
  };

  // Получаем курс с лучшим прогрессом
  const getTopCourse = () => {
    if (stats.courses.length === 0) return null;
    
    const coursesWithProgress = stats.courses.filter(course => course.percentage > 0);
    if (coursesWithProgress.length === 0) return null;
    
    return coursesWithProgress.reduce((prev, current) => 
      prev.percentage > current.percentage ? prev : current
    );
  };

  // Форматирование даты
  const formatDate = (dateString) => {
    if (!dateString) return 'Никогда';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short'
      });
    } catch (error) {
      return 'Некорректная дата';
    }
  };

  if (loading) {
    return (
      <div className={styles.overallProgressCard}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p>Загрузка данных прогресса...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.overallProgressCard}>
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>❌</div>
          <p>{error}</p>
          <button 
            className={styles.retryButton}
            onClick={fetchOverallProgress}
          >
            Повторить попытку
          </button>
        </div>
      </div>
    );
  }

  const topCourse = getTopCourse();

  return (
    <div className={styles.overallProgressCard}>
      <div className={styles.overallProgressHeader}>
        <div>
          <h2>Общий прогресс</h2>
          <p>Отслеживайте ваш прогресс по всем курсам</p>
        </div>
        <div className={styles.overallProgressValue}>
          <span>{stats.totalProgress}%</span>
          <div className={styles.progressLabel}>Общий прогресс</div>
        </div>
      </div>
      
      {/* Основной прогресс бар */}
      <div className={styles.overallProgressBar}>
        <div 
          className={styles.overallProgressFill}
          style={{ 
            width: `${stats.totalProgress}%`,
            background: getProgressColor(stats.totalProgress)
          }}
        ></div>
      </div>
      
      {/* Быстрая статистика */}
      <div className={styles.overallProgressStats}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{stats.completedCourses}</div>
          <div className={styles.statLabel}>Завершено курсов</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{stats.enrolledCourses}</div>
          <div className={styles.statLabel}>Записано</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>
            {stats.completedLessons}/{stats.totalLessons}
          </div>
          <div className={styles.statLabel}>Уроков</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>{stats.xp}</div>
          <div className={styles.statLabel}>XP</div>
        </div>
      </div>
      
      {/* Детали по курсам */}
      {stats.courses.length > 0 ? (
        <div className={styles.courseProgressDetails}>
          <div className={styles.sectionHeader}>
            <h3>Прогресс по курсам</h3>
            <Link to="/my-courses" className={styles.viewAllLink}>
              Все курсы →
            </Link>
          </div>
          
          {/* Прогресс каждого курса */}
          <div className={styles.coursesList}>
            {stats.courses.slice(0, 3).map((course) => (
              <div key={course.courseId} className={styles.courseProgressItem}>
                <div className={styles.courseInfo}>
                  <div className={styles.courseHeader}>
                    <span className={styles.courseIcon}>{course.courseIcon || '📚'}</span>
                    <h4 className={styles.courseTitle}>
                      {course.courseTitle || course.courseId}
                    </h4>
                  </div>
                  <div className={styles.courseStats}>
                    <span>
                      {course.completedLessons}/{course.totalLessons} уроков
                    </span>
                    <span>•</span>
                    <span>Последний: {formatDate(course.lastAccessed)}</span>
                  </div>
                </div>
                <div className={styles.courseProgress}>
                  <div className={styles.courseProgressBar}>
                    <div 
                      className={styles.courseProgressFill}
                      style={{ 
                        width: `${course.percentage}%`,
                        background: getProgressColor(course.percentage)
                      }}
                    ></div>
                  </div>
                  <span className={styles.coursePercentage}>
                    {course.percentage}%
                  </span>
                </div>
              </div>
            ))}
            
            {stats.courses.length > 3 && (
              <div className={styles.moreCourses}>
                + {stats.courses.length - 3} других курсов
              </div>
            )}
          </div>
          
          {/* Лучший курс */}
          {topCourse && (
            <div className={styles.topCourse}>
              <div className={styles.topCourseIcon}>🏆</div>
              <div className={styles.topCourseInfo}>
                <div className={styles.topCourseLabel}>Лучший курс</div>
                <div className={styles.topCourseTitle}>
                  {topCourse.courseTitle || topCourse.courseId}
                </div>
                <div className={styles.topCourseProgress}>
                  <span>{topCourse.percentage}% завершено</span>
                  <span>•</span>
                  <span>{topCourse.completedLessons}/{topCourse.totalLessons} уроков</span>
                  <span>•</span>
                  <span>Начат {formatDate(topCourse.enrolledAt)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.noCourses}>
          <div className={styles.noCoursesIcon}>📚</div>
          <div className={styles.noCoursesText}>
            <h3>Нет курсов</h3>
            <p>Запишитесь на курсы, чтобы отслеживать прогресс</p>
          </div>
          <Link to="/courses" className={styles.browseCoursesBtn}>
            Найти курсы
          </Link>
        </div>
      )}
    </div>
  );
};

export default OverallProgress;