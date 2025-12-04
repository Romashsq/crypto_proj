import React, { useState } from 'react';
import Header from '../components/Shared/Header/Header';
import Footer from '../components/Shared/Footer/Footer';
import Sidebar from '../components/Shared/Sidebar/Sidebar';
import CoursesHeader from '../components/Main/CoursesHeader/CoursesHeader';
import CoursesGrid from '../components/Main/CoursesGrid/CoursesGrid';
import CoursesSidebarToggle from '../components/Main/CoursesSidebarToggle/CoursesSidebarToggle';
import styles from './Courses.module.css';

const Courses = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('sol');

  return (
    <div className={styles.coursesPage}>
      <Header />
      <CoursesHeader />
      
      <div className={`${styles.container} ${styles.coursesLayout}`}>
        
        <CoursesSidebarToggle 
          isVisible={isSidebarVisible}
          onToggle={() => setIsSidebarVisible(!isSidebarVisible)}
        />
        
        {isSidebarVisible && (
          <Sidebar 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        )}
        
        <main className={styles.mainContent}>
          <CoursesGrid />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Courses;