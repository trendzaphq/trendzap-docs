---
sidebar_position: 3
title: Your First Bet
description: A step-by-step walkthrough of placing your first TrendZap prediction.
---

# Your First Bet

This walkthrough takes you from the market list to a confirmed on-chain position.

---

## Before You Start

Make sure you have:
- Wallet connected to Arbitrum One ([Connect Wallet](/docs/getting-started/connect-wallet))
- Some ETH on Arbitrum for gas (less than $0.10 is enough)
- USDC on Arbitrum to stake

---

## 1. Find a Market

Open [trendzap.xyz](https://trendzap.xyz) and you'll see the live market feed.

Each market card shows:

- **Platform** — X/Twitter, TikTok, Instagram, or YouTube
- **Post** — The specific post being tracked, with a link to it
- **Metric** — What's being measured (likes, views, retweets, comments)
- **Threshold** — The number the metric needs to hit or miss
- **Deadline** — When the market closes
- **Pool size** — Total USDC staked by all participants
- **OVER / UNDER split** — Current distribution of positions

Browse until you find something you have a view on.

:::tip How to pick a market
Look at the current metric in real time. If a tweet already has 400K likes with 12 hours to go and the threshold is 500K — do you think it'll get there? That's the question.
:::

---

## 2. Open the Market

Click the market card. The detail page shows:

- A live link to the original post
- Real-time metric updates (refreshed every few minutes)
- The full odds breakdown — current implied probability for OVER and UNDER
- Pool history — how the pool has grown over time
- Time remaining, displayed as a live countdown

---

## 3. Choose Your Side

You have two choices:

**OVER** — You believe the metric will exceed the threshold before the deadline. If it does, you win.

**UNDER** — You believe the metric will fall short of the threshold before the deadline. If it stays below, you win.

There is no "maybe." The market resolves to exactly one outcome.

---

## 4. Enter Your Stake

Click **OVER** or **UNDER** to open the betting panel.

Enter the amount of USDC you want to stake. As you type, you'll see:

- **Estimated payout** — How much you'd receive if you win (based on current pool split)
- **Estimated odds** — Your implied probability given the current stakes
- **Current pool** — Updated to show your bet's effect on the odds

There is no maximum stake shown in the UI, but the contract enforces a per-market position cap to prevent manipulation.

:::caution
Your payout is calculated at the time of resolution, not at the time of your bet. If more people join your side before the market closes, your share of the winners' pool decreases. This is how parimutuel markets work.
:::

---

## 5. Confirm the Transaction

Click **Place Bet**. Your wallet will pop up with a transaction request.

Review:
- **To:** The TrendZap market contract address (verify against [Smart Contracts](/docs/architecture/smart-contracts))
- **Amount:** The USDC approval + transfer amount
- **Gas:** Should be under $0.10 on Arbitrum

Click **Confirm** in your wallet. The transaction broadcasts to Arbitrum One.

Within seconds, your position is confirmed on-chain. You'll see it appear under the **Your Position** section of the market page.

---

## 6. Track Your Position

In your **Portfolio** tab, you can see all open and resolved markets where you hold a position:

- Markets you've bet on
- Your stake amount per side
- Current implied probability
- Estimated payout if you win today
- Status: Active, Closed (awaiting resolution), or Resolved

---

## 7. Wait for Resolution

When the deadline arrives, the oracle fetches the final metric from the platform's API. This typically completes within a few minutes of market close.

You'll see the market status change from **Active** → **Closed** → **Resolved**.

The resolution result (final metric value and outcome) is recorded on-chain and publicly verifiable on Arbiscan.

---

## 8. Claim Your Winnings

If your side won, a green **Claim Winnings** button appears on the market card.

1. Click **Claim Winnings**
2. Confirm the transaction in your wallet
3. USDC arrives in your wallet immediately

There is no deadline to claim — your winnings sit in the contract until you call `claim()`.

If your side lost, there is nothing to claim. Your staked USDC was distributed to the winners.

---

## What Just Happened?

You placed a prediction on a real social media metric. The outcome was determined by a tamper-proof oracle reading an official API. The payout was calculated and distributed automatically by a smart contract. No platform held your funds. No one made a judgment call.

That's TrendZap.

---

## Next Steps

- [Understanding Odds](/docs/user-guide/understanding-odds) — How parimutuel probabilities work
- [Creating Markets](/docs/user-guide/creating-markets) — Start your own prediction market
- [SDK Reference](/docs/developers/sdk-reference) — Integrate TrendZap into your own app
