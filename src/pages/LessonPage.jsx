// LessonPage.jsx - ТВОЯ ВЕРСИЯ, НЕ МЕНЯЮ КОМПОНЕНТЫ, ТОЛЬКО ЛОГИКУ

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
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
  const { lessonId, courseId = 'crypto' } = useParams();
  const navigate = useNavigate();
  
  const [notesOpen, setNotesOpen] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);
  
  const [isCompleted, setIsCompleted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  const [courseProgress, setCourseProgress] = useState(0);
  const [canAccess, setCanAccess] = useState(false); // ДОБАВИЛ
  const [loading, setLoading] = useState(true); // ДОБАВИЛ

  const lessonNum = parseInt(lessonId) || 1;
  const nextLessonNum = lessonNum + 1;
  const prevLessonNum = lessonNum - 1;

  const lessonData = getLessonData(courseId, lessonNum);

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
    checkLessonStatus();
    loadCourseProgress();
  }, [courseId, lessonNum]);

  const checkLessonStatus = async () => {
  try {
    setLoading(true);
    const currentUser = api.getCurrentUser();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (lessonNum === 1) {
      setCanAccess(true);
      setIsCompleted(false);
      setLoading(false);
      return;
    }

    const response = await api.getLessonStatus(currentUser.id, courseId, lessonId);
    
    if (response.success) {
      setIsCompleted(response.isCompleted);
      setCanAccess(response.canAccess || response.status === 'available' || response.status === 'completed');
    }
  } catch (error) {
    console.error('Error checking lesson status:', error);
    if (lessonNum === 1) {
      setCanAccess(true);
    }
  } finally {
    setLoading(false);
  }
};

  const loadCourseProgress = async () => {
    try {
      const currentUser = api.getCurrentUser();
      if (!currentUser) return;

      const response = await api.getUserProgress(currentUser.id);
      
      if (response.success && response.courses && response.courses[courseId]) {
        const progress = response.courses[courseId].percentage || 0;
        setCourseProgress(progress);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const handleMarkComplete = async () => {
    if (isCompleted || !lessonData || !canAccess) return;
    
    setIsMarking(true);
    
    try {
      const currentUser = api.getCurrentUser();
      if (!currentUser) {
        navigate('/login');
        return;
      }

      // Отправляем запрос на сервер
      const response = await api.completeLesson(
        currentUser.id,
        courseId,
        lessonId,
        300 // 5 минут времени
      );

      if (response.success) {
        setIsCompleted(true);
        setShowToast(true);
        setCourseProgress(response.courseProgress?.percentage || 0);
        
        // Обновляем пользователя в localStorage
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
      alert('Failed to mark lesson as completed: ' + error.message);
    } finally {
      setIsMarking(false);
    }
  };

  const hasPrevLesson = () => {
    return lessonNum > 1;
  };

  const getCourseTitle = () => {
    const titles = {
      crypto: 'Crypto Fundamentals',
      scams: 'Scams Protection',
      memecoins: 'Memecoins',
      security: 'Security Essentials'
    };
    return titles[courseId] || 'Crypto Fundamentals';
  };

  const totalLessons = getTotalLessons(courseId);
  const nextLessonExists = hasNextLesson(courseId, lessonNum);
  const nextTitle = getNextLessonTitle(courseId, lessonNum);

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
              <h1>Lesson Not Found</h1>
              <p>The lesson you're looking for doesn't exist.</p>
              <Link to={`/${courseId}`} className={styles.backToLessonsTop}>
                <i className="fas fa-arrow-left"></i>
                Back to Lessons
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Если урок заблокирован
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
              <p>Complete the previous lesson first to unlock this one.</p>
              <Link to={`/lesson/${courseId}/${lessonNum - 1}`} className={styles.goBackButton}>
                <i className="fas fa-arrow-left"></i>
                Go to Previous Lesson
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.lessonPage} ${theme === 'dark' ? styles.darkMode : ''}`}>
      <Toast 
        message="Your lesson has been marked as completed!" 
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
                <SaveButton 
                  lesson={lessonForSave}
                  size="medium"
                  showLabel={true}
                  variant="gradient"
                />
                <Link to={`/${courseId}`} className={styles.backToLessonsBtn}>
                  <i className="fas fa-arrow-left"></i>
                  Back to Lessons
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
              {/* DURATION CARD */}
              <div className={styles.infoCard}>
                <div className={styles.cardIcon}>
                  <i className="far fa-clock"></i>
                </div>
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>Duration</h4>
                  <p className={styles.cardValue}>{lessonData.duration}</p>
                </div>
              </div>
              
              {/* LEVEL CARD */}
              <div className={styles.infoCard}>
                <div className={styles.cardIcon}>
                  <i className="fas fa-signal"></i>
                </div>
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>Level</h4>
                  <p className={styles.cardValue}>{lessonData.level}</p>
                </div>
              </div>
              
              {/* PROGRESS CARD */}
              <div className={styles.infoCard}>
                <div className={styles.cardIcon}>
                  <i className="fas fa-hashtag"></i>
                </div>
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>Progress</h4>
                  <p className={styles.cardValue}>{lessonNum}/{totalLessons}</p>
                </div>
              </div>
              
              {/* STATUS CARD */}
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
                    Watch Now
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
                <span className={styles.progressPercentage}>{Math.round(courseProgress)}% Complete</span>
              </div>
              <ProgressBar progress={courseProgress} />
            </div>
            
            <div className={styles.completeCard}>
              <div className={styles.completeHeader}>
                <h4 className={styles.completeTitle}>
                  <i className="fas fa-flag-checkered"></i>
                  Mark as Complete
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
                       isMarking ? 'Marking...' : 'Mark as Complete'}
                    </span>
                  </span>
                  {!isCompleted && !isMarking && canAccess && (
                    <span className={styles.buttonArrow}>
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  )}
                </button>
                
                {isCompleted && (
                  <div className={styles.completedMessage}>
                    <div className={styles.messageIcon}>
                      <i className="fas fa-check"></i>
                    </div>
                    <div className={styles.messageContent}>
                      <span className={styles.messageTitle}>Great job!</span>
                      <span className={styles.messageSubtitle}>Lesson marked as complete</span>
                    </div>
                  </div>
                )}

                {!canAccess && (
                  <div className={styles.lockedMessage}>
                    <i className="fas fa-lock"></i>
                    <span>Complete previous lesson first</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className={styles.detailsSection}>
            <div className={styles.detailsCard}>
              <div 
                className={styles.sectionHeader} 
                onClick={() => setDetailsOpen(!detailsOpen)}
              >
                <div className={styles.sectionTitle}>
                  <i className="fas fa-info-circle"></i>
                  <h3>Lesson Details & Key Concepts</h3>
                </div>
                <i className={`fas fa-chevron-down ${styles.toggleIcon}`} 
                   style={{ transform: detailsOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                ></i>
              </div>
              
              <div className={`${styles.sectionContent} ${detailsOpen ? styles.active : ''}`}>
                <div className={styles.shortDescription}>
                  <p className={styles.descriptionText}>{lessonData.shortDescription}</p>
                </div>
                
                {lessonData.fullDescription && (
                  <div className={styles.fullDescription}>
                    <h4 className={styles.descriptionTitle}>Detailed Explanation</h4>
                    <pre className={styles.descriptionPre}>
                      {lessonData.fullDescription}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* NOTES SECTION */}
          {lessonData.notes && lessonData.notes.length > 0 && (
            <div className={styles.notesSection}>
              <div className={styles.notesCard}>
                <div 
                  className={styles.sectionHeader} 
                  onClick={() => setNotesOpen(!notesOpen)}
                >
                  <div className={styles.sectionTitle}>
                    <i className="fas fa-sticky-note"></i>
                    <h3>Lesson Notes & Key Takeaways</h3>
                  </div>
                  <i className={`fas fa-chevron-down ${styles.toggleIcon}`} 
                     style={{ transform: notesOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                  ></i>
                </div>
                
                <div className={`${styles.sectionContent} ${notesOpen ? styles.active : ''}`}>
                  <div className={styles.notesList}>
                    {lessonData.notes.map((note, index) => (
                      <div key={index} className={styles.noteItem}>
                        <div className={styles.noteNumber}>{index + 1}</div>
                        <div className={styles.noteContent}>
                          <h4 className={styles.noteTitle}>{note.title || `Key Takeaway ${index + 1}`}</h4>
                          <p className={styles.noteText}>{note.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MATERIALS SECTION */}
          {lessonData.materials && lessonData.materials.length > 0 && (
            <div className={styles.materialsSection}>
              <div className={styles.materialsCard}>
                <div 
                  className={styles.sectionHeader} 
                  onClick={() => setMaterialsOpen(!materialsOpen)}
                >
                  <div className={styles.sectionTitle}>
                    <i className="fas fa-download"></i>
                    <h3>Download Materials & Resources</h3>
                  </div>
                  <i className={`fas fa-chevron-down ${styles.toggleIcon}`}
                     style={{ transform: materialsOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                  ></i>
                </div>
                
                <div className={`${styles.sectionContent} ${materialsOpen ? styles.active : ''}`}>
                  <div className={styles.materialsList}>
                    {lessonData.materials.map((material, index) => (
                      <div key={index} className={styles.materialItem}>
                        <div className={styles.materialIcon}>
                          <i className={`fas fa-${material.icon || 'file'}`}></i>
                        </div>
                        <div className={styles.materialInfo}>
                          <h4 className={styles.materialTitle}>{material.title}</h4>
                          <div className={styles.materialMeta}>
                            <span className={styles.materialFormat}>{material.format || 'PDF'}</span>
                            {material.size && (
                              <>
                                <span className={styles.materialSeparator}>•</span>
                                <span className={styles.materialSize}>{material.size}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <button className={styles.materialDownload}>
                          <i className="fas fa-download"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NAVIGATION */}
          <div className={styles.navigationSection}>
            <div className={styles.navigationContainer}>
              <div className={styles.navigationGrid}>
                {/* PREVIOUS BUTTON */}
                <Link 
                  to={hasPrevLesson() ? `/lesson/${courseId}/${prevLessonNum}` : "#"}
                  className={`${styles.navButton} ${styles.prevButton} ${
                    !hasPrevLesson() ? styles.disabled : ''
                  }`}
                >
                  <div className={styles.navButtonInner}>
                    <div className={styles.navContent}>
                      <span className={styles.navLabel}>Previous</span>
                      <span className={styles.navTitle}>
                        {hasPrevLesson() ? `Lesson ${prevLessonNum}` : 'No Previous'}
                      </span>
                    </div>
                  </div>
                </Link>
                
                {/* OVERVIEW BUTTON - CENTER */}
                <Link to={`/${courseId}`} className={`${styles.navButton} ${styles.overviewButton}`}>
                  <div className={styles.navButtonInner}>
                    <div className={styles.navContent}>
                      <span className={styles.navLabel}>Back to</span>
                      <span className={styles.navTitle}>Course Overview</span>
                    </div>
                  </div>
                </Link>
                
                {/* NEXT BUTTON */}
                <Link 
                  to={isCompleted && nextLessonExists ? `/lesson/${courseId}/${nextLessonNum}` : "#"}
                  onClick={(e) => {
                    if (!isCompleted) {
                      e.preventDefault();
                      alert('Complete this lesson first to unlock the next one!');
                    }
                  }}
                  className={`${styles.navButton} ${styles.nextButton} ${
                    !(isCompleted && nextLessonExists) ? styles.disabled : ''
                  }`}
                >
                  <div className={styles.navButtonInner}>
                    <div className={styles.navContent}>
                      <span className={styles.navLabel}>Next</span>
                      <span className={styles.navTitle}>
                        {nextLessonExists ? nextTitle : 'Course Complete'}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LessonPage;