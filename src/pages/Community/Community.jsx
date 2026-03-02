import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import styles from './Community.module.css';
import {
  User, Heart, Rocket, Notes, Ghost,
  Wallet, LockOpen, Nft, Schedule, Info,
} from '../../assets/Icons';

const platforms = [
  {
    Icon: Ghost,
    name: 'Discord',
    handle: 'FLOW Community',
    desc: 'Join live discussions, ask questions, and get help from thousands of crypto learners. Our most active hub — 24/7.',
    btnText: 'Join Discord',
    badge: 'Most Active',
  },
  {
    Icon: Nft,
    name: 'Telegram',
    handle: '@FlowCrypto',
    desc: 'Get instant market updates, breaking news, and daily tips straight to your phone. Never miss a big move.',
    btnText: 'Join Telegram',
    badge: 'Instant News',
  },
  {
    Icon: Rocket,
    name: 'Twitter / X',
    handle: '@FlowCrypto',
    desc: 'Follow for daily crypto insights, educational threads, community highlights, and occasional memes.',
    btnText: 'Follow Us',
    badge: 'Daily Tips',
  },
];

const topics = [
  { Icon: Wallet,   label: 'Market Analysis'  },
  { Icon: LockOpen, label: 'Security Tips'     },
  { Icon: Rocket,   label: 'Memecoin Talk'     },
  { Icon: Notes,    label: 'Beginner Help'     },
  { Icon: Heart,    label: 'Project Reviews'   },
  { Icon: User,     label: 'Introductions'     },
  { Icon: Nft,      label: 'NFT Discussion'    },
  { Icon: Schedule, label: 'AMA Sessions'      },
];

const rules = [
  {
    num: '01',
    title: 'Be Respectful',
    desc: 'Treat everyone with kindness. No harassment, hate speech, or personal attacks — ever.',
  },
  {
    num: '02',
    title: 'No Financial Advice',
    desc: 'Share knowledge freely, but never present anything as guaranteed investment advice.',
  },
  {
    num: '03',
    title: 'No Spam or Shilling',
    desc: 'No unsolicited promotions, referral links, or repetitive self-promotion of any kind.',
  },
  {
    num: '04',
    title: 'Verify Before Sharing',
    desc: 'Always double-check information before posting. Misinformation can seriously harm others.',
  },
];

const Community = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`${styles.page} ${isDark ? styles.darkMode : ''}`}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroFloating}>
          <div className={styles.fi} style={{ top: '25%', left: '6%'  }}><User    width={40} height={40} /></div>
          <div className={styles.fi} style={{ top: '60%', left: '3%'  }}><Heart   width={32} height={32} /></div>
          <div className={styles.fi} style={{ top: '22%', right: '7%' }}><Ghost   width={38} height={38} /></div>
          <div className={styles.fi} style={{ top: '65%', right: '5%' }}><Nft     width={30} height={30} /></div>
          <div className={styles.fi} style={{ top: '45%', left:'15%'  }}><Notes   width={28} height={28} /></div>
          <div className={styles.fi} style={{ top: '40%', right:'16%' }}><Rocket  width={34} height={34} /></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <User width={14} height={14} />
            <span>Join the Tribe</span>
          </div>
          <h1 className={styles.heroTitle}>
            A Community Built{' '}
            <span className={styles.heroAccent}>For You</span>
          </h1>
          <p className={styles.heroSub}>
            Connect with thousands of crypto learners, share insights, ask questions,
            and grow together in a safe and welcoming space.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.hStat}>
              <span className={styles.hNum}>5K+</span>
              <span className={styles.hLabel}>Members</span>
            </div>
            <div className={styles.hDivider} />
            <div className={styles.hStat}>
              <span className={styles.hNum}>200+</span>
              <span className={styles.hLabel}>Daily Posts</span>
            </div>
            <div className={styles.hDivider} />
            <div className={styles.hStat}>
              <span className={styles.hNum}>24/7</span>
              <span className={styles.hLabel}>Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Platforms ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sLabel}>Platforms</div>
          <h2 className={styles.sTitle}>Find Us <span className={styles.grad}>Everywhere</span></h2>
          <p className={styles.sSub}>Choose your platform and jump into the conversation</p>
          <div className={styles.platformGrid}>
            {platforms.map(({ Icon, name, handle, desc, btnText, badge }, i) => (
              <div key={i} className={styles.platformCard}>
                <div className={styles.platformTop}>
                  <div className={styles.platformIcon}><Icon width={30} height={30} /></div>
                  <span className={styles.platformBadge}>{badge}</span>
                </div>
                <h3 className={styles.platformName}>{name}</h3>
                <span className={styles.platformHandle}>{handle}</span>
                <p className={styles.platformDesc}>{desc}</p>
                <button className={styles.platformBtn}>{btnText}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Topics ── */}
      <section className={styles.topicsSection}>
        <div className={styles.container}>
          <div className={styles.sLabel}>Topics</div>
          <h2 className={styles.sTitle}>What We <span className={styles.grad}>Talk About</span></h2>
          <p className={styles.sSub}>From beginner questions to advanced market analysis — there's a topic for everyone</p>
          <div className={styles.topicsGrid}>
            {topics.map(({ Icon, label }, i) => (
              <div key={i} className={styles.topicChip}>
                <Icon width={20} height={20} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rules ── */}
      <section className={styles.rulesSection}>
        <div className={styles.container}>
          <div className={styles.sLabel}>Guidelines</div>
          <h2 className={styles.sTitle}>Community <span className={styles.grad}>Rules</span></h2>
          <p className={styles.sSub}>Simple rules to keep our space safe and welcoming for everyone</p>
          <div className={styles.rulesGrid}>
            {rules.map(({ num, title, desc }, i) => (
              <div key={i} className={styles.ruleCard}>
                <div className={styles.ruleNum}>{num}</div>
                <h3 className={styles.ruleTitle}>{title}</h3>
                <p className={styles.ruleDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className={styles.ctaBg} />
        <div className={styles.ctaInner}>
          <div className={styles.ctaIconWrap}><Heart width={44} height={44} /></div>
          <h2 className={styles.ctaTitle}>Ready to Join?</h2>
          <p className={styles.ctaSub}>
            Be part of a growing community of crypto learners and enthusiasts.
            Your journey starts here.
          </p>
          <Link to="/signup" className={styles.ctaBtn}>Create Free Account →</Link>
        </div>
      </section>

    </div>
  );
};

export default Community;