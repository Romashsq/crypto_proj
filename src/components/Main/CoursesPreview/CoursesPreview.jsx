import React, { useRef } from 'react';
import { usePhantomScroll } from '../../../hooks/usePhantomScroll';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { useNavigate } from 'react-router-dom';
import CoursesCard from './CourseCard';
import styles from './CoursesPreview.module.css';

// Импортируем ваши иконки
import { 
  Ghost,          
  LockOpen,       
  LockNoOpen,     
  Notes,          
  Schedule,
  Nft,
  Rocket,
  Wallet,
  Sun // Добавим Sun для Crypto Fundamentals
} from '../../../assets/Icons'

const CoursesPreview = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  
  useScrollAnimation(sectionRef, styles.animated);
  usePhantomScroll(scrollContainerRef);

  // Массив курсов с вашими иконками
  const courses = [
    {
      id: 1,
      title: "Crypto Fundamentals",
      description: "Master major cryptocurrencies: SOL, BTC, ETH, SUI, BASE, BNB. Learn about blockchain networks and their unique features.",
      duration: "4.5 hours",
      lessons: "31 lessons",
      icon: <Wallet />, // Кошелек для крипто
      link: "crypto-courses.html"
    },
    {
      id: 2,
      title: "Scams Protection",
      description: "Learn to identify and avoid crypto scams: Pump & Dump, Rug Pulls, Phishing, Fake Calls, and Bundle scams.",
      duration: "2.5 hours",
      lessons: "22 lessons",
      icon: <LockNoOpen />, // Закрытый замок
      link: "scams-courses.html"
    },
    {
      id: 3,
      title: "Memecoins",
      description: "Understand memecoin creation, trading strategies, market dynamics, and community culture.",
      duration: "3 hours",
      lessons: "22 lessons",
      icon: <Rocket />, // Ракета для мемкоинов
      link: "memecoins-courses.html"
    },
    {
      id: 4,
      title: "Additional Materials",
      description: "Crypto news, social media guides, slang dictionary, and ongoing market updates.",
      duration: "2 hours",
      lessons: "12 lessons",
      icon: <Notes />, // Заметки
      link: "additional-materials.html"
    },
    {
      id: 5,
      title: "Security Essentials",
      description: "Advanced security practices, wallet protection, and how to avoid being hacked or scammed.",
      duration: "2 hours",
      lessons: "15 lessons",
      icon: <LockOpen />, // Открытый замок
      link: "security-courses.html"
    },
    {
      id: 6,
      title: "DeFi & Staking",
      description: "Learn about decentralized finance, yield farming, liquidity pools, and staking strategies.",
      duration: "3.5 hours",
      lessons: "25 lessons",
      icon: <Schedule />, // График/расписание
      link: "defi-courses.html"
    },
    {
      id: 7,
      title: "NFT & Digital Art",
      description: "Explore NFT creation, trading, marketplaces, and the digital art revolution in Web3.",
      duration: "2.5 hours",
      lessons: "18 lessons",
      icon: <Nft />, // NFT иконка
      link: "nft-courses.html"
    }
  ];

  // ВАШИ ФУНКЦИИ
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector(`.${styles.courseCard}`).offsetWidth + 28;
      const targetScroll = Math.max(0, scrollContainerRef.current.scrollLeft - cardWidth * 1.5);
      smoothScrollTo(scrollContainerRef.current, targetScroll, 300);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector(`.${styles.courseCard}`).offsetWidth + 28;
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      const targetScroll = Math.min(maxScroll, scrollContainerRef.current.scrollLeft + cardWidth * 1.5);
      smoothScrollTo(scrollContainerRef.current, targetScroll, 300);
    }
  };

  const smoothScrollTo = (element, target, duration = 400) => {
    const start = element.scrollLeft;
    const change = target - start;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      element.scrollLeft = start + change * ease;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  };

  const handleCardClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleCoursesTitleClick = (e) => {
    e.preventDefault();
    navigate('/courses');
  };

  return (
    <section className={styles.courses} id="courses-section" ref={sectionRef}>
      <div className="container">
        <a 
          href="/courses" 
          className={styles.coursesTitleLink}
          onClick={handleCoursesTitleClick}
        >
          <h2 className={styles.sectionTitle}>Our <span>Courses</span></h2>
        </a>
        
        <div className={styles.coursesScrollWrapper}>
          <button className={styles.scrollBtn} onClick={scrollLeft} aria-label="Scroll left">
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className={styles.coursesScrollContainer}>
            <div className={styles.coursesScroll} ref={scrollContainerRef}>
              {courses.map((course) => (
                <div 
                  key={course.id} 
                  className={styles.courseCardWrapper}
                  onClick={() => handleCardClick(course.id)}
                >
                  <CoursesCard course={course} />
                </div>
              ))}
            </div>
          </div>
          
          <button className={styles.scrollBtn} onClick={scrollRight} aria-label="Scroll right">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoursesPreview;