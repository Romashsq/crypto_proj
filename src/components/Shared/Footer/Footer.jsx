import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../../Context_TEMP/ThemeContext';
import styles from './Footer.module.css';
import logo from '../../../assets/logo.png'

const Footer = () => {
  const { theme } = useTheme();
  const backToTopRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backToTopRef.current) {
        if (window.scrollY > 500) {
          backToTopRef.current.classList.add(styles.visible);
        } else {
          backToTopRef.current.classList.remove(styles.visible);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        
        {/* Верхняя часть */}
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <div className={styles.logoContainer}>
              <img src={logo} alt="FLOW Logo" className={styles.logo} />
              <div>
                <h2 className={styles.brandName}>FLOW</h2>
                <p className={styles.tagline}>Future Learning On Web3</p>
              </div>
            </div>
            <p className={styles.description}>
              Learn blockchain, DeFi, NFTs and Web3 development.
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.column}>
              <h3>Courses</h3>
              <ul>
                <li><a href="/crypto">Crypto</a></li>
                <li><a href="/scams">Scams</a></li>
                <li><a href="/memecoins">Memecoins</a></li>
                <li><a href="/security">Security</a></li>
              </ul>
            </div>
            
            <div className={styles.column}>
              <h3>Links</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="#learning-path">Learning Path</a></li>
                <li><a href="/courses">All Courses</a></li>
              </ul>
            </div>
            
            <div className={styles.column}>
              <h3>Connect</h3>
              <div className={styles.social}>
                <a href="#" className={styles.socialLink}><i className="fab fa-twitter"></i></a>
                <a href="#" className={styles.socialLink}><i className="fab fa-discord"></i></a>
                <a href="#" className={styles.socialLink}><i className="fab fa-telegram"></i></a>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} FLOW Web3 Academy
          </p>
          <div className={styles.legal}>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#cookies">Cookies</a>
          </div>
        </div>
      </div>

      {/* Кнопка наверх */}
      <button 
        ref={backToTopRef}
        className={styles.backToTop}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;

