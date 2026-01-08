// /frontend/components/CoursesCard.jsx - С ЗАЩИТОЙ ОТ UNDEFINED
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import courseService from '../../../services/courseService';
import api from '../../../services/api';
import styles from './CoursesCard.module.css';

const CoursesCard = ({ course }) => {
  const navigate = useNavigate();
  
  // Проверяем что курс существует
  if (!course) {
    console.error('❌ CoursesCard: передан undefined курс!');
    return (
      <div className={styles.errorCard}>
        <div className={styles.errorIcon}>⚠️</div>
        <p>Ошибка загрузки курса</p>
      </div>
    );
  }

  // Создаем безопасный объект курса с дефолтными значениями
  const safeCourse = {
    courseId: course.courseId || course.id || 'unknown',
    title: course.title || 'Без названия',
    icon: course.icon || 'fa-book',
    description: course.description || 'Описание отсутствует',
    totalLessons: course.totalLessons || 0,
    buttonLink: course.buttonLink || `/course/${course.courseId || 'unknown'}`,
    lessons: course.lessons || []
  };

  console.log('📦 CoursesCard загружается:', safeCourse);
  
  // Состояния
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState({
    percentage: 0,
    completed: 0,
    total: safeCourse.totalLessons
  });

  // Проверяем статус курса при загрузке
  useEffect(() => {
    if (!safeCourse.courseId || safeCourse.courseId === 'unknown') {
      console.error('❌ Некорректный courseId:', safeCourse.courseId);
      setError('Некорректный идентификатор курса');
      return;
    }
    
    checkCourseStatus();
  }, [safeCourse.courseId]);

  const checkCourseStatus = async () => {
    console.log('🔍 Начинаю проверку статуса курса:', safeCourse.courseId);
    
    try {
      setIsLoading(true);
      
      // Проверяем аутентификацию
      const isAuth = api.isAuthenticated();
      console.log('🔍 isAuthenticated():', isAuth);
      
      if (!isAuth) {
        console.log('❌ Пользователь не аутентифицирован');
        setIsSaved(false);
        return;
      }
      
      console.log('🔍 Вызываю courseService.isCourseSaved...');
      const saved = await courseService.isCourseSaved(safeCourse.courseId);
      console.log('🔍 Результат isCourseSaved:', saved);
      
      setIsSaved(saved);
      
      if (saved) {
        console.log('🔍 Курс сохранен, получаю прогресс...');
        const progressData = await courseService.getUserCourseProgress(safeCourse.courseId);
        console.log('🔍 Полученный прогресс:', progressData);
        
        if (progressData) {
          setProgress({
            percentage: progressData.percentage || 0,
            completed: progressData.completedLessons || 0,
            total: progressData.totalLessons || safeCourse.totalLessons
          });
        } else {
          console.log('⚠️ Прогресс не получен, устанавливаю 0');
          setProgress({
            percentage: 0,
            completed: 0,
            total: safeCourse.totalLessons
          });
        }
      } else {
        console.log('ℹ️ Курс не сохранен, сбрасываю прогресс');
        setProgress({
          percentage: 0,
          completed: 0,
          total: safeCourse.totalLessons
        });
      }
      
    } catch (error) {
      console.error('❌ Ошибка проверки статуса курса:', error);
      setError('Ошибка загрузки статуса курса');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCourse = async () => {
    console.log('💾 Начинаю сохранение курса:', safeCourse.courseId);
    
    // Проверяем авторизацию
    const isAuth = api.isAuthenticated();
    console.log('💾 Аутентификация перед сохранением:', isAuth);
    
    if (!isAuth) {
      setError('Войдите в систему для сохранения курсов');
      setTimeout(() => {
        setError('');
        navigate('/login');
      }, 2000);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('💾 Вызываю courseService.saveCourseToUser...');
      const result = await courseService.saveCourseToUser(safeCourse);
      console.log('💾 Результат сохранения:', result);
      
      if (result.success) {
        setIsSaved(true);
        console.log('✅ Курс успешно сохранен, обновляю статус...');
        // Обновляем прогресс после сохранения
        await checkCourseStatus();
        // Показываем сообщение об успехе на 2 секунды
        setError('✅ Курс успешно сохранен!');
        setTimeout(() => setError(''), 2000);
      } else {
        setError(result.message || 'Ошибка сохранения курса');
        console.error('❌ Ошибка при сохранении:', result.message);
      }
    } catch (error) {
      console.error('❌ Исключение при сохранении:', error);
      setError('Ошибка сети. Проверьте соединение.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartCourse = async () => {
    console.log('🚀 Начинаю курс:', safeCourse.courseId);
    console.log('🚀 isSaved:', isSaved);
    
    // Проверяем авторизацию
    const isAuth = api.isAuthenticated();
    console.log('🚀 Аутентификация перед началом:', isAuth);
    
    if (!isAuth) {
      setError('Войдите в систему для начала курса');
      setTimeout(() => {
        setError('');
        navigate('/login');
      }, 2000);
      return;
    }

    if (!isSaved) {
      console.log('🚀 Курс не сохранен, сначала сохраняю...');
      // Сначала сохраняем курс
      await handleSaveCourse();
    }
    
    // Переходим к курсу только если он сохранен
    if (isSaved) {
      console.log('🚀 Перехожу к курсу:', safeCourse.buttonLink);
      navigate(safeCourse.buttonLink);
    } else {
      console.log('⚠️ Курс все еще не сохранен, не перехожу');
    }
  };

  // Определяем текст кнопки
  const getButtonText = () => {
    if (isLoading) return 'Загрузка...';
    if (!isSaved) return 'Добавить курс';
    if (progress.completed === 0) return 'Начать обучение';
    if (progress.completed < progress.total) return 'Продолжить';
    return 'Повторить курс';
  };

  // Получаем иконку для кнопки
  const getButtonIcon = () => {
    if (!isSaved) return 'fa-plus';
    if (progress.completed === 0) return 'fa-play';
    if (progress.completed < progress.total) return 'fa-forward';
    return 'fa-redo';
  };

  // Получаем цвет прогресса
  const getProgressColor = (percentage) => {
    if (percentage === 0) return '#E2E8F0';
    if (percentage < 30) return '#FF6B6B';
    if (percentage < 70) return '#FFD93D';
    if (percentage < 90) return '#6BCF7F';
    return '#9B2FFF';
  };

  return (
    <div className={styles.courseCard}>
      {/* Заголовок с иконкой */}
      <div className={styles.courseHeader}>
        <div className={styles.courseIcon}>
          <i className={`fas ${safeCourse.icon}`}></i>
        </div>
        <div className={styles.courseInfo}>
          <h3 className={styles.courseTitle}>{safeCourse.title}</h3>
          <p className={styles.courseDescription}>{safeCourse.description}</p>
        </div>
        
        {/* Кнопка сохранения */}
        <button 
          className={`${styles.saveButton} ${
            isSaved ? styles.saved : ''
          } ${isLoading ? styles.loading : ''}`}
          onClick={handleSaveCourse}
          disabled={isLoading || isSaved}
          title={isSaved ? 'Курс сохранен' : 'Сохранить курс'}
        >
          <i className={`fas ${isSaved ? 'fa-check' : 'fa-bookmark'}`}></i>
        </button>
      </div>

      {/* Информация для отладки */}
      <div className={styles.debugInfo}>
        <small>
          ID: {safeCourse.courseId} | Сохранен: {isSaved ? 'Да' : 'Нет'} | 
          Загрузка: {isLoading ? 'Да' : 'Нет'}
        </small>
      </div>

      {/* Прогресс */}
      <div className={styles.courseProgress}>
        {isSaved ? (
          <>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ 
                  width: `${progress.percentage}%`,
                  backgroundColor: getProgressColor(progress.percentage)
                }}
              ></div>
            </div>
            <div className={styles.progressInfo}>
              <span className={styles.progressPercentage}>
                {progress.percentage}%
              </span>
              <span className={styles.progressLessons}>
                {progress.completed}/{progress.total} уроков
              </span>
            </div>
          </>
        ) : (
          <div className={styles.notStarted}>
            <span className={styles.notStartedBadge}>Не начат</span>
            <span className={styles.totalLessons}>
              <i className="fas fa-book-open"></i> {safeCourse.totalLessons} уроков
            </span>
          </div>
        )}
      </div>

      {/* Сообщения об ошибках/успехе */}
      {error && (
        <div className={`${styles.message} ${
          error.includes('✅') ? styles.successMessage : styles.errorMessage
        }`}>
          <i className={`fas ${
            error.includes('✅') ? 'fa-check-circle' : 'fa-exclamation-circle'
          }`}></i> 
          {error}
          <button 
            className={styles.dismissButton}
            onClick={() => setError('')}
          >
            ×
          </button>
        </div>
      )}

      {/* Кнопка действий */}
      <div className={styles.courseActions}>
        <button
          className={`${styles.actionButton} ${
            isSaved ? styles.continueButton : styles.startButton
          } ${isLoading ? styles.disabledButton : ''}`}
          onClick={handleStartCourse}
          disabled={isLoading}
        >
          <span className={styles.buttonText}>
            {getButtonText()}
          </span>
          <i className={`fas ${getButtonIcon()}`}></i>
        </button>
      </div>
    </div>
  );
};

export default CoursesCard;