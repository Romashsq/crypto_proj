import React from 'react';
import styles from './CoursesPreview.module.css';

const CoursesCard = ({ course, index }) => {
  const getSVGPattern = (idx) => {
    const patterns = [
      // Градиент с волнами
      `<svg width="380" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#667eea"/>
            <stop offset="100%" stop-color="#764ba2"/>
          </linearGradient>
          <path id="wave${idx}" d="M0,100 C150,200 250,0 400,100 L400,200 L0,200 Z" fill="url(#grad${idx})"/>
        </defs>
        <g opacity="0.8">
          <use href="#wave${idx}" transform="translate(-100, 0)"/>
          <use href="#wave${idx}" transform="translate(0, 20)"/>
        </g>
      </svg>`,
      
      // Геометрический паттерн
      `<svg width="380" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f093fb"/>
            <stop offset="100%" stop-color="#f5576c"/>
          </linearGradient>
          <pattern id="pattern${idx}" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="20" fill="url(#grad${idx})" opacity="0.7"/>
            <circle cx="30" cy="30" r="15" fill="white" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern${idx})"/>
      </svg>`,
      
      // Космический фон
      `<svg width="380" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad${idx}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#4facfe"/>
            <stop offset="100%" stop-color="#00f2fe"/>
          </radialGradient>
          <filter id="glow${idx}">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad${idx})"/>
        ${Array.from({length: 15}).map((_, i) => 
          `<circle 
            cx="${Math.random() * 380}" 
            cy="${Math.random() * 200}" 
            r="${Math.random() * 2 + 0.5}" 
            fill="white" 
            opacity="${Math.random() * 0.8 + 0.2}"
            filter="url(#glow${idx})"
          />`
        ).join('')}
      </svg>`,
      
      // Цифровой/техно паттерн
      `<svg width="380" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#43e97b"/>
            <stop offset="100%" stop-color="#38f9d7"/>
          </linearGradient>
          <pattern id="binary${idx}" width="20" height="20" patternUnits="userSpaceOnUse">
            <text x="10" y="10" font-family="monospace" font-size="8" fill="white" opacity="0.3" text-anchor="middle">
              ${Math.random() > 0.5 ? '1' : '0'}
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad${idx})"/>
        <rect width="100%" height="100%" fill="url(#binary${idx})" opacity="0.4"/>
      </svg>`
    ];
    
    return patterns[idx % patterns.length];
  };

  return (
    <div className={styles.courseCard} data-index={index}>
      <a href={course.link} className={styles.cardLink}>
        <div className={styles.courseImage}>
          <div 
            className={styles.svgBackground}
            dangerouslySetInnerHTML={{ __html: getSVGPattern(index) }}
          />
          <div className={styles.iconContainer}>
            <i className={course.icon}></i>
            <div className={styles.iconGlow}></div>
          </div>
          <div className={styles.difficultyBadge}>
            {course.level || 'Intermediate'}
          </div>
        </div>
        <div className={styles.courseContent}>
          <div className={styles.categoryTag}>
            {course.category || 'Development'}
          </div>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${course.progress || 0}%` }}></div>
          </div>
          <div className={styles.courseMeta}>
            <span><i className="far fa-clock"></i> {course.duration}</span>
            <span><i className="far fa-file-alt"></i> {course.lessons}</span>
            <span className={styles.rating}>
              <i className="fas fa-star"></i> {course.rating || '4.8'}
            </span>
          </div>
          <div className={styles.enrollButton}>
            {course.enrolled ? 'Continue Learning' : 'Enroll Now'}
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CoursesCard;