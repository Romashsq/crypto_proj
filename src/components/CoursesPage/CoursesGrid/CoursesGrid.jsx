import React from 'react';
import CourseCard from './CourseCard/CourseCard';
import styles from './CoursesGrid.module.css';

const coursesData = [
  {
    id: 'crypto-fundamentals',
    title: 'Crypto Fundamentals',
    description: 'Master major cryptocurrencies: SOL, BTC, ETH, SUI, BASE, BNB. Learn about blockchain networks and their unique features.',
    icon: 'fas fa-coins',
    progress: 16,
    lessonsCount: 6,
    lessons: [
      { id: 1, title: 'SOL - Solana Fundamentals', duration: '45 min', status: 'active' },
      { id: 2, title: 'BTC - Bitcoin Basics', duration: '35 min', status: 'locked' },
      { id: 3, title: 'ETH - Ethereum Ecosystem', duration: '50 min', status: 'locked' },
      { id: 4, title: 'SUI - New Generation Blockchain', duration: '30 min', status: 'locked' },
      { id: 5, title: 'BASE - Coinbase Layer 2', duration: '25 min', status: 'locked' },
      { id: 6, title: 'BNB - Binance Ecosystem', duration: '40 min', status: 'locked' },
    ]
  },
  {
    id: 'scams-protection',
    title: 'Scams Protection',
    description: 'Learn to identify and avoid crypto scams: Pump & Dump, Rug Pulls, Phishing, Fake Calls, and Bundle scams.',
    icon: 'fas fa-shield-alt',
    progress: 0,
    lessonsCount: 5,
    lessons: [
      { id: 1, title: 'PUMP n DUMP Schemes', duration: '30 min', status: 'locked' },
      { id: 2, title: 'BUNDLES Scams', duration: '25 min', status: 'locked' },
      { id: 3, title: 'RUGPULL Identification', duration: '35 min', status: 'locked' },
      { id: 4, title: 'FISHING Attacks', duration: '20 min', status: 'locked' },
      { id: 5, title: 'Fake CALLS Protection', duration: '15 min', status: 'locked' },
    ]
  },
  {
    id: 'memecoins',
    title: 'Memecoins',
    description: 'Understand memecoin creation, trading strategies, market dynamics, and community culture.',
    icon: 'fas fa-rocket',
    progress: 0,
    lessonsCount: 4,
    lessons: [
      { id: 1, title: 'How to Create Memecoins', duration: '40 min', status: 'locked' },
      { id: 2, title: 'How Memecoins Work', duration: '35 min', status: 'locked' },
      { id: 3, title: 'How to Trade Memecoins', duration: '50 min', status: 'locked' },
      { id: 4, title: 'Where to Trade Memecoins', duration: '25 min', status: 'locked' },
    ]
  },
  {
    id: 'security-essentials',
    title: 'Security Essentials',
    description: 'Advanced security practices, wallet protection, and how to avoid being hacked or scammed.',
    icon: 'fas fa-lock',
    progress: 0,
    lessonsCount: 3,
    lessons: [
      { id: 1, title: 'How to Avoid Being Larped', duration: '30 min', status: 'locked' },
      { id: 2, title: 'How to Avoid Being Drowned', duration: '25 min', status: 'locked' },
      { id: 3, title: 'Best Security Options', duration: '40 min', status: 'locked' },
    ]
  },
  {
    id: 'additional-materials',
    title: 'Additional Materials',
    description: 'Crypto news, social media guides, slang dictionary, and ongoing market updates.',
    icon: 'fas fa-book',
    progress: 0,
    lessonsCount: 3,
    lessons: [
      { id: 1, title: 'Crypto NEWS Updates', duration: '20 min', status: 'locked' },
      { id: 2, title: 'SOCIALS Guide', duration: '35 min', status: 'locked' },
      { id: 3, title: 'Crypto SLANG Dictionary', duration: '25 min', status: 'locked' },
    ]
  },
  {
    id: 'defi-staking',
    title: 'DeFi & Staking',
    description: 'Learn about decentralized finance, yield farming, liquidity pools, and staking strategies.',
    icon: 'fas fa-chart-line',
    progress: 0,
    lessonsCount: 4,
    lessons: [
      { id: 1, title: 'What is DeFi?', duration: '45 min', status: 'locked' },
      { id: 2, title: 'Staking Basics', duration: '30 min', status: 'locked' },
      { id: 3, title: 'Yield Farming', duration: '50 min', status: 'locked' },
      { id: 4, title: 'Liquidity Pools', duration: '40 min', status: 'locked' },
    ]
  }
];

const CoursesGrid = () => {
  return (
    <div className={styles.coursesGrid}>
      {coursesData.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </div>
  );
};

export default CoursesGrid;