import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { Wallet, Rocket, Schedule } from '../../assets/Icons';
import styles from './ComingSoon.module.css';

const DefiCourse = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const planned = [
    { icon: '🏦', title: 'What is DeFi?', desc: 'Decentralized finance explained — banks without bankers.' },
    { icon: '🌾', title: 'Yield Farming & Liquidity Pools', desc: 'How to earn passive income with your crypto assets.' },
    { icon: '🔒', title: 'Staking Strategies', desc: 'Earn rewards by securing blockchain networks.' },
    { icon: '⚠️', title: 'DeFi Risks & How to Avoid Them', desc: 'Smart contract bugs, rug pulls, impermanent loss — stay safe.' },
  ];

  return (
    <div className={`${styles.page} ${isDark ? styles.darkMode : ''}`}>
      <div className={styles.heroBg} />

      <div className={styles.container}>
        <div className={styles.badge}>
          <Wallet width={14} height={14} />
          <span>DeFi</span>
        </div>

        <div className={styles.comingSoonLabel}>Coming Soon</div>

        <h1 className={styles.title}>
          DeFi & <span className={styles.accent}>Staking</span>
        </h1>

        <p className={styles.subtitle}>
          Master decentralized finance: yield farming, liquidity pools, and staking
          strategies. Learn how to make your crypto work for you — safely.
        </p>

        <div className={styles.timeline}>
          <Schedule width={18} height={18} />
          <span>Expected: Q2 2025</span>
        </div>

        <div className={styles.plannedGrid}>
          {planned.map((item, i) => (
            <div key={i} className={styles.plannedCard}>
              <div className={styles.plannedEmoji}>{item.icon}</div>
              <h3 className={styles.plannedTitle}>{item.title}</h3>
              <p className={styles.plannedDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Link to="/courses" className={styles.btnPrimary}>
            <Rocket width={18} height={18} />
            Browse Available Courses
          </Link>
          <Link to="/community" className={styles.btnSecondary}>
            Get Notified in Community
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DefiCourse;
