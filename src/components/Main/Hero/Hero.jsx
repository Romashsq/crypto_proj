import React, { useRef, useEffect } from 'react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import {useTheme} from '../../../Context/ThemeContext'
import styles from './Hero.module.css';

const Hero = () => {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  
  // Передаем ref и класс анимации в хук
  useScrollAnimation(sectionRef, styles.animated);

  useEffect(() => {
    const animateStats = () => {
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
        if (entry.isIntersecting) {
          setTimeout(animateStats, 500);
          heroObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector(`.${styles.heroProfessional}`);
    if (heroSection) heroObserver.observe(heroSection);

    // Cleanup
    return () => {
      if (heroSection) heroObserver.unobserve(heroSection);
    };
  }, []);

  const handleGetStartedClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      document.body.style.overflow = 'hidden';
      
      const targetPosition = targetElement.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500;
      let startTime = null;
      
      function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const ease = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          document.body.style.overflow = '';
        }
      }
      
      requestAnimationFrame(animation);
      window.history.pushState(null, null, targetId);
    }
  };

  // Добавляем класс темы в зависимости от состояния
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
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber} data-count="50">0</span>
                <span className={styles.statLabel}>Courses</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber} data-count="1000">0</span>
                <span className={styles.statLabel}>Students</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber} data-count="99">0</span>
                <span className={styles.statLabel}>% Success</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.scrollIndicatorHero}>
          <div className={styles.scrollLine}></div>
          <span>Explore Learning Path</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;