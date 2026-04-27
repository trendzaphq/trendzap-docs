---
sidebar_position: 2
title: How It Works
description: LMSR pricing, oracle resolution, fees, and the full market lifecycle.
---

# How It Works

This page covers the full lifecycle of a TrendZap market — from creation to resolution to claiming winnings.

---

## 1. Market creation

Any connected wallet can create a market. You provide:

- **Post URL** — a public X (Twitter) post or YouTube video
- **Metric** — what to track (views, likes, retweets, comments, shares)
- **Threshold** — the raw number the metric must exceed (e.g. `500000` views)
- **Deadline** — the date/time when the oracle will check the metric
- **Seed bet** — your initial USDC contribution, which sets the starting price

The market is deployed via the **ViralityMarket Factory** contract on Avalanche C-Chain. Once deployed, it is immediately open for betting.

---

## 2. Pricing — LMSR

TrendZap uses **Logarithmic Market Scoring Rule (LMSR)** pricing — the same model used by professional prediction markets.

### What LMSR means for you

- Prices reflect real probability. If the crowd leans OVER, the OVER price rises toward 1 USDC per share.
- **Earlier bettors get better prices.** The market price moves with every trade.
- You always know exactly what you'll pay and how many shares you'll receive before confirming.
- Inherent liquidity — you can always buy shares at the current LMSR price.

### Reading the odds

The app shows **OVER %** and **UNDER %** on every market card. These are the current implied probabilities derived from LMSR pricing. They update in real time as bets are placed.

> **Example:** OVER 67% means the market currently prices a 67% chance the post will exceed the threshold. If you agree, buying OVER is cheap. If you think it's overpriced, buy UNDER.

---

## 3. Placing a bet

When you tap **Zap It!** on a market, a confirmation modal shows:

- How many shares you're buying
- The total USDC cost
- Your implied payout if you win
- Current market probability

Your USDC goes directly into the smart contract liquidity pool. The transaction settles on Avalanche in under 2 seconds.

---

## 4. Oracle resolution

When the market deadline passes, the **TrendZap Oracle + keeper pipeline** resolves the market on-chain:

1. Fetches the actual metric value for the post at resolution time via official platform APIs
2. Compares it to the threshold
3. Writes the outcome (`OVER` or `UNDER`) to the smart contract
4. Locks the market — no more bets can be placed

This is automated by a background worker/cron flow. If the oracle cannot retrieve a valid metric, the market is skipped or disputed until retried/fallback handling completes.

All resolution data is publicly verifiable on [Snowtrace](https://snowtrace.io).

---

## 5. Payouts — where funds go

All bets — both OVER and UNDER — go into a shared USDC pool held by the smart contract. When the market resolves:

| Party | What they receive |
|-------|------------------|
| **Winners** | Proportional share of the net payout pool based on winning shares |
| **Losers** | Nothing — their stake contributes to the winning side's pool |
| **Protocol treasury** | 1.6% effective share of gross volume (from 2% trade fees) |
| **Market creator** | 0.4% effective share of gross volume (from 2% trade fees) |

**Losers fund winners through pool economics.** Fees are collected per trade, then distributed at resolution to treasury + creator.

> **Example:** If 1000 USDC gross volume is traded, 2% total trade fees are collected over time. Those fees are split at resolution (about 16 USDC to treasury, 4 USDC to creator). Winners claim from the remaining net payout pool proportionally.

No USDC leaves the contract until a winning bettor claims it — funds are non-custodial.

---

## 6. Claiming winnings

After resolution, winners connect their wallet and click **Claim Winnings** on the market. The contract sends their USDC payout directly to their wallet. Gas on Avalanche is typically under $0.01.

Unclaimed winnings do not expire — claim at any time after resolution.

---

## 7. Dissolving a market

If a market reaches its deadline but the oracle cannot verify the metric (deleted post, API failure, private account), fallback handling can skip/dispute/manual-resolve depending on policy. This is a safety mechanism for low-confidence or unavailable data.

---

## Full flow

```
Create market → Bets open (LMSR pricing)
    ↓
Deadline passes → Oracle reads metric
    ↓
Outcome written on-chain → Market locked
    ↓
Winners claim USDC → Creator fee deducted
```
