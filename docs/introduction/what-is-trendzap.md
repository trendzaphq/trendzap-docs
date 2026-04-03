---
sidebar_position: 1
title: What is TrendZap?
description: TrendZap is the first decentralized prediction market for social media virality — built on Arbitrum.
---

# What is TrendZap?

TrendZap is the first decentralized prediction market where anyone can bet on whether a social media post will go viral — verified on-chain, settled in USDC, powered by a tamper-proof oracle.

The protocol is live on **Arbitrum**, backed by the Arbitrum ecosystem, and validated at some of the most competitive hackathons in web3. It is open source, non-custodial, and built in public.

---

## The Problem

Social media engagement drives enormous real-world value — advertising spend, creator deals, brand equity, and cultural relevance. Yet there is no efficient market for it.

- A creator posts something. Will it break out or flatline? Pure uncertainty.
- A brand runs a campaign. The metrics move. No one holds a position on the outcome.
- A trader watches a post go from 10K to 10M views. No instrument to trade that.
- Millions of people have strong intuitions about what goes viral. No way to express them.

Engagement is the most-watched, least-financialized metric on the internet.

---

## The Solution

TrendZap creates prediction markets around social media posts:

1. **Any public post** — X/Twitter, TikTok, Instagram, YouTube
2. **A clear threshold** — Will it hit 500K likes? 1M views? 50K retweets?
3. **Two sides** — Bet **OVER** (you think it reaches the threshold) or **UNDER** (you think it falls short)
4. **Automatic resolution** — When the window closes, our oracle fetches the real metric, the outcome is settled on-chain, and winners claim their share

No intermediary holds funds. No manual resolution. The contract does exactly what it says.

---

## A Concrete Example

> **Market:** Will this OpenAI tweet get more than 500,000 likes in 24 hours?

| Side | Position |
|------|----------|
| OVER | You believe the tweet goes viral |
| UNDER | You believe it doesn't reach 500K |

Both sides stake USDC into a shared pool. When the window closes, the oracle reads the actual like count. Winners split the losing side's pool, proportionally to their stake.

---

## Key Properties

**Simple mechanics.** OVER or UNDER. No complex derivatives, no funding rates, no liquidations. You know your risk the moment you bet.

**On-chain settlement.** Your position is a transaction. Resolution is a contract call. No one can change the outcome.

**USDC denominated.** Bet in stablecoins. Win in stablecoins. No token to acquire, no price exposure you didn't sign up for.

**Non-custodial.** Your funds stay in the contract until you claim. TrendZap never holds your assets.

**Open source.** Every contract, every line of oracle logic, every SDK — public on GitHub under MIT license.

---

## Who Is TrendZap For?

**Social media analysts** who track engagement professionally and want to put conviction behind their read.

**Content creators** who want to hedge uncertainty around their own releases — or create markets on posts in their niche.

**Crypto traders** looking for a new, uncorrelated prediction surface tied to real-world cultural events.

**Developers** who want to embed TrendZap markets into their own products using the TypeScript SDK or interact directly with the contracts.

---

## Where to Go Next

- [How It Works](/docs/introduction/how-it-works) — The full mechanics: oracle, parimutuel pool, resolution
- [Quick Start](/docs/getting-started/quick-start) — Up and running in under five minutes
- [Earned Trust](/docs/protocol/trust) — What security and transparency mean to us
