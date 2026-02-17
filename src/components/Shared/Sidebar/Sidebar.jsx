import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '../../../Context_TEMP/ThemeContext';
import { 
  isLessonCompleted,
  getCurrentLesson
} from '../../../utils/progressStorage'
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { theme } = useTheme();
  const { courseId = 'crypto', lessonId } = useParams();
  const [expandedSections, setExpandedSections] = useState({
    crypto: true,
    scams: false,
    memecoins: false,
    etc: false,
    security: false,
    additional: false
  });

  useEffect(() => {
    // Автоматически раскрываем текущий курс
    if (courseId && expandedSections[courseId] === false) {
      setExpandedSections(prev => ({
        ...prev,
        [courseId]: true
      }));
    }
  }, [courseId]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Получаем статус урока
  const getLessonStatus = (course, lessonNumber) => {
    if (!course || !lessonNumber) return 'locked';
    
    // Проверяем, что курс существует
    const validCourses = ['crypto', 'scams', 'memecoins', 'security'];
    if (!validCourses.includes(course)) return 'locked';
    
    // Проверяем выполнен ли урок
    try {
      const completed = isLessonCompleted(course, lessonNumber);
      if (completed) return 'completed';
      
      const current = getCurrentLesson(course);
      if (lessonNumber === parseInt(lessonId || '1')) return 'in-progress';
      if (lessonNumber > current) return 'locked';
      
      return 'available';
    } catch (error) {
      return 'locked';
    }
  };

  // Данные для сайдбара
  const sidebarSections = [
    {
      id: 'crypto',
      title: 'CRYPTO',
      path: '/crypto', // Главная страница курса
      lessons: [
        { id: 1, title: 'SOL - Solana Fundamentals' },
        { id: 2, title: 'BTC - Bitcoin Basics' },
        { id: 3, title: 'ETH - Ethereum Ecosystem' },
        { id: 4, title: 'SUI - New Generation' },
        { id: 5, title: 'BASE - Layer 2' },
        { id: 6, title: 'BNB - Ecosystem' },
      ]
    },
    {
      id: 'scams',
      title: 'SCAMS',
      path: '/scams',
      lessons: [
        { id: 1, title: 'PUMP n DUMP Schemes' },
        { id: 2, title: 'BUNDLES Scams' },
        { id: 3, title: 'RUGPULL Identification' },
        { id: 4, title: 'FISHING Attacks' },
        { id: 5, title: 'Fake CALLS Protection' },
      ]
    },
    {
      id: 'memecoins',
      title: 'MEMECOINS',
      path: '/memecoins',
      lessons: [
        { id: 1, title: 'How to Create Memecoins' },
        { id: 2, title: 'How Memecoins Work' },
        { id: 3, title: 'How to Trade Memecoins' },
        { id: 4, title: 'Where to Trade Memecoins' },
      ]
    },
    {
      id: 'security',
      title: 'SECURITY',
      path: '/security',
      lessons: [
        { id: 1, title: 'Avoid Being Larped' },
        { id: 2, title: 'Avoid Being Drowned' },
        { id: 3, title: 'Best Security Options' },
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'in-progress': return 'fa-hourglass-half';
      case 'locked': return 'fa-lock';
      case 'completed': return 'fa-check-circle';
      case 'available': return 'fa-circle';
      default: return 'fa-circle';
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'in-progress': return styles['statusInProgress'];
      case 'locked': return styles['statusLocked'];
      case 'completed': return styles['statusCompleted'];
      default: return styles['statusAvailable'];
    }
  };

  return (
    <aside className={`${styles.sidebar} ${theme === 'dark' ? styles.darkMode : ''}`}>
      {/* Кнопка Back to Courses */}
      <div className={styles.sidebarHeader}>
        <Link to="/courses" className={styles.backToCourses}>
          <i className="fas fa-arrow-left"></i>
          Back to Courses
        </Link>
      </div>
      
      {sidebarSections.map(section => {
        const isActiveSection = expandedSections[section.id];
        const isCurrentCourse = courseId === section.id;
        
        return (
          <div 
            key={section.id} 
            className={`${styles.sidebarSection} ${isActiveSection ? styles.active : ''} ${isCurrentCourse ? styles.currentCourse : ''}`}
          >
            <h3 onClick={() => toggleSection(section.id)}>
              {section.title}
              <i className={`fas fa-chevron-${isActiveSection ? 'up' : 'down'} ${styles.toggleIcon}`}></i>
            </h3>
            
            {isActiveSection && (
              <ul className={styles.sidebarMenu}>
                {/* Ссылка на главную страницу курса */}
                <li>
                  <Link 
                    to={section.path}
                    className={`${styles.menuLink} ${isCurrentCourse && !lessonId ? styles.active : ''}`}
                  >
                    <span className={styles.lessonName}>{section.title} Overview</span>
                    <span className={`${styles.lessonStatus} ${styles.statusAvailable}`}>
                      <i className="fas fa-list"></i>
                    </span>
                  </Link>
                </li>
                
                {/* Уроки курса */}
                {section.lessons.map(lesson => {
                  const status = getLessonStatus(section.id, lesson.id);
                  const isActive = isCurrentCourse && lesson.id === parseInt(lessonId || '1');
                  
                  return (
                    <li key={`${section.id}-${lesson.id}`}>
                      <Link 
                        to={`/lesson/${section.id}/${lesson.id}`}
                        className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
                      >
                        <span className={styles.lessonName}>{lesson.title}</span>
                        <span className={`${styles.lessonStatus} ${getStatusClass(status)}`}>
                          <i className={`fas ${getStatusIcon(status)}`}></i>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
      
      {/* Дополнительные секции (Coming Soon) */}
      <div className={styles.sidebarSection}>
        <h3 onClick={() => toggleSection('additional')}>
          ADDITIONAL
          <i className={`fas fa-chevron-${expandedSections.additional ? 'up' : 'down'} ${styles.toggleIcon}`}></i>
        </h3>
        
        {expandedSections.additional && (
          <ul className={styles.sidebarMenu}>
            <li className={styles.comingSoonItem}>
              <span className={styles.lessonName}>DeFi & Staking</span>
              <span className={`${styles.lessonStatus} ${styles.statusLocked}`}>
                <i className="fas fa-lock"></i>
                Soon
              </span>
            </li>
            <li className={styles.comingSoonItem}>
              <span className={styles.lessonName}>NFT & Digital Art</span>
              <span className={`${styles.lessonStatus} ${styles.statusLocked}`}>
                <i className="fas fa-lock"></i>
                Soon
              </span>
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;