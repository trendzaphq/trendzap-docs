---
sidebar_position: 3
title: Why Avalanche?
description: Why TrendZap is built on Avalanche C-Chain.
---

# Why Avalanche?

TrendZap is deployed on **Avalanche C-Chain** (mainnet, chain ID 43114). Here's why.

---

## Fast finality, low fees

Social media engagement can spike within minutes of a post going live. Markets need to settle fast and cost next to nothing to use.

- **Sub-second finality** — transactions confirm in under 2 seconds
- **Low gas fees** — typically under $0.01 per transaction
- **High throughput** — handles burst activity without congestion

This makes it practical to place small bets (0.05 USDC minimum) without gas eating your winnings.

---

## EVM-compatible

Avalanche C-Chain is fully EVM-compatible. Every Ethereum tool works out of the box — MetaMask, WalletConnect, ethers.js, viem, Hardhat. No new stack to learn.

---

## USDC as betting currency

TrendZap uses **USDC** (ERC-20, 6 decimals) for all bets and payouts — similar to how Polymarket uses USDC. This provides price stability so your position value isn't affected by AVAX price movements.

**You still need a small amount of AVAX for gas fees.** Gas on Avalanche is typically under $0.01 per transaction.

**Getting USDC on Avalanche:**
- Swap AVAX → USDC on [Trader Joe](https://traderjoexyz.com/avalanche/trade) or [Pangolin](https://app.pangolin.exchange/#/swap)
- Bridge USDC from Ethereum or other chains via the [Avalanche Bridge](https://bridge.avax.network/)

**Getting AVAX (for gas):**
- Buy directly on Coinbase, Kraken, or Binance and withdraw to Avalanche C-Chain
- On-ramp via your wallet's fiat gateway (WalletConnect wallets support this)

---

## Verifiable on Snowtrace

Every market, every bet, every resolution is publicly visible on [Snowtrace](https://snowtrace.io) — Avalanche's block explorer. Contract addresses are published. Nothing is hidden.

---

## Contract addresses

| Contract | Address |
|----------|---------|
| ViralityMarket | `0xbB898682B2BbD8cF19c33179b783ed172168BB6d` |
| Factory | `0x1a30Ffc42DF5a505E68f671dCD92dF26AA00Ac94` |

Both are deployed and live on **Avalanche C-Chain mainnet**.

---

## Network details

| Property | Value |
|----------|-------|
| Network | Avalanche C-Chain |
| Chain ID | `43114` |
| RPC | `https://api.avax.network/ext/bc/C/rpc` |
| Explorer | [snowtrace.io](https://snowtrace.io) |
| Native currency | AVAX |
