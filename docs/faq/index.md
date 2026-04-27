---
sidebar_position: 1
title: FAQ
description: Frequently asked questions about TrendZap — how it works, what's supported, risks, deposits, withdrawals, and more.
---

# FAQ

---

## General

**What is TrendZap?**

TrendZap is a decentralised prediction market where you bet **USDC** on whether a social media post will hit a specific engagement metric — for example, whether a tweet will hit 500K views in 24 hours. It runs on Avalanche C-Chain and settles in USDC.

**How is this different from regular gambling?**

There is no house, no bookie, and no centralised operator. You're betting against other users in a shared LMSR pool. The smart contract holds the funds and distributes them based on objective on-chain oracle results. TrendZap cannot alter the outcome, take your winnings, or disappear with your funds.

**Do I need an account?**

No. Your wallet is your account. Connect any compatible wallet to Avalanche C-Chain and start immediately.

**Is TrendZap available in my country?**

TrendZap is a permissionless protocol — no registration, no KYC. However, prediction markets exist in a complex regulatory environment. Users are responsible for understanding the laws in their own jurisdiction. This is not legal advice.

---

## Platforms and markets

**What platforms are supported?**

X (Twitter) and YouTube are live. TikTok and Instagram are coming soon.

| Platform | Status |
|----------|--------|
| X (Twitter) | ✅ Live |
| YouTube | ✅ Live |
| TikTok | 🔜 Coming soon |
| Instagram | 🔜 Coming soon |

**What metrics can I bet on?**

| Platform | Metrics |
|----------|---------|
| X (Twitter) | Likes, Views, Retweets, Replies |
| YouTube | Views, Likes, Comments |

**Can I create my own market?**

Yes. Any wallet can create a market by providing a post URL, metric, threshold, and deadline. You seed initial liquidity and receive the creator share from collected trade fees when the market resolves.

**What makes a market valid?**

The post must be publicly accessible via the platform's official API. Private accounts, deleted posts, or content behind a login wall will trigger a dissolution and fund return.

**Can a market be changed after creation?**

No. Markets are immutable after deployment. Parameters cannot be changed by anyone — including TrendZap.

**What if nobody bets on one side?**

If all bets are on one side and that side wins, all participants receive their stake back minus the creator fee. A one-sided pool doesn't make the market invalid — it just means there's nothing to redistribute.

---

## Betting

**What token do I bet with?**

USDC — a USD-pegged stablecoin (ERC-20, 6 decimals) on Avalanche C-Chain. This is similar to how Polymarket uses USDC. You still need a small amount of AVAX for gas fees, but all bets and payouts are in USDC.

To get USDC: swap AVAX → USDC on [Trader Joe](https://traderjoexyz.com/avalanche/trade) or [Pangolin](https://app.pangolin.exchange/#/swap).

**What's the minimum bet?**

0.5 USDC for regular users. Admin wallets can use 0.03 USDC for operational/testing flows.

**Do I need to approve USDC spending?**

First-time users must approve the TrendZap contract to spend USDC. The app handles this automatically — you'll see an approval transaction before your first bet, then normal bet transactions after that.

**Can I change or cancel my bet?**

No. Once your bet transaction is confirmed on-chain, it is final. You cannot withdraw a position before market close.

**Why is my estimated payout different from what I calculated earlier?**

Payouts are calculated at resolution using the final pool state, not at bet time. If more people bet your side between your bet and market close, your share of the winners' pool decreases. This is how LMSR markets work. See [Understanding Odds](/docs/user-guide/understanding-odds).

---

## Deposits and withdrawals

**How do I deposit USDC?**

There's no deposit step. Connect your wallet with USDC on Avalanche C-Chain and bet directly. Your USDC goes straight from your wallet to the market contract (after a one-time approval). You also need a small amount of AVAX in your wallet to cover gas fees.

**How do I withdraw / get my money back?**

You can't cancel an active bet before market close. After resolution:

- **If you won:** Click **Claim Winnings** on the market. Your USDC sends directly to your wallet.
- **If you lost:** Nothing to claim — your stake redistributed to winners.
- **If the market was dissolved:** Click **Claim Refund** to get your original USDC stake back.

There is no withdrawal fee charged by TrendZap when you claim. Claiming is still an on-chain transaction, so you pay normal Avalanche gas from your wallet.

**Is there a deadline to claim winnings?**

No. Your winnings sit in the contract indefinitely until you claim.

---

## Resolution and oracle

**How does TrendZap know the final metric?**

The TrendZap Oracle queries the platform's official API at market close time, then writes the verified result on-chain. All resolution data is visible on [Snowtrace](https://snowtrace.io).

**Where do the losing funds go?**

Losing USDC redistributes to the winning side as part of the LMSR pool. Specifically:
- **2% trade fee** is collected per bet
- At resolution, collected fees are split between treasury and creator
- Winners claim from the remaining net payout pool proportionally

Losing bettors get nothing. This is the mechanism — winners are funded by losers.

**Can the oracle be manipulated by buying fake engagement?**

The oracle checks the metric against the post's prior trajectory. A sudden spike inconsistent with historical growth triggers a dispute rather than an immediate resolution.

**What is a dissolved market?**

A market is dissolved when the oracle cannot deliver a verified result. All participants claim their original USDC back. No funds are lost due to oracle failure.

**How long does resolution take?**

Typically a few minutes after deadline. The oracle/keeper flow runs in the background; when data is unavailable or low-confidence, a market may be skipped, retried, or escalated for manual fallback.

---

## Risks

**What are the risks of using TrendZap?**

- **Smart contract risk** — all protocols carry risk of undiscovered bugs
- **Oracle risk** — the oracle could fail or be manipulated (dissolved market → funds returned)
- **Market risk** — you can lose your full stake if the market resolves against you
- **Liquidity risk** — early markets may have small pools; payouts depend on total pool size
- **Regulatory risk** — prediction markets are regulated differently in different jurisdictions

:::caution
Never bet more than you can afford to lose. All prediction markets carry inherent risk.
:::

**Are the contracts audited?**

A security audit is planned. The contracts are open source on GitHub and testable by anyone. See [Earned Trust](/docs/protocol/trust) for the current security posture.

---

## Technical

**What network is TrendZap on?**

Avalanche C-Chain mainnet (Chain ID 43114).

**What are the contract addresses?**

| Contract | Address |
|----------|---------|
| ViralityMarket | `0xbB898682B2BbD8cF19c33179b783ed172168BB6d` |
| Factory | `0x1a30Ffc42DF5a505E68f671dCD92dF26AA00Ac94` |

**Is the code open source?**

Yes. Smart contracts and related tooling are publicly available at [github.com/trendzaphq](https://github.com/trendzaphq).

---

## Community

**Where can I get help?**

- [Discord](https://discord.gg/trendzap) — support, technical questions, community
- [Telegram](https://t.me/+fsKNAii3K-Q5NWY0) — general community discussion
- [X / Twitter](https://twitter.com/TrendZapHQ) — announcements and updates
- [GitHub](https://github.com/trendzaphq) — issues and technical discussions
