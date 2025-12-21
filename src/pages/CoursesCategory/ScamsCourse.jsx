import React, { useState } from 'react';
import Sidebar from '../../components/Shared/Sidebar/Sidebar';
import LessonList from '../../components/Lessons/LessonsList/LessonList';
import styles from './StylesForCategories.module.css'

const ScamsCourse = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.page}>
      
      <button 
        className={styles.mobileMenuButton}
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>
      
      <div className={styles.container}>
        <div className={`${styles.sidebarContainer} ${isSidebarOpen ? styles.open : ''}`}>
          <Sidebar 
            onClose={() => setIsSidebarOpen(false)}
            currentCourse="scams"
          />
        </div>
        
        <main className={styles.mainContent}>
          <LessonList courseId="scams" />
        </main>
      </div>
      
    </div>
  );
};

export default ScamsCourse;