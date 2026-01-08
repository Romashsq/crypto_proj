import React, { useEffect, useRef } from 'react';
import styles from './LearningPath.module.css';

const LearningPath = () => {
  const sectionRef = useRef(null);

  const pathItems = [
    {
      number: 1,
      title: "Crypto Fundamentals",
      description: "Master the basics of major cryptocurrencies and blockchain networks. Understand SOL, BTC, ETH and other key chains.",
      link: "#crypto-courses"
    },
    {
      number: 2,
      title: "Scams Protection",
      description: "Learn to identify and avoid common crypto scams including rug pulls, phishing, and pump & dump schemes.",
      link: "#scams-courses"
    },
    {
      number: 3,
      title: "Memecoins",
      description: "Understand the world of memecoins - from creation and trading to market dynamics and community culture.",
      link: "#memecoins-courses"
    },
    {
      number: 4,
      title: "Security Essentials",
      description: "Protect your assets with advanced security practices and learn how to avoid common security pitfalls.",
      link: "#security-courses"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animated);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={styles.learningPath} 
      id="learning-path"
    >
      <div className="container">
        <h2 className={styles.sectionTitle}>Your <span>Learning Path</span></h2>
        <div className={styles.pathContainer}>
          <div className={styles.pathLine}></div>
          {pathItems.map((item, index) => (
            <div key={index} className={styles.pathItem}>
              <div className={styles.pathContent}>
                <h3>
                  <a href={item.link} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {item.title}
                  </a>
                </h3>
                <p>{item.description}</p>
              </div>
              <div className={styles.pathIcon}>{item.number}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPath;