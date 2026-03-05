import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const features = [
  {
    icon: '⚡',
    title: 'Quick Start',
    description: 'Get up and running with TrendZap in under 5 minutes. Connect your wallet, browse markets, and place your first bet.',
    href: '/docs/getting-started/quick-start',
    color: 'purple',
  },
  {
    icon: '📖',
    title: 'Introduction',
    description: 'Learn what TrendZap is, how the protocol works, and why we chose to build exclusively on Arbitrum.',
    href: '/docs/introduction/what-is-trendzap',
    color: 'cyan',
  },
  {
    icon: '🛠',
    title: 'SDK Reference',
    description: 'Integrate TrendZap into your own dApp using our TypeScript SDK. Full API reference, examples, and guides.',
    href: '/docs/developers/sdk-reference',
    color: 'green',
  },
  {
    icon: '🔮',
    title: 'Why Arbitrum',
    description: 'Understand why we chose Arbitrum — low fees, high throughput, and native Chainlink oracle support.',
    href: '/docs/introduction/why-arbitrum',
    color: 'purple',
  },
  {
    icon: '📡',
    title: 'How It Works',
    description: 'Deep-dive into the oracle system, market resolution, parimutuel pools, and USDC settlement flow.',
    href: '/docs/introduction/how-it-works',
    color: 'cyan',
  },
  {
    icon: '🏗',
    title: 'Architecture',
    description: 'Smart contract architecture, oracle adapters, risk engine, and subgraph indexing diagrams.',
    href: '/docs/introduction/what-is-trendzap',
    color: 'green',
  },
];

const stats = [
  { value: 'Arbitrum', label: 'Exclusive Chain' },
  { value: 'Chainlink', label: 'Oracle Provider' },
  { value: 'USDC', label: 'Settlement Token' },
  { value: 'Open Source', label: 'License: MIT' },
];

function HeroSection() {
  return (
    <div className={styles.hero}>
      {/* Ambient orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.grid} />

      <div className={styles.heroInner}>
        {/* Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Built on Arbitrum — Coming Soon
        </div>

        {/* Headline */}
        <h1 className={styles.heroTitle}>
          TrendZap
          <br />
          <span className={styles.heroGradient}>Documentation</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Everything you need to understand, integrate, and build on the first
          decentralised prediction market for social media virality.
        </p>

        {/* CTA Buttons */}
        <div className={styles.heroCtas}>
          <Link className={styles.btnPrimary} to="/docs/getting-started/quick-start">
            Get Started →
          </Link>
          <Link className={styles.btnSecondary} to="/docs/introduction/what-is-trendzap">
            Learn More
          </Link>
        </div>

        {/* Stats row */}
        <div className={styles.statsRow}>
          {stats.map(({ value, label }) => (
            <div key={label} className={styles.statItem}>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, href, color }) {
  return (
    <Link to={href} className={`${styles.featureCard} ${styles[`card_${color}`]}`}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{description}</p>
      <span className={styles.featureArrow}>→</span>
    </Link>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="TrendZap Documentation"
      description="The decentralized prediction market for social media virality — built on Arbitrum"
    >
      <main className={styles.main}>
        <HeroSection />

        {/* Feature Grid */}
        <section className={styles.featureSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Explore the Docs</p>
            <h2 className={styles.sectionTitle}>Everything in one place</h2>
            <p className={styles.sectionSubtitle}>
              From quick-start guides to deep-dive architecture references — fully open source.
            </p>
          </div>

          <div className={styles.featureGrid}>
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className={styles.ctaBanner}>
          <div className={styles.ctaGlow} />
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to predict the next viral moment?</h2>
            <p className={styles.ctaSubtitle}>
              Join the waitlist, follow us on X, or start reading the docs now.
            </p>
            <div className={styles.ctaButtons}>
              <a
                href="https://trendzap.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                Visit App ↗
              </a>
              <Link className={styles.btnSecondary} to="/docs/introduction/what-is-trendzap">
                Read Docs
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
