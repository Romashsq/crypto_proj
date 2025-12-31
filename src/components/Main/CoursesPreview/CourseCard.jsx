import React from 'react';
import styles from '../CoursesPreview/CoursesPreview.module.css'
// Импортируем иконки для мета-информации
import { Schedule, Lesson, Heart } from '../../../assets/Icons';

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
            <span className={styles.metaItem}>
              <Schedule className={styles.metaIcon} />
              <span className={styles.metaText}>{course.duration}</span>
            </span>
            
            <span className={styles.metaItem}>
              <Lesson className={styles.metaIcon} />
              <span className={styles.metaText}>{course.lessons}</span>
            </span>
            
            <span className={styles.metaItem}>
              <Heart className={styles.metaIcon} />
              <span className={styles.metaText}>4.9</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesCard;