import React, { useState } from 'react';
import Header from '../../components/Shared/Header/Header';
import Sidebar from '../../components/Shared/Sidebar/Sidebar';
import Footer from '../../components/Shared/Footer/Footer';
import LessonList from '../../components/Lessons/LessonsList/LessonList';
import styles from './StylesForCategories.module.css'

const SecurityCourse = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.page}>
      <Header />
      
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
            currentCourse="security"
          />
        </div>
        
        <main className={styles.mainContent}>
          <LessonList courseId="security" />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default SecurityCourse;