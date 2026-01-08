import React from 'react';
import styles from './CoursesSidebarToggle.module.css';

const CoursesSidebarToggle = ({ onToggle, isSidebarOpen }) => {
  return (
    <button 
      className={styles.sidebarToggle}
      onClick={onToggle}
      aria-label={isSidebarOpen ? "Hide Navigation" : "Show Navigation"}
    >
      <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
      {isSidebarOpen ? "Hide Navigation" : "Show Navigation"}
    </button>
  );
};

export default CoursesSidebarToggle;