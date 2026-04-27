---
sidebar_position: 4
title: Claiming Winnings
description: How to claim your USDC payout after a TrendZap market resolves in your favour.
---

# Claiming Winnings

When a market resolves and your side wins, your USDC payout sits in the contract ready to be claimed. It doesn't expire — claim whenever you like.

---

## How resolution works

When a market's deadline arrives:

1. The TrendZap Oracle fetches the final metric from the platform's official API
2. The result is written on-chain — permanently and immutably
3. The contract determines whether OVER or UNDER won
4. The market status changes from **Active** to **Resolved**

This process typically completes within a few minutes of the deadline. You don't need to be online — the oracle runs automatically.

---

## Claiming your payout

### Via the app

1. Open [app.trendzap.xyz](https://app.trendzap.xyz) and go to your **Profile** tab
2. Find the resolved market — it shows a green **Claim Winnings** button
3. Click **Claim Winnings**
4. Confirm the transaction in your wallet
5. USDC arrives in your wallet in the same block

Gas for a claim transaction is under $0.01 on Avalanche.

### Via the market page

You can also claim directly from the market detail view:

1. Open the market (via Profile, the feed, or a shared link)
2. If you won, **Claim Winnings** is visible in your position panel
3. Click and confirm

---

## Your payout amount

Your payout is calculated at resolution using the final pool state:

```
Net Pool (poolBalance) = total USDC staked after per-trade fee deductions
Your Payout            = (Your Winning Shares ÷ Total Winning Shares) × Net Pool at claim time
```

The app shows an estimate while the market is live and your claimable amount after resolution.

---

## If you lost

If your side lost, there is nothing to claim. Your staked USDC was redistributed to the winners as part of the LMSR pool redistribution. No transaction is needed from you.

This is how prediction markets work — losers fund winners. It's not a bug.

---

## If the market was dissolved

If the oracle failed to verify the metric and the market was dissolved, you can claim your **original stake back** — not a winning payout, just your USDC returned. The **Claim Refund** button appears in place of **Claim Winnings** for dissolved markets.

---

## Frequently asked questions

**Is there a deadline to claim?**
No. Your winnings remain in the contract indefinitely until you claim them.

**I won but I don't see the Claim button.**
The market may still be in the resolution pipeline. Wait a few minutes after the deadline. If it's been more than 30 minutes since the deadline passed and the market still shows Active, check the [Discord](https://discord.gg/trendzap) for status updates.

**Can I claim from a different wallet?**
No. Claims are tied to the wallet address that placed the bet.

**Why is my payout different from what I estimated earlier?**
Live estimates are based on the current pool and share distribution. Final claimable payout depends on the final winning-share distribution and the remaining net payout pool when claims happen. See [Understanding Odds](/docs/user-guide/understanding-odds) for details.

---

## Next steps

- [Understanding Odds](/docs/user-guide/understanding-odds) — how your payout is calculated
- [Placing Bets](/docs/user-guide/placing-bets) — start your next market
