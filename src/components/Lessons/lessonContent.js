// src/data/lessonContent.js
export const allLessons = {
  crypto: {
    1: {
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
    },
    2: {
      title: 'BTC - Bitcoin Basics',
      description: 'Learn the fundamentals of Bitcoin, the first and most well-known cryptocurrency. Understand blockchain technology, mining, wallets, and why Bitcoin is often called digital gold.',
      duration: '35 minutes',
      type: 'Video Lesson',
      level: 'Beginner',
      youtubeId: 'Gc2en3nHxA4',
      notes: [
        {
          id: 1,
          title: 'Decentralization',
          content: 'Bitcoin operates without a central authority, using a peer-to-peer network to validate transactions.'
        },
        {
          id: 2,
          title: 'Limited Supply',
          content: 'Only 21 million Bitcoin will ever exist, creating scarcity similar to precious metals.'
        },
        {
          id: 3,
          title: 'Proof of Work',
          content: 'Miners solve complex mathematical problems to validate transactions and secure the network.'
        },
        {
          id: 4,
          title: 'Store of Value',
          content: 'Bitcoin is increasingly seen as digital gold - a hedge against inflation and economic uncertainty.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'Bitcoin Whitepaper',
          format: 'PDF',
          size: '300 KB'
        },
        {
          id: 2,
          icon: 'wallet',
          title: 'Wallet Setup Guide',
          format: 'PDF',
          size: '1.2 MB'
        },
        {
          id: 3,
          icon: 'chart-line',
          title: 'Bitcoin Market Analysis',
          format: 'PDF',
          size: '2.1 MB'
        }
      ]
    },
    3: {
      title: 'ETH - Ethereum Ecosystem',
      description: 'Explore Ethereum, the leading platform for decentralized applications and smart contracts. Learn about DeFi, NFTs, and the transition to Ethereum 2.0 with Proof of Stake.',
      duration: '50 minutes',
      type: 'Video Lesson',
      level: 'Intermediate',
      youtubeId: 'jTsLc8sGf-0',
      notes: [
        {
          id: 1,
          title: 'Smart Contracts',
          content: 'Self-executing contracts with the terms directly written into code, enabling trustless agreements.'
        },
        {
          id: 2,
          title: 'DeFi Revolution',
          content: 'Decentralized Finance applications allow lending, borrowing, and trading without intermediaries.'
        },
        {
          id: 3,
          title: 'NFT Standard',
          content: 'ERC-721 and ERC-1155 standards power the booming NFT market for digital art and collectibles.'
        },
        {
          id: 4,
          title: 'Ethereum 2.0',
          content: 'Transition from Proof of Work to Proof of Stake will reduce energy consumption by ~99.95%.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'Ethereum Whitepaper',
          format: 'PDF',
          size: '500 KB'
        },
        {
          id: 2,
          icon: 'code',
          title: 'Smart Contract Examples',
          format: 'ZIP',
          size: '1.8 MB'
        },
        {
          id: 3,
          icon: 'gem',
          title: 'NFT Creation Guide',
          format: 'PDF',
          size: '1.5 MB'
        }
      ]
    },
    4: {
      title: 'SUI - New Generation Blockchain',
      description: 'Discover SUI, a high-performance Layer 1 blockchain designed for mass adoption with instant transaction finality and parallel execution.',
      duration: '30 minutes',
      type: 'Video Lesson',
      level: 'Intermediate',
      youtubeId: 'IsXlZkHP2OE',
      notes: [
        {
          id: 1,
          title: 'Parallel Execution',
          content: 'SUI processes transactions in parallel, achieving high throughput without congestion.'
        },
        {
          id: 2,
          title: 'Move Programming Language',
          content: 'Safer smart contract language designed by former Facebook/Meta engineers.'
        },
        {
          id: 3,
          title: 'Object-Centric Model',
          content: 'Unique architecture where digital assets are treated as programmable objects.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'SUI Technical Paper',
          format: 'PDF',
          size: '2.8 MB'
        }
      ]
    },
    5: {
      title: 'BASE - Coinbase Layer 2',
      description: 'Learn about Base, Coinbase\'s Ethereum Layer 2 solution built on OP Stack, offering low fees and seamless integration with the largest US exchange.',
      duration: '25 minutes',
      type: 'Video Lesson',
      level: 'Intermediate',
      youtubeId: 'bHrMhR5WvdM',
      notes: [
        {
          id: 1,
          title: 'OP Stack Integration',
          content: 'Built on Optimism\'s technology stack, ensuring compatibility with Ethereum.'
        },
        {
          id: 2,
          title: 'Coinbase Ecosystem',
          content: 'Direct integration with Coinbase products and 110M+ verified users.'
        },
        {
          id: 3,
          title: 'Low Cost Transactions',
          content: 'Fees are 10-100x cheaper than Ethereum mainnet.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'Base Documentation',
          format: 'PDF',
          size: '1.7 MB'
        }
      ]
    },
    6: {
      title: 'BNB - Binance Ecosystem',
      description: 'Explore the BNB Chain ecosystem, including BNB Smart Chain, DeFi projects, and how it became one of the most widely used blockchains.',
      duration: '40 minutes',
      type: 'Video Lesson',
      level: 'Intermediate',
      youtubeId: 'pSTNhBlfV_s',
      notes: [
        {
          id: 1,
          title: 'Dual Chain Architecture',
          content: 'BNB Beacon Chain for governance + BNB Smart Chain for EVM compatibility.'
        },
        {
          id: 2,
          title: 'Binance Integration',
          content: 'Native integration with the world\'s largest cryptocurrency exchange.'
        },
        {
          id: 3,
          title: 'Low Transaction Fees',
          content: 'Average fee under $0.30, making it popular for DeFi and trading.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'BNB Chain Overview',
          format: 'PDF',
          size: '2.2 MB'
        }
      ]
    }
  },
  scams: {
    1: {
      title: 'PUMP n DUMP Schemes',
      description: 'Learn how to identify and avoid pump and dump schemes where groups artificially inflate token prices before selling off.',
      duration: '30 minutes',
      type: 'Video Lesson',
      level: 'Beginner',
      youtubeId: 'dQw4w9WgXcQ',
      notes: [
        {
          id: 1,
          title: 'Sudden Price Spikes',
          content: 'Unnatural 100%+ price increases in short timeframes without fundamental reasons.'
        },
        {
          id: 2,
          title: 'Social Media Hype',
          content: 'Coordinated promotion across Telegram, Twitter, and Discord channels.'
        },
        {
          id: 3,
          title: 'Low Liquidity Tokens',
          content: 'Schemes target tokens with small market caps that are easy to manipulate.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'Pump & Detection Guide',
          format: 'PDF',
          size: '1.3 MB'
        }
      ]
    },
    2: {
      title: 'BUNDLES Scams',
      description: 'Understand bundle scams where fake NFT collections or token bundles are sold at inflated prices.',
      duration: '25 minutes',
      type: 'Video Lesson',
      level: 'Beginner',
      youtubeId: 'dQw4w9WgXcQ',
      notes: [
        {
          id: 1,
          title: 'Fake Utility Claims',
          content: 'Scammers promise exclusive access or future utility that never materializes.'
        },
        {
          id: 2,
          title: 'Artificial Scarcity',
          content: 'Creating false demand by limiting "supply" of worthless digital items.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'Bundle Scam Checklist',
          format: 'PDF',
          size: '900 KB'
        }
      ]
    },
    3: {
      title: 'RUGPULL Identification',
      description: 'Learn to spot rugpull scams where developers abandon projects after raising funds.',
      duration: '35 minutes',
      type: 'Video Lesson',
      level: 'Intermediate',
      youtubeId: 'dQw4w9WgXcQ',
      notes: [
        {
          id: 1,
          title: 'Anonymous Teams',
          content: 'Lack of transparency about team members and their credentials.'
        },
        {
          id: 2,
          title: 'No Code Audit',
          content: 'Unaudited smart contracts with hidden backdoors or vulnerabilities.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'Rugpull Warning Signs',
          format: 'PDF',
          size: '1.1 MB'
        }
      ]
    },
    4: {
      title: 'FISHING Attacks',
      description: 'Protect yourself from phishing attacks designed to steal your private keys and credentials.',
      duration: '20 minutes',
      type: 'Video Lesson',
      level: 'Intermediate',
      youtubeId: 'dQw4w9WgXcQ',
      notes: [
        {
          id: 1,
          title: 'Fake Websites',
          content: 'Lookalike domains designed to trick users into entering credentials.'
        },
        {
          id: 2,
          title: 'Malicious Links',
          content: 'Links in emails or messages that lead to fake wallet connection sites.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'Phishing Protection Guide',
          format: 'PDF',
          size: '800 KB'
        }
      ]
    },
    5: {
      title: 'Fake CALLS Protection',
      description: 'Avoid fake calls from scammers pretending to be customer support or influencers.',
      duration: '15 minutes',
      type: 'Video Lesson',
      level: 'Beginner',
      youtubeId: 'dQw4w9WgXcQ',
      notes: [
        {
          id: 1,
          title: 'Verification Methods',
          content: 'Always verify through official channels before sharing information.'
        },
        {
          id: 2,
          title: 'Pressure Tactics',
          content: 'Scammers create urgency to bypass your critical thinking.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'Call Security Checklist',
          format: 'PDF',
          size: '600 KB'
        }
      ]
    }
  },
  memecoins: {
    1: {
      title: 'How to Create Memecoins',
      description: 'Learn the technical process of creating memecoins, from smart contract deployment to liquidity provision.',
      duration: '40 minutes',
      type: 'Video Lesson',
      level: 'Beginner',
      youtubeId: 'dQw4w9WgXcQ',
      notes: [
        {
          id: 1,
          title: 'Token Standards',
          content: 'ERC-20 vs BEP-20 vs SPL tokens and which to choose.'
        },
        {
          id: 2,
          title: 'Liquidity Pools',
          content: 'How to create and manage liquidity on decentralized exchanges.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'Memecoin Creation Guide',
          format: 'PDF',
          size: '1.6 MB'
        }
      ]
    },
    2: {
      title: 'How Memecoins Work',
      description: 'Understand the economics and psychology behind successful memecoins.',
      duration: '35 minutes',
      type: 'Video Lesson',
      level: 'Beginner',
      youtubeId: 'dQw4w9WgXcQ',
      notes: [
        {
          id: 1,
          title: 'Community Building',
          content: 'The importance of social media presence and community engagement.'
        },
        {
          id: 2,
          title: 'Tokenomics Design',
          content: 'Supply distribution, taxes, and reward mechanisms.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'Memecoin Economics',
          format: 'PDF',
          size: '1.4 MB'
        }
      ]
    },
    3: {
      title: 'How to Trade Memecoins',
      description: 'Learn trading strategies and risk management for volatile memecoin markets.',
      duration: '50 minutes',
      type: 'Video Lesson',
      level: 'Intermediate',
      youtubeId: 'dQw4w9WgXcQ',
      notes: [
        {
          id: 1,
          title: 'Risk Management',
          content: 'Never invest more than you can afford to lose in memecoins.'
        },
        {
          id: 2,
          title: 'Entry/Exit Strategies',
          content: 'Timing your buys and sells in highly volatile markets.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'Memecoin Trading Guide',
          format: 'PDF',
          size: '1.9 MB'
        }
      ]
    },
    4: {
      title: 'Where to Trade Memecoins',
      description: 'Discover the best platforms and exchanges for trading memecoins safely.',
      duration: '25 minutes',
      type: 'Video Lesson',
      level: 'Intermediate',
      youtubeId: 'dQw4w9WgXcQ',
      notes: [
        {
          id: 1,
          title: 'DEX vs CEX',
          content: 'Differences between decentralized and centralized exchanges.'
        },
        {
          id: 2,
          title: 'Wallet Security',
          content: 'Best practices for securing your wallet when trading.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'Exchange Comparison',
          format: 'PDF',
          size: '1.2 MB'
        }
      ]
    }
  },
  security: {
    1: {
      title: 'How to Avoid Being Larped',
      description: 'Learn how to protect yourself from social engineering attacks and identity theft in the crypto space.',
      duration: '30 minutes',
      type: 'Video Lesson',
      level: 'Beginner',
      youtubeId: 'dQw4w9WgXcQ',
      notes: [
        {
          id: 1,
          title: 'Social Engineering',
          content: 'Common tactics used to manipulate users into revealing sensitive information.'
        },
        {
          id: 2,
          title: 'Identity Verification',
          content: 'How to verify legitimate projects vs impersonators.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'Security Best Practices',
          format: 'PDF',
          size: '1.4 MB'
        }
      ]
    },
    2: {
      title: 'How to Avoid Being Drowned',
      description: 'Protect your assets from hacks, scams, and technical vulnerabilities.',
      duration: '25 minutes',
      type: 'Video Lesson',
      level: 'Beginner',
      youtubeId: 'dQw4w9WgXcQ',
      notes: [
        {
          id: 1,
          title: 'Hardware Wallets',
          content: 'Why cold storage is essential for significant holdings.'
        },
        {
          id: 2,
          title: 'Multi-Signature',
          content: 'Using multiple signatures for added security.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'Asset Protection Guide',
          format: 'PDF',
          size: '1.1 MB'
        }
      ]
    },
    3: {
      title: 'Best Security Options',
      description: 'Explore the best tools and practices for maximum cryptocurrency security.',
      duration: '40 minutes',
      type: 'Video Lesson',
      level: 'Intermediate',
      youtubeId: 'dQw4w9WgXcQ',
      notes: [
        {
          id: 1,
          title: 'Password Management',
          content: 'Using password managers and 2FA for all accounts.'
        },
        {
          id: 2,
          title: 'Regular Audits',
          content: 'Periodically reviewing and updating your security setup.'
        }
      ],
      materials: [
        {
          id: 1,
          icon: 'file-pdf',
          title: 'Complete Security Checklist',
          format: 'PDF',
          size: '1.8 MB'
        }
      ]
    }
  }
};

// Функция для получения данных урока
export const getLessonData = (courseId, lessonId) => {
  const courseLessons = allLessons[courseId];
  if (!courseLessons) {
    // Возвращаем данные по умолчанию для crypto если курс не найден
    return allLessons.crypto[1];
  }
  
  const lesson = courseLessons[lessonId];
  if (!lesson) {
    // Если урок не найден, возвращаем первый урок этого курса
    return courseLessons[1] || allLessons.crypto[1];
  }
  
  return lesson;
};

// Получить общее количество уроков в курсе
export const getTotalLessons = (courseId) => {
  const courseLessons = allLessons[courseId];
  if (!courseLessons) return 0;
  return Object.keys(courseLessons).length;
};

// Получить заголовок следующего урока
export const getNextLessonTitle = (courseId, currentLessonId) => {
  const courseLessons = allLessons[courseId];
  if (!courseLessons) return 'Next Lesson';
  
  const nextLesson = courseLessons[currentLessonId + 1];
  if (nextLesson) {
    return nextLesson.title;
  }
  
  return 'Next Lesson';
};

// Проверить, есть ли следующий урок
export const hasNextLesson = (courseId, currentLessonId) => {
  const courseLessons = allLessons[courseId];
  if (!courseLessons) return false;
  
  const totalLessons = Object.keys(courseLessons).length;
  return currentLessonId < totalLessons;
};

// Получить данные для LessonList
export const getLessonsForCourse = (courseId) => {
  const courseLessons = allLessons[courseId];
  if (!courseLessons) return [];
  
  return Object.values(courseLessons).map((lesson, index) => ({
    id: index + 1,
    title: lesson.title,
    duration: lesson.duration.replace(' minutes', ' min').replace(' minute', ' min'),
    level: lesson.level
  }));
};