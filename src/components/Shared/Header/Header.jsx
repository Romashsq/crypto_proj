import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../Context/ThemeContext';
import { useScrollHeader } from '../../../hooks/useScrollHeader';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../../assets/logo.png';
import { Moon, Sun, Heart, User } from '../../../assets/Icons';
import api from '../../../services/api';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const isHeaderHidden = useScrollHeader();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  const checkAuth = () => {
    const auth = api.isAuthenticated();
    setIsAuthenticated(auth);
    if (auth) {
      setUser(api.getCurrentUser());
    } else {
      setUser(null);
    }
  };

  const handleNavigation = (e, anchor = null) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      if (anchor) {
        setTimeout(() => {
          const element = document.getElementById(anchor);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
            window.location.hash = anchor;
          }
        }, 50); 
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.location.hash = '';
      }
    } else {
      navigate('/');
      
      let attempts = 0;
      const maxAttempts = 20;
      
      const checkAndScroll = () => {
        attempts++;
        
        if (anchor) {
          const element = document.getElementById(anchor);
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
              window.location.hash = anchor;
            }, 100); 
          } else if (attempts < maxAttempts) {
            setTimeout(checkAndScroll, 100);
          } else {
            window.location.hash = anchor;
          }
        }
      };
    
      setTimeout(checkAndScroll, 300);
    }
    
    closeMobileMenu();
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.location.hash = '';
    } else {
      navigate('/');
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.location.hash = '';
    } else {
      navigate('/');
    }
    closeMobileMenu();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogIn = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
    closeMobileMenu();
  };

  const handleYourLessons = () => {
    navigate('/your-lessons');
    closeMobileMenu();
  };

  const handleProfile = () => {
    navigate('/profile');
    closeMobileMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector(`.${styles.nav}`);
      const mobileMenuBtn = document.querySelector(`.${styles.mobileMenuBtn}`);
      if (isMobileMenuOpen && nav && !nav.contains(event.target) && 
          mobileMenuBtn && !mobileMenuBtn.contains(event.target)) {
        closeMobileMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header className={`${styles.header} ${isHeaderHidden ? styles.hidden : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        <a href="/" className={styles.logo} onClick={handleLogoClick}>
          <img src={logo} alt="FLOW Logo" className={styles.logoImage} />
        </a>
        
        <button 
          className={styles.mobileMenuBtn} 
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className={styles.menuIcon}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.active : ''}`}>
          <ul>
            <li><a href="/" onClick={handleHomeClick}>Home</a></li>
            <li>
              <a 
                href="#learning-path" 
                onClick={(e) => handleNavigation(e, 'learning-path')}
              >
                Learning Path
              </a>
            </li>
            <li><Link to="/courses" onClick={closeMobileMenu}>Courses</Link></li>
            <li>
              <a 
                href="#more-section" 
                onClick={(e) => handleNavigation(e, 'more-section')}
              >
                More
              </a>
            </li>
            <li className={styles.dropdown}>
              <a href="#">
                Resources 
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className={styles.dropdownIcon}
                >
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </a>
              <div className={styles.dropdownContent}>
                <Link to="/crypto" onClick={closeMobileMenu}>Crypto</Link>
                <Link to="/scams" onClick={closeMobileMenu}>Scams</Link>
                <Link to="/memecoins" onClick={closeMobileMenu}>Memecoins</Link>
                <Link to="/security" onClick={closeMobileMenu}>Security</Link>
              </div>
            </li>
            {/* Your Lessons в мобильном меню */}
            <li className={styles.mobileYourLessons}>
              <Link to="/your-lessons" onClick={closeMobileMenu}>
                <Heart width={16} height={16} />
                <span>Your Lessons</span>
              </Link>
            </li>
            {/* Мобильное меню для авторизованных пользователей */}
            {isAuthenticated && (
              <>
                <li className={styles.mobileProfile}>
                  <Link to="/profile" onClick={closeMobileMenu}>
                    <User width={16} height={16} />
                    <span>Profile ({user?.level || 1} lvl)</span>
                  </Link>
                </li>
                <li className={styles.mobileLogout}>
                  <button onClick={handleLogout} className={styles.mobileLogoutBtn}>
                    Log out
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
        
        <div className={styles.headerActions}>
          {/* Your Lessons - всегда слева */}
          <button 
            className={styles.yourLessonsBtn}
            onClick={handleYourLessons}
            title="Your Saved Lessons"
          >
            <Heart width={18} height={18} />
            <span>Your Lessons</span>
          </button>

          {isAuthenticated ? (
            // В системе: Logout + Profile
            <>
              <button 
                className={styles.logoutBtn}
                onClick={handleLogout}
                title="Log out"
              >
                Log out
              </button>

              <button 
                className={styles.profileButton}
                onClick={handleProfile}
                aria-label="Go to profile"
                title={`${user?.username || 'User'} (Level ${user?.level || 1})`}
              >
                <User width={20} height={20} />
              </button>
            </>
          ) : (
            // Не в системе: Log In + Sign Up
            <>
              <button 
                className={styles.logInBtn}
                onClick={handleLogIn}
              >
                Log In
              </button>

              <button 
                className={styles.signUpBtn}
                onClick={handleSignUp}
              >
                Sign up
              </button>
            </>
          )}

          {/* Тема - всегда справа */}
          <button 
            className={styles.themeToggle} 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`${theme === 'light' ? 'Dark theme' : 'Light theme'}`}
          >
            {theme === 'light' ? <Moon width={20} height={20} /> : <Sun width={20} height={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

