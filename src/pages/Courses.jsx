import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import CoursesGrid from '../components/CoursesPage/CoursesGrid/CoursesGrid';
import styles from './Courses.module.css';
import { Wallet, LockNoOpen, Rocket, LockOpen, Notes, Nft, Shelled } from '../assets/Icons';

/* ── Static data ─────────────────────────────────────────── */
const coursesData = [
  {
    courseId: 'crypto',
    title: "Crypto Fundamentals",
    description: "Master major cryptocurrencies: SOL, BTC, ETH, SUI, BASE, BNB. Learn about blockchain networks and their unique features.",
    totalLessons: 6,
    buttonLink: "/crypto",
    tag: "Crypto",
  },
  {
    courseId: 'scams',
    title: "Scams Protection",
    description: "Learn to identify and avoid crypto scams: Pump & Dump, Rug Pulls, Phishing, Fake Calls, and Bundle scams.",
    totalLessons: 5,
    buttonLink: "/scams",
    tag: "Security",
  },
  {
    courseId: 'memecoins',
    title: "Memecoins",
    description: "Understand memecoin creation, trading strategies, market dynamics, and community culture.",
    totalLessons: 4,
    buttonLink: "/memecoins",
    tag: "Trading",
  },
  {
    courseId: 'security',
    title: "Security Essentials",
    description: "Advanced security practices, wallet protection, and how to avoid being hacked or scammed.",
    totalLessons: 3,
    buttonLink: "/security",
    tag: "Security",
  },
  {
    courseId: 'additional',
    title: "Additional Materials",
    description: "Crypto news, social media guides, slang dictionary, and ongoing market updates.",
    totalLessons: 3,
    buttonLink: "/additional",
    tag: "Bonus",
  },
  {
    courseId: 'defi',
    title: "DeFi & Staking",
    description: "Learn about decentralized finance, yield farming, liquidity pools, and staking strategies.",
    totalLessons: 4,
    buttonLink: "/defi",
    tag: "DeFi",
  },
];

const FILTERS = ['All', 'Crypto', 'Security', 'Trading', 'DeFi', 'Bonus'];

const totalLessonsCount = coursesData.reduce((sum, c) => sum + c.totalLessons, 0);
const totalCategories = [...new Set(coursesData.map(c => c.tag))].length;

const heroIcons = [
  { Icon: Wallet,    top: '22%', left: '7%',   size: 42 },
  { Icon: LockNoOpen,top: '62%', left: '4%',   size: 34 },
  { Icon: Rocket,    top: '20%', right: '8%',  size: 38 },
  { Icon: LockOpen,  top: '66%', right: '6%',  size: 32 },
  { Icon: Notes,     top: '48%', left: '14%',  size: 30 },
  { Icon: Nft,       top: '42%', right: '16%', size: 36 },
];

const features = [
  {
    Icon: Shelled,
    title: "Structured Curriculum",
    desc: "Step-by-step courses built for beginners with clear outcomes and practical examples.",
  },
  {
    Icon: LockOpen,
    title: "Safety First",
    desc: "Learn to protect your assets and spot threats before making your first investment.",
  },
  {
    Icon: Rocket,
    title: "Real Market Knowledge",
    desc: "Content from real crypto market experience — not theory, but actionable insight.",
  },
  {
    Icon: Notes,
    title: "Free to Start",
    desc: "Begin your journey completely free. No hidden fees, no paywalls on core content.",
  },
];

const pathSteps = [
  { Icon: Wallet,    title: "Crypto Fundamentals", link: "/crypto" },
  { Icon: LockNoOpen,title: "Scams Protection",    link: "/scams" },
  { Icon: LockOpen,  title: "Security Essentials", link: "/security" },
  { Icon: Rocket,    title: "Memecoins",           link: "/memecoins" },
];

/* ── Component ───────────────────────────────────────────── */
const Courses = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');
  const isDark = theme === 'dark';

  const filteredCourses = activeFilter === 'All'
    ? coursesData
    : coursesData.filter(c => c.tag === activeFilter);

  return (
    <div className={`${styles.coursesPage} ${isDark ? styles.darkMode : ''}`}>

      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />

        <div className={styles.heroFloatingIcons}>
          {heroIcons.map(({ Icon, size, ...pos }, i) => (
            <div
              key={i}
              className={styles.floatingIcon}
              style={{ ...pos, animationDelay: `${i * 0.25}s` }}
            >
              <Icon width={size} height={size} />
            </div>
          ))}
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Notes width={15} height={15} />
            <span>Learning Hub</span>
          </div>

          <h1 className={styles.heroTitle}>
            Explore All{' '}
            <span className={styles.heroAccent}>Courses</span>
          </h1>

          <p className={styles.heroSubtitle}>
            From blockchain basics to advanced trading —
            master the crypto world step by step
          </p>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{coursesData.length}</span>
              <span className={styles.heroStatLabel}>Courses</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{totalLessonsCount}</span>
              <span className={styles.heroStatLabel}>Lessons</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{totalCategories}</span>
              <span className={styles.heroStatLabel}>Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Filters ─── */}
      <div className={styles.filtersWrapper}>
        <div className={styles.filtersInner}>
          <div className={styles.filters}>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${activeFilter === f ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <span className={styles.coursesCount}>
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ─── Course Grid ─── */}
      <div className={styles.gridSection}>
        <CoursesGrid courses={filteredCourses} />
      </div>

      {/* ─── Why FLOW ─── */}
      <section className={styles.featuresSection}>
        <div className={styles.innerContainer}>
          <div className={styles.sectionLabel}>Why FLOW</div>
          <h2 className={styles.sectionTitle}>
            Everything You Need to <span className={styles.titleGradient}>Succeed</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Our platform gives you the tools and knowledge to navigate crypto safely and confidently
          </p>

          <div className={styles.featuresGrid}>
            {features.map(({ Icon, title, desc }, i) => (
              <div key={i} className={styles.featureCard}>
                <div className={styles.featureIconWrap}>
                  <Icon width={28} height={28} />
                </div>
                <h3 className={styles.featureTitle}>{title}</h3>
                <p className={styles.featureDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Recommended Path ─── */}
      <section className={styles.pathSection}>
        <div className={styles.innerContainer}>
          <div className={styles.sectionLabel}>Recommended Order</div>
          <h2 className={styles.sectionTitle}>
            Your <span className={styles.titleGradient}>Learning Path</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Follow this sequence for the best learning experience
          </p>

          <div className={styles.pathSteps}>
            {pathSteps.map(({ Icon, title, link }, i) => (
              <React.Fragment key={i}>
                <Link to={link} className={styles.pathStep}>
                  <div className={styles.pathStepNum}>{i + 1}</div>
                  <div className={styles.pathStepIcon}>
                    <Icon width={34} height={34} />
                  </div>
                  <span className={styles.pathStepTitle}>{title}</span>
                </Link>

                {i < pathSteps.length - 1 && (
                  <div className={styles.pathArrow}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className={styles.ctaContent}>
          <div className={styles.ctaIconRow}>
            <Rocket width={44} height={44} />
          </div>
          <h2 className={styles.ctaTitle}>
            Ready to Start Your<br />Crypto Journey?
          </h2>
          <p className={styles.ctaSubtitle}>
            Join thousands of learners mastering blockchain technology and crypto markets
          </p>
          <Link to="/signup" className={styles.ctaBtn}>
            Get Started Free →
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Courses;