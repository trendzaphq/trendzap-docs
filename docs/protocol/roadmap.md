---
sidebar_position: 4
title: Roadmap
description: TrendZap's protocol milestones — from mainnet launch through ecosystem growth.
---

# Roadmap

This is what we're building and in what order. Dates are directional, not commitments.

---

## Where We Are

TrendZap is **live on Avalanche Mainnet** (chain ID 43114). The core protocol is functional:

- Markets can be created, bet on, and resolved on Avalanche C-Chain
- Oracle pipeline is running with X/Twitter and YouTube support
- The risk engine is active with position limits and anomaly detection
- All bets and payouts settle in USDC (ERC-20, 6 decimals)

---

## Phase 1 — Mainnet Launch (Current)

**Goal:** Prove the oracle is reliable and the market mechanics work under real usage.

- [x] Core smart contracts deployed on Avalanche Mainnet
- [x] Oracle pipeline live for X/Twitter, YouTube
- [x] LMSR pool and USDC settlement working
- [x] Risk engine: position limits, anomaly detection, dispute logic
- [x] Subgraph indexer live
- [ ] Smart contract audit (in progress)
- [ ] TikTok and Instagram oracle support
- [ ] Batch claim and market browsing improvements

---

## Phase 2 — Protocol Maturity

**Goal:** Build the primitives needed for TrendZap to function as a serious prediction market protocol.

- [ ] Smart contract audit completed and report published
- [ ] Bug bounty programme formalised
- [ ] All four platforms supported in oracle (X/Twitter, TikTok, Instagram, YouTube)
- [ ] Verified contracts on [Snowtrace](https://snowtrace.io)
- [ ] Market creation open to all wallets (creator tier system)
- [ ] Governance parameter discussion: fee rates, position limits

**When:** Q3 2026.

---

## Phase 3 — Ecosystem

**Goal:** TrendZap as infrastructure that other products build on.

- [ ] On-chain governance for protocol parameters (fees, limits, oracle thresholds)
- [ ] Market curation signals — community flagging of low-quality markets
- [ ] Reputation layer — on-chain track record for predictors
- [ ] Creator tools — dashboard for tracking your own content in markets
- [ ] Embeddable market widget for third-party sites
- [ ] API access tier for data providers and analytics products
- [ ] Public data export — historical market and oracle data

---

## What Is Not on the Roadmap

**Multi-chain deployment** — We're focused on Avalanche depth before breadth. When volume justifies it and liquidity can be sustained, we'll evaluate other chains. Not a current priority.

**Native token launch** — There is no TrendZap token planned at this stage. The protocol runs on USDC. If governance requires a token, that decision will be made transparently and with the community.

**Leverage or margin** — TrendZap is a simple prediction market. We will not add leverage. Your maximum loss is your stake.

---

## Staying Updated

- Follow [@TrendZapHQ](https://twitter.com/TrendZapHQ) on X for milestone announcements
- Join the [Telegram](https://t.me/+fsKNAii3K-Q5NWY0) for community discussion
- Join the [Discord](https://discord.gg/trendzap) for developer and governance discussions
- Watch the [GitHub repo](https://github.com/trendzaphq) — all significant changes start there

---

## Next Steps

- [Earned Trust](/docs/protocol/trust) — Our security posture and what we can verify today
- [Finding PMF](/docs/protocol/product-market-fit) — The market thesis and honest uncertainties
- [Architecture Overview](/docs/architecture/overview) — How the current system is built
