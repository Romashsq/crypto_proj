// import React from 'react';
// import styles from './CoursesPreview.module.css';

// const CoursesCard = ({ course }) => {
//   // Простые функции для получения данных
//   const getDifficulty = (id) => {
//     const levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
//     return levels[id % 3];
//   };

//   const getCategory = (id) => {
//     const categories = ['CRYPTO', 'SECURITY', 'TRADING', 'EDUCATION', 'SECURITY', 'DEFI', 'NFT'];
//     return categories[id - 1] || 'CRYPTO';
//   };

//   const getRating = () => {
//     return '4.8';
//   };

//   return (
//     <div className={`${styles.courseCard} courseCard`}>
//       <a 
//         href={course.link} 
//         className={styles.cardLink}
//         onClick={(e) => {
//           e.preventDefault();
//           setTimeout(() => {
//             window.open(course.link, '_blank');
//           }, 100);
//         }}
//       >
//         <div className={styles.courseImage}>
//           <i className={course.icon}></i>
//           <div className={styles.difficultyBadge}>
//             {getDifficulty(course.id)}
//           </div>
//         </div>
        
//         <div className={styles.courseContent}>
//           <div className={styles.categoryTag}>
//             {getCategory(course.id)}
//           </div>
          
//           <h3>{course.title}</h3>
//           <p>{course.description}</p>
          
//           {course.id === 1 && (
//             <div className={styles.progressBar}>
//               <div className={styles.progressFill} style={{ width: '65%' }}></div>
//             </div>
//           )}
          
//           <div className={styles.courseMeta}>
//             <span>
//               <i className="far fa-clock"></i> {course.duration}
//             </span>
//             <span>
//               <i className="far fa-file-alt"></i> {course.lessons}
//             </span>
//             <span className={styles.rating}>
//               <i className="fas fa-star"></i> {getRating()}
//             </span>
//           </div>
          
//           <button 
//             className={styles.enrollButton}
//             onClick={(e) => {
//               e.stopPropagation();
//               e.preventDefault();
//               window.open(course.link, '_blank');
//             }}
//           >
//             {course.id === 1 ? 'Continue' : 'Enroll Now'}
//             <i className="fas fa-arrow-right"></i>
//           </button>
//         </div>
//       </a>
//     </div>
//   );
// };

// export default CoursesCard;


// src/components/Main/CoursesPreview/CourseCard.jsx
import React from 'react';
import styles from './CoursesPreview.module.css';

const CoursesCard = ({ course, index }) => {
  return (
    <div className={styles.courseCard}>
      <div className={styles.cardLink}>
        <div className={styles.courseImage}>
          <i className={course.icon}></i>
        </div>
        
        <div className={styles.courseContent}>
          <div className={styles.categoryTag}>Crypto</div>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '0%' }}></div>
          </div>
          
          <div className={styles.courseMeta}>
            <span>
              <i className="fas fa-clock"></i> {course.duration}
            </span>
            <span>
              <i className="fas fa-book-open"></i> {course.lessons}
            </span>
            <span className={styles.rating}>
              <i className="fas fa-star"></i> 4.9
            </span>
          </div>
          
          <button className={styles.enrollButton}>
            Enroll Now
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesCard;