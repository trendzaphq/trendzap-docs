---
sidebar_position: 2
title: How It Works
description: The mechanics of TrendZap prediction markets — parimutuel pools, oracle resolution, and on-chain settlement.
---

# How It Works

TrendZap prediction markets are simple by design. Every market has a post, a metric, a threshold, and a time window. You pick a side. The oracle decides. Winners claim.

---

## Market Lifecycle

```
CREATE → ACTIVE → CLOSED → RESOLVED
  │         │        │          │
  │         │        │          └── Winners claim USDC from pool
  │         │        └── Betting stops; oracle fetches final metric
  │         └── Users place OVER / UNDER positions
  └── Market created with post URL, threshold, end time
```

Each stage is enforced by the smart contract. No one can extend the window after close or alter the resolution result.

---

## Step 1 — Market Creation

Any wallet can create a market by specifying:

| Parameter | Description |
|-----------|-------------|
| `postUrl` | The public social media post to track |
| `platform` | X/Twitter, TikTok, Instagram, or YouTube |
| `metric` | Likes, views, retweets, or comments |
| `threshold` | The target number (e.g. 500,000) |
| `endTime` | When the betting window closes |

A creation fee prevents spam. The creator can optionally seed one side of the pool.

---

## Step 2 — Placing Positions

Once a market is active, anyone can take a position:

- **OVER** — you believe the metric will exceed the threshold by the end time
- **UNDER** — you believe it will fall short

Your USDC is transferred to the contract. You can see the live pool composition and implied probability at any time.

:::tip Implied Probability
The split of OVER vs UNDER stakes reflects the crowd's view. A 70/30 split means the market implies 70% probability of OVER.
:::

---

## Step 3 — Oracle Resolution

When the end time arrives, our oracle pipeline:

1. Fetches the metric from the platform's official API
2. Cross-references a second data source for consistency
3. Applies bot-detection filters to strip artificial engagement
4. Delivers the verified value on-chain via Chainlink

Once the oracle posts the final value, the contract determines the outcome — either OVER or UNDER — and the market is permanently resolved.

---

## Step 4 — Claiming Winnings

Winners call `claim()` on the market contract to receive their payout.

### The Math

```
Total Pool  = OVER stakes + UNDER stakes
Platform Fee = 2% of Total Pool
Winners Pool = Total Pool − Platform Fee
Your Payout  = (Your Stake ÷ Total Winning Stakes) × Winners Pool
```

### Example

| Side  | Total Staked |
|-------|-------------|
| OVER  | 10,000 USDC |
| UNDER | 5,000 USDC  |

- **Total Pool:** 15,000 USDC
- **Platform Fee (2%):** 300 USDC
- **Winners Pool:** 14,700 USDC

If OVER wins and you staked 1,000 USDC on OVER:

```
Your Payout = (1,000 ÷ 10,000) × 14,700 = 1,470 USDC
Your Profit = 470 USDC
```

---

## The Oracle in Detail

The oracle is the most critical component of any prediction market. TrendZap uses a multi-step verification pipeline:

1. **Official APIs** — Data pulled directly from platform-provided endpoints, not scraping
2. **Secondary source** — Cross-referenced with a second independent data provider
3. **Bot filter** — Anomaly detection flags synthetic engagement spikes
4. **Chainlink delivery** — Final value posted on-chain by a Chainlink node; fully auditable
5. **Dispute window** — A short window allows community flagging of anomalous results

See [Oracle System](/docs/architecture/oracle-system) for the full technical breakdown.

---

## Risk Controls

TrendZap has protocol-level safeguards to protect users:

| Control | What It Does |
|---------|-------------|
| Position limits | Caps maximum stake per user per market |
| Market exposure cap | Limits total pool size to prevent oracle manipulation incentive |
| Bot detection | Oracle filters artificial metric inflation |
| Anomaly halt | Markets can be paused if oracle reads deviate unexpectedly |

---

## What Happens If the Oracle Fails?

If the oracle cannot deliver a result within the resolution window, the market enters a dispute state. Participants can withdraw their original stake. Funds are never locked permanently.

---

## Next Steps

- [Why Arbitrum?](/docs/introduction/why-this-chain) — Why we built on Arbitrum
- [Smart Contract Architecture](/docs/architecture/smart-contracts) — Contract interfaces and addresses
- [Oracle System](/docs/architecture/oracle-system) — Deep dive into data verification
