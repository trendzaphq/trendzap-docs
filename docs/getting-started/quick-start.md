---
sidebar_position: 1
title: Quick Start
description: Get from zero to your first TrendZap bet in under five minutes.
---

# Quick Start

Get from zero to your first prediction in under five minutes.

---

## What you need

- A browser wallet: MetaMask, Coinbase Wallet, Rabby, or any WalletConnect-compatible wallet
- The Avalanche C-Chain network added to your wallet
- A small amount of AVAX for gas fees (under $0.01 per transaction)
- USDC to place bets (the platform's betting currency)

---

## Step 1 — Add Avalanche to your wallet

Most wallets will auto-detect Avalanche when you connect to [app.trendzap.xyz](https://app.trendzap.xyz). If you need to add it manually:

| Field | Value |
|-------|-------|
| Network Name | Avalanche C-Chain |
| RPC URL | `https://api.avax.network/ext/bc/C/rpc` |
| Chain ID | `43114` |
| Currency Symbol | AVAX |
| Block Explorer | `https://snowtrace.io` |

---

## Step 2 — Get USDC

TrendZap uses **USDC** (ERC-20 stablecoin, 6 decimals) for all bets and payouts. You'll need USDC to place bets. Swap AVAX → USDC on [Trader Joe](https://traderjoexyz.com/avalanche/trade) or [Pangolin](https://app.pangolin.exchange/#/swap). You'll still need a small amount of AVAX for gas fees.

**Get AVAX first (for gas)**
Coinbase, Binance, and Kraken all support AVAX. Withdraw directly to Avalanche C-Chain (not Ethereum mainnet). A few dollars of AVAX is enough to cover gas for hundreds of transactions.

**Swap AVAX → USDC**
Use [Trader Joe](https://traderjoexyz.com/avalanche/trade) or [Pangolin](https://app.pangolin.exchange/#/swap) on Avalanche to swap your AVAX for USDC. USDC on Avalanche C-Chain is at `0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E`.

**Bridge USDC from another chain**
Use the [Avalanche Bridge](https://bridge.avax.network/) or a cross-chain bridge to move USDC from Ethereum or other networks.

:::tip Small amounts go a long way
Gas on Avalanche is under $0.01. The minimum bet is 0.05 USDC. You don't need much to get started.
:::

---

## Step 3 — Connect your wallet

1. Go to [app.trendzap.xyz](https://app.trendzap.xyz)
2. Click **Connect Wallet** in the top right (or the bottom nav on mobile)
3. Select your wallet provider
4. Approve the connection
5. If prompted, switch to Avalanche C-Chain

Your address appears in the navbar once connected.

---

## Step 4 — Browse markets

The main feed shows all active prediction markets. Each card shows:

- The social media post and platform (X, YouTube)
- The threshold (e.g. "500K views")
- Current OVER / UNDER implied probability
- Total USDC in the pool
- Time remaining until market closes

Click any market card to open the full detail view.

---

## Step 5 — Place your bet

1. Open a market you have a view on
2. Tap **Zap It!**
3. Choose **OVER** or **UNDER**
4. Enter your USDC amount
5. Review the confirmation modal (shows your shares, implied payout, and current probability)
6. Confirm the transaction in your wallet

Your position is recorded on Avalanche. You can view it in your **Profile** tab at any time.

---

## What happens next?

When the market's deadline arrives, the oracle fetches the final metric. If your side wins, a **Claim Winnings** button appears on the market. Click it, confirm the transaction, and USDC arrives in your wallet.

See [Claiming Winnings](/docs/user-guide/claiming-winnings) for the full flow.

---

## Need help?

- [Connect Wallet Guide](/docs/getting-started/connect-wallet) — detailed wallet setup for each provider
- [Your First Bet](/docs/getting-started/first-bet) — full walkthrough
- [FAQ](/docs/faq) — common questions answered
