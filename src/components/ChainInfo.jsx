/**
 * ChainInfo Component
 * 
 * Displays ecosystem-specific information dynamically based on the
 * ECOSYSTEM environment variable set in the build.
 */

import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Chain-specific content
const chainContent = {
  avalanche: {
    name: 'Avalanche',
    color: '#E84142',
    tagline: 'Built on Avalanche for lightning-fast predictions',
    description: 'TrendZap leverages Avalanche\'s sub-second finality and low fees to deliver the ultimate prediction market experience.',
    highlights: [
      { icon: '⚡', title: 'Sub-Second Finality', desc: 'Avalanche confirms transactions in under 1 second' },
      { icon: '💰', title: 'Low Gas Fees', desc: 'Typical transactions cost $0.01-0.05' },
      { icon: '🔒', title: 'Robust Security', desc: 'Avalanche consensus provides strong finality guarantees' },
      { icon: '🌐', title: 'Growing Ecosystem', desc: '$1B+ TVL with Trader Joe, Aave, GMX, and more' },
    ],
    stats: [
      { label: 'Finality', value: '<1s' },
      { label: 'Avg Gas', value: '$0.02' },
      { label: 'TPS', value: '4,500+' },
    ],
    integrations: ['Chainlink', 'Trader Joe', 'Aave', 'LayerZero'],
  },
  arbitrum: {
    name: 'Arbitrum',
    color: '#28A0F0',
    tagline: 'Built on Arbitrum for instant settlement with minimal fees',
    description: 'TrendZap utilizes Arbitrum\'s Nitro technology for near-instant finality and the lowest fees in L2.',
    highlights: [
      { icon: '⚡', title: 'Nitro Technology', desc: 'Advanced optimistic rollup with fraud proofs' },
      { icon: '💰', title: 'Ultra-Low Fees', desc: 'Typical transactions cost $0.01-0.10' },
      { icon: '🔒', title: 'Ethereum Security', desc: 'Inherits Ethereum L1 security' },
      { icon: '🌐', title: 'Largest L2', desc: '$3B+ TVL with Uniswap, Aave, GMX' },
    ],
    stats: [
      { label: 'Finality', value: '~2s' },
      { label: 'Avg Gas', value: '$0.05' },
      { label: 'TPS', value: '40,000+' },
    ],
    integrations: ['Chainlink', 'Camelot', 'GMX', 'Aave'],
  },
  base: {
    name: 'Base',
    color: '#0052FF',
    tagline: 'Built on Base for seamless crypto onboarding',
    description: 'TrendZap on Base brings prediction markets to the masses with Coinbase\'s user-friendly ecosystem.',
    highlights: [
      { icon: '⚡', title: 'OP Stack', desc: 'Built on Optimism\'s battle-tested technology' },
      { icon: '💰', title: 'Low Fees', desc: 'Typical transactions cost $0.01-0.05' },
      { icon: '🔒', title: 'Coinbase Security', desc: 'Backed by Coinbase infrastructure' },
      { icon: '🌐', title: 'Growing Fast', desc: 'Fastest growing L2 ecosystem' },
    ],
    stats: [
      { label: 'Finality', value: '~2s' },
      { label: 'Avg Gas', value: '$0.03' },
      { label: 'TPS', value: '2,000+' },
    ],
    integrations: ['Chainlink', 'Aerodrome', 'Moonwell', 'Uniswap'],
  },
  solana: {
    name: 'Solana',
    color: '#9945FF',
    tagline: 'Built on Solana for unmatched speed',
    description: 'TrendZap harnesses Solana\'s 400ms block times for real-time prediction markets.',
    highlights: [
      { icon: '⚡', title: '400ms Blocks', desc: 'Near-instant transaction confirmation' },
      { icon: '💰', title: 'Minimal Fees', desc: 'Transactions cost fractions of a cent' },
      { icon: '🔒', title: 'Validator Network', desc: '1,500+ validators securing the network' },
      { icon: '🌐', title: 'DeFi Hub', desc: 'Jupiter, Marinade, Raydium, and more' },
    ],
    stats: [
      { label: 'Block Time', value: '400ms' },
      { label: 'Avg Fee', value: '$0.0025' },
      { label: 'TPS', value: '65,000+' },
    ],
    integrations: ['Pyth', 'Jupiter', 'Marinade', 'Wormhole'],
  },
  flow: {
    name: 'Flow',
    color: '#00EF8B',
    tagline: 'Built on Flow for mainstream adoption',
    description: 'TrendZap on Flow brings prediction markets to the next billion users with consumer-grade UX.',
    highlights: [
      { icon: '⚡', title: 'Consumer UX', desc: 'Built for mainstream user experience' },
      { icon: '💰', title: 'Low Fees', desc: 'Affordable transactions for all users' },
      { icon: '🔒', title: 'Proven Scale', desc: 'Powers NBA Top Shot and NFL All Day' },
      { icon: '🌐', title: 'Brand Partners', desc: 'Disney, NFL, NBA ecosystem' },
    ],
    stats: [
      { label: 'Block Time', value: '~2.5s' },
      { label: 'Avg Fee', value: '$0.001' },
      { label: 'TPS', value: '1,000+' },
    ],
    integrations: ['Chainlink CCIP', 'IncrementFi', 'Flowverse', 'Celer'],
  },
};

export default function ChainInfo() {
  const { siteConfig } = useDocusaurusContext();
  const ecosystem = siteConfig.customFields?.ecosystem || 'avalanche';
  const chain = chainContent[ecosystem] || chainContent.avalanche;

  return (
    <div style={{
      padding: '2rem',
      background: `linear-gradient(135deg, ${chain.color}10 0%, transparent 100%)`,
      border: `1px solid ${chain.color}30`,
      borderRadius: '16px',
      marginBottom: '2rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: chain.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
        }}>
          ⛓️
        </div>
        <div>
          <h2 style={{ margin: 0, color: chain.color }}>{chain.name}</h2>
          <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>{chain.tagline}</p>
        </div>
      </div>
      
      <p style={{ marginBottom: '1.5rem' }}>{chain.description}</p>
      
      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        {chain.stats.map((stat, i) => (
          <div key={i} style={{
            padding: '1rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: chain.color }}>{stat.value}</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{stat.label}</div>
          </div>
        ))}
      </div>
      
      {/* Highlights */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
      }}>
        {chain.highlights.map((item, i) => (
          <div key={i} style={{
            padding: '1rem',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            display: 'flex',
            gap: '0.75rem',
          }}>
            <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
            <div>
              <strong>{item.title}</strong>
              <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Integrations */}
      <div style={{ marginTop: '1.5rem' }}>
        <strong>Key Integrations:</strong>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          {chain.integrations.map((name, i) => (
            <span key={i} style={{
              padding: '0.25rem 0.75rem',
              background: `${chain.color}20`,
              borderRadius: '9999px',
              fontSize: '0.85rem',
            }}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
