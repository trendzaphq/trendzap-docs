---
sidebar_position: 3
title: Your First Bet
description: A step-by-step walkthrough of placing your first TrendZap prediction.
---

# Your First Bet

This walkthrough takes you from the market feed to a confirmed on-chain position.

---

## Before you start

Make sure you have:
- Wallet connected to Avalanche C-Chain ([Connect Wallet](/docs/getting-started/connect-wallet))
- Some AVAX in your wallet (gas is under $0.01; start with at least 0.1 AVAX to bet)

---

## 1. Find a market

Open [app.trendzap.xyz](https://app.trendzap.xyz) and you'll see the live market feed.

Each market card shows:

- **Platform** — X (Twitter) or YouTube
- **Post** — The specific post being tracked (with a live embed you can interact with)
- **Metric** — What's being measured (views, likes, retweets, etc.)
- **Threshold** — The number the metric needs to hit or miss
- **Deadline** — When the market closes
- **Pool** — Total AVAX staked
- **OVER / UNDER** — Current implied probability on each side

Browse until you find something you have a view on.

:::tip How to pick a market
Open the market detail to see the live post embed with real-time stats. If a tweet is at 200K likes with 12 hours left and the threshold is 500K — do you think it'll get there? That's the question.
:::

---

## 2. Open the market

Click the market card. The detail view shows:

- A live embed of the original post (real tweet or YouTube video) with current stats
- Full odds — current OVER % and UNDER % implied probability
- Time remaining countdown
- Your wallet's current position (if any)

---

## 3. Choose your side

Click **Zap It!** to open the betting panel.

**OVER** — you believe the metric will exceed the threshold before the deadline.

**UNDER** — you believe the metric will stay below it.

There is no "maybe." The market resolves to exactly one outcome.

---

## 4. Enter your stake

Type the AVAX amount you want to bet. The modal shows:

- **Shares** — how many market shares you'll receive
- **Implied payout** — estimated AVAX if you win at current pool state
- **Implied probability** — what the market currently prices your side at

---

## 5. Confirm the transaction

Click **Confirm**. Your wallet pops up with the transaction request.

Review:
- **To:** The TrendZap market contract address
- **Value:** The AVAX amount
- **Gas:** Under $0.01 on Avalanche

Click **Confirm** in your wallet. The transaction broadcasts to Avalanche C-Chain.

Within seconds, your position is confirmed on-chain.

---

## 6. Track your position

In your **Profile** tab, you can see all markets you've bet on — open and resolved:

- Your side (OVER / UNDER)
- Your AVAX staked
- Current implied probability
- Status: Active, Resolved, or Claimed

---

## 7. Wait for resolution

When the deadline arrives, the oracle fetches the final metric from the platform's API. This typically completes within a few minutes of market close.

The market status changes from **Active** → **Resolved**.

The result and resolved metric value are written on-chain and publicly verifiable on [Snowtrace](https://snowtrace.io).

---

## 8. Claim your winnings

If your side won, a **Claim Winnings** button appears on the market.

1. Click **Claim Winnings**
2. Confirm the transaction in your wallet
3. AVAX arrives in your wallet immediately

There is no deadline to claim — your winnings sit in the contract until you call claim.

If your side lost, there is nothing to claim. Your AVAX was redistributed to the winning side as part of the LMSR pool.

---

## Next steps

- [Understanding Odds](/docs/user-guide/understanding-odds) — how LMSR pricing works
- [Creating Markets](/docs/user-guide/creating-markets) — start your own prediction market
