import React from 'react';
import Header from '../components/Shared/Header/Header';
import Hero from '../components/Main/Hero/Hero';
import LearningPath from '../components/Main/LearningPath/LearningPath';
import CoursesPreview from '../components/Main/CoursesPreview/CoursesPreview';
import MoreSection from '../components/Main/MoreSection/MoreSection';
import Footer from '../components/Shared/Footer/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <LearningPath />
      <CoursesPreview />
      <MoreSection />
      <Footer />
    </div>
  );
};

export default Home;