/**
 * NetworkConfig Component
 * 
 * Displays network configuration (Chain ID, RPC URLs, etc.) for the current ecosystem.
 */

import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const networks = {
  avalanche: {
    mainnet: {
      name: 'Avalanche C-Chain',
      chainId: 43114,
      rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
      explorerUrl: 'https://snowtrace.io',
      nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    },
    testnet: {
      name: 'Fuji C-Chain',
      chainId: 43113,
      rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
      explorerUrl: 'https://testnet.snowtrace.io',
      nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
      faucetUrl: 'https://faucet.avax.network/',
    },
  },
  arbitrum: {
    mainnet: {
      name: 'Arbitrum One',
      chainId: 42161,
      rpcUrl: 'https://arb1.arbitrum.io/rpc',
      explorerUrl: 'https://arbiscan.io',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    },
    testnet: {
      name: 'Arbitrum Sepolia',
      chainId: 421614,
      rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
      explorerUrl: 'https://sepolia.arbiscan.io',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      faucetUrl: 'https://faucets.chain.link/arbitrum-sepolia',
    },
  },
  base: {
    mainnet: {
      name: 'Base',
      chainId: 8453,
      rpcUrl: 'https://mainnet.base.org',
      explorerUrl: 'https://basescan.org',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    },
    testnet: {
      name: 'Base Sepolia',
      chainId: 84532,
      rpcUrl: 'https://sepolia.base.org',
      explorerUrl: 'https://sepolia.basescan.org',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      faucetUrl: 'https://faucets.chain.link/base-sepolia',
    },
  },
  solana: {
    mainnet: {
      name: 'Solana Mainnet',
      chainId: 'mainnet-beta',
      rpcUrl: 'https://api.mainnet-beta.solana.com',
      explorerUrl: 'https://solscan.io',
      nativeCurrency: { name: 'SOL', symbol: 'SOL', decimals: 9 },
    },
    testnet: {
      name: 'Solana Devnet',
      chainId: 'devnet',
      rpcUrl: 'https://api.devnet.solana.com',
      explorerUrl: 'https://solscan.io?cluster=devnet',
      nativeCurrency: { name: 'SOL', symbol: 'SOL', decimals: 9 },
      faucetUrl: 'https://faucet.solana.com/',
    },
  },
  flow: {
    mainnet: {
      name: 'Flow Mainnet',
      chainId: 'flow-mainnet',
      rpcUrl: 'https://rest-mainnet.onflow.org',
      explorerUrl: 'https://flowscan.org',
      nativeCurrency: { name: 'FLOW', symbol: 'FLOW', decimals: 8 },
    },
    testnet: {
      name: 'Flow Testnet',
      chainId: 'flow-testnet',
      rpcUrl: 'https://rest-testnet.onflow.org',
      explorerUrl: 'https://testnet.flowscan.org',
      nativeCurrency: { name: 'FLOW', symbol: 'FLOW', decimals: 8 },
      faucetUrl: 'https://testnet-faucet.onflow.org/',
    },
  },
};

export default function NetworkConfig({ network = 'testnet' }) {
  const { siteConfig } = useDocusaurusContext();
  const ecosystem = siteConfig.customFields?.ecosystem || 'avalanche';
  const config = networks[ecosystem]?.[network] || networks.avalanche[network];

  return (
    <div style={{
      background: 'rgba(168, 85, 247, 0.05)',
      border: '1px solid rgba(168, 85, 247, 0.2)',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
    }}>
      <h3 style={{ marginTop: 0 }}>
        {network === 'mainnet' ? '🟢 Mainnet' : '🟡 Testnet'} Configuration
      </h3>
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ padding: '0.5rem 0', fontWeight: 'bold' }}>Network Name</td>
            <td style={{ padding: '0.5rem 0' }}><code>{config.name}</code></td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem 0', fontWeight: 'bold' }}>Chain ID</td>
            <td style={{ padding: '0.5rem 0' }}><code>{config.chainId}</code></td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem 0', fontWeight: 'bold' }}>RPC URL</td>
            <td style={{ padding: '0.5rem 0' }}><code>{config.rpcUrl}</code></td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem 0', fontWeight: 'bold' }}>Block Explorer</td>
            <td style={{ padding: '0.5rem 0' }}>
              <a href={config.explorerUrl} target="_blank" rel="noopener noreferrer">
                {config.explorerUrl}
              </a>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '0.5rem 0', fontWeight: 'bold' }}>Native Currency</td>
            <td style={{ padding: '0.5rem 0' }}>
              {config.nativeCurrency.name} ({config.nativeCurrency.symbol})
            </td>
          </tr>
          {config.faucetUrl && (
            <tr>
              <td style={{ padding: '0.5rem 0', fontWeight: 'bold' }}>Faucet</td>
              <td style={{ padding: '0.5rem 0' }}>
                <a href={config.faucetUrl} target="_blank" rel="noopener noreferrer">
                  Get testnet tokens →
                </a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
