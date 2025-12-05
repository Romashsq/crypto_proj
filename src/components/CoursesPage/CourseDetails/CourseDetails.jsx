import React from 'react';
import styles from './CourseDetails.module.css';

const CourseDetails = () => {
  return (
    <section className={styles.pageHeader}>
      <div className={styles.container}>
        <h1>Crypto Courses</h1>
        <p>
          Your comprehensive guide to understanding blockchain technology, 
          cryptocurrencies, and navigating the Web3 space safely and effectively.
        </p>
        <div className={styles.pageSubtitle}>
          <p>
            From blockchain fundamentals to advanced trading strategies, 
            our structured learning path will help you build the knowledge 
            and confidence needed to succeed in the crypto world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;