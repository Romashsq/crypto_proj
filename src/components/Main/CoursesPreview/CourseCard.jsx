import React from 'react';
import styles from './CoursesPreview.module.css'

const CoursesCard = ({ course }) => {
  return (
    <div className={styles.courseCard}>
      <div className={styles.cardLink}>
        <div className={styles.courseImage}>
          <div className={styles.iconWrapper}>
            {course.icon}
          </div>
          <div className={styles.gradientBg}></div>
        </div>
        
        <div className={styles.courseContent}>
          <div className={styles.categoryTag}>Crypto</div>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '0%' }}></div>
          </div>
          
          <div className={styles.courseMeta}>
            <span>
              <i className="fas fa-clock"></i> {course.duration}
            </span>
            <span>
              <i className="fas fa-book-open"></i> {course.lessons}
            </span>
            <span className={styles.rating}>
              <i className="fas fa-star"></i> 4.9
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesCard;