// pages/YourLessonsPage/YourLessonsPage.jsx
import React, { useState, useMemo } from 'react';
import { useSavedLessons } from '../../hooks/useSavedLessons';
import { useTheme } from '../../Context_TEMP/ThemeContext';
import SavedLessonCard from '../../components/YourLessons/SavedLessonCard/SavedLessonCard';
import FilterBar from '../../components/YourLessons/FilterBar/FilterBar';
import EmptyState from '../../components/YourLessons/EmptyState/EmptyState';
import styles from './YourLessonsPage.module.css';
import { Link } from 'react-router-dom';

const YourLessonsPage = () => {
  const { savedLessons, isLoading } = useSavedLessons();
  const { theme } = useTheme();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const courseStats = useMemo(() => {
    const stats = {
      crypto: { count: 0, totalProgress: 0 },
      scams: { count: 0, totalProgress: 0 },
      memecoins: { count: 0, totalProgress: 0 },
      security: { count: 0, totalProgress: 0 }
    };

    savedLessons.forEach(lesson => {
      if (stats[lesson.courseId]) {
        stats[lesson.courseId].count++;
        stats[lesson.courseId].totalProgress += lesson.progress || 0;
      }
    });


    Object.keys(stats).forEach(key => {
      if (stats[key].count > 0) {
        stats[key].avgProgress = Math.round(stats[key].totalProgress / stats[key].count);
      } else {
        stats[key].avgProgress = 0;
      }
    });

    return stats;
  }, [savedLessons]);

  const filteredAndSortedLessons = useMemo(() => {
    let filtered = savedLessons;
    
    // Фильтрация по курсу
    if (filter !== 'all') {
      filtered = filtered.filter(lesson => lesson.courseId === filter);
    }

    switch(sortBy) {
      case 'newest':
        return [...filtered].sort((a, b) => 
          new Date(b.savedAt) - new Date(a.savedAt)
        );
      case 'oldest':
        return [...filtered].sort((a, b) => 
          new Date(a.savedAt) - new Date(b.savedAt)
        );
      case 'progress':
        return [...filtered].sort((a, b) => 
          (b.progress || 0) - (a.progress || 0)
        );
      default:
        return filtered;
    }
  }, [savedLessons, filter, sortBy]);

  const totalLessons = savedLessons.length;
  const totalProgress = savedLessons.reduce((sum, lesson) => sum + (lesson.progress || 0), 0);
  const avgProgress = totalLessons > 0 ? Math.round(totalProgress / totalLessons) : 0;

  if (isLoading) {
    return (
      <div className={`${styles.pageWrapper} ${theme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading your saved lessons...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.pageWrapper} ${theme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>Your Lessons</h1>
            <p className={styles.pageSubtitle}>
              Track your learning journey and revisit important lessons
            </p>
          </div>
          
          <div className={styles.statsCards}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <i className="fas fa-bookmark"></i>
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>{totalLessons}</h3>
                <p className={styles.statLabel}>Total Saved</p>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <i className="fas fa-chart-line"></i>
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>{avgProgress}%</h3>
                <p className={styles.statLabel}>Avg Progress</p>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>
                  {savedLessons.filter(l => l.progress >= 100).length}
                </h3>
                <p className={styles.statLabel}>Completed</p>
              </div>
            </div>
          </div>
        </div>

        <FilterBar 
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          courseStats={courseStats}
        />

        {filteredAndSortedLessons.length > 0 ? (
          <div className={styles.lessonsGrid}>
            {filteredAndSortedLessons.map(lesson => (
              <SavedLessonCard 
                key={`${lesson.courseId}-${lesson.id}`}
                lesson={lesson}
              />
            ))}
          </div>
        ) : (
          <EmptyState filter={filter} />
        )}

         <div className={styles.actionsSection}>
          <Link 
            to="/courses"
            className={styles.exploreCoursesBtn}
          >
            <i className="fas fa-compass"></i>
            Explore More Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default YourLessonsPage;