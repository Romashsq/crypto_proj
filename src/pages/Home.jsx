import React from 'react';
import Hero from '../components/Main/Hero/Hero';
import LearningPath from '../components/Main/LearningPath/LearningPath';
import CoursesPreview from '../components/Main/CoursesPreview/CoursesPreview';
import MoreSection from '../components/Main/MoreSection/MoreSection';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <LearningPath />
      <CoursesPreview />
      <MoreSection />
    </div>
  );
};

export default Home;