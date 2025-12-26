// Home.jsx
import React, { useEffect } from 'react';
import Hero from '../components/Main/Hero/Hero';
import LearningPath from '../components/Main/LearningPath/LearningPath';
import CoursesPreview from '../components/Main/CoursesPreview/CoursesPreview';
import MoreSection from '../components/Main/MoreSection/MoreSection';

const Home = () => {
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && hash !== '#/') {
        const targetId = hash.replace('#', '');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      }
    };

    handleHash();
    
    const handleHashChange = () => {
      handleHash();
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <LearningPath id="learning-path" />
      <CoursesPreview />
      <MoreSection id="more-section" />
    </div>
  );
};

export default Home;