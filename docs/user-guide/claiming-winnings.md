---
sidebar_position: 4
title: Claiming Winnings
description: How to claim your USDC payout after a TrendZap market resolves in your favour.
---

# Claiming Winnings

When a market resolves and your side wins, your USDC payout sits in the contract ready to be claimed. It does not expire — claim whenever you like.

---

## How Resolution Works

When a market's end time arrives:

1. The oracle fetches the final metric from the platform's official API
2. The result is posted on-chain — permanently and immutably
3. The contract calculates each winner's proportional share of the pool
4. The market status changes from **Closed** to **Resolved**

This process typically completes within a few minutes of the end time. You do not need to be online — the oracle runs automatically.

---

## Claiming Your Payout

### Via the App

1. Go to your **Portfolio** tab
2. Find the resolved market — it will show a green **Claim** badge
3. Click **Claim Winnings**
4. Confirm the transaction in your wallet
5. USDC arrives in your wallet in the same block

Gas for a claim transaction is typically under $0.05 on Arbitrum.

### Via the Market Page

You can also claim directly from the market detail page:

1. Open the market (via Portfolio, the feed, or a shared link)
2. If you won, the **Claim Winnings** button is visible in your position panel
3. Click and confirm

---

## Your Payout Amount

Your payout is calculated at the moment of resolution using the final pool state:

```
Winners Pool = Total Pool × 0.98
Your Payout  = (Your Stake ÷ Total Winning Stakes) × Winners Pool
```

The UI shows your exact claimable amount before you confirm the transaction.

---

## If You Lost

If your side lost, there is nothing to claim. Your staked USDC was automatically distributed to the winners' pool at resolution. No transaction is needed from you.

---

## Claiming Multiple Markets at Once

You can batch-claim multiple resolved markets in a single session from the Portfolio tab. Each claim is a separate on-chain transaction — you will need to confirm each one individually in your wallet.

---

## Claiming via Contract Directly

Advanced users can call `claim(marketId)` directly on the TrendZap market contract. See [Smart Contract Reference](/docs/architecture/smart-contracts) for the full ABI and addresses.

---

## What If the Market Was Disputed?

If the oracle failed to deliver a result and the market entered dispute, you can withdraw your original stake — not a winning payout, just your committed USDC back. The **Withdraw Stake** button appears in place of **Claim Winnings** for disputed markets.

---

## Frequently Asked Questions

**Is there a deadline to claim?**
No. Your winnings remain in the contract indefinitely until you claim them.

**I won but I don't see the Claim button.**
The market may still be in the resolution process. Wait a few minutes for the oracle to post the result. If it's been more than 30 minutes since the end time, check the [Discord](https://discord.gg/trendzap) for status updates.

**Can I claim from a different wallet than the one I bet with?**
No. Claims are tied to the wallet address that placed the bet.

---

## Next Steps

- [Understanding Odds](/docs/user-guide/understanding-odds) — How your payout is calculated
- [Placing Bets](/docs/user-guide/placing-bets) — Start your next market
