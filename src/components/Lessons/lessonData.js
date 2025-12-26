// src/components/Lessons/lessonData.js

export const lessonsData = {
  crypto: [
    {
      id: 1,
      title: "SOL - Solana Fundamentals",
      duration: "45 min",
      level: "Beginner",
      youtubeId: "fqrM9d7l3x0",
      description: "Learn the basics of Solana blockchain and its unique features.",
      shortDescription: "Master Solana's architecture, Proof of History consensus, and why it's so fast.",
      fullDescription: `🚀 SOLANA FUNDAMENTALS
BEFORE THE VIDEO (Intro / Hook)
Solana is one of the fastest and most scalable blockchains in the crypto space. Unlike Ethereum, it uses a unique Proof of History consensus mechanism that allows for high throughput and low fees.

WHAT MAKES SOLANA SPECIAL
• Proof of History (PoH) - timestamps transactions for extreme speed
• 65,000+ TPS (Transactions Per Second) capacity
• Sub-second finality for fast confirmations
• Low transaction fees (less than $0.01 per transaction)

KEY FEATURES
• Built for high-frequency DeFi and NFT trading
• Sealevel parallel processing engine
• Turbine block propagation protocol
• Gulf Stream mempool-less transaction forwarding

WHY DEVELOPERS CHOOSE SOLANA
Solana offers a high-performance alternative to Ethereum with significantly lower fees and faster transaction times, making it ideal for DeFi, NFTs, and gaming applications.

ECOSYSTEM OVERVIEW
Major projects building on Solana include Serum DEX, Raydium, Phantom Wallet, and numerous NFT marketplaces like Magic Eden.

KEY TAKEAWAY
Solana's combination of speed, low cost, and growing ecosystem makes it a top choice for developers and users looking for high-performance blockchain solutions.`,
      notes: [
        { id: 1, title: "Proof of History", content: "Unique consensus mechanism that timestamps transactions" },
        { id: 2, title: "Transaction Speed", content: "Can process over 65,000 transactions per second" }
      ],
      materials: [
        { id: 1, title: "Solana Whitepaper Summary", format: "PDF", size: "2.1 MB", icon: "file-pdf" },
        { id: 2, title: "Solana Ecosystem Map", format: "PNG", size: "3.5 MB", icon: "map" }
      ]
    },
    {
      id: 2,
      title: "BTC - Bitcoin Basics",
      duration: "35 min",
      level: "Beginner",
      youtubeId: "example_btc",
      description: "Understanding Bitcoin, the first and most famous cryptocurrency.",
      shortDescription: "Learn the fundamentals of Bitcoin: blockchain, mining, and why it's digital gold.",
      fullDescription: `₿ BITCOIN BASICS
BEFORE THE VIDEO (Intro / Hook)
Bitcoin is the world's first decentralized digital currency, created in 2009 by Satoshi Nakamoto. It operates without a central authority or banks, using peer-to-peer technology.

HOW BITCOIN WORKS
• Blockchain technology - public ledger of all transactions
• Mining process - solving complex math problems to validate transactions
• Proof of Work consensus mechanism
• Limited supply: only 21 million BTC will ever exist

KEY CONCEPTS
• Decentralization: No single entity controls Bitcoin
• Immutability: Transactions cannot be altered once confirmed
• Transparency: All transactions are publicly visible
• Security: Cryptographic proof secures the network

BITCOIN AS DIGITAL GOLD
• Store of value with limited supply
• Hedge against inflation
• Global, borderless currency
• Censorship-resistant transactions

WHY BITCOIN MATTERS
Bitcoin introduced the concept of decentralized digital scarcity and paved the way for the entire cryptocurrency industry. It remains the most secure and widely adopted cryptocurrency.

KEY TAKEAWAY
Bitcoin is more than just a currency - it's a technological breakthrough that enables trustless, decentralized value transfer across the globe.`,
      notes: [
        { id: 1, title: "Limited Supply", content: "Only 21 million Bitcoin will ever be created" },
        { id: 2, title: "Decentralization", content: "No central authority controls the Bitcoin network" }
      ],
      materials: [
        { id: 1, title: "Bitcoin Whitepaper", format: "PDF", size: "1.8 MB", icon: "file-pdf" },
        { id: 2, title: "Bitcoin Timeline", format: "PDF", size: "2.3 MB", icon: "history" }
      ]
    },
    {
      id: 3,
      title: "ETH - Ethereum Ecosystem",
      duration: "50 min",
      level: "Intermediate",
      youtubeId: "example_eth",
      description: "Explore Ethereum's smart contracts, DeFi, and NFT ecosystem.",
      shortDescription: "Understand Ethereum's transition to Proof of Stake and its vibrant DeFi ecosystem.",
      fullDescription: `🔄 ETHEREUM ECOSYSTEM
BEFORE THE VIDEO (Intro / Hook)
Ethereum is a decentralized, open-source blockchain with smart contract functionality. It's the foundation for most of today's DeFi, NFT, and Web3 applications.

THE ETHEREUM VIRTUAL MACHINE (EVM)
• Turing-complete virtual machine
• Executes smart contracts across the network
• Enables decentralized applications (dApps)
• Standard for cross-chain compatibility

SMART CONTRACTS
• Self-executing contracts with terms written in code
• Automate complex transactions and agreements
• Power DeFi protocols, NFTs, and DAOs
• Eliminate need for intermediaries

ETHEREUM 2.0 (THE MERGE)
• Transition from Proof of Work to Proof of Stake
• Increased scalability and reduced energy consumption
• Sharding for parallel transaction processing
• Lower gas fees and faster transactions

MAJOR USE CASES
• DeFi (Decentralized Finance): lending, borrowing, trading
• NFTs (Non-Fungible Tokens): digital art, collectibles
• DAOs (Decentralized Autonomous Organizations)
• Web3 applications and infrastructure

KEY TAKEAWAY
Ethereum is the world's programmable blockchain, enabling developers to build virtually any application imaginable in a decentralized manner.`,
      notes: [
        { id: 1, title: "Smart Contracts", content: "Self-executing code that powers dApps" },
        { id: 2, title: "The Merge", content: "Ethereum's transition to Proof of Stake consensus" }
      ],
      materials: [
        { id: 1, title: "Ethereum Whitepaper", format: "PDF", size: "2.2 MB", icon: "file-pdf" },
        { id: 2, title: "Smart Contract Examples", format: "PDF", size: "1.5 MB", icon: "code" }
      ]
    },
    {
      id: 4,
      title: "SUI - New Generation Blockchain",
      duration: "30 min",
      level: "Intermediate",
      youtubeId: "example_sui",
      description: "Discover SUI, a high-performance Layer 1 blockchain.",
      shortDescription: "Learn about SUI's unique architecture and Move programming language.",
      fullDescription: `⚡ SUI - NEXT GENERATION BLOCKCHAIN
BEFORE THE VIDEO (Intro / Hook)
SUI is a permissionless Layer 1 blockchain designed from the ground up to enable creators and developers to build experiences that cater to the next billion users in web3.

UNIQUE ARCHITECTURE
• Objects as first-class citizens
• Parallel transaction execution
• Horizontal scaling capability
• Sub-second finality

MOVE PROGRAMMING LANGUAGE
• Originally developed by Facebook for Libra/Diem
• Resource-oriented programming model
• Built-in security features
• Formal verification capabilities

PERFORMANCE ADVANTAGES
• High throughput: 100,000+ TPS capacity
• Low latency: Sub-second finality
• Scalable storage model
• Efficient gas mechanisms

USE CASES
• Gaming and game assets
• Social media applications
• DeFi with high-frequency trading
• Digital collectibles and NFTs

KEY TAKEAWAY
SUI represents the next generation of blockchain technology, focusing on scalability, security, and developer experience to onboard the next wave of web3 users.`,
      notes: [
        { id: 1, title: "Move Language", content: "Resource-oriented programming language for safe smart contracts" },
        { id: 2, title: "Parallel Execution", content: "Transactions are processed simultaneously for high throughput" }
      ],
      materials: [
        { id: 1, title: "SUI Technical Paper", format: "PDF", size: "3.0 MB", icon: "file-pdf" },
        { id: 2, title: "Move Language Guide", format: "PDF", size: "2.1 MB", icon: "book" }
      ]
    },
    {
      id: 5,
      title: "BASE - Coinbase Layer 2",
      duration: "25 min",
      level: "Intermediate",
      youtubeId: "example_base",
      description: "Learn about Base, Coinbase's Ethereum Layer 2 solution.",
      shortDescription: "Understand how Base provides low-cost Ethereum scaling with Coinbase integration.",
      fullDescription: `🔗 BASE - COINBASE LAYER 2
BEFORE THE VIDEO (Intro / Hook)
Base is an Ethereum Layer 2 (L2) solution that offers a secure, low-cost, developer-friendly way to build decentralized apps onchain, incubated by Coinbase.

WHAT IS BASE?
• Ethereum Layer 2 rollup
• Built on the OP Stack (Optimism technology)
• Focused on security and developer experience
• Bridges the gap between Coinbase products and onchain

TECHNICAL FOUNDATIONS
• Optimistic rollup technology
• Ethereum security inheritance
• Seamless Coinbase integration
• Growing developer ecosystem

KEY ADVANTAGES
• Low transaction costs
• Fast transaction speeds
• Enhanced scalability
• Native access to Coinbase users and tools

DEVELOPER ECOSYSTEM
• Easy fiat onramps via Coinbase
• Extensive documentation and tooling
• Growing dApp ecosystem
• Strong developer community support

USE CASES
• Consumer-focused dApps
• Social applications
• NFT marketplaces
• Gaming and entertainment

KEY TAKEAWAY
Base brings together the security of Ethereum, the low costs of L2, and the distribution of Coinbase to help onboard the next million developers and billion users to the onchain world.`,
      notes: [
        { id: 1, title: "Layer 2 Scaling", content: "Processes transactions off-chain for lower costs" },
        { id: 2, title: "Coinbase Integration", content: "Seamless connection to Coinbase's user base and tools" }
      ],
      materials: [
        { id: 1, title: "Base Documentation", format: "PDF", size: "2.4 MB", icon: "file-pdf" },
        { id: 2, title: "OP Stack Overview", format: "PDF", size: "1.9 MB", icon: "layer-group" }
      ]
    },
    {
      id: 6,
      title: "BNB - Binance Ecosystem",
      duration: "40 min",
      level: "Intermediate",
      youtubeId: "example_bnb",
      description: "Explore the BNB Chain ecosystem and its various components.",
      shortDescription: "Master BNB Chain's dual-chain architecture and massive ecosystem.",
      fullDescription: `💎 BNB - BINANCE ECOSYSTEM
BEFORE THE VIDEO (Intro / Hook)
BNB Chain is a community-driven, decentralized, and censorship-resistant blockchain, powered by BNB. It consists of BNB Beacon Chain and BNB Smart Chain (BSC), creating a massive ecosystem.

DUAL-CHAIN ARCHITECTURE
• BNB Beacon Chain: Governance and staking
• BNB Smart Chain (BSC): EVM-compatible, smart contract execution
• Cross-chain compatibility
• Interoperability between chains

KEY FEATURES
• High performance: 100+ million users
• Low transaction fees
• EVM compatibility
• Growing validator set

ECOSYSTEM COMPONENTS
• BNB token: Utility across the ecosystem
• Binance Exchange integration
• DeFi protocols (PancakeSwap, Venus)
• NFT marketplaces
• Gaming and metaverse projects

GOVERNANCE AND STAKING
• BNB holders can participate in governance
• Validator and delegator system
• Regular token burns to reduce supply
• Community-driven development

KEY TAKEAWAY
BNB Chain has grown into one of the largest blockchain ecosystems, offering low fees, high performance, and deep integration with the broader Binance ecosystem.`,
      notes: [
        { id: 1, title: "Dual-Chain", content: "Separate chains for governance and smart contracts" },
        { id: 2, title: "EVM Compatibility", content: "Works with existing Ethereum tools and dApps" }
      ],
      materials: [
        { id: 1, title: "BNB Chain Whitepaper", format: "PDF", size: "2.8 MB", icon: "file-pdf" },
        { id: 2, title: "Ecosystem Map", format: "PNG", size: "4.2 MB", icon: "sitemap" }
      ]
    }
  ],
  
  scams: [
    {
      id: 1,
      title: "PUMP n DUMP Schemes",
      duration: "30 min",
      level: "Beginner",
      youtubeId: "pump_dump_scam",
      description: "Master the mechanics of pump and dump schemes and how to protect yourself.",
      shortDescription: "Learn how pump and dump schemes manipulate markets through artificial hype and psychological tricks.",
      fullDescription: `🚨 PUMP & DUMP — SCAM FUNDAMENTALS
BEFORE THE VIDEO (Intro / Hook)
Pump and dump schemes are one of the oldest and most common scams in financial markets, especially in crypto. They target people looking for quick profits by creating artificial hype around an asset that has little real value.
These schemes don't rely on complex technology. They rely on psychology: urgency, social proof, and fear of missing out.
This lesson explains how pump and dump schemes work, why they're effective, and how to recognize them before money is lost.

WHAT A PUMP & DUMP IS
A pump and dump is a coordinated scheme where the price of an asset is artificially inflated through hype and misinformation, then quickly sold off by insiders.
The result is a sharp price collapse that leaves late buyers holding losses.

HOW PUMP & DUMPS WORK
The scheme usually follows a predictable pattern:
• First, organizers accumulate a low-liquidity asset quietly.
• Next, they promote it aggressively through social media, influencers, or private groups.
• Finally, once buying pressure increases, they sell their holdings at higher prices.
• After the selling begins, the price drops rapidly.

COMMON WARNING SIGNS
• Guaranteed or "easy" profits
• Sudden social media hype with no fundamentals
• Anonymous teams or no real product
• Messages like "last chance," "about to explode," or "insiders only"
If urgency replaces explanation, risk is usually high.

KEY TAKEAWAY
Pump and dump schemes don't create value — they transfer it.
Money flows from late buyers to early sellers.
Understanding the pattern is the most effective defense.`,
      notes: [
        { id: 1, title: "Psychology Behind Scams", content: "Scams exploit FOMO, urgency, and social proof" },
        { id: 2, title: "Red Flags", content: "Anonymous teams, guaranteed returns, and sudden hype are warning signs" }
      ],
      materials: [
        { id: 1, title: "Scam Identification Checklist", format: "PDF", size: "2.4 MB", icon: "file-pdf" }
      ]
    },
    {
      id: 2,
      title: "BUNDLES Scams",
      duration: "25 min",
      level: "Beginner",
      youtubeId: "bundles_scam",
      description: "Learn to identify and avoid bundle scams in NFT and crypto markets.",
      shortDescription: "Understand how bundle scams trick users into buying worthless packages.",
      fullDescription: `📦 BUNDLE SCAMS — NFT MARKET MANIPULATION
BEFORE THE VIDEO (Intro / Hook)
Bundle scams involve selling packages of assets (often NFTs) where the overall package is marketed as valuable, but contains mostly worthless items with one or two valuable ones to justify the price.

HOW BUNDLE SCAMS WORK
• Scammers create bundles mixing valuable and worthless assets
• Market the bundle based on the few valuable items inside
• Hide the true composition of worthless assets
• Create false urgency around "limited time offers"

COMMON TACTICS
• Hidden fees and conditions
• Fake scarcity claims
• Misleading bundle descriptions
• Fake community endorsements

HOW TO PROTECT YOURSELF
• Always inspect each item in a bundle
• Research individual asset values
• Be wary of "too good to be true" deals
• Verify bundle creator reputation

KEY TAKEAWAY
If you can't see and evaluate every item in a bundle, don't buy it. Transparency is the best defense against bundle scams.`,
      notes: [
        { id: 1, title: "Bundle Inspection", content: "Always check every item in a bundle before purchasing" },
        { id: 2, title: "Value Assessment", content: "Research individual asset values, not just bundle claims" }
      ],
      materials: [
        { id: 1, title: "Bundle Scam Examples", format: "PDF", size: "1.9 MB", icon: "box" }
      ]
    },
    {
      id: 3,
      title: "RUGPULL Identification",
      duration: "35 min",
      level: "Intermediate",
      youtubeId: "rugpull_id",
      description: "Learn to identify and avoid rug pulls in crypto projects.",
      shortDescription: "Learn to identify rug pulls where developers abandon projects and drain liquidity.",
      fullDescription: `🚨 RUG PULLS — MARKET MANIPULATION FUNDAMENTALS
BEFORE THE VIDEO (Intro / Hook)
A rug pull is one of the most common scams in crypto. It happens when developers or insiders suddenly abandon a project, drain liquidity, or sell massive amounts of tokens, leaving regular holders with worthless assets.
Rug pulls thrive in fast-moving markets where hype spreads quicker than information.

HOW RUG PULLS HAPPEN
Most rug pulls involve liquidity pools. Developers launch a token, pair it with ETH or another asset, and allow trading. As hype grows, more users buy in, increasing liquidity and price.
At a chosen moment, the developers remove the liquidity or sell their large token allocation. With no liquidity left, buyers can't exit, and the price crashes almost instantly.

WARNING SIGNS
• Anonymous teams with no verifiable background
• Token supply heavily concentrated among a few wallets
• Liquidity not locked or contract ownership allows changes
• Promises of unusually high returns

KEY TAKEAWAY
Rug pulls aren't about bad code - they're about misplaced trust.
In crypto, understanding incentives matters more than believing narratives.`,
      notes: [
        { id: 1, title: "Liquidity Pool Risks", content: "Always check if liquidity is locked and for how long" },
        { id: 2, title: "Team Transparency", content: "Anonymous teams significantly increase rug pull risk" }
      ],
      materials: [
        { id: 1, title: "Rug Pull Case Studies", format: "PDF", size: "3.1 MB", icon: "file-alt" }
      ]
    },
    {
      id: 4,
      title: "FISHING Attacks",
      duration: "20 min",
      level: "Intermediate",
      youtubeId: "fishing_attacks",
      description: "Protect yourself from fishing attacks in the crypto space.",
      shortDescription: "Understand how fishing attacks trick users into giving away sensitive information.",
      fullDescription: `🎣 FISHING ATTACKS — SECURITY FUNDAMENTALS
BEFORE THE VIDEO (Intro / Hook)
Fishing attacks are one of the most common ways people lose crypto, accounts, and personal data. They don't rely on hacking blockchains or breaking encryption. Instead, they target something much easier: human trust.

HOW FISHING ATTACKS WORK
Most fishing attacks follow the same pattern. The attacker creates something that looks real: a website, a message, or a notification. The victim is pushed to act quickly, often through fear or excitement.
Once the victim clicks a link or connects a wallet, they're asked to sign a transaction, enter credentials, or approve access.

COMMON TYPES OF FISHING IN CRYPTO
• Fake websites (cloned platforms with slightly changed URLs)
• Direct messages (fake support accounts, airdrop announcements)
• Email fishing (pretending to be exchanges or wallet providers)

HOW TO STAY SAFE
• Never trust urgency in crypto
• Type website URLs manually
• Bookmark official sites
• Check links twice, especially shortened ones
• Use a separate wallet for testing

KEY TAKEAWAY
Fishing attacks don't break blockchains, they bypass caution.
The strongest security in crypto is awareness.`,
      notes: [
        { id: 1, title: "URL Verification", content: "Always check the domain name carefully" },
        { id: 2, title: "Wallet Separation", content: "Use different wallets for different purposes" }
      ],
      materials: [
        { id: 1, title: "Fishing Prevention Guide", format: "PDF", size: "1.8 MB", icon: "shield-alt" }
      ]
    },
    {
      id: 5,
      title: "Fake CALLS Protection",
      duration: "15 min",
      level: "Beginner",
      youtubeId: "fake_calls",
      description: "Recognize and avoid fake calls impersonating crypto exchanges.",
      shortDescription: "Learn to recognize and avoid fake phone calls impersonating crypto exchanges.",
      fullDescription: `📞 FAKE CALLS PROTECTION — IMPERSONATION SCAMS
WHAT THIS IS
Fishing attacks are scams where attackers pretend to be trusted companies or people to steal your information. In crypto, one of the most dangerous versions is fake phone calls, often claiming to be from exchanges like Coinbase, Binance, or MetaMask support.

HOW FAKE CRYPTO CALLS WORK
A scammer calls you pretending to be "Coinbase Security," "Account Protection," or a similar role. The number may look real due to caller ID spoofing.
They usually claim someone is trying to withdraw your funds, your account is "flagged," or immediate action is required to "secure" your assets.

WHAT REAL EXCHANGES WILL NEVER DO
• Do not call users about security issues
• Do not ask for seed phrases
• Do not ask you to move funds
• Do not request one-time codes over the phone

HOW TO STAY SAFE
The simplest rule is also the strongest one:
Treat all unsolicited crypto calls as scams by default.

KEY TAKEAWAY
If someone calls you about crypto security, assume it's fake, hang up, and verify everything yourself.
In crypto, skepticism is not paranoia — it's protection.`,
      notes: [
        { id: 1, title: "Caller ID Spoofing", content: "Scammers can make calls appear to come from legitimate numbers" },
        { id: 2, title: "Official Channels", content: "Always contact support through official websites/apps" }
      ],
      materials: [
        { id: 1, title: "Emergency Contact List", format: "PDF", size: "1.2 MB", icon: "phone-alt" }
      ]
    }
  ],
  
  memecoins: [
    {
      id: 1,
      title: "How to Create Memecoins",
      duration: "40 min",
      level: "Beginner",
      youtubeId: "create_memecoins",
      description: "Learn the technical process of creating memecoins.",
      shortDescription: "Step-by-step guide to creating and launching your own memecoin.",
      fullDescription: `🐸 HOW TO CREATE MEMECOINS
BEFORE THE VIDEO (Intro / Hook)
Memecoins have become a cultural phenomenon in crypto, representing community-driven projects with viral potential. This lesson covers the technical and strategic aspects of creating a memecoin.

TECHNICAL REQUIREMENTS
• Understanding of smart contract basics
• Familiarity with Solidity or other blockchain languages
• Knowledge of token standards (ERC-20, BEP-20, etc.)
• Understanding of liquidity provision

CREATION PROCESS
1. Concept and branding development
2. Smart contract creation and auditing
3. Token deployment on chosen blockchain
4. Liquidity pool setup
5. Community building strategies

COMMON PITFALLS TO AVOID
• Security vulnerabilities in contracts
• Insufficient liquidity provision
• Poor community management
• Regulatory considerations

KEY TAKEAWAY
Creating a successful memecoin requires both technical knowledge and community-building skills. Focus on security, transparency, and genuine value creation.`,
      notes: [
        { id: 1, title: "Smart Contract Security", content: "Always audit contracts before deployment" },
        { id: 2, title: "Community Building", content: "Success depends more on community than technology" }
      ],
      materials: [
        { id: 1, title: "Memecoin Creation Guide", format: "PDF", size: "2.5 MB", icon: "rocket" }
      ]
    },
    {
      id: 2,
      title: "How Memecoins Work",
      duration: "35 min",
      level: "Beginner",
      youtubeId: "memecoins_work",
      description: "Understand the mechanics and economics behind memecoins.",
      shortDescription: "Learn the economic models and community dynamics of memecoins.",
      fullDescription: `💰 HOW MEMECOINS WORK
BEFORE THE VIDEO (Intro / Hook)
Memecoins are more than just jokes - they represent new economic models based on community, culture, and viral marketing. This lesson explores how they actually function.

ECONOMIC MECHANICS
• Token distribution models
• Liquidity pool dynamics
• Trading volume importance
• Whale influence and manipulation

COMMUNITY DYNAMICS
• Social media-driven growth
• Influencer partnerships
• Community governance models
• Cultural relevance and timing

MARKET PSYCHOLOGY
• FOMO (Fear Of Missing Out) cycles
• Pump and dump patterns
• Long-term vs short-term holders
• Sentiment-driven price movements

SUCCESS FACTORS
• Strong, engaged community
• Clear narrative and branding
• Fair token distribution
• Continuous development and updates

KEY TAKEAWAY
Memecoins succeed through community strength, cultural relevance, and economic design - not just technical features.`,
      notes: [
        { id: 1, title: "Community is Everything", content: "The strongest memecoins have the strongest communities" },
        { id: 2, title: "Timing Matters", content: "Cultural relevance and timing are critical for success" }
      ],
      materials: [
        { id: 1, title: "Memecoin Economics Paper", format: "PDF", size: "2.8 MB", icon: "chart-line" }
      ]
    },
    {
      id: 3,
      title: "How to Trade Memecoins",
      duration: "50 min",
      level: "Intermediate",
      youtubeId: "trade_memecoins",
      description: "Learn trading strategies specific to memecoins.",
      shortDescription: "Master the strategies and risks of trading volatile memecoins.",
      fullDescription: `📈 HOW TO TRADE MEMECOINS
BEFORE THE VIDEO (Intro / Hook)
Trading memecoins requires different strategies than traditional crypto assets due to their extreme volatility, community-driven nature, and unique risk profile.

TRADING STRATEGIES
• Early entry techniques
• Volume analysis for timing entries/exits
• Social sentiment monitoring
• Risk management in volatile markets

RISK MANAGEMENT
• Position sizing for high volatility
• Stop-loss strategies
• Portfolio allocation rules
• Emotional discipline in hype cycles

TOOLS AND INDICATORS
• Social media sentiment trackers
• On-chain analytics for whale watching
• Volume and liquidity analysis
• Community engagement metrics

COMMON TRADING MISTAKES
• Chasing pumps too late
• Ignoring fundamental red flags
• Over-leveraging in volatile markets
• Emotional trading based on FOMO

KEY TAKEAWAY
Successful memecoin trading requires equal parts technical analysis, social intelligence, and strict risk management. Never risk more than you can afford to lose.`,
      notes: [
        { id: 1, title: "Risk Management First", content: "Always prioritize capital preservation in volatile markets" },
        { id: 2, title: "Social Sentiment", content: "Community chatter often precedes price movements" }
      ],
      materials: [
        { id: 1, title: "Memecoin Trading Journal", format: "PDF", size: "1.5 MB", icon: "book" },
        { id: 2, title: "Risk Calculator", format: "XLSX", size: "0.8 MB", icon: "calculator" }
      ]
    },
    {
      id: 4,
      title: "Where to Trade Memecoins",
      duration: "25 min",
      level: "Intermediate",
      youtubeId: "where_trade",
      description: "Discover the best platforms and exchanges for memecoin trading.",
      shortDescription: "Learn about DEXs, CEXs, and specialized platforms for memecoin trading.",
      fullDescription: `🔄 WHERE TO TRADE MEMECOINS
BEFORE THE VIDEO (Intro / Hook)
Choosing the right trading platform is crucial for memecoin success. This lesson compares DEXs, CEXs, and specialized platforms for memecoin trading.

DECENTRALIZED EXCHANGES (DEXs)
• Uniswap (Ethereum)
• PancakeSwap (BNB Chain)
• Raydium (Solana)
• Advantages: Early access, no KYC
• Disadvantages: Higher fees, slippage

CENTRALIZED EXCHANGES (CEXs)
• Binance, Coinbase, Kraken
• Advantages: Liquidity, security, lower fees
• Disadvantages: Listing delays, KYC requirements

SPECIALIZED PLATFORMS
• Pump.fun (Solana memecoin launchpad)
• Birdeye (multi-chain analytics)
• DexScreener (real-time tracking)

CHOOSING THE RIGHT PLATFORM
• Consider chain preferences
• Evaluate liquidity needs
• Assess security features
• Compare fee structures

SAFETY CONSIDERATIONS
• Smart contract verification
• Liquidity pool analysis
• Rug pull screening tools
• Community vetting processes

KEY TAKEAWAY
The best trading platform depends on your goals: DEXs for early access, CEXs for security, and specialized tools for analytics. Always prioritize safety over convenience.`,
      notes: [
        { id: 1, title: "DEX vs CEX", content: "DEXs offer early access, CEXs offer security and liquidity" },
        { id: 2, title: "Chain Selection", content: "Different chains have different memecoin ecosystems" }
      ],
      materials: [
        { id: 1, title: "Exchange Comparison Chart", format: "PDF", size: "2.1 MB", icon: "exchange-alt" }
      ]
    }
  ],
  
  security: [
    {
      id: 1,
      title: "How to Avoid Being Larped",
      duration: "30 min",
      level: "Beginner",
      youtubeId: "avoid_larped",
      description: "Learn to identify and avoid social engineering attacks (LARPing).",
      shortDescription: "Protect yourself from impersonation and social engineering attacks.",
      fullDescription: `🛡️ HOW TO AVOID BEING LARPED
BEFORE THE VIDEO (Intro / Hook)
"LARPing" (Live Action Role Playing) in crypto refers to impersonators pretending to be someone they're not - often influencers, developers, or support staff - to gain trust and steal from victims.

COMMON LARPING TACTICS
• Fake social media profiles
• Impersonation of known figures
• Fake customer support accounts
• Social engineering through DMs

RED FLAGS TO WATCH FOR
• Unverified social media accounts
• Pressure for immediate action
• Requests for private keys or seeds
• Too-good-to-be-true offers

VERIFICATION TECHNIQUES
• Cross-check social media handles
• Verify through official channels
• Use PGP keys or signed messages
• Double-check website URLs

PROTECTIVE MEASURES
• Never share private information in DMs
• Use hardware wallets for large holdings
• Enable 2FA on all accounts
• Regularly audit connected apps

KEY TAKEAWAY
Trust, but verify. In crypto, authenticating identities is as important as securing wallets. When in doubt, go through official channels.`,
      notes: [
        { id: 1, title: "Identity Verification", content: "Always verify identities through multiple channels" },
        { id: 2, title: "Social Media Safety", content: "Be extremely cautious of crypto offers via social media" }
      ],
      materials: [
        { id: 1, title: "LARPing Case Studies", format: "PDF", size: "1.8 MB", icon: "user-secret" }
      ]
    },
    {
      id: 2,
      title: "How to Avoid Being Drowned",
      duration: "25 min",
      level: "Beginner",
      youtubeId: "avoid_drowned",
      description: "Protect against wallet draining and approval attacks.",
      shortDescription: "Learn to prevent wallet draining through malicious approvals.",
      fullDescription: `💧 HOW TO AVOID BEING DROWNED
BEFORE THE VIDEO (Intro / Hook)
"Being drowned" refers to having your wallet drained through malicious token approvals - one of the most common ways crypto is stolen today.

HOW WALLET DRAINING WORKS
• Malicious websites request excessive approvals
• Users sign transactions without reading details
• Attackers gain permission to transfer assets
• Draining happens instantly or gradually

COMMON ATTACK VECTORS
• Fake airdrop websites
• Malicious NFT mint sites
• Compromised DeFi protocols
• Fake token approval requests

PREVENTIVE MEASURES
• Use separate wallets for different activities
• Regularly review and revoke approvals
• Install wallet guard extensions
• Never approve unlimited amounts

RECOVERY STEPS IF DRAINED
• Immediately revoke all approvals
• Transfer remaining funds to new wallet
• Report to authorities if significant loss
• Learn from the experience

KEY TAKEAWAY
Wallet security is about permission management as much as key protection. Regular approval audits are essential for long-term safety.`,
      notes: [
        { id: 1, title: "Approval Management", content: "Regularly review and revoke unnecessary token approvals" },
        { id: 2, title: "Wallet Separation", content: "Use different wallets for trading, DeFi, and storage" }
      ],
      materials: [
        { id: 1, title: "Approval Revoke Guide", format: "PDF", size: "1.2 MB", icon: "shield" }
      ]
    },
    {
      id: 3,
      title: "Best Security Options",
      duration: "40 min",
      level: "Intermediate",
      youtubeId: "best_security",
      description: "Explore the best security practices and tools for crypto.",
      shortDescription: "Master hardware wallets, multisig, and advanced security setups.",
      fullDescription: `🔒 BEST SECURITY OPTIONS
BEFORE THE VIDEO (Intro / Hook)
Crypto security is multi-layered, combining hardware, software, and behavioral practices. This lesson covers the most effective security options available today.

HARDWARE WALLETS
• Ledger: Industry standard, multiple models
• Trezor: Open-source, strong privacy
• Coldcard: Bitcoin-focused, air-gapped
• Comparison of features and trade-offs

MULTISIGNATURE SETUPS
• What is multisig and how it works
• Common configurations (2-of-3, 3-of-5)
• Use cases for individuals and teams
• Setting up your first multisig wallet

SOFTWARE SOLUTIONS
• MetaMask security features
• Wallet guard browser extensions
• Transaction simulation tools
• Portfolio tracking with security alerts

BEHAVIORAL SECURITY
• Phishing recognition training
• Social engineering defense
• Information hygiene practices
• Emergency response planning

ENTERPRISE SECURITY
• Custodial solutions
• Insurance options
• Regulatory compliance
• Team security protocols

KEY TAKEAWAY
The best security is layered: hardware for storage, multisig for significant amounts, software for daily use, and education for prevention.`,
      notes: [
        { id: 1, title: "Security Layers", content: "Use multiple layers of security for optimal protection" },
        { id: 2, title: "Regular Updates", content: "Security practices must evolve with new threats" }
      ],
      materials: [
        { id: 1, title: "Security Setup Checklist", format: "PDF", size: "2.3 MB", icon: "check-circle" },
        { id: 2, title: "Hardware Wallet Comparison", format: "PDF", size: "1.9 MB", icon: "microchip" }
      ]
    }
  ]
};

export const getLessonData = (courseId, lessonId) => {
  const course = lessonsData[courseId];
  if (!course) return null;
  
  const lesson = course.find(l => l.id === parseInt(lessonId));
  if (!lesson) return null;
  
  return {
    ...lesson,
    youtubeId: lesson.youtubeId || "dQw4w9WgXcQ"
  };
};

export const getTotalLessons = (courseId) => {
  return lessonsData[courseId]?.length || 0;
};

export const hasNextLesson = (courseId, lessonId) => {
  const total = getTotalLessons(courseId);
  return parseInt(lessonId) < total;
};

export const getNextLessonTitle = (courseId, lessonId) => {
  const course = lessonsData[courseId];
  if (!course) return "Next Lesson";
  
  const nextLesson = course.find(l => l.id === parseInt(lessonId) + 1);
  return nextLesson?.title || "Next Lesson";
};