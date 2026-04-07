---
sidebar_position: 2
title: Creating Markets
description: How to create a new TrendZap prediction market around any public social media post.
---

# Creating Markets

Any connected wallet can create a prediction market. You choose the post, the metric, the threshold, and the deadline. Once created, it's live on-chain and anyone can bet.

---

## What makes a good market?

A good market has a genuinely uncertain outcome. The threshold should be plausible but not obvious.

**Good:** A post with 200K views and a threshold of 500K in 48 hours — could go either way.

**Bad:** A post already at 800K views with a threshold of 500K — the outcome is determined.

**Also bad:** A private account, deleted post, or content behind a login wall — the oracle cannot read it.

---

## Step by step

### 1. Click "Create Market"

In the TrendZap app, click the **+ Create** button in the nav bar (or the FAB button on desktop, or the + icon in the mobile bottom nav). This takes you to the dedicated creation page.

### 2. Paste the post URL

Paste the direct link to the post you want to track.

| Platform | Example format |
|----------|----------------|
| X (Twitter) | `https://x.com/username/status/12345` |
| YouTube | `https://www.youtube.com/watch?v=ABCDE` |

The app validates the URL, fetches a live embed of the post (including current stats), and uses AI to suggest a threshold based on engagement trajectory. You can accept the suggestion or set your own.

### 3. Choose the metric

Select what to measure: views, likes, retweets, comments, or shares. Available options depend on the platform.

| Platform | Available metrics |
|----------|------------------|
| X (Twitter) | Likes, Views, Retweets, Replies |
| YouTube | Views, Likes, Comments |

### 4. Set the threshold

Enter the target number — the line the market resolves on. This is the **raw metric count** (e.g. `500000`, not a percentage or formatted number).

Check the post's current engagement and trajectory. The AI suggestion factor is based on current stats and typical growth curves for that post type.

### 5. Set the deadline

Choose when the oracle will check the final metric and close the market.

- **Minimum:** A few hours from now
- **Maximum:** 30 days

24 hours suits fast-moving viral posts. 48–72 hours suits creator content. Up to 7 days suits campaigns and slower-growing content.

### 6. Add your seed bet

Every market requires a seed bet — an initial USDC stake that bootstraps liquidity and sets the starting LMSR price. The larger the seed, the more initial liquidity. Your seed bet counts as your position on either OVER or UNDER.

### 7. Confirm

A summary shows every parameter. Confirm the transaction. The market deploys on Avalanche C-Chain immediately.

---

## After creation

- The market appears in the live feed immediately
- Market parameters are immutable after creation — no one can change them
- You earn a **3% fee** from the total pool when the market resolves
- You can share the market URL directly with anyone

---

## Your creator fee

When the market resolves, 3% of the total USDC pool is distributed to the market creator address. This is automatic — you don't need to claim it separately.

> If 500 USDC is in the pool at resolution, you receive 15 USDC regardless of which side wins.

---

## If the post is no longer accessible

If the oracle cannot read the metric at resolution (deleted post, account made private, API failure), the market is dissolved and all bettors receive their original USDC back. No funds are lost.

---

## Next steps

- [Placing Bets](/docs/user-guide/placing-bets) — how positions work
- [Understanding Odds](/docs/user-guide/understanding-odds) — how LMSR sets prices
- [FAQ](/docs/faq) — common questions about market creation
