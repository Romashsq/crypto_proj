import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useScrollHeader } from '../../../hooks/useScrollHeader';
import styles from './Header.module.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const isHeaderHidden = useScrollHeader();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <a href="/" className={styles.logo}>
          <img src="/loogo.png" alt="FLOW Logo" />
          FLOW
        </a>
        
        <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>☰</button>
        <button className={styles.closeMenu} onClick={closeMobileMenu}>✕</button>
        
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.active : ''}`}>
          <ul>
            <li><a href="#learning-path" onClick={closeMobileMenu}>Learning Path</a></li>
            <li><a href="#courses-section" onClick={closeMobileMenu}>Courses</a></li>
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