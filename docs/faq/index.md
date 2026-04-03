---
sidebar_position: 1
title: FAQ
description: Frequently asked questions about TrendZap — how it works, what's supported, and what to do when things go wrong.
---

# FAQ

---

## General

**What is TrendZap?**

TrendZap is a decentralized prediction market where you bet on whether social media posts will reach a specific engagement threshold — for example, whether a tweet will hit 500K likes in 24 hours. It runs on Arbitrum One and settles in USDC.

**How is this different from regular betting?**

There is no bookie, no centralized operator, and no counterparty who can default. You're betting against other users in a shared pool. The smart contract holds the funds and distributes them automatically based on a tamper-proof oracle result. TrendZap cannot take your winnings, alter the outcome, or disappear with your funds.

**Is TrendZap available in my country?**

TrendZap is a permissionless protocol — there is no registration, no KYC, and no account. However, prediction markets exist in a complex regulatory environment. Users are responsible for understanding the laws in their own jurisdiction. Nothing here is legal advice.

**Do I need an account to use TrendZap?**

No. Your wallet is your account. Connect any compatible wallet to Arbitrum One and you can start immediately.

---

## Markets

**What platforms are supported?**

X/Twitter, TikTok, Instagram, and YouTube. We plan to add more platforms as the oracle is validated on each one.

**What metrics can I bet on?**

Likes, views, retweets/reposts, comments, and shares — depending on the platform. Not all metrics are available on all platforms (Instagram doesn't provide share counts publicly, for example).

**Can I create my own market?**

Yes. Anyone can create a market by specifying a post URL, metric, threshold, and end time. A small USDC creation fee is required to prevent spam.

**What makes a market valid?**

The post must be publicly accessible via the platform's official API. Private accounts, deleted posts, or posts behind a login wall cannot be resolved by the oracle and will dispute.

**Can a market be cancelled after it's created?**

No. Markets are immutable after creation. Once deployed, parameters cannot be changed by anyone — including TrendZap.

**What happens if nobody bets on one side?**

If all bets are on OVER and the market resolves OVER, all participants simply get their stake back (minus the 2% fee). There is no "wrong outcome" for a one-sided pool — it just has no profitable resolution.

---

## Betting

**What's the minimum bet?**

There is no protocol-level minimum, but very small amounts (under 1 USDC) may not be economical given gas costs (~$0.05–$0.10 on Arbitrum).

**Can I change or cancel my bet?**

No. Once your bet transaction is confirmed on-chain, it is final. You cannot withdraw a position before market close.

**What token do I use to bet?**

USDC — specifically Circle's native USDC on Arbitrum One (`0xaf88d065e77c8cC2239327C5EDb3A432268e5831`). Not USDC.e (bridged USDC) — make sure you have native USDC.

**Why is my estimated payout different from what I calculated?**

Payouts are calculated at resolution using the final pool state, not at the time of your bet. If more people bet on your side between your bet and market close, your share of the winners' pool decreases. This is how parimutuel markets work. See [Understanding Odds](/docs/user-guide/understanding-odds).

**Is there a maximum bet?**

Yes. Each market has a maximum position per wallet to prevent single-wallet pool domination. The limit is shown in the UI before you confirm your bet. The contract enforces it — transactions exceeding the limit will revert.

---

## Oracle and Resolution

**How does TrendZap know the final metric?**

The oracle fetches the final metric from the platform's official API at market close time, cross-references it with a second source, applies bot-detection filters, and posts the verified result on-chain via Chainlink. See [Oracle System](/docs/architecture/oracle-system) for the full pipeline.

**Can the oracle be manipulated by buying fake engagement?**

It's designed to resist this. The oracle checks the metric against the post's historical trajectory — a sudden spike inconsistent with prior growth triggers a dispute rather than a resolution. The market pool cap also limits the financial incentive to attempt manipulation.

**What if the oracle gets the wrong answer?**

If an oracle result is obviously wrong, the dispute mechanism allows stakeholders to flag it. If you believe a resolution was incorrect, post evidence in the Discord with the market address and the discrepancy. For confirmed errors, we investigate and escalate through the Chainlink dispute process.

**What is a disputed market?**

A market disputes when the oracle cannot deliver a verified result — due to API failure, cross-source inconsistency, bot-detection trigger, or delivery timeout. In a disputed market, all participants can withdraw their original stake. No funds are lost.

**How long does resolution take after the market closes?**

Typically a few minutes. The oracle job fires at the end time, runs through its pipeline, and delivers the result on-chain. In rare cases (API rate limits, platform outages), it may take up to 60 minutes. If no result is delivered within 60 minutes of the end time, the market automatically disputes.

---

## Technical

**What network is TrendZap on?**

Arbitrum One (Chain ID 42161). A testnet deployment is live on Arbitrum Sepolia (Chain ID 421614).

**Is the code open source?**

Yes. All contracts, the oracle pipeline, SDK, and subgraph are MIT licensed and publicly available at `github.com/trendzaphq`.

**Has the protocol been audited?**

A full smart contract audit is in progress. The report will be published before mainnet launch. See [Earned Trust](/docs/protocol/trust) for details.

**Can I build on TrendZap?**

Yes. The TypeScript SDK makes it straightforward to embed markets, query state, and place bets in your own app. The subgraph provides indexed data access without RPC calls. See [SDK Reference](/docs/developers/sdk-reference).

---

## Winnings

**When can I claim my winnings?**

As soon as the market is resolved. A **Claim** button appears on the market page and in your Portfolio tab.

**Is there a deadline to claim?**

No. Your winnings sit in the contract until you call `claim()`. There is no expiry.

**I won but the Claim button isn't showing up.**

The market may still be in the resolution pipeline. Wait a few minutes. If the market shows as "Resolved" but no Claim button appears, check that you're connected with the wallet that placed the bet. If the issue persists, raise it in the Discord.

**What's the 2% fee?**

Two percent of the total pool is taken as a protocol fee before distributing winnings. This is the only ongoing fee. It goes to the protocol treasury. There is no other hidden fee.

---

## Community

**Where can I get help?**

- [Discord](https://discord.gg/trendzap) — For support, technical questions, and governance
- [Telegram](https://t.me/+fsKNAii3K-Q5NWY0) — For general community discussion
- [X / Twitter](https://twitter.com/TrendZapHQ) — Announcements and updates
- [GitHub](https://github.com/trendzaphq) — Issues, PRs, and technical discussions
