import React, { useState, useEffect } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { Link } from 'react-router-dom';
import styles from './Profile.module.css';

import { 
  User, 
  Heart, 
  Schedule,
  Shelled,
  Light,
  Sun,
  Moon,
  Download,
  LockOpen,
  Rocket,
  Nft,
  Wallet,
  Question,
  Info,
  Tea,
  Ghost,
  LockNoOpen,
  Notes
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
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    username: '@crypto_alex',
    bio: 'Crypto enthusiast & blockchain developer. Learning every day!',
    joinDate: 'January 2024',
    level: 15,
    xp: 1250,
    nextLevelXp: 2000,
    rank: 'Expert',
    streak: 24,
    achievements: 18
  });

  const [stats, setStats] = useState({
    completionRate: 78,
    avgScore: 92,
    timeSpent: 145,
    enrolledCourses: 8,
    completedLessons: 42,
    totalLessons: 56
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'lesson', title: 'Bitcoin Mining', course: 'Crypto Fundamentals', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'quiz', title: 'Security Quiz', course: 'Security Essentials', time: '1 day ago', status: 'passed' },
    { id: 3, type: 'achievement', title: 'Blockchain Master', course: 'General', time: '2 days ago', status: 'earned' },
    { id: 4, type: 'course', title: 'Memecoins Course', course: 'Memecoins', time: '3 days ago', status: 'enrolled' }
  ]);

  const [performanceData, setPerformanceData] = useState([
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 78 },
    { month: 'Mar', score: 85 },
    { month: 'Apr', score: 92 },
    { month: 'May', score: 88 },
    { month: 'Jun', score: 95 }
  ]);

  const [goals, setGoals] = useState([
    { id: 1, title: 'Complete Crypto Fundamentals', progress: 85, deadline: '2024-07-15' },
    { id: 2, title: 'Master Smart Contracts', progress: 45, deadline: '2024-08-20' },
    { id: 3, title: 'Earn Security Expert Badge', progress: 30, deadline: '2024-09-10' }
  ]);

  return (
    <div className={`${styles.profilePage} ${theme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.profileContainer}>
        {/* Левая панель */}
        <aside className={styles.sidebar}>
          {/* Аватар и основная информация */}
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
                <span className={styles.statValue}>{userData.achievements}</span>
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
            
            <button className={styles.logoutBtn}>
              <Tea width={20} height={20} />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Основной контент */}
        <main className={styles.mainContent}>
          {/* Заголовок и действия */}
          <div className={styles.contentHeader}>
            <div className={styles.headerTitle}>
              <h2>Dashboard</h2>
              <p>Welcome back! Here's your learning progress</p>
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

          {/* Три блока по горизонтали */}
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
                  <span className={styles.scoreText}>Excellent!</span>
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
                    <span className={styles.timeHours}>85h</span>
                  </div>
                  <div className={styles.timeItem}>
                    <span className={styles.timeType}>Practice</span>
                    <span className={styles.timeHours}>45h</span>
                  </div>
                  <div className={styles.timeItem}>
                    <span className={styles.timeType}>Projects</span>
                    <span className={styles.timeHours}>15h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Большой блок с графиком */}
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
              <div className={styles.legendItem}>
                <div className={styles.legendColor} style={{ backgroundColor: '#4CAF50' }}></div>
                <span>Target</span>
              </div>
            </div>
          </div>

          {/* Два больших блока снизу */}
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
                      {activity.type === 'lesson' && <Wallet width={20} height={20} />}
                      {activity.type === 'quiz' && <Nft width={20} height={20} />}
                      {activity.type === 'achievement' && <Shelled width={20} height={20} />}
                      {activity.type === 'course' && <Wallet width={20} height={20} />}
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
        </main>
      </div>
    </div>
  );
};

export default Profile;
