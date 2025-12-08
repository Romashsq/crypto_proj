import React from 'react';
import { Link } from 'react-router-dom'; // ДОБАВЬ ЭТОТ ИМПОРТ
import styles from './CoursesCard.module.css';

const CoursesCard = ({ course }) => {
  const {
    title,
    icon,
    description,
    progress,
    completedLessons,
    totalLessons,
    lessons,
    buttonText,
    buttonLink,
    isStarted
  } = course;

  return (
    <div className={styles.courseCard}>
      <div className={styles.courseHeader}>
        <div className={styles.courseIcon}>
          <i className={`fas ${icon}`}></i>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={styles.courseProgress}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className={styles.progressText}>
            {completedLessons}/{totalLessons} lessons
          </div>
        </div>
      </div>
      
      <div className={styles.courseLessons}>
        {lessons.map((lesson, index) => (
          <div 
            key={index} 
            className={`${styles.lessonItem} ${
              lesson.status === 'active' ? styles.active : 
              lesson.status === 'locked' ? styles.locked : ''
            }`}
          >
            <div className={styles.lessonNumber}>{lesson.number}</div>
            <div className={styles.lessonInfo}>
              <div className={styles.lessonTitle}>{lesson.title}</div>
              <div className={styles.lessonDuration}>{lesson.duration}</div>
            </div>
            <div className={styles.lessonStatusIcon}>
              <i className={`fas ${
                lesson.status === 'active' ? 'fa-hourglass-half' :
                lesson.status === 'locked' ? 'fa-lock' : 'fa-unlock'
              }`}></i>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.courseActions}>
        {/* ЗАМЕНИ <a href="..."> НА <Link to="..."> */}
        <Link 
          to={buttonLink} 
          className={`${styles.btn} ${
            isStarted ? styles.btnContinue : styles.btnStart
          }`}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default CoursesCard;