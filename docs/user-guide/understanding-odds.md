---
sidebar_position: 3
title: Understanding Odds
description: How LMSR pricing works in TrendZap — implied probability, share pricing, and payouts.
---

# Understanding Odds

TrendZap uses **LMSR (Logarithmic Market Scoring Rule)** pricing. There are no fixed odds, no market makers, and no order books. Prices update continuously based on the total distribution of bets.

---

## The basic mechanic

Every time someone bets USDC on OVER or UNDER, the LMSR formula recalculates the price of shares on both sides.

- Betting OVER makes OVER shares more expensive (higher implied probability)
- Betting UNDER makes UNDER shares more expensive
- Prices always reflect the current crowd probability

When the market resolves, winners' payouts come from the entire pool — their proportional share of all USDC staked on both sides.

---

## Implied probability

The OVER % and UNDER % displayed on market cards are the current **implied probabilities** — what the aggregate of bets suggests about the likelihood of each outcome.

These numbers update live with every new bet. If OVER % is 70%, the market collectively implies a 70% chance the post hits the threshold.

---

## Earlier bets = better prices

Because LMSR prices shift with each bet, the earlier you bet on the winning side, the cheaper your shares were. Cheaper shares mean a larger proportional payout from the same pool.

This creates an incentive to bet early on uncertain markets rather than waiting until just before close.

---

## Worked example

### The setup

| Side | Total USDC staked |
|------|-----------------|
| OVER | 600 USDC |
| UNDER | 400 USDC |

Total pool: **1000 USDC**

You bet **100 USDC on OVER** now.

Estimated payout if OVER wins at this pool state:

```
Creator fee  = 3% × 1100 = 33 USDC
Winners Pool = 1100 − 33 = 1067 USDC
Your share   = 100 ÷ 700 = 14.3%
Your payout  = 1067 × 14.3% = ~152 USDC
Your profit  = ~52 USDC
```

### If more OVER bets come in before close

Suppose 300 more USDC flows into OVER:

```
OVER pool now: 1000 USDC total
Your share = 100 ÷ 1000 = 10%
Winners Pool ≈ 1370 × 0.97 ≈ 1329 USDC
Your payout = 1329 × 10% = ~133 USDC
Your profit = ~33 USDC
```

Your payout decreases because others joined your side. You're still profitable — just less so.

### If UNDER bets come in instead

Suppose 300 USDC flows into UNDER instead:

```
Your share = 100 ÷ 700 = 14.3% (unchanged)
Total pool = 1400 USDC
Winners Pool ≈ 1400 × 0.97 ≈ 1358 USDC
Your payout = 1358 × 14.3% = ~194 USDC
Your profit = ~94 USDC
```

More money on the other side means a higher payout when you win. This is the incentive for early contrarian positions.

---

## Key takeaways

**Earlier bets get cheaper prices** — LMSR rewards conviction placed early.

**Contrarian bets pay more if correct** — the minority side captures more of the total pool.

**Payouts are always calculated at resolution** — what the UI shows during the market is an estimate based on the current pool state.

**There is no edge from timing alone** — what matters is whether you're right about the outcome.

---

## Next steps

- [Placing Bets](/docs/user-guide/placing-bets) — stake USDC on a position
- [Claiming Winnings](/docs/user-guide/claiming-winnings) — receive your payout after resolution
