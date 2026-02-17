// Profile.jsx - ПОЛНАЯ ВЕРСИЯ С РАБОЧИМИ КУРСАМИ
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../Context_TEMP/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';
import api from '../../services/api';
import OverallProgress from './OverallProgress';

import { 
  User, 
  Heart, 
  Schedule,
  Shelled,
  Sun,
  Moon,
  Download,
  LockOpen,
  Rocket,
  Nft,
  Wallet,
  Tea,
  Ghost,
} from '../../assets/Icons';

// Компонент прогресса
const ProgressRing = ({ progress, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.progressRing}>
      <svg width={size} height={size}>
        <circle
          className={styles.progressRingBackground}
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={styles.progressRingCircle}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className={styles.progressRingText}
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
};

const Profile = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  
  // Получаем реального пользователя
  const currentUser = api.getCurrentUser();
  
  // Редирект если нет пользователя
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  // Состояние для курсов пользователя
  const [userCourses, setUserCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);

  // Данные пользователя
  const [userData, setUserData] = useState({
    name: currentUser?.fullName || 'New User',
    username: currentUser?.username || '@newuser',
    bio: 'Start your crypto learning journey!',
    joinDate: currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently',
    level: currentUser?.level || 1,
    xp: currentUser?.xp || 0,
    nextLevelXp: 1000,
    rank: 'Beginner',
    streak: 0,
    achievements: 0
  });

  // Статистика
  const [stats, setStats] = useState({
    completionRate: 0,
    avgScore: 0,
    timeSpent: 0,
    enrolledCourses: 0,
    completedLessons: 0,
    totalLessons: 0
  });

  // Данные для общего прогресса
  const [overallProgressData, setOverallProgressData] = useState({
    progress: 0,
    completedCourses: 0,
    totalCourses: 10,
    enrolledCourses: 0,
    achievements: 0
  });

  // Загружаем данные о прогрессе и курсах
  useEffect(() => {
    if (currentUser) {
      fetchProgressData();
      loadUserCourses();
    }
  }, [currentUser]);

  const fetchProgressData = async () => {
    try {
      // Получаем общий прогресс
      const response = await api.getOverallProgress();
      
      if (response.success) {
        setOverallProgressData(prev => ({
          ...prev,
          progress: response.totalProgress || 0,
          completedCourses: response.completedCourses || 0,
          enrolledCourses: response.enrolledCourses || 0
        }));
        
        setStats(prev => ({
          ...prev,
          completionRate: response.totalProgress || 0,
          enrolledCourses: response.enrolledCourses || 0,
          completedLessons: response.completedLessons || 0,
          totalLessons: response.totalLessons || 0
        }));
      }
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  };

  const loadUserCourses = async () => {
    try {
      setCoursesLoading(true);
      const response = await api.getMyCourses();
      
      if (response.success) {
        setUserCourses(response.courses || []);
        
        // Обновляем статистику
        const totalProgress = response.courses.length > 0 
          ? Math.round(response.courses.reduce((sum, course) => sum + (course.percentage || 0), 0) / response.courses.length)
          : 0;
        
        setOverallProgressData(prev => ({
          ...prev,
          progress: totalProgress,
          completedCourses: response.completedCourses || 0,
          enrolledCourses: response.enrolledCourses || 0
        }));
      }
    } catch (error) {
      console.error('Error loading user courses:', error);
    } finally {
      setCoursesLoading(false);
    }
  };

  // Недавние активности
  const [recentActivity, setRecentActivity] = useState([
    { 
      id: 1, 
      type: 'welcome', 
      title: 'Welcome to Crypto Platform!', 
      course: 'Get Started', 
      time: 'Just now', 
      status: 'new' 
    }
  ]);

  // Данные для графика
  const [performanceData, setPerformanceData] = useState([
    { month: 'Jan', score: 0 },
    { month: 'Feb', score: 0 },
    { month: 'Mar', score: 0 },
    { month: 'Apr', score: 0 },
    { month: 'May', score: 0 },
    { month: 'Jun', score: 0 }
  ]);

  // Цели
  const [goals, setGoals] = useState([
    { 
      id: 1, 
      title: 'Complete First Lesson', 
      progress: 0, 
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] 
    },
    { 
      id: 2, 
      title: 'Earn 100 XP', 
      progress: 0, 
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] 
    },
    { 
      id: 3, 
      title: 'Complete Crypto Fundamentals Course', 
      progress: 0, 
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] 
    }
  ]);

  // Функция выхода
  const handleLogout = () => {
    api.logout();
    navigate('/login');
  };

  // Функция для перехода к курсу
  const goToCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  // Функция для перехода к курсам
  const goToCoursesPage = () => {
    navigate('/courses');
  };

  // Форматирование даты
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric' 
      });
    } catch (error) {
      return 'N/A';
    }
  };

  if (!currentUser) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={`${styles.profilePage} ${theme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.profileContainer}>
        {/* Левая панель */}
        <aside className={styles.sidebar}>
          {/* Аватар и информация */}
          <div className={styles.profileHeader}>
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}>
                <User width={80} height={80} />
              </div>
              <div className={styles.levelBadge}>
                Lvl {userData.level}
              </div>
            </div>
            
            <div className={styles.userInfo}>
              <h1 className={styles.userName}>{userData.name}</h1>
              <p className={styles.username}>{userData.username}</p>
              <p className={styles.userBio}>{userData.bio}</p>
            </div>
            
            <div className={styles.joinDate}>
              <Schedule width={16} height={16} />
              <span>Joined {userData.joinDate}</span>
            </div>
          </div>

          {/* Прогресс уровня */}
          <div className={styles.levelProgress}>
            <div className={styles.levelInfo}>
              <span className={styles.levelLabel}>Level Progress</span>
              <span className={styles.levelXp}>{userData.xp} / {userData.nextLevelXp} XP</span>
            </div>
            <div className={styles.xpBar}>
              <div 
                className={styles.xpFill}
                style={{ width: `${(userData.xp / userData.nextLevelXp) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Быстрая статистика */}
          <div className={styles.quickStats}>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <Rocket width={20} height={20} />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statValue}>{userData.rank}</span>
                <span className={styles.statLabel}>Rank</span>
              </div>
            </div>
            
            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <Heart width={20} height={20} />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statValue}>{userData.streak} days</span>
                <span className={styles.statLabel}>Streak</span>
              </div>
            </div>
            
            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <Shelled width={20} height={20} />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statValue}>{overallProgressData.achievements}</span>
                <span className={styles.statLabel}>Achievements</span>
              </div>
            </div>
          </div>

          {/* Навигация */}
          <nav className={styles.sidebarNav}>
            <button 
              className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Wallet width={20} height={20} />
              <span>Overview</span>
            </button>
            
            <button 
              className={`${styles.navItem} ${activeTab === 'courses' ? styles.active : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              <Nft width={20} height={20} />
              <span>My Courses</span>
              {userCourses.length > 0 && (
                <span className={styles.courseCount}>{userCourses.length}</span>
              )}
            </button>
            
            <button 
              className={`${styles.navItem} ${activeTab === 'achievements' ? styles.active : ''}`}
              onClick={() => setActiveTab('achievements')}
            >
              <Shelled width={20} height={20} />
              <span>Achievements</span>
            </button>
            
            <button 
              className={`${styles.navItem} ${activeTab === 'stats' ? styles.active : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              <Download width={20} height={20} />
              <span>Statistics</span>
            </button>
            
            <button 
              className={`${styles.navItem} ${activeTab === 'community' ? styles.active : ''}`}
              onClick={() => setActiveTab('community')}
            >
              <Ghost width={20} height={20} />
              <span>Community</span>
            </button>
          </nav>

          {/* Настройки */}
          <div className={styles.settingsSection}>
            <button className={styles.settingsBtn}>
              <LockOpen width={20} height={20} />
              <span>Settings</span>
            </button>
            
            <button 
              className={styles.logoutBtn}
              onClick={handleLogout}
            >
              <Tea width={20} height={20} />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Основной контент */}
        <main className={styles.mainContent}>
          {/* Заголовок */}
          <div className={styles.contentHeader}>
            <div className={styles.headerTitle}>
              <h2>Dashboard</h2>
              <p>Welcome back! Start your crypto learning journey</p>
            </div>
            
            <div className={styles.headerActions}>
              <button className={styles.editProfileBtn}>
                Edit Profile
              </button>
              <button 
                className={styles.themeToggleBtn}
                onClick={toggleTheme}
              >
                {theme === 'light' ? (
                  <Moon width={20} height={20} />
                ) : (
                  <Sun width={20} height={20} />
                )}
              </button>
            </div>
          </div>

          {/* БЛОК ОБЩЕГО ПРОГРЕССА */}
          <div className={styles.overallProgressSection}>
            <OverallProgress 
              progress={overallProgressData.progress}
              completedCourses={overallProgressData.completedCourses}
              totalCourses={overallProgressData.totalCourses}
              enrolledCourses={overallProgressData.enrolledCourses}
              achievements={overallProgressData.achievements}
            />
          </div>

          {/* Вкладки контента */}
          {activeTab === 'overview' && (
            <>
              {/* Три блока статистики */}
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statCardHeader}>
                    <div className={styles.statCardIcon}>
                      <Rocket width={24} height={24} />
                    </div>
                    <h3>Completion Rate</h3>
                  </div>
                  <div className={styles.statCardBody}>
                    <ProgressRing progress={stats.completionRate} size={100} />
                    <div className={styles.statCardInfo}>
                      <span className={styles.statCardValue}>{stats.completionRate}%</span>
                      <span className={styles.statCardLabel}>of all lessons</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statCardHeader}>
                    <div className={styles.statCardIcon}>
                      <Heart width={24} height={24} />
                    </div>
                    <h3>Average Score</h3>
                  </div>
                  <div className={styles.statCardBody}>
                    <div className={styles.scoreDisplay}>
                      <span className={styles.scoreValue}>{stats.avgScore}</span>
                      <span className={styles.scoreLabel}>out of 100</span>
                    </div>
                    <div className={styles.scoreProgress}>
                      <div className={styles.scoreBar}>
                        <div 
                          className={styles.scoreFill}
                          style={{ width: `${stats.avgScore}%` }}
                        ></div>
                      </div>
                      <span className={styles.scoreText}>Start learning!</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statCardHeader}>
                    <div className={styles.statCardIcon}>
                      <Schedule width={24} height={24} />
                    </div>
                    <h3>Time Spent</h3>
                  </div>
                  <div className={styles.statCardBody}>
                    <div className={styles.timeDisplay}>
                      <span className={styles.timeValue}>{stats.timeSpent}</span>
                      <span className={styles.timeLabel}>hours</span>
                    </div>
                    <div className={styles.timeBreakdown}>
                      <div className={styles.timeItem}>
                        <span className={styles.timeType}>Learning</span>
                        <span className={styles.timeHours}>0h</span>
                      </div>
                      <div className={styles.timeItem}>
                        <span className={styles.timeType}>Practice</span>
                        <span className={styles.timeHours}>0h</span>
                      </div>
                      <div className={styles.timeItem}>
                        <span className={styles.timeType}>Projects</span>
                        <span className={styles.timeHours}>0h</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* График производительности */}
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <h3>Performance Trends</h3>
                  <select className={styles.chartSelect}>
                    <option>Last 6 months</option>
                    <option>Last year</option>
                    <option>All time</option>
                  </select>
                </div>
                <div className={styles.chartContainer}>
                  <div className={styles.chartGrid}>
                    {performanceData.map((item, index) => (
                      <div key={index} className={styles.chartColumn}>
                        <div className={styles.chartBarContainer}>
                          <div 
                            className={styles.chartBar}
                            style={{ height: `${item.score}%` }}
                          ></div>
                        </div>
                        <span className={styles.chartLabel}>{item.month}</span>
                        <span className={styles.chartValue}>{item.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.chartLegend}>
                  <div className={styles.legendItem}>
                    <div className={styles.legendColor} style={{ backgroundColor: '#9B2FFF' }}></div>
                    <span>Monthly Score</span>
                  </div>
                </div>
              </div>

              {/* Цели и активности */}
              <div className={styles.bottomGrid}>
                <div className={styles.goalsCard}>
                  <div className={styles.cardHeader}>
                    <h3>Learning Goals</h3>
                    <Link to="/goals" className={styles.viewAllLink}>View All</Link>
                  </div>
                  <div className={styles.goalsList}>
                    {goals.map(goal => (
                      <div key={goal.id} className={styles.goalItem}>
                        <div className={styles.goalInfo}>
                          <h4 className={styles.goalTitle}>{goal.title}</h4>
                          <div className={styles.goalMeta}>
                            <span className={styles.goalDeadline}>
                              <Schedule width={14} height={14} />
                              Due {goal.deadline}
                            </span>
                          </div>
                        </div>
                        <div className={styles.goalProgress}>
                          <div className={styles.goalProgressBar}>
                            <div 
                              className={styles.goalProgressFill}
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                          <span className={styles.goalProgressText}>{goal.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className={styles.addGoalBtn}>
                    + Add New Goal
                  </button>
                </div>
                
                <div className={styles.activityCard}>
                  <div className={styles.cardHeader}>
                    <h3>Recent Activity</h3>
                    <Link to="/activity" className={styles.viewAllLink}>View All</Link>
                  </div>
                  <div className={styles.activityList}>
                    {recentActivity.map(activity => (
                      <div key={activity.id} className={styles.activityItem}>
                        <div className={styles.activityIcon}>
                          <Rocket width={20} height={20} />
                        </div>
                        <div className={styles.activityContent}>
                          <h4 className={styles.activityTitle}>{activity.title}</h4>
                          <p className={styles.activityCourse}>{activity.course}</p>
                          <div className={styles.activityFooter}>
                            <span className={styles.activityTime}>{activity.time}</span>
                            <span className={`${styles.activityStatus} ${styles[activity.status]}`}>
                              {activity.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'courses' && (
            <div className={styles.coursesTab}>
              <div className={styles.tabHeader}>
                <h3>My Courses ({userCourses.length})</h3>
                <button 
                  className={styles.browseCoursesBtn}
                  onClick={goToCoursesPage}
                >
                  Browse More Courses
                </button>
              </div>
              
              {coursesLoading ? (
                <div className={styles.loadingState}>
                  <div className={styles.loadingSpinner}></div>
                  <p>Loading your courses...</p>
                </div>
              ) : userCourses.length === 0 ? (
                <div className={styles.noCourses}>
                  <div className={styles.noCoursesIcon}>📚</div>
                  <h4>No Courses Yet</h4>
                  <p>You haven't enrolled in any courses yet. Start your learning journey now!</p>
                  <button 
                    className={styles.enrollNowBtn}
                    onClick={goToCoursesPage}
                  >
                    Browse Courses
                  </button>
                </div>
              ) : (
                <div className={styles.coursesList}>
                  {userCourses.map((course, index) => (
                    <div key={index} className={styles.courseItem}>
                      <div className={styles.courseIcon}>
                        {course.courseIcon || '📚'}
                      </div>
                      <div className={styles.courseInfo}>
                        <h4 className={styles.courseTitle}>{course.courseTitle || `Course ${course.courseId}`}</h4>
                        <div className={styles.courseMeta}>
                          <span className={styles.courseDate}>
                            <Schedule width={14} height={14} />
                            Enrolled: {formatDate(course.enrolledAt)}
                          </span>
                          <span className={styles.courseStatus}>
                            {course.isCompleted ? '✅ Completed' : '📚 In Progress'}
                          </span>
                        </div>
                        <div className={styles.courseProgress}>
                          <div className={styles.courseProgressBar}>
                            <div 
                              className={styles.courseProgressFill}
                              style={{ width: `${course.percentage || 0}%` }}
                            ></div>
                          </div>
                          <div className={styles.progressStats}>
                            <span className={styles.percentage}>{course.percentage || 0}%</span>
                            <span className={styles.lessonsCount}>
                              {course.completedLessons || 0}/{course.totalLessons || 0} lessons
                            </span>
                          </div>
                        </div>
                      </div>
                      <button 
                        className={styles.continueButton}
                        onClick={() => goToCourse(course.courseId)}
                      >
                        {course.percentage > 0 ? 'Continue' : 'Start'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className={styles.emptyTab}>
              <div className={styles.emptyIcon}>🏆</div>
              <h3>Achievements</h3>
              <p>Your achievements will appear here as you complete courses and lessons.</p>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className={styles.emptyTab}>
              <div className={styles.emptyIcon}>📊</div>
              <h3>Statistics</h3>
              <p>Detailed learning statistics will be available soon.</p>
            </div>
          )}

          {activeTab === 'community' && (
            <div className={styles.emptyTab}>
              <div className={styles.emptyIcon}>👥</div>
              <h3>Community</h3>
              <p>Connect with other learners and share your progress.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;