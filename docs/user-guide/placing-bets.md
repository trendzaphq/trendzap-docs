---
sidebar_position: 1
title: Placing Bets
description: How to stake USDC on OVER or UNDER positions in TrendZap prediction markets.
---

# Placing Bets

Every TrendZap market is a two-sided prediction: the metric either exceeds the threshold or it doesn't. You pick a side, stake USDC, and the smart contract handles everything else.

---

## How Positions Work

TrendZap uses a **parimutuel pool** model — the same mechanism used in horse racing and some prediction markets. There is no counterparty matching. Instead:

- All OVER bets go into the OVER pool
- All UNDER bets go into the UNDER pool
- At resolution, the losing pool is distributed to winners proportionally

Your payout depends on how much you staked relative to the total winning pool — not a fixed odds ratio set at the time of your bet.

---

## Placing a Bet — Step by Step

**1. Find an active market**

The home feed shows all live markets, sorted by pool size, time remaining, or recency. Use the filter bar to narrow by platform (X/Twitter, TikTok, Instagram, YouTube) or metric type.

**2. Open the market**

Click a market card to open the full view. Check the live metric update — the post's current stats are refreshed periodically so you can see where things stand.

**3. Choose OVER or UNDER**

OVER means you believe the metric will reach or exceed the threshold by the deadline.
UNDER means you believe it will fall short.

**4. Enter your stake**

Type the USDC amount you want to commit. The interface will show:

- Your estimated payout at the current pool split
- Your effective implied probability
- The total pool size including your bet

**5. Approve and confirm**

Click **Place Bet**. Your wallet will request two transactions if this is your first bet in USDC on this contract:

- **Approval** — Allow the contract to spend your USDC (one-time per contract, not per market)
- **Bet** — The actual staking transaction

Both cost under $0.10 in gas on Arbitrum.

---

## Understanding Your Payout

Your payout at resolution:

```
Winners Pool = Total Pool × 0.98   (2% platform fee)
Your Payout  = (Your Stake ÷ Total Winning Stakes) × Winners Pool
```

**Key point:** your share of the winners' pool changes as more people bet. If your side gets heavily favoured between now and close, your payout ratio decreases even if you win. This is the parimutuel dynamic.

See [Understanding Odds](/docs/user-guide/understanding-odds) for a full breakdown with examples.

---

## Position Limits

To protect market integrity and prevent single-wallet manipulation:

- There is a **maximum bet per user per market** (varies by market size)
- There is a **maximum total pool size** per market (hardcoded in the contract)

If you hit the limit, the UI will surface an error before you confirm the transaction.

---

## Viewing Your Positions

After betting, find all your open positions under the **Portfolio** tab. Each entry shows:

| Field | Description |
|-------|-------------|
| Market | Post + platform + threshold |
| Side | OVER or UNDER |
| Stake | Your USDC committed |
| Est. Payout | Estimated winnings at current pool split |
| Status | Active / Closed / Resolved / Claimed |

---

## What Happens at Resolution

When the market closes:

1. The oracle fetches the final metric from the platform API
2. The outcome (OVER or UNDER) is determined on-chain
3. Winners see a **Claim** button appear
4. Losers' stakes are redistributed automatically — no transaction needed

You do not need to be online at resolution time. The contract does the work.

---

## Cancelled and Disputed Markets

If the oracle cannot fetch a valid result within the resolution window, the market enters a dispute state. All participants can withdraw their original stake — no one loses funds due to an oracle failure.

See [Oracle System](/docs/architecture/oracle-system) for the full resolution fallback logic.

---

## Next Steps

- [Understanding Odds](/docs/user-guide/understanding-odds) — Implied probability and parimutuel mechanics
- [Claiming Winnings](/docs/user-guide/claiming-winnings) — How to receive your payout
- [Creating Markets](/docs/user-guide/creating-markets) — Create your own prediction market
