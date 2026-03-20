---
sidebar_position: 2
title: How It Works
description: A deep dive into TrendZap's prediction market mechanics — from market creation to settlement.
last_update:
  date: 2026-03-20
  author: TrendZap Team
---

# How TrendZap Works

TrendZap combines a decentralized prediction market, a social media oracle, and LMSR-based continuous pricing into a single, non-custodial protocol. Here's how every piece fits together.

## The Full Lifecycle of a Market

```
 CREATE ──► ACTIVE ──► CLOSED ──► RESOLVING ──► SETTLED
   │           │           │           │              │
 Post URL    Bets        Betting     Oracle         Claims
 Threshold   open        closed      fetches        open
 Deadline    LMSR        deadline    metrics
             pricing     reached     on-chain
```

---

## 1. Market Creation

Any user can create a market by providing:

| Parameter | Description | Example |
|-----------|-------------|---------|
| **Post URL** | Any public post on a supported platform | `https://x.com/user/status/...` |
| **Platform** | X/Twitter, YouTube, TikTok, or Instagram | `YouTube` |
| **Metric** | The engagement type to track | `Views` |
| **Threshold** | The number to bet against | `5,000,000` |
| **Deadline** | When betting closes and resolution begins | `48 hours from now` |

The market creator seeds initial liquidity and pays a small creation fee. In return, they earn a **0.5% royalty** on all volume their market generates — paid out automatically at resolution.

---

## 2. The Betting Mechanism — LMSR Pricing

TrendZap uses the **Logarithmic Market Scoring Rule (LMSR)**, a continuous-time market-making system that provides instant liquidity and fair prices from the very first bet.

### What This Means for You

Unlike a simple parimutuel pool where odds only reflect the final distribution:

- Prices update **in real time** as each bet is placed
- Early bettors are rewarded for providing liquidity (lower prices, more shares per AVAX)
- You can **sell your position before resolution** if you change your mind
- Large bets have bounded price impact — no single whale can dominate odds

### How Shares Work

When you bet on TrendZap, you receive **shares**, not a fixed odds payout:

```
You pay:   0.5 AVAX on OVER
You get:   X OVER shares (calculated by LMSR formula)
At resolution (if OVER wins):
  Your payout = (Your OVER shares / Total OVER shares) × Prize pool
```

The lower the current OVER probability, the more shares you receive per AVAX — higher risk, higher potential reward.

### Current Prices

You can always see the current implied probabilities on any market:

- **OVER: 63%** → Market consensus says the post will exceed the threshold
- **UNDER: 37%** → Market consensus says it won't

These probabilities shift dynamically as bets come in.

---

## 3. During the Betting Window

While a market is active:

- Any user can bet OVER or UNDER at any time
- Prices and probabilities update automatically with every trade
- You can exit your position early by selling shares back to the market (a small fee applies)
- The market creator can monitor volume and earned royalties in real time

Position size limits apply to prevent single-user domination of any market.

---

## 4. Market Close

When the deadline arrives, the market transitions to **CLOSED** status:

- No new bets can be placed
- Existing positions are locked
- The SocialOracle contract triggers a Chainlink data request

---

## 5. Oracle Resolution — How We Get the Data

This is the most important step in the system. TrendZap's `SocialOracle` contract sends a verified request to **Chainlink's Decentralized Oracle Network (DON)**:

```
SocialOracle.requestMetric(marketId, postUrl, platform, metricType)
    ↓
Chainlink DON executes the job
    ↓
Our oracle adapter fetches data from official platform API
    ↓
Multiple Chainlink nodes aggregate and sign the result
    ↓
SocialOracle.fulfill(requestId, metricValue) is called on-chain
    ↓
ViralityMarket.resolveMarket(marketId, metricValue) executes
```

The resolved metric value is permanently stored on-chain. No admin override is possible. Anyone can verify the result by looking at the transaction on Snowtrace.

### Supported Platforms and Metrics

| Platform | Likes | Views | Retweets / Shares | Comments |
|----------|-------|-------|-------------------|----------|
| X (Twitter) | ✅ | ✅ | ✅ | ✅ |
| YouTube | ✅ | ✅ | — | ✅ |
| TikTok | ✅ | ✅ | ✅ | ✅ |
| Instagram | ✅ | ✅ | — | ✅ |

---

## 6. Settlement and Payouts

Once the oracle delivers the result:

- **If OVER wins:** All OVER shareholders split the prize pool proportionally to their share count
- **If UNDER wins:** All UNDER shareholders split the prize pool proportionally
- **Platform fee:** 2% of the total pool is sent to the TrendZap treasury at resolution
- **Creator royalty:** 0.5% is sent to the market creator automatically

### Payout Calculation

```
Total Pool     = All AVAX deposited into the market
Platform Fee   = 2% of Total Pool
Creator Fee    = 0.5% of Total Pool
Prize Pool     = Total Pool − Platform Fee − Creator Fee

Your Payout    = (Your Winning Shares ÷ Total Winning Shares) × Prize Pool
```

Winners claim their payout by calling `claimWinnings()` — or clicking Claim in the app. Funds are transferred directly to your wallet. There is no approval step, no withdrawal queue, and no delay.

---

## 7. What Happens if a Market is Cancelled?

If a market is cancelled (for example, because the post was deleted before the deadline), all betters receive a full refund of their original stake via `claimRefund()`. No fees are charged on cancelled markets.

---

## Risk Controls

TrendZap has multiple protection layers to maintain market integrity:

| Control | How It Works |
|---------|-------------|
| **Position Limits** | Maximum bet size per user per market (prevents single-whale domination) |
| **Bot Detection** | Oracle adapter cross-checks engagement patterns against known artificial inflation signals |
| **LMSR Bounds** | Market maker's maximum loss is bounded — continuous pricing prevents catastrophic manipulation |
| **Pausable Contracts** | Admin role can pause contracts in an emergency (e.g., oracle outage) without touching user funds |
| **Reentrancy Guards** | All fund-transfer functions use OpenZeppelin's `ReentrancyGuard` |

---

## Next Steps

- [Why Avalanche](/docs/introduction/why-this-chain) — Why we chose this chain
- [Quick Start](/docs/getting-started/quick-start) — Your first bet in 5 minutes
- [Smart Contracts](/docs/developers/smart-contracts) — Read the source code
