import React from 'react';
import styles from './MoreCard.module.css';
import { useTheme } from '../../../../Context_TEMP/ThemeContext'; 

const MoreCard = ({ icon, title, description, buttonText, link }) => {
  const { theme } = useTheme(); 
  
  const themeClass = theme === 'dark' ? styles.darkMode : '';

  return (
    <div className={`${styles.moreCard} ${themeClass}`}>
      <div className={styles.moreIcon}>{icon}</div>
      <h3 className={styles.moreTitle}>{title}</h3>
      <p className={styles.moreDescription}>{description}</p>
      <a href={link} className={styles.moreButton}>
        {buttonText}
      </a>
    </div>
  );
};

export default MoreCard;