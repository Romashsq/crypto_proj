// src/components/Shared/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../Context/ThemeContext';
import { useScrollHeader } from '../../../hooks/useScrollHeader';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const isHeaderHidden = useScrollHeader();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.location.reload(); // Перезагружаем главную страницу
    } else {
      navigate('/'); // Переходим на главную
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.location.reload();
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector('nav');
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
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
          <img src="/loogo.png" alt="FLOW Logo" />
          FLOW
        </a>
        
        <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>☰</button>
        <button className={styles.closeMenu} onClick={closeMobileMenu}>✕</button>
        
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.active : ''}`}>
          <ul>
            <li><a href="/" onClick={handleHomeClick}>Home</a></li>
            <li><a href="#learning-path" onClick={closeMobileMenu}>Learning Path</a></li>
            <li><Link to="/courses" onClick={closeMobileMenu}>Courses</Link></li>
            <li><a href="#more-section" onClick={closeMobileMenu}>More</a></li>
            <li className={styles.dropdown}>
              <a href="#">Resources <i className="fas fa-chevron-down"></i></a>
              <div className={styles.dropdownContent}>
                <a href="#crypto-courses" onClick={closeMobileMenu}>Crypto</a>
                <a href="#scams-courses" onClick={closeMobileMenu}>Scams</a>
                <a href="#memecoins-courses" onClick={closeMobileMenu}>Memecoins</a>
                <a href="#security-courses" onClick={closeMobileMenu}>Security</a>
              </div>
            </li>
          </ul>
        </nav>
        
        <button className={styles.themeToggle} onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header;