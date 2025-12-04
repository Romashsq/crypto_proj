import React, { useState } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const [expandedSections, setExpandedSections] = useState(['CRYPTO']);
  const [activeItem, setActiveItem] = useState('sol');

  const sidebarData = [
    {
      id: 'CRYPTO',
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
      id: 'SCAMS',
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
      id: 'MEMECOINS',
      title: 'MEMECOINS',
      items: [
        { id: 'create-memecoins', name: 'How to create', status: 'locked' },
        { id: 'work-memecoins', name: 'How does they work', status: 'locked' },
        { id: 'trade-memecoins', name: 'How to trade', status: 'locked' },
        { id: 'where-trade-memecoins', name: 'Where to trade', status: 'locked' },
      ]
    },
    {
      id: 'SECURITY',
      title: 'SECURITY',
      items: [
        { id: 'avoid-larped', name: 'How to avoid being larped', status: 'locked' },
        { id: 'avoid-drowned', name: 'How to avoid being drowned', status: 'locked' },
        { id: 'security-options', name: 'Best security options', status: 'locked' },
      ]
    },
    {
      id: 'ADDITIONAL',
      title: 'ADDITIONAL COURSES',
      items: [
        { 
          id: 'defi', 
          name: 'DeFi & Staking', 
          status: 'locked',
          subitems: [
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
          subitems: [
            { id: 'what-are-nfts', name: 'What are NFTs?' },
            { id: 'creating-nfts', name: 'Creating NFTs' },
            { id: 'nft-marketplaces', name: 'NFT marketplaces' },
            { id: 'digital-art-trends', name: 'Digital art trends' },
          ]
        },
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  const handleItemClick = (itemId, e) => {
    e.preventDefault();
    setActiveItem(itemId);
    if (onSectionChange) {
      onSectionChange(itemId);
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'in-progress': return styles.statusInProgress;
      case 'completed': return styles.statusCompleted;
      case 'locked': return styles.statusLocked;
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'in-progress': return 'fas fa-hourglass-half';
      case 'completed': return 'fas fa-check-circle';
      case 'locked': return 'fas fa-lock';
      default: return 'fas fa-circle';
    }
  };

  return (
    <aside className={styles.sidebar}>
      {sidebarData.map((section) => (
        <div 
          key={section.id}
          className={`${styles.sidebarSection} ${expandedSections.includes(section.id) ? styles.active : ''}`}
        >
          <h3 onClick={() => toggleSection(section.id)}>
            {section.title}
            <i className={`fas fa-chevron-down ${styles.toggleIcon}`}></i>
          </h3>
          
          <ul className={styles.sidebarMenu}>
            {section.items.map((item) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`}
                  className={activeItem === item.id ? styles.active : ''}
                  onClick={(e) => handleItemClick(item.id, e)}
                >
                  {item.name}
                  <span className={`${styles.lessonStatus} ${getStatusClass(item.status)}`}>
                    <i className={getStatusIcon(item.status)}></i>
                    {item.status === 'in-progress' ? ' In Progress' : 
                     item.status === 'completed' ? ' Completed' : ' Locked'}
                  </span>
                </a>
                
                {/* Submenu */}
                {item.subitems && (
                  <ul className={`${styles.sidebarSubmenu} ${expandedSections.includes(section.id) ? styles.active : ''}`}>
                    {item.subitems.map((subitem) => (
                      <li key={subitem.id}>
                        <a 
                          href={`#${subitem.id}`}
                          onClick={(e) => handleItemClick(subitem.id, e)}
                        >
                          {subitem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;