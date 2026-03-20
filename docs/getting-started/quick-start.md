---
sidebar_position: 1
title: Quick Start
description: Get started with TrendZap on Avalanche in under 5 minutes — no crypto experience needed.
last_update:
  date: 2026-03-20
  author: TrendZap Team
---

# Quick Start

You can be placing your first TrendZap prediction in under 5 minutes. You don't need a wallet set up in advance — just a Twitter account or an email address.

---

## Option A: Sign In with Twitter / Email (Recommended for Beginners)

TrendZap supports social login via **Privy** — the same technology used by Coinbase and major Web3 apps to onboard non-crypto users.

1. Go to [app.trendzap.xyz](https://app.trendzap.xyz)
2. Click **Get Started** or **Sign In**
3. Choose **Continue with X (Twitter)** or **Continue with Email**
4. Authorize the connection
5. Privy automatically creates a **non-custodial embedded wallet** for you — your AVAX is yours, TrendZap cannot access it

You are now logged in. Your wallet address appears in the top-right corner.

:::tip No seed phrase required
Your embedded wallet is secured by your social account. You can export the private key at any time from the account settings if you want to use it with MetaMask or Core later.
:::

---

## Option B: Connect an Existing Wallet

If you already have MetaMask, Core Wallet, or any WalletConnect-compatible wallet:

1. Go to [app.trendzap.xyz](https://app.trendzap.xyz)
2. Click **Connect Wallet**
3. Select your wallet
4. Switch to the **Avalanche C-Chain** network if prompted

### Manual Network Configuration (Avalanche Mainnet)

| Field | Value |
|-------|-------|
| Network Name | Avalanche C-Chain |
| RPC URL | `https://api.avax.network/ext/bc/C/rpc` |
| Chain ID | `43114` |
| Currency Symbol | `AVAX` |
| Block Explorer | `https://snowtrace.io` |

### Testnet (Fuji) — For Testing Only

| Field | Value |
|-------|-------|
| Network Name | Avalanche Fuji Testnet |
| RPC URL | `https://api.avax-test.network/ext/bc/C/rpc` |
| Chain ID | `43113` |
| Currency Symbol | `AVAX` |
| Block Explorer | `https://testnet.snowtrace.io` |
| Faucet | [faucet.avax.network](https://faucet.avax.network) |

---

## Get AVAX

TrendZap markets are denominated in **AVAX** (native Avalanche token).

### On Testnet (Free)
Visit [faucet.avax.network](https://faucet.avax.network), paste your wallet address, and receive free testnet AVAX.

### On Mainnet
- **Exchanges:** Buy AVAX on Binance, Coinbase, Kraken, or OKX and withdraw to your Avalanche C-Chain address
- **Bridge:** Bridge assets from another chain using [bridge.avax.network](https://bridge.avax.network)

---

## Browse and Join a Market

1. From the main feed, scroll through **Active Markets**
2. Click any market card to open the detail view
3. Review:
   - The social media post being tracked
   - The engagement threshold (e.g., "5M views")
   - The deadline
   - Current OVER/UNDER implied probabilities
   - Total pool size

---

## Place Your First Bet

1. Select **OVER** or **UNDER** based on your prediction
2. Enter your stake amount in AVAX
3. Review the **estimated shares** and **potential payout** shown in the interface
4. Click **Place Bet**
5. Confirm the transaction in your wallet (gas fee: typically < $0.05)

Your position is confirmed on-chain in under 2 seconds. You can view it anytime under **My Positions**.

---

## Wait for Resolution

When the market deadline arrives:
- The Chainlink oracle fetches the actual engagement metric from the platform's API
- The result is delivered on-chain automatically
- You receive a notification (if you've enabled them)

---

## Claim Your Winnings

If your prediction was correct:

1. Go to **My Positions** → **Resolved**
2. Find the settled market
3. Click **Claim Winnings**
4. Confirm the transaction
5. AVAX is transferred to your wallet immediately

---

## What's Next?

- [Connect Wallet Guide](/docs/getting-started/connect-wallet) — Detailed wallet setup for all wallet types
- [How It Works](/docs/introduction/how-it-works) — Understand LMSR pricing and oracle resolution
- [Creating Markets](/docs/user-guide/creating-markets) — Create your own market and earn a creator royalty
