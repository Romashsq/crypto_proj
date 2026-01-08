import React from 'react';
import CoursesCard from '../CoursesCard/CouseCard';
import styles from './CoursesGrid.module.css';

const CoursesGrid = ({ courses }) => {
  return (
    <div className={styles.coursesGrid}>
      {courses.map((course, index) => (
        <CoursesCard key={index} course={course} />
      ))}
    </div>
  );
};

export default CoursesGrid;