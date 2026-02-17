import React from 'react';
import MoreCard from './MoreCard/MoreCard';
import { useTheme } from  '../../../Context_TEMP/ThemeContext'
import styles from './MoreSection.module.css';

const MoreSection = () => {
  const { theme } = useTheme(); 
  

  const sectionThemeClass = theme === 'dark' ? styles.darkMode : '';

  const resources = [
    {
      id: 1,
      icon: '👥',
      title: 'Community & Blog',
      description: 'Join our active community, share experiences and read the latest Web3 news in our blog.',
      buttonText: 'Join Community',
      link: '#community'
    },
    {
      id: 2,
      icon: '❓',
      title: 'FAQ',
      description: 'Find answers to the most common questions about Web3, blockchain and security. Can\'t find an answer? Ask our community!',
      buttonText: 'Read FAQ',
      link: '#faq'
    },
    {
      id: 3,
      icon: 'ℹ️',
      title: 'About Us',
      description: 'Learn more about FLOW\'s mission, our team and how we help beginners safely enter the world of Web3.',
      buttonText: 'Learn More',
      link: '#about'
    }
  ];

  return (
    <section className={`${styles.moreSection} ${sectionThemeClass}`} id="more-section">
      <div className="container">
        <h2 className={styles.sectionTitle}>
          More <span>Resources</span>
        </h2>
        <div className={styles.moreGrid}>
          {resources.map(resource => (
            <MoreCard
              key={resource.id}
              icon={resource.icon}
              title={resource.title}
              description={resource.description}
              buttonText={resource.buttonText}
              link={resource.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreSection;