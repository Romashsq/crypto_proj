import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { User, Rocket, Heart, Notes, Wallet, LockOpen } from '../../assets/Icons';
import styles from './About.module.css';

const team = [
  {
    name: 'Roman Bondarenko',
    role: 'SEO & Growth',
    emoji: '🚀',
    gradient: 'linear-gradient(135deg, #9B2FFF, #667eea)',
    bio: 'Drives organic growth and visibility for FLOW. Focused on making financial education discoverable for every student searching for a way into crypto.',
    tags: ['SEO Strategy', 'Content Growth', 'Analytics'],
    social: { twitter: '#', telegram: '#' },
  },
  {
    name: 'Alex Bondar',
    role: 'SEO & Content',
    emoji: '📈',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    bio: 'Crafts content that ranks and resonates. Bridges the gap between complex crypto concepts and clear, searchable educational material.',
    tags: ['Content SEO', 'Keyword Research', 'Copywriting'],
    social: { twitter: '#', telegram: '#' },
  },
  {
    name: 'Vladyslav',
    role: 'Project Manager',
    emoji: '🎯',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    bio: 'Keeps the team moving and the vision sharp. Manages roadmap, coordinates between departments, and ensures FLOW delivers on its promises.',
    tags: ['Project Management', 'Strategy', 'Operations'],
    social: { twitter: '#', telegram: '#' },
  },
];

const mission = [
  {
    Icon: Wallet,
    title: 'Financial Literacy',
    desc: 'We believe understanding money — traditional and digital — is a fundamental life skill that everyone deserves access to.',
  },
  {
    Icon: LockOpen,
    title: 'Safety First',
    desc: 'Crypto is full of traps for the unprepared. Our courses put scam prevention and security at the core of every lesson.',
  },
  {
    Icon: Rocket,
    title: 'Real Knowledge',
    desc: 'No theory for theory\'s sake. Every lesson is built from real market experience and practical, actionable insight.',
  },
  {
    Icon: Heart,
    title: 'Free & Open',
    desc: 'Quality education should not be locked behind a paywall. FLOW\'s core content is completely free — always.',
  },
];

const stats = [
  { num: '18+', label: 'Lessons' },
  { num: '4', label: 'Courses' },
  { num: '5K+', label: 'Learners' },
  { num: '100%', label: 'Free Core' },
];

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`${styles.page} ${isDark ? styles.darkMode : ''}`}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroFloating}>
          <div className={styles.fi} style={{ top: '20%', left: '5%' }}><User width={38} height={38} /></div>
          <div className={styles.fi} style={{ top: '65%', left: '4%' }}><Heart width={30} height={30} /></div>
          <div className={styles.fi} style={{ top: '22%', right: '6%' }}><Rocket width={36} height={36} /></div>
          <div className={styles.fi} style={{ top: '60%', right: '5%' }}><Notes width={28} height={28} /></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <User width={14} height={14} />
            <span>About Us</span>
          </div>
          <h1 className={styles.heroTitle}>
            We Are <span className={styles.heroAccent}>FLOW</span>
          </h1>
          <p className={styles.heroSub}>
            A small team on a big mission: make financial literacy and crypto education
            accessible, practical, and completely free for every student.
          </p>

          <div className={styles.heroStats}>
            {stats.map(({ num, label }, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className={styles.hDivider} />}
                <div className={styles.hStat}>
                  <span className={styles.hNum}>{num}</span>
                  <span className={styles.hLabel}>{label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sLabel}>Our Mission</div>
          <h2 className={styles.sTitle}>
            Why We <span className={styles.grad}>Built This</span>
          </h2>
          <p className={styles.sSub}>
            Crypto is transforming finance — but most people enter blind, get scammed,
            and lose money. FLOW exists to change that.
          </p>
          <div className={styles.missionGrid}>
            {mission.map(({ Icon, title, desc }, i) => (
              <div key={i} className={styles.missionCard}>
                <div className={styles.missionIcon}>
                  <Icon width={26} height={26} />
                </div>
                <h3 className={styles.missionTitle}>{title}</h3>
                <p className={styles.missionDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.sLabel}>The Team</div>
          <h2 className={styles.sTitle}>
            Meet the <span className={styles.grad}>People Behind FLOW</span>
          </h2>
          <p className={styles.sSub}>
            Three people, one goal — build the best free crypto education platform on the internet.
          </p>

          <div className={styles.teamGrid}>
            {team.map(({ name, role, emoji, gradient, bio, tags }, i) => (
              <div key={i} className={styles.teamCard}>
                <div className={styles.cardTop} style={{ background: gradient }}>
                  <div className={styles.avatarEmoji}>{emoji}</div>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.memberName}>{name}</h3>
                  <span className={styles.memberRole}>{role}</span>
                  <p className={styles.memberBio}>{bio}</p>
                  <div className={styles.tagList}>
                    {tags.map((tag, j) => (
                      <span key={j} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className={styles.ctaBg} />
        <div className={styles.ctaInner}>
          <div className={styles.ctaIconWrap}><Rocket width={44} height={44} /></div>
          <h2 className={styles.ctaTitle}>Start Learning Today</h2>
          <p className={styles.ctaSub}>
            Join thousands of students already building their financial future with FLOW.
          </p>
          <div className={styles.ctaBtns}>
            <Link to="/courses" className={styles.ctaBtnPrimary}>Explore Courses →</Link>
            <Link to="/community" className={styles.ctaBtnSecondary}>Join Community</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
