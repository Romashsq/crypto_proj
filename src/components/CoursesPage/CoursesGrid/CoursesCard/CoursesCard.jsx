import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CourseCard.module.css';

const CourseCard = ({ course, index }) => {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return 'fas fa-hourglass-half';
      case 'completed': return 'fas fa-check-circle';
      case 'locked': return 'fas fa-lock';
      default: return 'fas fa-circle';
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'active': return styles.active;
      case 'completed': return styles.completed;
      case 'locked': return styles.locked;
      default: return '';
    }
  };

  return (
    <div className={styles.courseCard}>
      <div className={styles.courseHeader}>
        <div className={`${styles.courseIcon} ${styles[`courseIcon${index}`]}`}>
          <i className={course.icon}></i>
        </div>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className={styles.courseProgress}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <div className={styles.progressText}>
            {course.lessons.filter(l => l.status === 'completed').length}/{course.lessonsCount} lessons
          </div>
        </div>
      </div>
      
      <div className={styles.courseLessons}>
        {course.lessons.map((lesson) => (
          <div 
            key={lesson.id}
            className={`${styles.lessonItem} ${getStatusClass(lesson.status)}`}
          >
            <div className={styles.lessonNumber}>{lesson.id}</div>
            <div className={styles.lessonInfo}>
              <div className={styles.lessonTitle}>{lesson.title}</div>
              <div className={styles.lessonDuration}>{lesson.duration}</div>
            </div>
            <div className={styles.lessonStatusIcon}>
              <i className={getStatusIcon(lesson.status)}></i>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.courseActions}>
        {course.progress > 0 ? (
          <Link to={`/course/${course.id}`} className={styles.btnContinue}>
            Continue Learning
          </Link>
        ) : (
          <Link to={`/course/${course.id}`} className={styles.btnStart}>
            Start Course
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseCard;