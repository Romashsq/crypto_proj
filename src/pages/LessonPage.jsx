import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Shared/Header/Header';
import Footer from '../components/Shared/Footer/Footer';
import { useTheme } from '../Context/ThemeContext';
import styles from './LessonPage.module.css';

const LessonPage = () => {
  const { theme } = useTheme();
  const { lessonId, courseId } = useParams();
  const [activeSection, setActiveSection] = useState('crypto');
  const [notesOpen, setNotesOpen] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(false);

  // Mock data for lesson
  const lessonData = {
    id: lessonId || '1',
    title: 'SOL - Solana Fundamentals',
    description: 'Discover why Solana has become one of the fastest-growing blockchain ecosystems. Learn about its unique Proof of History consensus, high-speed transactions, and why developers are flocking to build on this innovative platform.',
    duration: '45 minutes',
    type: 'Video Lesson',
    level: 'Beginner',
    youtubeId: '1kzK6F6PS-Y',
    notes: [
      {
        id: 1,
        title: 'Proof of History (PoH)',
        content: "Solana's unique consensus mechanism that timestamps transactions before they're processed, enabling incredible throughput of 65,000+ TPS."
      },
      {
        id: 2,
        title: 'Low Transaction Costs',
        content: 'Average transaction fee is $0.00025, making it ideal for micro-transactions and high-frequency trading.'
      },
      {
        id: 3,
        title: 'Ecosystem Growth',
        content: 'Over 400 projects built on Solana including Serum DEX, Raydium, and Magic Eden NFT marketplace.'
      },
      {
        id: 4,
        title: 'Developer Friendly',
        content: 'Supports Rust and C programming languages with extensive documentation and developer tools.'
      }
    ],
    materials: [
      {
        id: 1,
        icon: 'file-pdf',
        title: 'Solana Whitepaper Summary',
        format: 'PDF',
        size: '2.4 MB'
      },
      {
        id: 2,
        icon: 'code',
        title: 'Sample Smart Contracts',
        format: 'ZIP',
        size: '1.1 MB'
      },
      {
        id: 3,
        icon: 'chart-bar',
        title: 'Solana Ecosystem Map',
        format: 'PNG',
        size: '850 KB'
      },
      {
        id: 4,
        icon: 'link',
        title: 'Useful Resources & Links',
        format: 'TXT',
        size: '15 KB'
      }
    ]
  };

  // Sidebar sections data
  const sidebarSections = [
    {
      id: 'crypto',
      title: 'CRYPTO',
      lessons: [
        { id: 1, title: 'SOL - Solana Fundamentals', status: 'in-progress' },
        { id: 2, title: 'BTC - Bitcoin Basics', status: 'locked' },
        { id: 3, title: 'ETH - Ethereum Ecosystem', status: 'locked' },
        { id: 4, title: 'SUI - New Generation Blockchain', status: 'locked' },
        { id: 5, title: 'BASE - Coinbase Layer 2', status: 'locked' },
        { id: 6, title: 'BNB - Binance Ecosystem', status: 'locked' }
      ]
    },
    {
      id: 'scams',
      title: 'SCAMS',
      lessons: [
        { id: 1, title: 'PUMP n DUMP Schemes', status: 'locked' },
        { id: 2, title: 'BUNDLES Scams', status: 'locked' },
        { id: 3, title: 'RUGPULL Identification', status: 'locked' },
        { id: 4, title: 'FISHING Attacks', status: 'locked' },
        { id: 5, title: 'Fake CALLS Protection', status: 'locked' }
      ]
    },
    {
      id: 'memecoins',
      title: 'MEMECOINS',
      lessons: [
        { id: 1, title: 'How to Create Memecoins', status: 'locked' },
        { id: 2, title: 'How Memecoins Work', status: 'locked' },
        { id: 3, title: 'How to Trade Memecoins', status: 'locked' },
        { id: 4, title: 'Where to Trade Memecoins', status: 'locked' }
      ]
    },
    {
      id: 'etc',
      title: 'ETC',
      lessons: [
        { id: 1, title: 'Crypto NEWS Updates', status: 'locked' },
        { id: 2, title: 'SOCIALS Guide', status: 'locked' },
        { id: 3, title: 'Crypto SLANG Dictionary', status: 'locked' }
      ]
    },
    {
      id: 'security',
      title: 'SECURITY',
      lessons: [
        { id: 1, title: 'How to Avoid Being Larped', status: 'locked' },
        { id: 2, title: 'How to Avoid Being Drowned', status: 'locked' },
        { id: 3, title: 'Best Security Options', status: 'locked' }
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className={`${styles.lessonPage} ${theme === 'dark' ? styles.darkMode : ''}`}>
      <Header />
      
      <div className={`container ${styles.lessonLayout}`}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Lesson Meta Info */}
          <div className={styles.lessonMetaSidebar}>
            <div className={styles.metaItemSidebar}>
              <i className="far fa-clock"></i>
              <span>{lessonData.duration}</span>
            </div>
            <div className={styles.metaItemSidebar}>
              <i className="far fa-play-circle"></i>
              <span>{lessonData.type}</span>
            </div>
            <div className={styles.metaItemSidebar}>
              <i className="fas fa-signal"></i>
              <span>{lessonData.level} Level</span>
            </div>
          </div>

          {/* Sidebar Sections */}
          {sidebarSections.map(section => (
            <div 
              key={section.id} 
              className={`${styles.sidebarSection} ${activeSection === section.id ? styles.active : ''}`}
            >
              <h3 onClick={() => toggleSection(section.id)}>
                {section.title}
                <i className={`fas fa-chevron-down ${styles.toggleIcon}`}></i>
              </h3>
              <ul className={styles.sidebarMenu}>
                {section.lessons.map(lesson => (
                  <li key={lesson.id}>
                    <Link 
                      to={`/lesson/${section.id}/${lesson.id}`}
                      className={lesson.id === parseInt(lessonId) ? styles.active : ''}
                    >
                      {lesson.title}
                      <span className={`${styles.lessonStatus} ${styles[`status${lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1).replace('-', '')}`]}`}>
                        <i className={
                          lesson.status === 'in-progress' ? 'fas fa-hourglass-half' :
                          lesson.status === 'completed' ? 'fas fa-check' :
                          'fas fa-lock'
                        }></i>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className={styles.lessonContent}>
          {/* Lesson Header */}
          <div className={styles.lessonHeader}>
            <div className={styles.lessonBreadcrumb}>
              <Link to="/courses">Courses</Link>
              <i className="fas fa-chevron-right"></i>
              <Link to={`/course/${courseId || 'crypto'}`}>Crypto Fundamentals</Link>
              <i className="fas fa-chevron-right"></i>
              <span>{lessonData.title}</span>
            </div>
            
            <h1 className={styles.lessonTitle}>{lessonData.title}</h1>
            
            <p className={styles.lessonDescription}>
              {lessonData.description}
            </p>
            
            <div className={styles.lessonMeta}>
              <div className={styles.metaItem}>
                <i className="far fa-clock"></i>
                <span>{lessonData.duration}</span>
              </div>
              <div className={styles.metaItem}>
                <i className="far fa-play-circle"></i>
                <span>{lessonData.type}</span>
              </div>
              <div className={styles.metaItem}>
                <i className="fas fa-signal"></i>
                <span>{lessonData.level} Level</span>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className={styles.videoSection}>
            <div className={styles.videoContainer}>
              <div className={styles.videoWrapper}>
                <iframe 
                  src={`https://www.youtube.com/embed/${lessonData.youtubeId}`}
                  title={lessonData.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className={styles.notesSection}>
            <div 
              className={styles.notesToggle} 
              onClick={() => setNotesOpen(!notesOpen)}
            >
              <h3>
                <i className="fas fa-sticky-note"></i>
                Lesson Notes & Key Takeaways
              </h3>
              <i className={`fas fa-chevron-down ${styles.toggleIcon}`} 
                 style={{ transform: notesOpen ? 'rotate(180deg)' : 'rotate(0)' }}
              ></i>
            </div>
            <div className={`${styles.notesContent} ${notesOpen ? styles.active : ''}`}>
              <div className={styles.notesList}>
                {lessonData.notes.map(note => (
                  <div key={note.id} className={styles.noteItem}>
                    <h4>{note.title}</h4>
                    <p>{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Materials Section */}
          <div className={styles.materialsSection}>
            <div 
              className={styles.materialsToggle} 
              onClick={() => setMaterialsOpen(!materialsOpen)}
            >
              <h3>
                <i className="fas fa-download"></i>
                Download Materials & Resources
              </h3>
              <i className={`fas fa-chevron-down ${styles.toggleIcon}`}
                 style={{ transform: materialsOpen ? 'rotate(180deg)' : 'rotate(0)' }}
              ></i>
            </div>
            <div className={`${styles.materialsContent} ${materialsOpen ? styles.active : ''}`}>
              <div className={styles.materialsList}>
                {lessonData.materials.map(material => (
                  <div key={material.id} className={styles.materialItem}>
                    <div className={styles.materialIcon}>
                      <i className={`fas fa-${material.icon}`}></i>
                    </div>
                    <div className={styles.materialInfo}>
                      <h4>{material.title}</h4>
                      <p>{material.format} • {material.size}</p>
                    </div>
                    <a href="#" className={styles.materialDownload}>Download</a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className={styles.lessonNavigation}>
            <Link to="#" className={`${styles.navBtn} ${styles.prev} ${styles.disabled}`}>
              <i className="fas fa-arrow-left"></i>
              Previous Lesson
            </Link>
            <Link to="#" className={`${styles.navBtn} ${styles.disabled}`}>
              Next Lesson: BTC Basics
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default LessonPage;