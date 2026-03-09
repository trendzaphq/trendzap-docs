/**
 * TrendZap Multi-Ecosystem Configuration
 * 
 * This file defines chain-specific configurations that are used throughout
 * the documentation. Set ECOSYSTEM in your .env file to switch between chains.
 * 
 * Supported ecosystems: avalanche, arbitrum, base, solana, flow
 */

const ecosystems = {
  avalanche: {
    name: 'Avalanche',
    shortName: 'AVAX',
    tagline: 'Built on Avalanche for lightning-fast predictions',
    description: 'TrendZap leverages Avalanche\'s sub-second finality and low fees to deliver the ultimate prediction market experience.',
    color: '#E84142',
    logo: '/img/chains/avalanche.svg',
    
    // Network configuration
    network: {
      mainnet: {
        name: 'Avalanche C-Chain',
        chainId: 43114,
        rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
        explorerUrl: 'https://snowtrace.io',
        explorerName: 'Snowtrace',
      },
      testnet: {
        name: 'Fuji C-Chain',
        chainId: 43113,
        rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
        explorerUrl: 'https://testnet.snowtrace.io',
        explorerName: 'Snowtrace Testnet',
      },
    },
    
    // Native token
    nativeToken: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    
    // Stablecoin for settlements
    stablecoin: {
      name: 'USDC',
      symbol: 'USDC',
      decimals: 6,
      mainnetAddress: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
      testnetAddress: '0x5425890298aed601595a70AB815c96711a31Bc65',
    },
    
    // Oracle configuration
    oracle: {
      provider: 'Chainlink',
      description: 'Chainlink Data Feeds on Avalanche',
      docsUrl: 'https://docs.chain.link/data-feeds/price-feeds/addresses?network=avalanche',
    },
    
    // DEX/DeFi integrations
    defi: {
      dex: 'Trader Joe',
      lendingProtocol: 'Aave',
      bridge: 'Avalanche Bridge',
    },
    
    // Ecosystem links
    links: {
      ecosystem: 'https://www.avax.network/',
      developer: 'https://docs.avax.network/',
      faucet: 'https://faucet.avax.network/',
      grants: 'https://www.avalabs.org/avalanche-grant-program',
    },
    
    // Contract addresses (to be updated on deployment)
    contracts: {
      mainnet: {
        predictionMarket: '',
        oracle: '',
        treasury: '',
      },
      testnet: {
        predictionMarket: '',
        oracle: '',
        treasury: '',
      },
    },
  },
  
  arbitrum: {
    name: 'Arbitrum',
    shortName: 'ARB',
    tagline: 'Built on Arbitrum for instant settlement',
    description: 'TrendZap utilizes Arbitrum\'s Nitro technology for near-instant finality and minimal gas fees.',
    color: '#28A0F0',
    logo: '/img/chains/arbitrum.svg',
    
    network: {
      mainnet: {
        name: 'Arbitrum One',
        chainId: 42161,
        rpcUrl: 'https://arb1.arbitrum.io/rpc',
        explorerUrl: 'https://arbiscan.io',
        explorerName: 'Arbiscan',
      },
      testnet: {
        name: 'Arbitrum Sepolia',
        chainId: 421614,
        rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
        explorerUrl: 'https://sepolia.arbiscan.io',
        explorerName: 'Arbiscan Sepolia',
      },
    },
    
    nativeToken: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    
    stablecoin: {
      name: 'USDC',
      symbol: 'USDC',
      decimals: 6,
      mainnetAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      testnetAddress: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
    },
    
    oracle: {
      provider: 'Chainlink',
      description: 'Chainlink Data Feeds on Arbitrum',
      docsUrl: 'https://docs.chain.link/data-feeds/price-feeds/addresses?network=arbitrum',
    },
    
    defi: {
      dex: 'Camelot',
      lendingProtocol: 'Aave',
      bridge: 'Arbitrum Bridge',
    },
    
    links: {
      ecosystem: 'https://arbitrum.io/',
      developer: 'https://docs.arbitrum.io/',
      faucet: 'https://faucets.chain.link/arbitrum-sepolia',
      grants: 'https://arbitrum.foundation/grants',
    },
    
    contracts: {
      mainnet: {
        predictionMarket: '',
        oracle: '',
        treasury: '',
      },
      testnet: {
        predictionMarket: '',
        oracle: '',
        treasury: '',
      },
    },
  },
  
  base: {
    name: 'Base',
    shortName: 'BASE',
    tagline: 'Built on Base for seamless onboarding',
    description: 'TrendZap on Base brings prediction markets to the masses with Coinbase\'s user-friendly ecosystem.',
    color: '#0052FF',
    logo: '/img/chains/base.svg',
    
    network: {
      mainnet: {
        name: 'Base',
        chainId: 8453,
        rpcUrl: 'https://mainnet.base.org',
        explorerUrl: 'https://basescan.org',
        explorerName: 'Basescan',
      },
      testnet: {
        name: 'Base Sepolia',
        chainId: 84532,
        rpcUrl: 'https://sepolia.base.org',
        explorerUrl: 'https://sepolia.basescan.org',
        explorerName: 'Basescan Sepolia',
      },
    },
    
    nativeToken: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    
    stablecoin: {
      name: 'USDC',
      symbol: 'USDC',
      decimals: 6,
      mainnetAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      testnetAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    },
    
    oracle: {
      provider: 'Chainlink',
      description: 'Chainlink Data Feeds on Base',
      docsUrl: 'https://docs.chain.link/data-feeds/price-feeds/addresses?network=base',
    },
    
    defi: {
      dex: 'Aerodrome',
      lendingProtocol: 'Moonwell',
      bridge: 'Base Bridge',
    },
    
    links: {
      ecosystem: 'https://base.org/',
      developer: 'https://docs.base.org/',
      faucet: 'https://faucets.chain.link/base-sepolia',
      grants: 'https://base.org/grants',
    },
    
    contracts: {
      mainnet: {
        predictionMarket: '',
        oracle: '',
        treasury: '',
      },
      testnet: {
        predictionMarket: '',
        oracle: '',
        treasury: '',
      },
    },
  },
  
  solana: {
    name: 'Solana',
    shortName: 'SOL',
    tagline: 'Built on Solana for unmatched speed',
    description: 'TrendZap harnesses Solana\'s 400ms block times for real-time prediction markets.',
    color: '#9945FF',
    logo: '/img/chains/solana.svg',
    
    network: {
      mainnet: {
        name: 'Solana Mainnet',
        chainId: 'mainnet-beta',
        rpcUrl: 'https://api.mainnet-beta.solana.com',
        explorerUrl: 'https://solscan.io',
        explorerName: 'Solscan',
      },
      testnet: {
        name: 'Solana Devnet',
        chainId: 'devnet',
        rpcUrl: 'https://api.devnet.solana.com',
        explorerUrl: 'https://solscan.io/?cluster=devnet',
        explorerName: 'Solscan Devnet',
      },
    },
    
    nativeToken: {
      name: 'SOL',
      symbol: 'SOL',
      decimals: 9,
    },
    
    stablecoin: {
      name: 'USDC',
      symbol: 'USDC',
      decimals: 6,
      mainnetAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      testnetAddress: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
    },
    
    oracle: {
      provider: 'Pyth',
      description: 'Pyth Network Oracle on Solana',
      docsUrl: 'https://docs.pyth.network/',
    },
    
    defi: {
      dex: 'Jupiter',
      lendingProtocol: 'Solend',
      bridge: 'Wormhole',
    },
    
    links: {
      ecosystem: 'https://solana.com/',
      developer: 'https://docs.solana.com/',
      faucet: 'https://faucet.solana.com/',
      grants: 'https://solana.org/grants',
    },
    
    contracts: {
      mainnet: {
        predictionMarket: '',
        oracle: '',
        treasury: '',
      },
      testnet: {
        predictionMarket: '',
        oracle: '',
        treasury: '',
      },
    },
  },
  
  flow: {
    name: 'Flow',
    shortName: 'FLOW',
    tagline: 'Built on Flow for mainstream adoption',
    description: 'TrendZap on Flow brings prediction markets to the next billion users with consumer-grade UX.',
    color: '#00EF8B',
    logo: '/img/chains/flow.svg',
    
    network: {
      mainnet: {
        name: 'Flow Mainnet',
        chainId: 'flow-mainnet',
        rpcUrl: 'https://rest-mainnet.onflow.org',
        explorerUrl: 'https://flowscan.org',
        explorerName: 'Flowscan',
      },
      testnet: {
        name: 'Flow Testnet',
        chainId: 'flow-testnet',
        rpcUrl: 'https://rest-testnet.onflow.org',
        explorerUrl: 'https://testnet.flowscan.org',
        explorerName: 'Flowscan Testnet',
      },
    },
    
    nativeToken: {
      name: 'FLOW',
      symbol: 'FLOW',
      decimals: 8,
    },
    
    stablecoin: {
      name: 'USDC',
      symbol: 'USDC',
      decimals: 8,
      mainnetAddress: 'A.b19436aae4d94622.FiatToken',
      testnetAddress: 'A.a983fecbed621163.FiatToken',
    },
    
    oracle: {
      provider: 'Chainlink (via CCIP)',
      description: 'Chainlink CCIP for cross-chain data',
      docsUrl: 'https://docs.chain.link/ccip',
    },
    
    defi: {
      dex: 'IncrementFi',
      lendingProtocol: 'Celer cBridge',
      bridge: 'Flow Bridge',
    },
    
    links: {
      ecosystem: 'https://flow.com/',
      developer: 'https://developers.flow.com/',
      faucet: 'https://testnet-faucet.onflow.org/',
      grants: 'https://flow.com/ecosystemsupport',
    },
    
    contracts: {
      mainnet: {
        predictionMarket: '',
        oracle: '',
        treasury: '',
      },
      testnet: {
        predictionMarket: '',
        oracle: '',
        treasury: '',
      },
    },
  },
};

// Get current ecosystem from environment variable
const currentEcosystem = process.env.ECOSYSTEM || 'avalanche';

// Export the active ecosystem configuration
const activeConfig = ecosystems[currentEcosystem];

if (!activeConfig) {
  throw new Error(`Invalid ecosystem: ${currentEcosystem}. Supported: ${Object.keys(ecosystems).join(', ')}`);
}

module.exports = {
  ecosystems,
  currentEcosystem,
  activeConfig,
  
  // Helper function to get ecosystem-specific text
  getText: (key, fallback = '') => {
    const texts = {
      chainName: activeConfig.name,
      chainShortName: activeConfig.shortName,
      tagline: activeConfig.tagline,
      description: activeConfig.description,
      nativeToken: activeConfig.nativeToken.symbol,
      stablecoin: activeConfig.stablecoin.symbol,
      explorer: activeConfig.network.mainnet.explorerName,
      testnetExplorer: activeConfig.network.testnet.explorerName,
      oracleProvider: activeConfig.oracle.provider,
      dex: activeConfig.defi.dex,
    };
    return texts[key] || fallback;
  },
  
  // Check if current ecosystem is EVM-compatible
  isEVM: () => ['avalanche', 'arbitrum', 'base'].includes(currentEcosystem),
  
  // Check if current ecosystem is Solana
  isSolana: () => currentEcosystem === 'solana',
  
  // Check if current ecosystem is Flow
  isFlow: () => currentEcosystem === 'flow',
};
