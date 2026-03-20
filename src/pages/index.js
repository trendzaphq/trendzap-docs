import React, { useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// Get ecosystem from context
function useEcosystemConfig() {
  const { siteConfig } = useDocusaurusContext();
  return siteConfig.customFields?.ecosystemConfig || {
    name: 'Avalanche',
    oracle: { provider: 'Chainlink' },
  };
}

const features = [
  {
    icon: '⚡',
    title: 'Quick Start',
    description: 'Get up and running with TrendZap in under 5 minutes. Connect your wallet, browse markets, and place your first bet.',
    href: '/docs/getting-started/quick-start',
    delay: '0ms'
  },
  {
    icon: '🌐',
    title: 'The Protocol',
    description: 'Learn what TrendZap is, how the continuous parimutuel mechanics work, and the LMSR pricing model.',
    href: '/docs/introduction/what-is-trendzap',
    delay: '100ms'
  },
  {
    icon: '💻',
    title: 'SDK Toolkit',
    description: 'Integrate TrendZap into your dApp using our TypeScript SDK. Place bets, read state, and fetch odds.',
    href: '/docs/developers/sdk-reference',
    delay: '200ms'
  },
  {
    icon: '🔮',
    title: 'Oracle Design',
    description: 'Deep-dive into the Chainlink DON system, metric fetching, and anti-manipulation risk engines.',
    href: '/docs/developers/oracle-integration',
    delay: '300ms'
  },
  {
    icon: '⛓',
    title: 'Contracts',
    description: 'Smart contract ABI, deployed addresses, OpenZeppelin guard mechanisms, and fee routing logic.',
    href: '/docs/developers/smart-contracts',
    delay: '400ms'
  },
  {
    icon: '📊',
    title: 'Subgraph',
    description: 'Query historical bets, win rates, global volume, and leaderboard data via The Graph infrastructure.',
    href: '/docs/developers/subgraph',
    delay: '500ms'
  },
];

function HeroSection() {
  const ecosystemConfig = useEcosystemConfig();
  
  return (
    <div className={styles.hero}>
      {/* Max-impact background shapes */}
      <div className={styles.voidGrid} />
      <div className={styles.flarePrimary} />
      <div className={styles.flareSecondary} />
      <div className={styles.scannerLine} />

      <div className={styles.heroInner}>
        {/* Dynamic Launch Badge */}
        <div className={styles.pillBadgeContainer}>
          <div className={styles.pillBadge}>
            <span className={styles.pillDot} />
            <span className={styles.pillText}>V1 DEPLOYED ON {ecosystemConfig.name.toUpperCase()} C-CHAIN</span>
          </div>
        </div>

        {/* Hyper-styled Typography */}
        <h1 className={styles.titleMask}>
          <span className={styles.titleLine1}>SOCIAL INTELLIGENCE</span>
          <br />
          <span className={styles.titleLine2}>PRICED ON-CHAIN</span>
        </h1>

        <p className={styles.subtitleDisplay}>
          The reference architecture for building, integrating, and trading on the first decentralized prediction layer for social media.
        </p>

        {/* Cyber-Brutalist Buttons */}
        <div className={styles.actionGroup}>
          <Link className={styles.btnVolt} to="/docs/getting-started/quick-start">
            START BUILDING
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link className={styles.btnGhost} to="/docs/introduction/what-is-trendzap">
            READ THE WHITEPAPER
          </Link>
        </div>

        {/* Metrics Bar */}
        <div className={styles.tickerBar}>
          <div className={styles.tickerItem}>
            <span className={styles.tickValue}>2.0%</span>
            <span className={styles.tickLabel}>PROTOCOL FEE</span>
          </div>
          <div className={styles.tickerItem}>
            <span className={styles.tickValue}>0.5%</span>
            <span className={styles.tickLabel}>CREATOR REWARD</span>
          </div>
          <div className={styles.tickerItem}>
            <span className={styles.tickValue}>LMSR</span>
            <span className={styles.tickLabel}>PRICING MECH</span>
          </div>
          <div className={styles.tickerItem}>
            <span className={styles.tickValue}>&lt;2s</span>
            <span className={styles.tickLabel}>FINALITY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, href, delay }) {
  return (
    <Link to={href} className={styles.gridCard} style={{ animationDelay: delay }}>
      <div className={styles.cardGlow} />
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>{icon}</div>
        <div className={styles.cardArrow}>↗</div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{description}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  const ecosystemConfig = useEcosystemConfig();

  useEffect(() => {
    // Add custom class to body for homepage specific resets (like hiding default nav initially)
    document.body.classList.add('homepage-view');
    return () => document.body.classList.remove('homepage-view');
  }, []);

  return (
    <Layout
      title="Architecture & Protocol"
      description={`The decentralized prediction market for social media virality — built on ${ecosystemConfig.name}`}
    >
      <main className={styles.mainVoid}>
        <HeroSection />

        <section className={styles.bentoSection}>
          <div className={styles.bentoHeader}>
            <h2 className={styles.bentoTitle}>SYSTEM TOPOLOGY</h2>
            <div className={styles.bentoLine} />
          </div>

          <div className={styles.bentoGrid}>
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </section>

        <section className={styles.terminalSection}>
          <div className={styles.terminalWindow}>
            <div className={styles.terminalHeader}>
              <span className={styles.terminalDot} style={{ background: '#ff5f56' }} />
              <span className={styles.terminalDot} style={{ background: '#ffbd2e' }} />
              <span className={styles.terminalDot} style={{ background: '#27c93f' }} />
              <span className={styles.terminalTitle}>trendzap@avalanche-c-chain:~</span>
            </div>
            <div className={styles.terminalBody}>
              <pre className={styles.terminalCode}>
                <code>
                  <span className={styles.tcCyan}>import</span> {'{'} TrendZapClient {'}'} <span className={styles.tcCyan}>from</span> <span className={styles.tcString}>'@trendzap/sdk'</span>;{'\n'}
                  <span className={styles.tcCyan}>import</span> {'{'} parseEther {'}'} <span className={styles.tcCyan}>from</span> <span className={styles.tcString}>'viem'</span>;{'\n\n'}
                  
                  <span className={styles.tcMuted}>// Init client on Avalanche</span>{'\n'}
                  <span className={styles.tcKeyword}>const</span> client = <span className={styles.tcKeyword}>new</span> TrendZapClient({'{'} chain: <span className={styles.tcString}>'avalanche'</span> {'}'});{'\n\n'}
                  
                  <span className={styles.tcMuted}>// Execute prediction instantly</span>{'\n'}
                  <span className={styles.tcKeyword}>const</span> tx = <span className={styles.tcKeyword}>await</span> client.markets.buyShares({'\n'}
                  {'  '}42, <span className={styles.tcMuted}>// Market ID: Elon Tweet > 1M Likes</span>{'\n'}
                  {'  '}<span className={styles.tcKeyword}>true</span>, <span className={styles.tcMuted}>// BET: OVER</span>{'\n'}
                  {'  '}parseEther(<span className={styles.tcString}>'10.5'</span>) <span className={styles.tcMuted}>// 10.5 AVAX</span>{'\n'}
                  );{'\n'}
                </code>
              </pre>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
