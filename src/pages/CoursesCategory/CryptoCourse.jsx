import React, { useState } from 'react';
import Sidebar from '../../components/Shared/Sidebar/Sidebar';
import LessonList from '../../components/Lessons/LessonsList/LessonList';
import styles from './StylesForCategories.module.css'

// useEffect(() => {
//     window.scrollTo(0, 0);
//     setTimeout(() => {
//       window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
//     }, 50);
//   }, []);

const CryptoCourse = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.coursePage}>
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
            currentCourse="crypto"
          />
        </div>
        
        <main className={styles.mainContent}>
          <LessonList courseId="crypto" />
        </main>
      </div>
    </div>
  );
};

export default CryptoCourse;