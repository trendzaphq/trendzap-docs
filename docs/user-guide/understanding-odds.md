---
sidebar_position: 3
title: Understanding Odds
description: How parimutuel pools work in TrendZap — implied probability, payouts, and what shifts odds.
---

# Understanding Odds

TrendZap uses a parimutuel pool model. There are no fixed odds, no market makers, and no order books. The implied probability of each side is determined entirely by how much USDC has been staked on each.

---

## The Basic Mechanic

Every market has two pools: OVER and UNDER.

When you stake USDC on OVER, your money goes into the OVER pool. If OVER wins, you receive your proportional share of the entire pool (minus the 2% platform fee). If UNDER wins, you receive nothing.

```
Total Pool   = OVER pool + UNDER pool
Winners Pool = Total Pool × 0.98
Your Payout  = (Your Stake ÷ Total Winning Pool) × Winners Pool
```

---

## Implied Probability

The implied probability of each outcome is simply the fraction of total stake on that side:

```
P(OVER)  = OVER pool  ÷ Total Pool
P(UNDER) = UNDER pool ÷ Total Pool
```

**Example:** If 7,000 USDC is on OVER and 3,000 USDC is on UNDER:

- Total Pool: 10,000 USDC
- P(OVER) = 70%
- P(UNDER) = 30%

This means the crowd collectively implies a 70% chance the metric hits the threshold.

---

## How Odds Change Over Time

Odds move as new bets come in. If a large amount lands on UNDER, the implied probability of UNDER rises and OVER falls.

This is different from traditional fixed-odds betting where your payout is locked in at bet time. In TrendZap:

- Your **stake** is fixed when you bet
- Your **payout ratio** fluctuates until market close
- Final payout is calculated at resolution using the closing pool split

This means you can place an early bet at favourable odds, but latecomers can dilute your share if they pile onto your side.

---

## Worked Example

### Setup

| Side  | Total Staked |
|-------|-------------|
| OVER  | 6,000 USDC  |
| UNDER | 4,000 USDC  |

You bet **1,000 USDC on OVER** when this is the pool state.

At this moment, your estimated payout if OVER wins:

```
Winners Pool = 10,000 × 0.98 = 9,800 USDC
Your share   = 1,000 ÷ 6,000 = 16.67%
Payout       = 9,800 × 16.67% = 1,633 USDC
Profit       = 633 USDC
```

### If More OVER Bets Come In

Suppose an additional 4,000 USDC flows into OVER before close:

| Side  | Total Staked |
|-------|-------------|
| OVER  | 10,000 USDC |
| UNDER | 4,000 USDC  |

Now if OVER wins:

```
Winners Pool = 14,000 × 0.98 = 13,720 USDC
Your share   = 1,000 ÷ 10,000 = 10%
Payout       = 13,720 × 10% = 1,372 USDC
Profit       = 372 USDC
```

Your payout decreased because others joined your side. You're still profitable if OVER wins — just less so.

### If UNDER Bets Come In Instead

Suppose 4,000 USDC flows into UNDER instead:

| Side  | Total Staked |
|-------|-------------|
| OVER  | 6,000 USDC  |
| UNDER | 8,000 USDC  |

Now if OVER wins:

```
Winners Pool = 14,000 × 0.98 = 13,720 USDC
Your share   = 1,000 ÷ 6,000 = 16.67%
Payout       = 13,720 × 16.67% = 2,287 USDC
Profit       = 1,287 USDC
```

More money on the other side means a higher payout when you win. This is the incentive for early contrarian positions.

---

## Key Takeaways

**Early bets on the winning side lock in more favourable pool conditions** — but the pool can shift before close.

**Contrarian bets are rewarded more if correct** — betting on the minority side means a larger share of the losing pool if you win.

**The final payout is always calculated at resolution** — what you see in the UI during the market is an estimate based on the current pool state.

**There is no edge from timing alone** — what matters is whether you're right about the outcome.

---

## Next Steps

- [Placing Bets](/docs/user-guide/placing-bets) — Stake USDC on a position
- [Claiming Winnings](/docs/user-guide/claiming-winnings) — Receive your payout after resolution
