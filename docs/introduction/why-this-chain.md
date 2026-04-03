---
sidebar_position: 3
title: Why Arbitrum?
description: Why TrendZap chose Arbitrum — speed, cost, security, and ecosystem.
---

# Why Arbitrum?

Prediction markets are latency-sensitive and high-frequency. Someone posts a tweet. It starts gaining traction. A market opens. People want in. Every second of delay and every dollar of gas cost reduces the quality of the market.

Arbitrum solves this.

---

## The Technical Case

### Low Gas, High Frequency

TrendZap markets can see many small bets in rapid succession — especially when a post is actively going viral. On Ethereum mainnet, that's prohibitively expensive. On Arbitrum:

- **Gas costs:** Typically $0.01–$0.15 per transaction
- **Throughput:** Handles burst activity without congestion
- **Finality:** Sub-second for user-facing confirmation

This makes micro-betting economically viable and turns TrendZap into a genuine high-frequency market rather than a low-liquidity curiosity.

### Ethereum Security Inheritance

Arbitrum is an optimistic rollup that settles on Ethereum mainnet. This means:

- All transaction data is posted to Ethereum
- Fraud proofs protect against invalid state transitions
- Users can always exit to mainnet — no permission required
- The trust model is Ethereum-grade, not a new chain you have to evaluate

For a protocol where people stake real money on real outcomes, this security inheritance matters.

### EVM Compatibility

Every Solidity tool works on Arbitrum without modification:

- Foundry, Hardhat, Remix — same workflow
- Ethers.js, Viem, Wagmi — same libraries
- Chainlink, Pyth, UMA — battle-tested oracle providers already deployed
- USDC native deployment — Circle's official USDC, not a bridged variant

No chain-specific SDKs. No proprietary tooling. No new trust assumptions.

---

## The Ecosystem Case

### Arbitrum Backing

TrendZap is building within the Arbitrum ecosystem and actively participating in its grants and developer programs. The Arbitrum Foundation's support gives us infrastructure access, developer resources, and ecosystem visibility without the need to spread thin across multiple chains.

Focused ecosystem participation means better liquidity density, a single community to build with, and chain-specific optimisations that a multi-chain approach never achieves.

### Oracle Support

The Arbitrum ecosystem has mature, battle-tested oracle infrastructure:

- **Chainlink** — Price feeds and custom data delivery on Arbitrum One
- **Pyth** — Low-latency price and data feeds
- **UMA** — Optimistic oracle for custom resolution logic

TrendZap uses Chainlink for final on-chain data delivery, with UMA as the dispute-resolution fallback layer.

### DeFi Composability

Arbitrum's DeFi ecosystem is one of the most developed outside of Ethereum mainnet:

- Deep USDC liquidity on Uniswap, Camelot, and GMX
- Users already familiar with Arbitrum wallets and bridge flows
- Active community of prediction market participants from protocols like Dopex and GMX options markets

---

## Why Not Multi-Chain?

We chose depth over breadth.

Spreading liquidity across five chains fractures every pool. A 10,000 USDC market splits into five 2,000 USDC markets — thin, easily manipulated, poor implied probability signal.

Prediction markets are more efficient with concentrated liquidity. One strong community, one oracle, one set of contracts — that's how you build a reliable market.

Arbitrum will remain our home chain through mainnet launch and beyond. As volume matures, we will evaluate additional deployment — but only if it serves users, not for the sake of chain diversification.

---

## Network Details

| Property | Value |
|----------|-------|
| Network | Arbitrum One |
| Chain ID | 42161 |
| RPC | `https://arb1.arbitrum.io/rpc` |
| Explorer | arbiscan.io |
| Settlement token | USDC (native) |
| Oracle | Chainlink on Arbitrum One |
| Testnet | Arbitrum Sepolia (Chain ID: 421614) |

---

## Next Steps

- [Quick Start](/docs/getting-started/quick-start) — Connect and place your first bet
- [Smart Contracts](/docs/architecture/smart-contracts) — Contract addresses on Arbitrum
- [Oracle System](/docs/architecture/oracle-system) — How Chainlink delivers verified metrics
