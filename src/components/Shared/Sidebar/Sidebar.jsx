import React, { useState } from 'react';
import styles from './Sidebar.module.css'

const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    crypto: true,
    scams: false,
    memecoins: false,
    etc: false,
    security: false,
    additional: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sidebarSections = [
    {
      id: 'crypto',
      title: 'CRYPTO',
      items: [
        { id: 'sol', name: 'SOL', status: 'in-progress' },
        { id: 'btc', name: 'BTC', status: 'locked' },
        { id: 'eth', name: 'ETH', status: 'locked' },
        { id: 'sui', name: 'SUI', status: 'locked' },
        { id: 'base', name: 'BASE', status: 'locked' },
        { id: 'bnb', name: 'BNB', status: 'locked' },
      ]
    },
    {
      id: 'scams',
      title: 'SCAMS',
      items: [
        { id: 'pump-dump', name: 'PUMP n DUMP', status: 'locked' },
        { id: 'bundles', name: 'BUNDLES', status: 'locked' },
        { id: 'rugpull', name: 'RUGPULL', status: 'locked' },
        { id: 'fishing', name: 'FISHING', status: 'locked' },
        { id: 'calls', name: 'CALLS', status: 'locked' },
      ]
    },
    {
      id: 'memecoins',
      title: 'MEMECOINS',
      items: [
        { id: 'create-memecoins', name: 'How to create', status: 'locked' },
        { id: 'work-memecoins', name: 'How does they work', status: 'locked' },
        { id: 'trade-memecoins', name: 'How to trade', status: 'locked' },
        { id: 'where-trade-memecoins', name: 'Where to trade', status: 'locked' },
      ]
    },
    {
      id: 'etc',
      title: 'ETC',
      items: [
        { id: 'news', name: 'NEWS', status: 'locked' },
        { id: 'socials', name: 'SOCIALS', status: 'locked' },
        { id: 'slang', name: 'SLANG', status: 'locked' },
      ]
    },
    {
      id: 'security',
      title: 'SECURITY',
      items: [
        { id: 'avoid-larped', name: 'How to avoid being larped', status: 'locked' },
        { id: 'avoid-drowned', name: 'How to avoid being drowned', status: 'locked' },
        { id: 'security-options', name: 'Best security options', status: 'locked' },
      ]
    },
    {
      id: 'additional',
      title: 'ADDITIONAL COURSES',
      items: [
        { 
          id: 'defi', 
          name: 'DeFi & Staking', 
          status: 'locked',
          subItems: [
            { id: 'what-is-defi', name: 'What is DeFi?' },
            { id: 'staking-basics', name: 'Staking basics' },
            { id: 'yield-farming', name: 'Yield farming' },
            { id: 'liquidity-pools', name: 'Liquidity pools' },
          ]
        },
        { 
          id: 'nft', 
          name: 'NFT & Digital Art', 
          status: 'locked',
          subItems: [
            { id: 'what-are-nfts', name: 'What are NFTs?' },
            { id: 'creating-nfts', name: 'Creating NFTs' },
            { id: 'nft-marketplaces', name: 'NFT marketplaces' },
            { id: 'digital-art-trends', name: 'Digital art trends' },
          ]
        },
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'in-progress': return 'fa-hourglass-half';
      case 'locked': return 'fa-lock';
      default: return 'fa-check';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'in-progress': return 'In Progress';
      case 'locked': return 'Locked';
      default: return 'Completed';
    }
  };

  return (
    <aside className={styles.sidebar}>
      {sidebarSections.map(section => (
        <div 
          key={section.id} 
          className={`${styles.sidebarSection} ${
            expandedSections[section.id] ? styles.active : ''
          }`}
        >
          <h3 onClick={() => toggleSection(section.id)}>
            {section.title}
            <i className={`fas fa-chevron-${expandedSections[section.id] ? 'up' : 'down'} ${styles.toggleIcon}`}></i>
          </h3>
          
          {expandedSections[section.id] && (
            <ul className={styles.sidebarMenu}>
              {section.items.map(item => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    className={item.status === 'in-progress' ? styles.active : ''}
                  >
                    {item.name}
                    <span className={`${styles.lessonStatus} ${styles[`status-${item.status}`]}`}>
                      <i className={`fas ${getStatusIcon(item.status)}`}></i>
                      {getStatusText(item.status)}
                    </span>
                  </a>
                  
                  {item.subItems && (
                    <ul className={styles.sidebarSubmenu}>
                      {item.subItems.map(subItem => (
                        <li key={subItem.id}>
                          <a href={`#${subItem.id}`}>{subItem.name}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;