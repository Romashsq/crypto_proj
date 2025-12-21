import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import styles from './LessonPage.module.css';
import ProgressBar from '../components/Lessons/ProgressBar/ProgressBar';
import { 
  markLessonCompleted, 
  isLessonCompleted, 
  getCurrentLesson,
  getCourseProgressPercentage
} from '../utils/progressStorage';
import Sidebar from '../components/Shared/Sidebar/Sidebar';
import { getLessonData, getTotalLessons, hasNextLesson, getNextLessonTitle } from '../components/Lessons/lessonContent'

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
  
  const [isCompleted, setIsCompleted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  const [courseProgress, setCourseProgress] = useState(0);

  const lessonNum = parseInt(lessonId) || 1;
  const nextLessonNum = lessonNum + 1;
  const prevLessonNum = lessonNum - 1;

  // ПОЛУЧАЕМ ДАННЫЕ УРОКА ДИНАМИЧЕСКИ ИЗ ВНЕШНЕГО ФАЙЛА
  const lessonData = getLessonData(courseId, lessonNum);

  useEffect(() => {
    const completed = isLessonCompleted(courseId, lessonNum);
    setIsCompleted(completed);
    
    const progress = getCourseProgressPercentage(courseId);
    setCourseProgress(progress);
  }, [courseId, lessonNum]);

  const handleMarkComplete = () => {
    if (isCompleted) return;
    
    setIsMarking(true);
    
    setTimeout(() => {
      const marked = markLessonCompleted(courseId, lessonNum);
      
      if (marked) {
        setIsCompleted(true);
        setShowToast(true);
        
        const newProgress = getCourseProgressPercentage(courseId);
        setCourseProgress(newProgress);
        
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      }
      
      setIsMarking(false);
    }, 300);
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
          <div className={styles.lessonHeader}>
            <div className={styles.lessonBreadcrumb}>
              <Link to="/courses">Courses</Link>
              <i className="fas fa-chevron-right"></i>
              <Link to={`/${courseId}`}>{getCourseTitle()}</Link>
              <i className="fas fa-chevron-right"></i>
              <span>Lesson {lessonNum}: {lessonData.title}</span>
              
              <Link to={`/${courseId}`} className={styles.backToLessonsTop}>
                <i className="fas fa-arrow-left"></i>
                Back to Lessons
              </Link>
            </div>
            
            <h1 className={styles.lessonTitle}>
              Lesson {lessonNum}: {lessonData.title}
            </h1>
            
            <p className={styles.lessonDescription}>
              {lessonData.description}
            </p>
            
            <div className={styles.lessonMeta}>
              <div className={styles.metaItem}>
                <i className="far fa-clock"></i>
                <span>{lessonData.duration}</span>
              </div>
              <div className={styles.metaItem}>
                <i className="far fa-play-circle"></i>
                <span>{lessonData.type}</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-signal"></i>
                <span>{lessonData.level} Level</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-hashtag"></i>
                <span>Lesson {lessonNum}/{totalLessons}</span>
              </div>
            </div>
          </div>

          <ProgressBar progress={courseProgress} />

          <div className={styles.videoSection}>
            <div className={styles.videoContainer}>
              <div className={styles.videoWrapper}>
                <iframe 
                  src={`https://www.youtube.com/embed/${lessonData.youtubeId}`}
                  title={lessonData.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className={styles.completeButtonContainer}>
                <button 
                  className={`${styles.completeButton} ${
                    isCompleted ? styles.completed : ''
                  } ${isMarking ? styles.marking : ''}`}
                  onClick={handleMarkComplete}
                  disabled={isCompleted || isMarking}
                >
                  <span className={styles.buttonContent}>
                    <i className={isCompleted ? "fas fa-check-circle" : "far fa-circle"}></i>
                    <span>
                      {isCompleted ? 'Lesson Completed' : 
                       isMarking ? 'Marking...' : 'Mark as Complete'}
                    </span>
                  </span>
                  {!isCompleted && !isMarking && (
                    <i className="fas fa-arrow-right"></i>
                  )}
                </button>
                
                {isCompleted && (
                  <div className={styles.completedMessage}>
                    <i className="fas fa-check"></i>
                    You've completed this lesson
                  </div>
                )}
              </div>
            </div>
          </div>

          {lessonData.notes && lessonData.notes.length > 0 && (
            <div className={styles.notesSection}>
              <div 
                className={styles.notesToggle} 
                onClick={() => setNotesOpen(!notesOpen)}
              >
                <h3>
                  <i className="fas fa-sticky-note"></i>
                  Lesson Notes & Key Takeaways
                </h3>
                <i className={`fas fa-chevron-down ${styles.toggleIcon}`} 
                   style={{ transform: notesOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                ></i>
              </div>
              <div className={`${styles.notesContent} ${notesOpen ? styles.active : ''}`}>
                <div className={styles.notesList}>
                  {lessonData.notes.map(note => (
                    <div key={note.id} className={styles.noteItem}>
                      <h4>{note.title}</h4>
                      <p>{note.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {lessonData.materials && lessonData.materials.length > 0 && (
            <div className={styles.materialsSection}>
              <div 
                className={styles.materialsToggle} 
                onClick={() => setMaterialsOpen(!materialsOpen)}
              >
                <h3>
                  <i className="fas fa-download"></i>
                  Download Materials & Resources
                </h3>
                <i className={`fas fa-chevron-down ${styles.toggleIcon}`}
                   style={{ transform: materialsOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                ></i>
              </div>
              <div className={`${styles.materialsContent} ${materialsOpen ? styles.active : ''}`}>
                <div className={styles.materialsList}>
                  {lessonData.materials.map(material => (
                    <div key={material.id} className={styles.materialItem}>
                      <div className={styles.materialIcon}>
                        <i className={`fas fa-${material.icon}`}></i>
                      </div>
                      <div className={styles.materialInfo}>
                        <h4>{material.title}</h4>
                        <p>{material.format} • {material.size}</p>
                      </div>
                      <a href="#" className={styles.materialDownload}>Download</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className={styles.lessonNavigation}>
            <Link 
              to={hasPrevLesson() ? `/lesson/${courseId}/${prevLessonNum}` : "#"}
              className={`${styles.navBtn} ${styles.prev} ${
                !hasPrevLesson() ? styles.disabled : ''
              }`}
            >
              <i className="fas fa-arrow-left"></i>
              {hasPrevLesson() ? `Lesson ${prevLessonNum}` : 'No Previous'}
            </Link>
            
            <Link to={`/${courseId}`} className={`${styles.navBtn} ${styles.backToLessonsBottom}`}>
              <i className="fas fa-list"></i>
              Course Overview
            </Link>
            
            <Link 
              to={isCompleted && nextLessonExists ? `/lesson/${courseId}/${nextLessonNum}` : "#"}
              className={`${styles.navBtn} ${
                !(isCompleted && nextLessonExists) ? styles.disabled : ''
              }`}
            >
              {nextLessonExists ? `Next: ${nextTitle}` : 'Course Complete'}
              {nextLessonExists && <i className="fas fa-arrow-right"></i>}
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LessonPage;