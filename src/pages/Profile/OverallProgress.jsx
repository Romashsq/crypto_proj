import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import api from '../../services/api';
import styles from './OverallProgress.module.css';
import { Notes, Wallet, LockNoOpen, Rocket, LockOpen, Shelled, Lesson } from '../../assets/Icons';

const courseRouteMap = {
  'crypto': '/crypto', 'crypto-fundamentals': '/crypto',
  'scams': '/scams', 'memecoins': '/memecoins',
  'security': '/security',
};

const courseIconMap = {
  'crypto': <Wallet width={20} height={20} />,
  'crypto-fundamentals': <Wallet width={20} height={20} />,
  'scams': <LockNoOpen width={20} height={20} />,
  'memecoins': <Rocket width={20} height={20} />,
  'security': <LockOpen width={20} height={20} />,
};

const OverallProgress = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProgress: 0,
    completedCourses: 0,
    enrolledCourses: 0,
    completedLessons: 0,
    totalLessons: 0,
    courses: [],
    xp: 0,
    level: 1,
    streak: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOverallProgress();
  }, []);

  const fetchOverallProgress = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.getOverallProgress();

      if (response.success) {
        setStats({
          totalProgress: response.totalProgress || 0,
          completedCourses: response.completedCourses || 0,
          enrolledCourses: response.enrolledCourses || 0,
          completedLessons: response.completedLessons || 0,
          totalLessons: response.totalLessons || 0,
          courses: response.courses || [],
          xp: response.xp || 0,
          level: response.level || 1,
          streak: response.streak || 0
        });
      } else {
        setError(response.error || 'Failed to load progress');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage === 0) return '#E2E8F0';
    if (percentage < 30) return '#FF6B6B';
    if (percentage < 70) return '#FFD93D';
    if (percentage < 90) return '#6BCF7F';
    return '#9B2FFF';
  };

  const getTopCourse = () => {
    if (stats.courses.length === 0) return null;
    const coursesWithProgress = stats.courses.filter(course => course.percentage > 0);
    if (coursesWithProgress.length === 0) return null;
    return coursesWithProgress.reduce((prev, current) =>
      prev.percentage > current.percentage ? prev : current
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    } catch {
      return 'N/A';
    }
  };

  if (loading) {
    return (
      <div className={`${styles.overallProgressCard} ${isDark ? styles.darkMode : ''}`}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading progress...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.overallProgressCard} ${isDark ? styles.darkMode : ''}`}>
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>❌</div>
          <p>{error}</p>
          <button className={styles.retryButton} onClick={fetchOverallProgress}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const topCourse = getTopCourse();

  return (
    <div className={`${styles.overallProgressCard} ${isDark ? styles.darkMode : ''}`}>
      <div className={styles.overallProgressHeader}>
        <div>
          <h2>Overall Progress</h2>
          <p>Track your progress across all courses</p>
        </div>
        <div className={styles.overallProgressValue}>
          <span>{stats.totalProgress}%</span>
          <div className={styles.progressLabel}>Overall Progress</div>
        </div>
      </div>

      <div className={styles.overallProgressBar}>
        <div
          className={styles.overallProgressFill}
          style={{
            width: `${stats.totalProgress}%`,
            background: getProgressColor(stats.totalProgress)
          }}
        ></div>
      </div>

      <div className={styles.overallProgressStats}>
        <div className={styles.statItem}>
          <div className={styles.statIcon}><Shelled width={22} height={22} /></div>
          <div className={styles.statNumber}>{stats.completedCourses}</div>
          <div className={styles.statLabel}>Completed</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statIcon}><Notes width={22} height={22} /></div>
          <div className={styles.statNumber}>{stats.enrolledCourses}</div>
          <div className={styles.statLabel}>Enrolled</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statIcon}><Lesson width={22} height={22} /></div>
          <div className={styles.statNumber}>{stats.completedLessons}/{stats.totalLessons}</div>
          <div className={styles.statLabel}>Lessons</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statIcon}><Rocket width={22} height={22} /></div>
          <div className={styles.statNumber}>{stats.xp}</div>
          <div className={styles.statLabel}>XP</div>
        </div>
      </div>

      {stats.courses.length > 0 ? (
        <div className={styles.courseProgressDetails}>
          <div className={styles.sectionHeader}>
            <h3>Course Progress</h3>
            <Link to="/courses" className={styles.viewAllLink}>
              All Courses →
            </Link>
          </div>

          <div className={styles.coursesList}>
            {stats.courses.slice(0, 3).map((course) => (
              <div
                key={course.courseId}
                className={styles.courseProgressItem}
                onClick={() => navigate(courseRouteMap[course.courseId] || '/courses')}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.courseInfo}>
                  <div className={styles.courseHeader}>
                    <span className={styles.courseIcon}>
                      {courseIconMap[course.courseId] || <Notes width={20} height={20} />}
                    </span>
                    <h4 className={styles.courseTitle}>
                      {course.courseTitle || course.courseId}
                    </h4>
                  </div>
                  <div className={styles.courseStats}>
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    <span>•</span>
                    <span>Last: {formatDate(course.lastAccessed)}</span>
                  </div>
                </div>
                <div className={styles.courseProgress}>
                  <div className={styles.courseProgressBar}>
                    <div
                      className={styles.courseProgressFill}
                      style={{
                        width: `${course.percentage}%`,
                        background: getProgressColor(course.percentage)
                      }}
                    ></div>
                  </div>
                  <span className={styles.coursePercentage}>{course.percentage}%</span>
                </div>
              </div>
            ))}

            {stats.courses.length > 3 && (
              <div className={styles.moreCourses}>
                + {stats.courses.length - 3} more courses
              </div>
            )}
          </div>

          {topCourse && (
            <div className={styles.topCourse}>
              <div className={styles.topCourseIcon}>🏆</div>
              <div className={styles.topCourseInfo}>
                <div className={styles.topCourseLabel}>Best Course</div>
                <div className={styles.topCourseTitle}>
                  {topCourse.courseTitle || topCourse.courseId}
                </div>
                <div className={styles.topCourseProgress}>
                  <span>{topCourse.percentage}% completed</span>
                  <span>•</span>
                  <span>{topCourse.completedLessons}/{topCourse.totalLessons} lessons</span>
                  <span>•</span>
                  <span>Started {formatDate(topCourse.enrolledAt)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.noCourses}>
          <div className={styles.noCoursesIcon}>📚</div>
          <div className={styles.noCoursesText}>
            <h3>No Courses Yet</h3>
            <p>Enroll in courses to start tracking your progress</p>
          </div>
          <Link to="/courses" className={styles.browseCoursesBtn}>
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  );
};

export default OverallProgress;