---
sidebar_position: 2
title: How It Works
description: Understanding TrendZap's prediction market mechanics
---

# How TrendZap Works

TrendZap is built on simple mechanics that anyone can understand.

## The Basics

### 1. Market Creation

Anyone can create a market by specifying:
- **Post URL** - The social media post to track
- **Platform** - X/Twitter, TikTok, Instagram, or YouTube
- **Metric** - Likes, retweets, views, comments
- **Threshold** - The number to bet against
- **End Time** - When betting closes

### 2. Placing Bets

Once a market is active:
- **OVER** - You believe the metric will exceed the threshold
- **UNDER** - You believe the metric will stay below the threshold

Your bet goes into a pool with other bettors.

### 3. Market Resolution

When the end time arrives:
1. Our oracle fetches the final metric value
2. The outcome is determined (OVER or UNDER)
3. Winners can claim their share of the pool

## The Math

### Pool Distribution

```
Total Pool = All OVER bets + All UNDER bets
Platform Fee = 2% of Total Pool
Winners Pool = Total Pool - Platform Fee
Your Payout = (Your Bet / Total Winning Bets) × Winners Pool
```

### Example

| Side | Total Bets |
|------|-----------|
| OVER | 1000 USDC |
| UNDER | 500 USDC |

**Total Pool:** 1500 USDC  
**Platform Fee:** 30 USDC (2%)  
**Winners Pool:** 1470 USDC

If OVER wins and you bet 100 USDC on OVER:
```
Your Payout = (100 / 1000) × 1470 = 147 USDC
Your Profit = 147 - 100 = 47 USDC
```

### Odds Calculation

The implied probability is based on the betting ratio:

```
OVER Probability = OVER Stakes / Total Stakes
UNDER Probability = UNDER Stakes / Total Stakes
```

Using our example:
- OVER: 1000 / 1500 = 66.7%
- UNDER: 500 / 1500 = 33.3%

## The Oracle

Our oracle system ensures market integrity:

1. **Data Collection** - Fetches metrics from official APIs
2. **Validation** - Cross-references multiple sources
3. **Bot Detection** - Filters artificial engagement
4. **Chainlink Integration** - Delivers data on-chain

## Timeline of a Market

```
CREATE → PENDING → ACTIVE → CLOSED → RESOLVED
  │         │         │         │         │
  │         │         │         │         └── Winners claim payouts
  │         │         │         └── Betting stops, await oracle
  │         │         └── Users place bets
  │         └── Waiting for start time
  └── Market created with parameters
```

## Risk Controls

TrendZap has multiple safety mechanisms:

| Control | Description |
|---------|-------------|
| **Position Limits** | Max bet size per user |
| **Market Limits** | Max total exposure per market |
| **Bot Detection** | Filter artificial metrics |
| **Anomaly Alerts** | Flag suspicious activity |

## Next Steps

- [Why Arbitrum?](/docs/introduction/why-arbitrum) - Our chain choice
- [Quick Start](/docs/getting-started/quick-start) - Get started now
