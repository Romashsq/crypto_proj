import React, { useState, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';
import CourseDetails from '../components/CoursesPage/CourseDetails/CourseDetails';
import CoursesGrid from '../components/CoursesPage/CoursesGrid/CoursesGrid';
import Sidebar from '../components/Shared/Sidebar/Sidebar';
import CoursesSidebarToggle from '../components/CoursesPage/CoursesSidebarToggle/CoursesSidebarToggle';
import styles from './Courses.module.css';

// Данные курсов
const coursesData = [
  {
    title: "Crypto Fundamentals",
    icon: "fa-coins",
    description: "Master major cryptocurrencies: SOL, BTC, ETH, SUI, BASE, BNB. Learn about blockchain networks and their unique features.",
    progress: 16,
    completedLessons: 1,
    totalLessons: 6,
    isStarted: true,
    buttonText: "Continue Learning",
    buttonLink: "/crypto", // ИЗМЕНИЛ: было "/course/crypto-fundamentals"
    lessons: [
      { number: 1, title: "SOL - Solana Fundamentals", duration: "45 min", status: "active" },
      { number: 2, title: "BTC - Bitcoin Basics", duration: "35 min", status: "locked" },
      { number: 3, title: "ETH - Ethereum Ecosystem", duration: "50 min", status: "locked" },
      { number: 4, title: "SUI - New Generation Blockchain", duration: "30 min", status: "locked" },
      { number: 5, title: "BASE - Coinbase Layer 2", duration: "25 min", status: "locked" },
      { number: 6, title: "BNB - Binance Ecosystem", duration: "40 min", status: "locked" },
    ]
  },
  {
    title: "Scams Protection",
    icon: "fa-shield-alt",
    description: "Learn to identify and avoid crypto scams: Pump & Dump, Rug Pulls, Phishing, Fake Calls, and Bundle scams.",
    progress: 0,
    completedLessons: 0,
    totalLessons: 5,
    isStarted: false,
    buttonText: "Start Course",
    buttonLink: "/scams", // ИЗМЕНИЛ: было "#pump-dump"
    lessons: [
      { number: 1, title: "PUMP n DUMP Schemes", duration: "30 min", status: "available" },
      { number: 2, title: "BUNDLES Scams", duration: "25 min", status: "locked" },
      { number: 3, title: "RUGPULL Identification", duration: "35 min", status: "locked" },
      { number: 4, title: "FISHING Attacks", duration: "20 min", status: "locked" },
      { number: 5, title: "Fake CALLS Protection", duration: "15 min", status: "locked" },
    ]
  },
  {
    title: "Memecoins",
    icon: "fa-rocket",
    description: "Understand memecoin creation, trading strategies, market dynamics, and community culture.",
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    isStarted: false,
    buttonText: "Start Course",
    buttonLink: "/memecoins", // ИЗМЕНИЛ: было "#create-memecoins"
    lessons: [
      { number: 1, title: "How to Create Memecoins", duration: "40 min", status: "available" },
      { number: 2, title: "How Memecoins Work", duration: "35 min", status: "locked" },
      { number: 3, title: "How to Trade Memecoins", duration: "50 min", status: "locked" },
      { number: 4, title: "Where to Trade Memecoins", duration: "25 min", status: "locked" },
    ]
  },
  {
    title: "Security Essentials",
    icon: "fa-lock",
    description: "Advanced security practices, wallet protection, and how to avoid being hacked or scammed.",
    progress: 0,
    completedLessons: 0,
    totalLessons: 3,
    isStarted: false,
    buttonText: "Start Course",
    buttonLink: "/security", // ИЗМЕНИЛ: было "#avoid-larped"
    lessons: [
      { number: 1, title: "How to Avoid Being Larped", duration: "30 min", status: "available" },
      { number: 2, title: "How to Avoid Being Drowned", duration: "25 min", status: "locked" },
      { number: 3, title: "Best Security Options", duration: "40 min", status: "locked" },
    ]
  },
  {
    title: "Additional Materials",
    icon: "fa-book",
    description: "Crypto news, social media guides, slang dictionary, and ongoing market updates.",
    progress: 0,
    completedLessons: 0,
    totalLessons: 3,
    isStarted: false,
    buttonText: "Start Course",
    buttonLink: "/additional", // ИЗМЕНИЛ: было "#news" (создашь позже)
    lessons: [
      { number: 1, title: "Crypto NEWS Updates", duration: "20 min", status: "available" },
      { number: 2, title: "SOCIALS Guide", duration: "35 min", status: "locked" },
      { number: 3, title: "Crypto SLANG Dictionary", duration: "25 min", status: "locked" },
    ]
  },
  {
    title: "DeFi & Staking",
    icon: "fa-chart-line",
    description: "Learn about decentralized finance, yield farming, liquidity pools, and staking strategies.",
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    isStarted: false,
    buttonText: "Start Course",
    buttonLink: "/defi", // ИЗМЕНИЛ: было "#defi" (создашь позже)
    lessons: [
      { number: 1, title: "What is DeFi?", duration: "45 min", status: "available" },
      { number: 2, title: "Staking Basics", duration: "30 min", status: "locked" },
      { number: 3, title: "Yield Farming", duration: "50 min", status: "locked" },
      { number: 4, title: "Liquidity Pools", duration: "40 min", status: "locked" },
    ]
  }
];
const Courses = () => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`${styles.coursesPage} ${theme === 'dark' ? styles.darkTheme : ''}`}>
      
      <CourseDetails />
      
      <div className={styles.coursesLayout}>
        <div className={`${styles.sidebarContainer} ${isSidebarOpen ? styles.open : ''}`}>
          <Sidebar />
        </div>
        
        <div className={styles.mainContent}>
          <CoursesGrid courses={coursesData} />
        </div>
      </div>

      <CoursesSidebarToggle 
        onToggle={toggleSidebar} 
        isSidebarOpen={isSidebarOpen}
      />
      
    </div>
  );
};

export default Courses;