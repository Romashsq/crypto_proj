import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../Context/ThemeContext';
import { Link } from 'react-router-dom';
import LessonCard from './LessonCard/LessonCard';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './LessonList.module.css';

const LessonList = ({ courseId = "crypto" }) => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    return saved[courseId] || {
      completedLessons: [],
      currentLesson: 1
    };
  });

  const lessons = [
    { id: 1, title: "SOL - Solana Fundamentals", duration: "45 min", level: "Beginner" },
    { id: 2, title: "BTC - Bitcoin Basics", duration: "35 min", level: "Beginner" },
    { id: 3, title: "ETH - Ethereum Ecosystem", duration: "50 min", level: "Intermediate" },
    { id: 4, title: "SUI - New Generation Blockchain", duration: "30 min", level: "Intermediate" },
    { id: 5, title: "BASE - Coinbase Layer 2", duration: "25 min", level: "Intermediate" },
    { id: 6, title: "BNB - Binance Ecosystem", duration: "40 min", level: "Intermediate" }
  ];

  useEffect(() => {
    const allProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    allProgress[courseId] = progress;
    localStorage.setItem('courseProgress', JSON.stringify(allProgress));
  }, [progress, courseId]);

  const handleStartLesson = (lessonId) => {
    if (!progress.completedLessons.includes(lessonId)) {
      const newCompletedLessons = [...progress.completedLessons, lessonId];
      const newCurrentLesson = lessonId < lessons.length ? lessonId + 1 : lessonId;
      
      setProgress({
        completedLessons: newCompletedLessons,
        currentLesson: newCurrentLesson
      });

      alert(`Lesson ${lessonId} completed! Next lesson is now available.`);
    }
  };

  const getLessonStatus = (lessonId) => {
    if (progress.completedLessons.includes(lessonId)) {
      return { isCompleted: true, isLocked: false };
    } else if (lessonId <= progress.currentLesson) {
      return { isCompleted: false, isLocked: false };
    } else {
      return { isCompleted: false, isLocked: true };
    }
  };

  const progressPercentage = (progress.completedLessons.length / lessons.length) * 100;
  const isCourseComplete = progress.completedLessons.length === lessons.length;

  return (
    <div className={`${styles.lessonsContainer} ${theme === 'dark' ? styles.darkMode : ''}`}>
      {/* Course Header */}
      <div className={styles.courseHeader}>
        <div className={styles.courseHeaderContent}>
          <Link to="/courses" className={styles.backButton}>
            <i className="fas fa-arrow-left"></i>
            Back to Courses
          </Link>
          
          <h1 className={styles.courseTitle}>Crypto Fundamentals</h1>
          <p className={styles.courseDescription}>
            Master the basics of major cryptocurrencies and blockchain networks. 
            Understand SOL, BTC, ETH and other key chains.
          </p>
          
          <div className={styles.courseMeta}>
            <div className={styles.metaItem}>
              <i className="far fa-clock"></i>
              <span>~4 hours</span>
            </div>
            <div className={styles.metaItem}>
              <i className="fas fa-book-open"></i>
              <span>6 Lessons</span>
            </div>
            <div className={styles.metaItem}>
              <i className="fas fa-certificate"></i>
              <span>Certificate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar progress={progressPercentage} />

      {/* Lessons List */}
      <div className={styles.lessonsList}>
        {lessons.map((lesson) => {
          const { isCompleted, isLocked } = getLessonStatus(lesson.id);
          
          return (
            <LessonCard
              key={lesson.id}
              lessonNumber={lesson.id}
              title={lesson.title}
              duration={lesson.duration}
              level={lesson.level}
              isCompleted={isCompleted}
              isLocked={isLocked}
              isActive={lesson.id === progress.currentLesson}
              onStartLesson={handleStartLesson}
            />
          );
        })}
      </div>

      {/* Navigation */}
      <div className={styles.navigation}>
        <Link to="/courses" className={styles.navButton}>
          <i className="fas fa-arrow-left"></i>
          Back to All Courses
        </Link>
        
        {isCourseComplete && (
          <Link to="/scams-courses" className={styles.navButton}>
            Next Course: Scams Protection
            <i className="fas fa-arrow-right"></i>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LessonList;