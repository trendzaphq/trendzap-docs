---
sidebar_position: 2
title: Creating Markets
description: How to create a new TrendZap prediction market around any public social media post.
---

# Creating Markets

Any wallet can create a prediction market. You choose the post, the metric, the threshold, and the time window. Once created, it's live on-chain and anyone can take a position.

---

## What Makes a Good Market?

A good market has a genuinely uncertain outcome. The threshold should be plausible but not obvious.

**Good:** A post with 200K likes and a threshold of 500K in 48 hours — could go either way.

**Bad:** A post already at 800K likes with a threshold of 500K — the outcome is determined.

**Also bad:** A private account, deleted post, or content behind a login wall — the oracle cannot read it.

---

## Step by Step

### 1. Open Create Market

In the TrendZap app, click **Create Market** in the nav bar.

### 2. Paste the Post URL

Paste the direct link to the post you want to track.

| Platform | Example format |
|----------|----------------|
| X/Twitter | `https://x.com/username/status/12345` |
| TikTok | `https://www.tiktok.com/@username/video/12345` |
| Instagram | `https://www.instagram.com/p/ABCDE` |
| YouTube | `https://www.youtube.com/watch?v=ABCDE` |

The app validates the URL and shows a post preview. You must confirm this is the correct post before proceeding.

### 3. Choose the Metric

Select what to measure: likes, views, retweets/reposts, comments, or shares. Available options depend on the platform.

### 4. Set the Threshold

Enter the target number. This is the line the market resolves on. Choose a number that creates genuine uncertainty — check the post's current engagement and trajectory to calibrate.

### 5. Set the End Time

Choose when the oracle will fetch the final metric and close the market.

- Minimum: 1 hour from now
- Maximum: 7 days from now

A 24-hour window suits fast-moving posts. 48–72 hours suits creator content. 7 days suits campaigns.

### 6. Review and Confirm

A summary screen shows every parameter. Confirm the transaction. Your wallet pays the creation fee in USDC, and the market is deployed on-chain immediately.

---

## Creation Fee

A small USDC fee prevents spam markets. The fee is burned — it is not collected by TrendZap. The current fee amount is shown in the UI before you confirm.

---

## After Creation

- You can optionally seed a position on either side to bootstrap liquidity
- The market appears in the live feed immediately
- The market is immutable — parameters cannot be changed after creation
- You can share the market URL directly

---

## If the Post Gets Deleted

If the oracle cannot fetch a valid metric at resolution (deleted post, API failure, private account), the market enters a dispute state. All participants can withdraw their original stake. No funds are lost.

---

## Next Steps

- [Placing Bets](/docs/user-guide/placing-bets) — How positions and stakes work
- [Understanding Odds](/docs/user-guide/understanding-odds) — How the pool split sets implied probability
- [Oracle System](/docs/architecture/oracle-system) — How the final metric is verified
