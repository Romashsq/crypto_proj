// LessonPage.jsx - ENGLISH VERSION WITH FIXED NAVIGATION
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../Context_TEMP/ThemeContext';
import styles from './LessonPage.module.css';
import ProgressBar from '../components/Lessons/ProgressBar/ProgressBar';
import Sidebar from '../components/Shared/Sidebar/Sidebar';
import { getLessonData, getTotalLessons, hasNextLesson, getNextLessonTitle } from '../components/Lessons/lessonData';
import SaveButton from '../components/Shared/SaveButton/SaveButton';
import api from '../services/api';

const Toast = ({ message, isVisible, duration = 5000 }) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
    
    if (isVisible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  if (!visible) return null;

  return (
    <div className={styles.toast}>
      <div className={styles.toastContent}>
        <i className="fas fa-check-circle"></i>
        <span>{message}</span>
      </div>
    </div>
  );
};

const LessonPage = () => {
  const { theme } = useTheme();
  const { lessonId, courseId = 'crypto-fundamentals' } = useParams();
  const navigate = useNavigate();
  
  const [isCompleted, setIsCompleted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  const [courseProgress, setCourseProgress] = useState(0);
  const [canAccess, setCanAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lessonStatus, setLessonStatus] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentLessonNum, setCurrentLessonNum] = useState(parseInt(lessonId) || 1);

  const lessonNum = parseInt(lessonId) || 1;
  const nextLessonNum = lessonNum + 1;
  const prevLessonNum = lessonNum - 1;
  const totalLessons = getTotalLessons(courseId);
  const lessonData = getLessonData(courseId, lessonNum);
  const nextLessonExists = hasNextLesson(courseId, lessonNum);
  const nextTitle = getNextLessonTitle(courseId, lessonNum);
  const prevLessonData = getLessonData(courseId, prevLessonNum);

  const lessonForSave = {
    id: lessonNum,
    courseId: courseId,
    title: lessonData?.title || '',
    description: lessonData?.description || '',
    duration: lessonData?.duration || '',
    level: lessonData?.level || '',
    youtubeId: lessonData?.youtubeId || '',
    shortDescription: lessonData?.shortDescription || '',
  };

  useEffect(() => {
    checkEnrollmentStatus();
    checkLessonStatus();
    loadCourseProgress();
  }, [courseId, lessonNum]);

  const checkEnrollmentStatus = async () => {
    try {
      if (!api.isAuthenticated()) return;
      
      const response = await api.checkEnrollment(courseId);
      
      if (response.success) {
        setIsEnrolled(response.isEnrolled);
        
        if (!response.isEnrolled && lessonNum === 1) {
          await enrollToCourse();
        }
      }
    } catch (error) {
      console.error('Error checking course enrollment:', error);
    }
  };

  const enrollToCourse = async () => {
    try {
      const courseData = {
        courseId: courseId,
        courseTitle: getCourseTitle(),
        courseIcon: '📚',
        totalLessons: totalLessons
      };
      
      const response = await api.enrollCourse(courseData);
      
      if (response.success) {
        setIsEnrolled(true);
        return true;
      } else {
        console.error('❌ Error enrolling in course:', response.error);
        return false;
      }
    } catch (error) {
      console.error('❌ Exception when enrolling in course:', error);
      return false;
    }
  };

  const checkLessonStatus = async () => {
    try {
      setLoading(true);
      
      if (!api.isAuthenticated()) {
        if (lessonNum === 1) {
          setCanAccess(true);
        }
        setLoading(false);
        return;
      }

      if (lessonNum === 1) {
        setCanAccess(true);
        
        try {
          const response = await api.getLessonStatus(courseId, lessonNum);
          if (response.success) {
            setIsCompleted(response.isCompleted || false);
            setLessonStatus(response);
          }
        } catch (error) {
          console.log('Could not check first lesson status:', error);
        }
        
        setLoading(false);
        return;
      }

      const response = await api.getLessonStatus(courseId, lessonNum);
      
      if (response.success) {
        setIsCompleted(response.isCompleted || false);
        setCanAccess(response.canAccess || false);
        setLessonStatus(response);
      } else {
        console.warn('Error checking lesson status:', response.error);
        if (lessonNum === 1) {
          setCanAccess(true);
        } else {
          setCanAccess(false);
        }
      }
    } catch (error) {
      console.error('Error checking lesson status:', error);
      if (lessonNum === 1) {
        setCanAccess(true);
      } else {
        setCanAccess(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadCourseProgress = async () => {
    try {
      if (!api.isAuthenticated()) {
        console.log('User not authenticated, progress not loaded');
        return;
      }

      const response = await api.getCourseProgress(courseId);
      
      if (response.success && response.progress) {
        setCourseProgress(response.progress.percentage || 0);
      } else if (response.success && response.isEnrolled && response.progress) {
        setCourseProgress(response.progress.percentage || 0);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const handleMarkComplete = async () => {
    if (isCompleted || !lessonData || !canAccess) return;
    
    setIsMarking(true);
    
    try {
      if (!isEnrolled) {
        const enrolled = await enrollToCourse();
        
        if (!enrolled) {
          alert('Failed to enroll in course. Please try again.');
          setIsMarking(false);
          return;
        }
        
        setIsEnrolled(true);
      }
      
      const response = await api.completeLesson(
        courseId,
        lessonNum,
        300,
        100
      );
      
      if (response.success) {
        setIsCompleted(true);
        setShowToast(true);
        
        if (response.courseProgress) {
          setCourseProgress(response.courseProgress.percentage || 0);
        }
        
        if (response.user) {
          api.updateUserInStorage(response.user);
        }
        
        await checkLessonStatus();
        
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
        
      } else {
        alert('Error: ' + (response.error || 'Failed to mark lesson as complete'));
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    } finally {
      setIsMarking(false);
    }
  };

  const getCourseTitle = () => {
    const titles = {
      'crypto-fundamentals': 'Crypto Fundamentals',
      'crypto': 'Crypto Fundamentals',
      'scams': 'Scams Protection',
      'memecoins': 'Memecoins',
      'security': 'Security Essentials',
      'additional': 'Additional Materials',
      'defi': 'DeFi & Staking'
    };
    return titles[courseId] || 'Crypto Fundamentals';
  };

  if (loading) {
    return (
      <div className={`${styles.lessonPage} ${theme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className={`${styles.lessonPage} ${theme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.lessonLayout}>
          <div className={styles.sidebarContainer}>
            <Sidebar />
          </div>
          <main className={styles.lessonContent}>
            <div className={styles.lessonHeader}>
              <h1>Lesson not found</h1>
              <p>The requested lesson does not exist.</p>
              <Link to={`/${courseId}`} className={styles.backToLessonsTop}>
                <i className="fas fa-arrow-left"></i>
                Back to lessons
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!canAccess && lessonNum !== 1) {
    return (
      <div className={`${styles.lessonPage} ${theme === 'dark' ? styles.darkMode : ''}`}>
        <div className={styles.lessonLayout}>
          <div className={styles.sidebarContainer}>
            <Sidebar />
          </div>
          <main className={styles.lessonContent}>
            <div className={styles.lockedLesson}>
              <div className={styles.lockedIcon}>
                <i className="fas fa-lock"></i>
              </div>
              <h2>Lesson Locked</h2>
              <p>Complete the previous lesson first.</p>
              <div className={styles.lockedActions}>
                <Link to={`/lesson/${courseId}/${lessonNum - 1}`} className={styles.goBackButton}>
                  <i className="fas fa-arrow-left"></i>
                  Go to previous lesson
                </Link>
                <button 
                  className={styles.refreshButton}
                  onClick={checkLessonStatus}
                >
                  <i className="fas fa-sync-alt"></i>
                  Check again
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.lessonPage} ${theme === 'dark' ? styles.darkMode : ''}`}>
      <Toast 
        message="Lesson marked as completed!" 
        isVisible={showToast} 
        duration={5000}
      />
      
      <div className={styles.lessonLayout}>
        <div className={styles.sidebarContainer}>
          <Sidebar />
        </div>

        <main className={styles.lessonContent}>
          {/* HEADER SECTION */}
          <div className={styles.lessonHeader}>
            <div className={styles.headerTopRow}>
              <div className={styles.lessonBreadcrumb}>
                <Link to="/courses" className={styles.breadcrumbLink}>Courses</Link>
                <i className="fas fa-chevron-right"></i>
                <Link to={`/${courseId}`} className={styles.breadcrumbLink}>{getCourseTitle()}</Link>
                <i className="fas fa-chevron-right"></i>
                <span className={styles.currentLesson}>Lesson {lessonNum}</span>
              </div>
              
              <div className={styles.headerActions}>
                <div className={styles.enrollmentStatus}>
                  {isEnrolled ? (
                    <span className={styles.enrolledBadge}>✓ Enrolled</span>
                  ) : (
                    <button 
                      className={styles.enrollNowBtn}
                      onClick={enrollToCourse}
                    >
                      <i className="fas fa-plus"></i> Enroll in Course
                    </button>
                  )}
                </div>
                
                <SaveButton 
                  lesson={lessonForSave}
                  size="medium"
                  showLabel={true}
                  variant="gradient"
                />
                <Link to={`/${courseId}`} className={styles.backToLessonsBtn}>
                  <i className="fas fa-arrow-left"></i>
                  Back to lessons
                </Link>
              </div>
            </div>
            
            <div className={styles.lessonMainInfo}>
              <div className={styles.lessonNumberBadge}>Lesson {lessonNum}</div>
              <h1 className={styles.lessonTitle}>{lessonData.title}</h1>
              <p className={styles.lessonDescription}>
                {lessonData.description}
              </p>
            </div>
            
            <div className={styles.infoCardsGrid}>
              <div className={styles.infoCard}>
                <div className={styles.cardIcon}>
                  <i className="far fa-clock"></i>
                </div>
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>Duration</h4>
                  <p className={styles.cardValue}>{lessonData.duration}</p>
                </div>
              </div>
              
              <div className={styles.infoCard}>
                <div className={styles.cardIcon}>
                  <i className="fas fa-signal"></i>
                </div>
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>Level</h4>
                  <p className={styles.cardValue}>{lessonData.level}</p>
                </div>
              </div>
              
              <div className={styles.infoCard}>
                <div className={styles.cardIcon}>
                  <i className="fas fa-hashtag"></i>
                </div>
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>Progress</h4>
                  <p className={styles.cardValue}>{lessonNum}/{totalLessons}</p>
                </div>
              </div>
              
              <div className={styles.infoCard}>
                <div className={styles.cardIcon}>
                  <i className="fas fa-bookmark"></i>
                </div>
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>Status</h4>
                  <div className={styles.statusContainer}>
                    <span className={`${styles.statusBadge} ${isCompleted ? styles.completed : styles.pending}`}>
                      {isCompleted ? 'COMPLETED' : 'IN PROGRESS'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VIDEO SECTION */}
          <div className={styles.videoSection}>
            <div className={styles.videoCard}>
              <div className={styles.videoHeader}>
                <h3 className={styles.videoTitle}>
                  <i className="fas fa-play-circle"></i>
                  Video Lesson
                </h3>
                <div className={styles.videoActions}>
                  <SaveButton 
                    lesson={lessonForSave}
                    size="small"
                    showLabel={false}
                  />
                  <div className={styles.videoBadge}>
                    <i className="fas fa-play"></i>
                    Watch
                  </div>
                </div>
              </div>
              
              <div className={styles.videoWrapper}>
                <iframe 
                  src={`https://www.youtube.com/embed/${lessonData.youtubeId}`}
                  title={lessonData.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.videoIframe}
                ></iframe>
              </div>
            </div>
          </div>

          {/* PROGRESS & ACTIONS SECTION */}
          <div className={styles.actionsSection}>
            <div className={styles.progressCard}>
              <div className={styles.progressHeader}>
                <h4 className={styles.progressTitle}>
                  <i className="fas fa-chart-line"></i>
                  Course Progress
                </h4>
                <span className={styles.progressPercentage}>{Math.round(courseProgress)}% completed</span>
              </div>
              <ProgressBar progress={courseProgress} />
            </div>
            
            <div className={styles.completeCard}>
              <div className={styles.completeHeader}>
                <h4 className={styles.completeTitle}>
                  <i className="fas fa-flag-checkered"></i>
                  Mark as Completed
                </h4>
                <SaveButton 
                  lesson={lessonForSave}
                  size="small"
                  showLabel={true}
                  className={styles.sideSaveButton}
                />
              </div>
              
              <div className={styles.completeButtonWrapper}>
                <button 
                  className={`${styles.completeButton} ${
                    isCompleted ? styles.completed : ''
                  } ${isMarking ? styles.marking : ''}`}
                  onClick={handleMarkComplete}
                  disabled={isCompleted || isMarking || !canAccess}
                >
                  <span className={styles.buttonContent}>
                    <span className={styles.buttonIcon}>
                      {isCompleted ? (
                        <i className="fas fa-check-circle"></i>
                      ) : isMarking ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        <i className="far fa-circle"></i>
                      )}
                    </span>
                    <span className={styles.buttonText}>
                      {isCompleted ? 'Lesson Completed' : 
                       isMarking ? 'Marking...' : 'Mark as Completed'}
                    </span>
                  </span>
                  {!isCompleted && !isMarking && canAccess && (
                    <span className={styles.buttonArrow}>
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  )}
                </button>
                
                {!isEnrolled && !isCompleted && (
                  <div className={styles.enrollmentMessage}>
                    <i className="fas fa-info-circle"></i>
                    <span>You need to enroll in the course first</span>
                    <button 
                      className={styles.enrollInlineBtn}
                      onClick={enrollToCourse}
                    >
                      Enroll Now
                    </button>
                  </div>
                )}
                
                {isCompleted && (
                  <div className={styles.completedMessage}>
                    <div className={styles.messageIcon}>
                      <i className="fas fa-check"></i>
                    </div>
                    <div className={styles.messageContent}>
                      <span className={styles.messageTitle}>Excellent!</span>
                      <span className={styles.messageSubtitle}>Lesson completed</span>
                    </div>
                  </div>
                )}

                {!canAccess && lessonNum !== 1 && (
                  <div className={styles.lockedMessage}>
                    <i className="fas fa-lock"></i>
                    <span>Complete the previous lesson</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* LESSON NAVIGATION - FIXED STYLES */}
          <div className={styles.navigationSection}>
            <div className={styles.navigationContainer}>
              <div className={styles.navigationGrid}>
                {/* PREVIOUS LESSON BUTTON */}
                <Link 
                  to={prevLessonData ? `/lesson/${courseId}/${prevLessonNum}` : '#'}
                  className={`${styles.navButton} ${styles.prevButton} ${
                    !prevLessonData ? styles.disabled : ''
                  }`}
                >
                  <div className={styles.navButtonInner}>
                    <div className={styles.navIcon}>
                      <i className="fas fa-chevron-left"></i>
                    </div>
                    <div className={styles.navContent}>
                      <span className={styles.navLabel}>Previous Lesson</span>
                      <span className={styles.navTitle}>
                        {prevLessonData 
                          ? `Lesson ${prevLessonNum}: ${prevLessonData?.title || ''}`
                          : 'Course Start'
                        }
                      </span>
                    </div>
                  </div>
                </Link>

                {/* COURSE OVERVIEW BUTTON */}
                <Link 
                  to={`/${courseId}`}
                  className={`${styles.navButton} ${styles.overviewButton}`}
                >
                  <div className={styles.navButtonInner}>
                    <div className={styles.navIcon}>
                      <i className="fas fa-list-ul"></i>
                    </div>
                    <div className={styles.navContent}>
                      <span className={styles.navLabel}>All Lessons</span>
                      <span className={styles.navTitle}>{getCourseTitle()}</span>
                    </div>
                  </div>
                </Link>

                {/* NEXT LESSON BUTTON - ACTIVE ONLY IF LESSON IS COMPLETED */}
                <Link 
                  to={nextLessonExists && isCompleted ? `/lesson/${courseId}/${nextLessonNum}` : '#'}
                  className={`${styles.navButton} ${styles.nextButton} ${
                    (!nextLessonExists || !isCompleted) ? styles.disabled : ''
                  }`}
                >
                  <div className={styles.navButtonInner}>
                    <div className={styles.navContent}>
                      <span className={styles.navLabel}>Next Lesson</span>
                      <span className={styles.navTitle}>
                        {nextLessonExists 
                          ? `Lesson ${nextLessonNum}: ${nextTitle || ''}`
                          : 'Course Completed'
                        }
                      </span>
                    </div>
                    <div className={styles.navIcon}>
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Next lesson hint - NEW STYLED VERSION */}
              {nextLessonExists && !isCompleted && (
                <div className={styles.nextLessonHint}>
                  <div className={styles.hintIcon}>
                    <i className="fas fa-lock"></i>
                  </div>
                  <div className={styles.hintContent}>
                    <span className={styles.hintText}>
                      Complete this lesson to unlock Lesson {nextLessonNum}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default LessonPage;