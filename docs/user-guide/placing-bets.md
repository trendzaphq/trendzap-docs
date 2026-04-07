---
sidebar_position: 1
title: Placing Bets
description: How to bet USDC on OVER or UNDER in TrendZap prediction markets.
---

# Placing Bets

Every TrendZap market is a two-sided prediction: the metric either exceeds the threshold or it doesn't. You pick a side, stake USDC, and the smart contract handles the rest.

---

## How positions work

TrendZap uses **LMSR (Logarithmic Market Scoring Rule)** pricing — a mathematical model that converts the pool of bets into shares with continuously updating prices.

- Every USDC bet buys a number of shares at the current LMSR price
- As more bets come in, prices adjust to reflect the new implied probability
- Earlier bets on the winning side get better prices
- You can always buy shares — there's always a price (no order matching required)

---

## Placing a bet — step by step

**1. Find an active market**

The home feed shows all live markets. Filter by platform (X, YouTube) or sort by pool size, time remaining, or newest.

**2. Open the market**

Click any market card. You'll see the live post embed with current stats, the OVER/UNDER odds breakdown, and a countdown to close.

**3. Tap Zap It!**

This opens the betting panel.

**4. Choose OVER or UNDER**

- **OVER** — you believe the metric will reach or exceed the threshold by the deadline
- **UNDER** — you believe it will fall short

**5. Enter your USDC amount**

Type the amount you want to stake. The modal shows:

- **Shares you'll receive** — based on current LMSR price
- **Implied payout** — estimated USDC if you win at current pool state
- **Implied probability** — what the market currently prices your side at

**6. Confirm**

Review the bet confirm modal, then tap **Confirm** and approve the transaction in your wallet.

Gas on Avalanche is under $0.01.

---

## Understanding your payout

Your payout at resolution is based on your share of the total pool:

```
Total Pool = all USDC in (OVER + UNDER)
Creator Fee = 3% of Total Pool
Winners Pool = Total Pool − Creator Fee
Your Payout = (Your Shares ÷ Total Winning Shares) × Winners Pool
```

**Key point:** your payout changes as more bets come in. If many people bet the same side as you, your share of the winners' pool decreases. Final payout is determined at resolution, not at bet time.

See [Understanding Odds](/docs/user-guide/understanding-odds) for a full worked example.

---

## Viewing your positions

After betting, find all your positions in the **Profile** tab:

| Field | Description |
|-------|-------------|
| Market | Post + platform + threshold |
| Side | OVER or UNDER |
| Stake | Your USDC committed |
| Status | Active / Resolved / Claimed |

You can also tap any market card from the profile to open the full market view.

---

## What happens at resolution

When the market closes:

1. The oracle fetches the final metric from the platform's official API
2. The outcome (OVER or UNDER) is written on-chain
3. Winners see a **Claim Winnings** button appear
4. Losers' USDC is redistributed to the winning side — no transaction required from losers

You do not need to be online at resolution time. The oracle and contract handle everything.

---

## Cancelled markets

If the oracle cannot deliver a verified result (deleted post, API failure, private account), the market is dissolved. All participants can claim their original USDC back. No funds are lost due to oracle failure.

---

## Next steps

- [Understanding Odds](/docs/user-guide/understanding-odds) — LMSR pricing and implied probability
- [Claiming Winnings](/docs/user-guide/claiming-winnings) — how to receive your payout
- [Creating Markets](/docs/user-guide/creating-markets) — create your own market
