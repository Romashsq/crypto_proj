import React, { useEffect, useState, useRef } from 'react';
import styles from './Footer.module.css';
import { useTheme } from '../../../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState('');
  const backToTopRef = useRef(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Эффект для кнопки "Наверх"
  useEffect(() => {
    const handleScroll = () => {
      const backToTop = backToTopRef.current;
      if (backToTop) {
        if (window.scrollY > 500) {
          backToTop.classList.add(styles.visible);
        } else {
          backToTop.classList.remove(styles.visible);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Добавляем класс темы - так же как в Hero!
  const themeClass = theme === 'light' ? styles.lightMode : '';

  const footerLinks = {
    platform: [
      { name: 'Crypto Fundamentals', href: '#crypto-courses' },
      { name: 'Wallet Security', href: '#security-courses' },
      { name: 'DeFi & Staking', href: '#defi-courses' },
      { name: 'NFT & Metaverse', href: '#nft-courses' },
      { name: 'Trading & Analysis', href: '#trading-courses' }
    ],
    resources: [
      { name: 'Documentation', href: '#docs' },
      { name: 'Blog & News', href: '#blog' },
      { name: 'Video Tutorials', href: '#tutorials' },
      { name: 'Case Studies', href: '#cases' },
      { name: 'Web3 Glossary', href: '#glossary' }
    ],
    community: [
      { name: 'Discord Server', href: '#discord' },
      { name: 'Telegram Group', href: '#telegram' },
      { name: 'Twitter', href: '#twitter' },
      { name: 'Student Forum', href: '#forum' },
      { name: 'Events & Webinars', href: '#events' }
    ],
    company: [
      { name: 'About FLOW', href: '#about' },
      { name: 'Our Mission', href: '#mission' },
      { name: 'Team', href: '#team' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact Us', href: '#contact' }
    ]
  };

  const socialLinks = [
    { icon: 'fab fa-twitter', label: 'Twitter', href: '#', color: '#1DA1F2' },
    { icon: 'fab fa-discord', label: 'Discord', href: '#', color: '#5865F2' },
    { icon: 'fab fa-telegram', label: 'Telegram', href: '#', color: '#0088CC' },
    { icon: 'fab fa-youtube', label: 'YouTube', href: '#', color: '#FF0000' },
    { icon: 'fab fa-github', label: 'GitHub', href: '#', color: '#333' },
    { icon: 'fab fa-linkedin', label: 'LinkedIn', href: '#', color: '#0077B5' }
  ];

  const technologies = [
    'Blockchain',
    'Smart Contracts',
    'DeFi',
    'NFT',
    'Web3',
    'DAO',
    'Metaverse',
    'dApps'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter subscription:', email);
      setEmail('');
      alert('Thank you for subscribing!');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={`${styles.mainFooter} ${themeClass}`}>
      {/* Animated background elements */}
      <div className={styles.footerBackground}>
        <div className={styles.footerOrb}></div>
        <div className={styles.footerGrid}></div>
      </div>

      <div className="container">
        <div className={styles.footerContent}>
          
          {/* Brand Section */}
          <div className={styles.footerBrand}>
            <div className={styles.brandContainer}>
              <a href="#" className={styles.footerLogo}>
                <div className={styles.logoSVG}>
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 20L80 40L80 80L50 60L20 80V40L50 20Z" fill="url(#logoGradient)" />
                    <path d="M50 40L65 50V70L50 60L35 70V50L50 40Z" fill="url(#logoGradient2)" />
                    <defs>
                      <linearGradient id="logoGradient" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9B2FFF" />
                        <stop offset="1" stopColor="#667eea" />
                      </linearGradient>
                      <linearGradient id="logoGradient2" x1="35" y1="40" x2="65" y2="70" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#f093fb" />
                        <stop offset="1" stopColor="#f5576c" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className={styles.logoText}>
                  <span className={styles.logoMain}>FLOW</span>
                  <span className={styles.logoSubtitle}>Web3 Academy</span>
                </div>
              </a>
              
              <div className={styles.tagline}>
                <span className={styles.taglineText}>Future Learning On Web3</span>
                <div className={styles.taglineUnderline}></div>
              </div>
            </div>

            <p className={styles.footerDescription}>
              Your gateway to mastering Web3 technologies. Learn blockchain development, 
              DeFi strategies, NFT creation, and smart contract security through 
              interactive courses and hands-on projects.
            </p>

            {/* Newsletter Subscription */}
            <div className={styles.newsletter}>
              <h4>Stay Updated</h4>
              <p className={styles.newsletterText}>Get the latest Web3 insights</p>
              <form 
                className={styles.newsletterForm}
                onSubmit={handleSubmit}
              >
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className={styles.newsletterInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className={styles.newsletterButton}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className={styles.footerSocial}>
              <div className={styles.socialTitle}>
                <span>Follow Our Journey</span>
                <div className={styles.titleLine}></div>
              </div>
              <div className={styles.socialGrid}>
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={social.icon}></i>
                    <span className={styles.socialTooltip}>{social.label}</span>
                    <div className={styles.socialWave}></div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <div className={styles.columnHeader}>
                <h3>Platform</h3>
                <div className={styles.columnUnderline}></div>
              </div>
              <ul>
                {footerLinks.platform.map((link, index) => (
                  <li key={index} className={styles.linkItem}>
                    <a href={link.href} className={styles.navLink}>
                      <span className={styles.linkIcon}>→</span>
                      <span className={styles.linkText}>{link.name}</span>
                      <div className={styles.linkHoverLine}></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <div className={styles.columnHeader}>
                <h3>Resources</h3>
                <div className={styles.columnUnderline}></div>
              </div>
              <ul>
                {footerLinks.resources.map((link, index) => (
                  <li key={index} className={styles.linkItem}>
                    <a href={link.href} className={styles.navLink}>
                      <span className={styles.linkIcon}>→</span>
                      <span className={styles.linkText}>{link.name}</span>
                      <div className={styles.linkHoverLine}></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <div className={styles.columnHeader}>
                <h3>Community</h3>
                <div className={styles.columnUnderline}></div>
              </div>
              <ul>
                {footerLinks.community.map((link, index) => (
                  <li key={index} className={styles.linkItem}>
                    <a href={link.href} className={styles.navLink}>
                      <span className={styles.linkIcon}>→</span>
                      <span className={styles.linkText}>{link.name}</span>
                      <div className={styles.linkHoverLine}></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <div className={styles.columnHeader}>
                <h3>Company</h3>
                <div className={styles.columnUnderline}></div>
              </div>
              <ul>
                {footerLinks.company.map((link, index) => (
                  <li key={index} className={styles.linkItem}>
                    <a href={link.href} className={styles.navLink}>
                      <span className={styles.linkIcon}>→</span>
                      <span className={styles.linkText}>{link.name}</span>
                      <div className={styles.linkHoverLine}></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Technology Tags */}
        <div className={styles.techTags}>
          <div className={styles.techTitle}>
            <span>Technologies We Teach</span>
            <div className={styles.titleLine}></div>
          </div>
          <div className={styles.tagsContainer}>
            {technologies.map((tech, index) => (
              <span key={index} className={styles.techTag}>
                {tech}
                <div className={styles.tagGlow}></div>
              </span>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.footerLegal}>
            <div className={styles.copyright}>
              <p className={styles.copyrightText}>
                © {currentYear} <span className={styles.highlight}>FLOW Web3 Academy</span>. 
                All rights reserved.
              </p>
              <p className={styles.license}>
                Empowering the next generation of Web3 developers & innovators
              </p>
            </div>
            
            <div className={styles.legalLinks}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'].map((item, index) => (
                <a 
                  key={index} 
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
                  className={styles.legalLink}
                >
                  {item}
                  <div className={styles.legalUnderline}></div>
                </a>
              ))}
            </div>
          </div>

          <div className={styles.footerBadges}>
            <div className={styles.badge}>
              <i className="fas fa-shield-alt"></i>
              <span>SSL Secured</span>
            </div>
            <div className={styles.badge}>
              <i className="fas fa-globe"></i>
              <span>Global Community</span>
            </div>
            <div className={styles.badge}>
              <i className="fas fa-graduation-cap"></i>
              <span>Certified Courses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        ref={backToTopRef}
        className={styles.backToTop}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </footer>
  );
};

export default Footer;