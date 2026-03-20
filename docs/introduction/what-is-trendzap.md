---
sidebar_position: 1
title: What is TrendZap?
description: TrendZap is the first decentralized prediction market for social media virality — built on Avalanche.
last_update:
  date: 2026-03-20
  author: TrendZap Team
---

# What is TrendZap?

TrendZap is the first decentralized prediction market built on **Avalanche** that lets anyone bet on whether social media posts will hit engagement thresholds — and get paid when they're right.

## The Problem

Every day, billions of social media users make predictions:

- *"This video is going to blow up."*
- *"That tweet won't age well."*
- *"This campaign is going to flop."*

These predictions are made constantly — by creators, marketers, crypto traders, and just about everyone with a social media account. But there has never been a trustless, transparent way to put real money behind them.

Existing prediction markets (Polymarket, Kalshi) cover politics, sports, and macroeconomics. **None of them cover social media** — the category that most of the internet actually cares about.

## The Solution

TrendZap creates OVER/UNDER prediction markets tied directly to real social media engagement metrics:

| Step | What Happens |
|------|-------------|
| **Create** | Any user links a public post, sets an engagement threshold, and defines a deadline |
| **Bet** | Participants stake AVAX on OVER (exceeds threshold) or UNDER (stays below) |
| **Resolve** | A Chainlink oracle fetches the actual metric from the platform's official API |
| **Settle** | Winners receive their proportional share of the pool — automatically, on-chain |

No admin makes a decision about the outcome. No platform can change the result. The oracle delivers the data; the smart contract executes the payout.

## A Simple Example

> **Market:** "Will this YouTube video hit 5 million views within 48 hours?"
>
> — Pool: 8.2 AVAX across 47 bettors  
> — Current odds: OVER 61% / UNDER 39%  
> — Resolution: Chainlink fetches the view count at the deadline  
> — Settlement: OVER backers split the pool proportionally

If you staked 0.5 AVAX on OVER and OVER wins with a 61% implied probability, your payout is calculated automatically and claimable immediately after resolution.

## What Makes TrendZap Different

### 🔮 Decentralized Oracle — Not an Admin
The outcome of every TrendZap market is determined by **Chainlink's decentralized oracle network**, which fetches data directly from official social media APIs. No team member, no admin key, no governance vote can change a resolved outcome. The result is verifiable by anyone with a block explorer.

### ⚡ Built for Speed on Avalanche
Avalanche's sub-second finality means bet confirmation feels instant — not like waiting for Ethereum to catch up. Gas fees low enough for micro-bets starting at a fraction of a dollar.

### 🎯 LMSR Continuous Pricing
TrendZap uses the Logarithmic Market Scoring Rule (LMSR) — the same market mechanism used by Polymarket. This means natural, liquid odds from the very first bet, dynamic prices that update as new bets come in, and the ability to **sell your position before resolution** if you change your mind.

### 🛡️ Non-Custodial and Audited
Your AVAX is held in audited smart contracts, not by TrendZap. Payouts execute automatically on resolution. The team cannot access or move user funds.

### 🎨 No Wallet Needed to Start
Sign in with your X (Twitter) account or email via Privy. An embedded non-custodial wallet is created for you automatically — no seed phrase, no MetaMask setup.

## Who TrendZap Is For

| User | Why TrendZap |
|------|-------------|
| **Social Media Enthusiasts** | Turn strong opinions into verifiable predictions |
| **Content Creators** | Create markets about your own content and earn a 0.5% royalty on all volume |
| **Crypto Traders** | Access a new, uncorrelated asset class tied to social media performance |
| **Marketers & Analysts** | Hedge campaign predictions or validate trend hypotheses |

## Ready to Start?

- [How It Works](/docs/introduction/how-it-works) — The mechanics in depth
- [Quick Start](/docs/getting-started/quick-start) — Be in a market in under 5 minutes
- [Why Avalanche](/docs/introduction/why-this-chain) — Our chain decision explained
