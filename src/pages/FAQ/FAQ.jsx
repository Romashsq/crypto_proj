import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { Notes, Rocket, Heart, Wallet, LockOpen, Info } from '../../assets/Icons';
import styles from './FAQ.module.css';

const categories = ['All', 'Getting Started', 'Courses', 'Safety', 'Account', 'Platform'];

const faqs = [
  // Getting Started
  {
    cat: 'Getting Started',
    q: 'What is FLOW and who is it for?',
    a: 'FLOW is a free educational platform focused on financial literacy, cryptocurrency, stocks, and personal finance. It\'s built for students, beginners, and anyone curious about how money and digital assets work — no prior knowledge required.',
  },
  {
    cat: 'Getting Started',
    q: 'Do I need to know anything about crypto before starting?',
    a: 'Not at all. Our courses are designed for complete beginners. We start from the basics — what is a blockchain, what is Bitcoin — and progressively build your knowledge up to advanced trading and DeFi concepts.',
  },
  {
    cat: 'Getting Started',
    q: 'Is FLOW really free?',
    a: 'Yes. All core courses — Crypto Fundamentals, Scams Protection, Memecoins, and Security Essentials — are 100% free. No paywalls, no hidden fees, no credit card required.',
  },
  {
    cat: 'Getting Started',
    q: 'Where should I start as a complete beginner?',
    a: 'We recommend starting with "Crypto Fundamentals" to understand the basics of blockchain and major coins. Then move to "Scams Protection" — knowing how to stay safe is crucial before investing a single dollar.',
  },
  // Courses
  {
    cat: 'Courses',
    q: 'How many courses are available?',
    a: 'Currently 4 fully completed courses with 18 lessons total: Crypto Fundamentals (6 lessons), Scams Protection (5 lessons), Memecoins (4 lessons), and Security Essentials (3 lessons). Two more courses — DeFi & Staking and Additional Materials — are coming soon.',
  },
  {
    cat: 'Courses',
    q: 'How long does each course take?',
    a: 'Each lesson takes 10–20 minutes. A full course can be completed in 1–3 hours depending on your pace. You can learn at your own speed — there are no deadlines or time pressure.',
  },
  {
    cat: 'Courses',
    q: 'Do I earn anything for completing courses?',
    a: 'Yes! You earn XP (experience points) for each completed lesson. XP increases your level and rank on the platform. Course completion will also unlock achievement badges as we roll out our gamification system.',
  },
  {
    cat: 'Courses',
    q: 'What topics do the courses cover?',
    a: 'Our courses cover: major cryptocurrencies (BTC, ETH, SOL, BNB, SUI, BASE), identifying and avoiding crypto scams, memecoin trading and culture, wallet security, DeFi protocols, yield farming, staking, and much more.',
  },
  // Safety
  {
    cat: 'Safety',
    q: 'How do I avoid getting scammed in crypto?',
    a: 'Our "Scams Protection" course covers the most common threats: Pump & Dump schemes, Rug Pulls, Phishing attacks, fake influencer calls, and Bundle scams. The golden rule: never share your seed phrase, always verify contract addresses, and DYOR (Do Your Own Research).',
  },
  {
    cat: 'Safety',
    q: 'Is it safe to invest in crypto after taking these courses?',
    a: 'Knowledge significantly reduces risk, but crypto always carries market risk. FLOW provides education — not financial advice. Always invest only what you can afford to lose, diversify, and continue learning.',
  },
  {
    cat: 'Safety',
    q: 'What is a seed phrase and why is it important?',
    a: 'A seed phrase (12–24 words) is the master key to your crypto wallet. Anyone who has it has full access to your funds. Never share it online, never type it into a website, and store it offline in a safe place.',
  },
  // Account
  {
    cat: 'Account',
    q: 'Do I need an account to access the courses?',
    a: 'You can browse course descriptions without an account. To access lessons, track your progress, earn XP, and save lessons — you need to register. Registration is free and takes under a minute.',
  },
  {
    cat: 'Account',
    q: 'How do I track my learning progress?',
    a: 'Your progress is tracked automatically. Visit your Profile page to see completed lessons, earned XP, your level, and course completion percentages. The "Your Lessons" page lets you manage saved lessons.',
  },
  {
    cat: 'Account',
    q: 'Is my personal data safe on FLOW?',
    a: 'We store only what\'s necessary: your name, email, username, and learning progress. Passwords are hashed and never stored in plain text. We don\'t sell data to third parties.',
  },
  // Platform
  {
    cat: 'Platform',
    q: 'What is the XP and level system?',
    a: 'Each completed lesson earns you 100 XP. Every 1000 XP advances you one level. Levels reflect your learning journey and unlock community recognition. Higher levels signal to others that you\'re a serious learner.',
  },
  {
    cat: 'Platform',
    q: 'Will there be certificates for completing courses?',
    a: 'Yes — digital certificates are on our roadmap. We\'re designing them in a Web3 style that you can share on LinkedIn or Twitter to showcase your knowledge.',
  },
  {
    cat: 'Platform',
    q: 'How can I join the FLOW community?',
    a: 'Visit our Community page to find links to our Discord, Telegram, and Twitter. Discord is our most active platform — you can ask questions, discuss markets, and connect with thousands of crypto learners 24/7.',
  },
  {
    cat: 'Platform',
    q: 'Can I suggest topics or lessons for future courses?',
    a: 'Absolutely! Join our Discord or Telegram community and drop your suggestions in the dedicated feedback channels. We actively build the roadmap based on what learners want most.',
  },
];

const iconMap = {
  'Getting Started': Rocket,
  'Courses': Notes,
  'Safety': LockOpen,
  'Account': Wallet,
  'Platform': Info,
};

const FAQ = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = activeCategory === 'All'
    ? faqs
    : faqs.filter(f => f.cat === activeCategory);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className={`${styles.page} ${isDark ? styles.darkMode : ''}`}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Info width={14} height={14} />
            <span>FAQ</span>
          </div>
          <h1 className={styles.heroTitle}>
            Frequently Asked <span className={styles.heroAccent}>Questions</span>
          </h1>
          <p className={styles.heroSub}>
            Everything you need to know about FLOW, our courses, and learning crypto safely.
            Can't find your answer? Ask in our community.
          </p>
          <div className={styles.heroCount}>
            <span className={styles.countNum}>{faqs.length}</span>
            <span className={styles.countLabel}>questions answered</span>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <div className={styles.filtersWrap}>
        <div className={styles.filters}>
          {categories.map(cat => {
            const Icon = iconMap[cat];
            return (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              >
                {Icon && <Icon width={14} height={14} />}
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Accordion ── */}
      <div className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.accordion}>
            {filtered.map((item, i) => (
              <div
                key={i}
                className={`${styles.item} ${openIndex === i ? styles.itemOpen : ''}`}
              >
                <button
                  className={styles.question}
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                >
                  <span className={styles.qText}>{item.q}</span>
                  <span className={styles.catTag}>{item.cat}</span>
                  <div className={styles.chevron}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </button>
                {openIndex === i && (
                  <div className={styles.answer}>
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Still have questions ── */}
      <section className={styles.cta}>
        <div className={styles.ctaBg} />
        <div className={styles.ctaInner}>
          <div className={styles.ctaIconWrap}><Heart width={44} height={44} /></div>
          <h2 className={styles.ctaTitle}>Still Have Questions?</h2>
          <p className={styles.ctaSub}>
            Our community is always active. Ask anything in Discord or Telegram
            and get answers from real crypto learners.
          </p>
          <div className={styles.ctaBtns}>
            <Link to="/community" className={styles.ctaBtnPrimary}>Join Community →</Link>
            <Link to="/about" className={styles.ctaBtnSecondary}>Meet the Team</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FAQ;
