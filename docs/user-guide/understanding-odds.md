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

Total gross stake: **1000 USDC**

You bet **100 USDC on OVER** now.

Assume trade fee is 2% and this is the current state:

```
Net added from your bet = 100 × 0.98 = 98 USDC
Your share of winners   = your winning shares ÷ total winning shares
Estimated payout now    = your share × current net payout pool
```

### If more OVER bets come in before close

Suppose 300 more USDC flows into OVER:

```
OVER winning-share supply increases
Your share fraction decreases
Your estimated payout decreases (unless total net pool growth offsets dilution)
```

Your payout decreases because others joined your side. You're still profitable — just less so.

### If UNDER bets come in instead

Suppose 300 USDC flows into UNDER instead:

```
Your winning-share fraction stays the same
Net payout pool grows from the other side's stakes
Your estimated payout increases
```

More money on the other side means a higher payout when you win. This is the incentive for early contrarian positions.

---

## Key takeaways

**Earlier bets get cheaper prices** — LMSR rewards conviction placed early.

**Contrarian bets pay more if correct** — the minority side captures more of the total pool.

**Payouts are finalized at resolution and claim time** — what the UI shows during the market is an estimate based on the current state.

**There is no edge from timing alone** — what matters is whether you're right about the outcome.

---

## Next steps

- [Placing Bets](/docs/user-guide/placing-bets) — stake USDC on a position
- [Claiming Winnings](/docs/user-guide/claiming-winnings) — receive your payout after resolution
