import React, { useRef, useEffect } from 'react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { useTheme } from '../../../Context/ThemeContext';
import styles from './Hero.module.css';

let globalStatsAnimated = false;

const Hero = () => {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  
  useScrollAnimation(sectionRef, styles.animated);

  useEffect(() => {
    if (globalStatsAnimated) {
      const stats = document.querySelectorAll(`.${styles.statNumber}`);
      stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        stat.textContent = target;
      });
      return;
    }

    const animateStats = () => {
      if (globalStatsAnimated) return;
      globalStatsAnimated = true;
      
      const stats = document.querySelectorAll(`.${styles.statNumber}`);
      stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = Math.floor(current);
        }, 16);
      });
    };

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !globalStatsAnimated) {
          setTimeout(animateStats, 500);
          heroObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector(`.${styles.heroProfessional}`);
    if (heroSection) heroObserver.observe(heroSection);

    return () => {
      if (heroSection) heroObserver.unobserve(heroSection);
    };
  }, []); 

const handleGetStartedClick = (e) => {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('href');
  
  const scrollToTarget = () => {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      
      if (!isVisible) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
      
      window.location.hash = targetId.replace('#', '');
    } else {
      setTimeout(scrollToTarget, 50);
    }
  };
  
  scrollToTarget();
};

  const themeClass = theme === 'light' ? styles.lightMode : '';

  return (
    <section className={`${styles.heroProfessional} ${themeClass}`} id="hero" ref={sectionRef}>
      <div className={styles.heroBgAnimation}>
        <div className={`${styles.heroOrb} ${styles.orb1}`}></div>
        <div className={`${styles.heroOrb} ${styles.orb2}`}></div>
        <div className={`${styles.heroOrb} ${styles.orb3}`}></div>
        <div className={styles.heroGrid}></div>
      </div>
      
      <div className="container">
        <div className={styles.heroContentProfessional}>
          <div className={styles.heroLogo}>
            <div className={`${styles.logoShape} ${styles.shape1}`}></div>
            <div className={`${styles.logoShape} ${styles.shape2}`}></div>
            <div className={`${styles.logoShape} ${styles.shape3}`}></div>
            <span className={styles.logoText}>FLOW</span>
          </div>
          
          <h1 className={styles.heroHeading}>
            <span className={`${styles.headingLine} ${styles.line1}`}>Future Learning</span>
            <span className={`${styles.headingLine} ${styles.line2}`}>On <span className={styles.textGradient}>Web3</span></span>
          </h1>
          
          <div className={styles.heroDescription}>
            <p>Your safe, structured journey into Web3 starts here. Learn blockchain, wallets, DeFi, and more in a friendly, guided environment.</p>
          </div>
          
          <div className={styles.heroActions}>
            <a href="#learning-path" className={styles.btnHeroPrimary} onClick={handleGetStartedClick}>
              <span className={styles.btnText}>Get Started</span>
              <span className={styles.btnArrow}>→</span>
              <div className={styles.btnShine}></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;