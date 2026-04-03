import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// ─── Ticker Data ─────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  { platform: 'X/TWITTER', label: '@sama tweet on AGI', side: 'OVER', pct: '71%', delta: '+4.2%' },
  { platform: 'TIKTOK',    label: 'Charli D\'Amelio dance challenge', side: 'OVER', pct: '58%', delta: '+1.8%' },
  { platform: 'YOUTUBE',   label: 'MrBeast 100M subs video', side: 'UNDER', pct: '43%', delta: '-2.1%' },
  { platform: 'INSTAGRAM', label: 'Kendall Jenner campaign post', side: 'OVER', pct: '64%', delta: '+3.0%' },
  { platform: 'X/TWITTER', label: '#Bitcoin ETF approval tweet', side: 'OVER', pct: '79%', delta: '+6.5%' },
  { platform: 'TIKTOK',    label: 'Viral cooking trend #FoodTok', side: 'UNDER', pct: '38%', delta: '-0.9%' },
  { platform: 'YOUTUBE',   label: 'PewDiePie 10yr anniversary video', side: 'OVER', pct: '55%', delta: '+2.3%' },
  { platform: 'X/TWITTER', label: 'OpenAI product announcement', side: 'OVER', pct: '82%', delta: '+7.1%' },
];

// ─── Docs Cards ───────────────────────────────────────────────────────────────
const DOCS = [
  {
    tag: 'INTRODUCTION',
    title: 'What is TrendZap?',
    desc: 'The thesis. The mechanism. Why prediction markets for virality makes sense.',
    href: '/docs/introduction/what-is-trendzap',
  },
  {
    tag: 'GET STARTED',
    title: 'Quick Start Guide',
    desc: 'Wallet connected to first bet in under five minutes. No blockchain experience needed.',
    href: '/docs/getting-started/quick-start',
  },
  {
    tag: 'USER GUIDE',
    title: 'Placing Bets',
    desc: 'OVER or UNDER. Parimutuel pools. USDC settlement. How every market works end-to-end.',
    href: '/docs/user-guide/placing-bets',
  },
  {
    tag: 'DEVELOPERS',
    title: 'SDK Reference',
    desc: 'TypeScript SDK for embedding TrendZap markets into your app. Full API reference.',
    href: '/docs/developers/sdk-reference',
  },
  {
    tag: 'ARCHITECTURE',
    title: 'System Overview',
    desc: 'Smart contracts, oracle pipeline, risk engine — the full technical picture.',
    href: '/docs/architecture/overview',
  },
  {
    tag: 'PROTOCOL',
    title: 'Earned Trust',
    desc: 'Audits, open source code, non-custodial design, and what security means to us.',
    href: '/docs/protocol/trust',
  },
];

// ─── Trust Badges ─────────────────────────────────────────────────────────────
const TRUST = [
  { label: 'Built on Arbitrum', note: 'Ethereum L2' },
  { label: 'Hackathon Winner', note: 'Verified on-chain' },
  { label: 'MIT Licensed', note: 'Open source' },
  { label: 'Non-Custodial', note: 'USDC settlement' },
  { label: 'Chainlink Oracle', note: 'Tamper-proof data' },
];

// ─── User Types ───────────────────────────────────────────────────────────────
const USERS = [
  {
    type: 'Predictors',
    line: 'You have opinions on what goes viral. Now put skin in the game.',
    points: [
      'Browse live markets across X, TikTok, YouTube, Instagram',
      'Pick OVER or UNDER on any engagement threshold',
      'Win proportionally from the losing side\'s pool',
    ],
    href: '/docs/user-guide/placing-bets',
  },
  {
    type: 'Creators',
    line: 'Your content is live. The market has a view. Do you agree?',
    points: [
      'Hedge your own content performance',
      'Create markets around your releases',
      'Turn audience engagement into a real-time financial signal',
    ],
    href: '/docs/user-guide/creating-markets',
  },
  {
    type: 'Builders',
    line: 'Prediction market primitives you can build on directly.',
    points: [
      'TypeScript SDK with full market lifecycle support',
      'Subgraph for indexed on-chain state',
      'Open contracts on Arbitrum — composable by design',
    ],
    href: '/docs/developers/sdk-reference',
  },
];

// ─── Ticker Strip ─────────────────────────────────────────────────────────────
function TickerStrip() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]; // duplicate for seamless loop
  return (
    <div className={styles.tickerOuter} aria-hidden="true">
      <div className={styles.tickerTrack}>
        {items.map((item, i) => (
          <span key={i} className={styles.tickerItem}>
            <span className={styles.tickerPlatform}>{item.platform}</span>
            <span className={styles.tickerLabel}>{item.label}</span>
            <span className={`${styles.tickerSide} ${item.side === 'OVER' ? styles.over : styles.under}`}>
              {item.side}
            </span>
            <span className={styles.tickerPct}>{item.pct}</span>
            <span className={`${styles.tickerDelta} ${item.delta.startsWith('+') ? styles.up : styles.dn}`}>
              {item.delta}
            </span>
            <span className={styles.tickerDivider}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Market Card (hero right panel) ──────────────────────────────────────────
function MarketCard() {
  const [overPct, setOverPct] = useState(67);
  const [pool, setPool] = useState(14320);
  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 44, s: 12 });

  // Live-ish pool drift
  useEffect(() => {
    const interval = setInterval(() => {
      setOverPct(p => {
        const delta = (Math.random() - 0.48) * 0.6;
        return Math.min(85, Math.max(52, parseFloat((p + delta).toFixed(1))));
      });
      setPool(p => p + Math.floor(Math.random() * 80));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(t => {
        let { h, m, s } = t;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 5; m = 44; s = 12; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = n => String(n).padStart(2, '0');
  const underPct = (100 - overPct).toFixed(1);

  return (
    <div className={styles.marketCard}>
      <div className={styles.mcHeader}>
        <span className={styles.mcPlatform}>X / TWITTER</span>
        <span className={styles.mcLive}><span className={styles.mcDot} /> LIVE</span>
      </div>
      <div className={styles.mcQuestion}>
        Will this tweet hit <strong>500K likes</strong> before midnight?
      </div>
      <div className={styles.mcPost}>
        <div className={styles.mcPostHandle}>@OpenAI</div>
        <div className={styles.mcPostText}>
          "Introducing something we've been working on for a while…"
        </div>
        <div className={styles.mcPostMeta}>Posted 4h ago · 218K likes so far</div>
      </div>
      <div className={styles.mcOdds}>
        <div className={`${styles.mcSide} ${styles.mcOver}`}>
          <span className={styles.mcSideLabel}>OVER</span>
          <span className={styles.mcSidePct}>{overPct}%</span>
          <div className={styles.mcBar}>
            <div className={styles.mcBarFill} style={{ width: `${overPct}%`, background: 'var(--tz-teal)' }} />
          </div>
        </div>
        <div className={`${styles.mcSide} ${styles.mcUnder}`}>
          <span className={styles.mcSideLabel}>UNDER</span>
          <span className={styles.mcSidePct}>{underPct}%</span>
          <div className={styles.mcBar}>
            <div className={styles.mcBarFill} style={{ width: `${underPct}%`, background: 'var(--tz-amber)' }} />
          </div>
        </div>
      </div>
      <div className={styles.mcFooter}>
        <div className={styles.mcStat}>
          <span className={styles.mcStatLabel}>Pool</span>
          <span className={styles.mcStatVal}>{pool.toLocaleString()} USDC</span>
        </div>
        <div className={styles.mcStat}>
          <span className={styles.mcStatLabel}>Closes in</span>
          <span className={styles.mcStatVal}>{pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}</span>
        </div>
      </div>
      <div className={styles.mcDisclaimer}>Example market · Illustrative only</div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <section className={styles.hero}>
      <div className={styles.heroLeft}>
        <div className={styles.heroEyebrow}>
          <span className={styles.eyebrowTag}>DOCUMENTATION</span>
          <span className={styles.eyebrowSep} />
          <span className={styles.eyebrowSub}>Public Beta · Arbitrum</span>
        </div>

        <h1 className={styles.heroTitle}>
          The First Market<br />
          <em>for Viral Moments.</em>
        </h1>

        <p className={styles.heroDesc}>
          TrendZap lets anyone predict whether social media posts will go viral —
          settled on-chain, powered by a tamper-proof oracle, non-custodial by design.
        </p>

        <div className={styles.heroCtas}>
          <Link className={styles.btnPrimary} to="/docs/getting-started/quick-start">
            Read the Docs
          </Link>
          <a
            className={styles.btnOutline}
            href="https://trendzap.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open App ↗
          </a>
        </div>

        <div className={styles.trustRail}>
          {TRUST.map(t => (
            <div key={t.label} className={styles.trustChip}>
              <span className={styles.trustTick}>✓</span>
              <span className={styles.trustLabel}>{t.label}</span>
              <span className={styles.trustNote}>{t.note}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.heroRight}>
        <MarketCard />
      </div>
    </section>
  );
}

// ─── Docs Grid ────────────────────────────────────────────────────────────────
function DocsGrid() {
  return (
    <section className={styles.docsSection}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionTag}>DOCUMENTATION</span>
        <h2 className={styles.sectionTitle}>Everything in one place</h2>
      </div>
      <div className={styles.docsGrid}>
        {DOCS.map(d => (
          <Link key={d.title} to={d.href} className={styles.docCard}>
            <span className={styles.docCardTag}>{d.tag}</span>
            <h3 className={styles.docCardTitle}>{d.title}</h3>
            <p className={styles.docCardDesc}>{d.desc}</p>
            <span className={styles.docCardArrow}>→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Who It's For ─────────────────────────────────────────────────────────────
function WhoSection() {
  return (
    <section className={styles.whoSection}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionTag}>USE CASES</span>
        <h2 className={styles.sectionTitle}>Built for three types of people</h2>
      </div>
      <div className={styles.whoGrid}>
        {USERS.map(u => (
          <div key={u.type} className={styles.whoCard}>
            <div className={styles.whoType}>{u.type}</div>
            <p className={styles.whoLine}>{u.line}</p>
            <ul className={styles.whoList}>
              {u.points.map(p => (
                <li key={p} className={styles.whoItem}>
                  <span className={styles.whoMark}>—</span> {p}
                </li>
              ))}
            </ul>
            <Link to={u.href} className={styles.whoLink}>
              Read docs →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
function BottomCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaRule} />
      <div className={styles.ctaInner}>
        <div className={styles.ctaLeft}>
          <h2 className={styles.ctaTitle}>Ready to predict the next viral moment?</h2>
          <p className={styles.ctaSub}>
            Backed by the Arbitrum ecosystem. Validated by a hackathon win. Built in public.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <Link className={styles.btnPrimary} to="/docs/introduction/what-is-trendzap">
            Start Reading
          </Link>
          <a
            className={styles.btnOutline}
            href="https://twitter.com/TrendZapHQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow on X
          </a>
        </div>
      </div>
      <div className={styles.ctaRule} />
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  useEffect(() => {
    document.body.classList.add('homepage-view');
    return () => document.body.classList.remove('homepage-view');
  }, []);

  return (
    <Layout
      title="TrendZap Documentation"
      description="The decentralized prediction market for social media virality — built on Arbitrum."
    >
      <main className={styles.main}>
        <TickerStrip />
        <div className={styles.heroWrap}>
          <Hero />
        </div>
        <DocsGrid />
        <WhoSection />
        <BottomCTA />
      </main>
    </Layout>
  );
}
