---
sidebar_position: 4
title: Roadmap
description: TrendZap's protocol milestones — from testnet through mainnet and beyond.
---

# Roadmap

This is what we're building and in what order. Dates are directional, not commitments.

---

## Where We Are

TrendZap is live on **Arbitrum Sepolia testnet**. The core protocol is functional:

- Markets can be created, bet on, and resolved
- Oracle pipeline is running with X/Twitter, TikTok, and Instagram support
- The risk engine is active with position limits and anomaly detection
- The TypeScript SDK and subgraph are deployed and usable

The testnet phase is about finding edge cases, stress-testing the oracle under adversarial conditions, and building the community that will make early mainnet markets liquid.

---

## Phase 1 — Testnet (Current)

**Goal:** Prove the oracle is reliable and the market mechanics work under real usage.

- [x] Core smart contracts deployed on Arbitrum Sepolia
- [x] Oracle pipeline live for X/Twitter, TikTok, Instagram
- [x] Parimutuel pool and USDC settlement working
- [x] Risk engine: position limits, anomaly detection, dispute logic
- [x] TypeScript SDK (beta)
- [x] Subgraph indexer live
- [x] Hackathon win — Arbitrum ecosystem recognition
- [ ] Smart contract audit (in progress)
- [ ] YouTube oracle support
- [ ] Batch claim and market browsing improvements

---

## Phase 2 — Mainnet Launch

**Goal:** Go live with real USDC, with a security baseline we can stand behind.

- [ ] Smart contract audit completed and report published
- [ ] Bug bounty programme formalised
- [ ] TrendZapFactory and TrendZapMarket deployed on Arbitrum One
- [ ] Verified contracts on Arbiscan
- [ ] All four platforms supported in oracle (X/Twitter, TikTok, Instagram, YouTube)
- [ ] SDK v1.0 stable release
- [ ] Market creation open to all wallets
- [ ] Governance parameter discussion: fee rates, position limits

**When:** Q2 2026, pending audit completion.

---

## Phase 3 — Protocol Maturity

**Goal:** Build the primitives needed for TrendZap to function as a serious prediction market protocol.

- [ ] On-chain governance for protocol parameters (fees, limits, oracle thresholds)
- [ ] Market curation signals — community flagging of low-quality markets
- [ ] Reputation layer — on-chain track record for predictors
- [ ] Creator tools — dashboard for tracking your own content in markets
- [ ] Advanced market types: multi-threshold markets, bracket markets

---

## Phase 4 — Ecosystem

**Goal:** TrendZap as infrastructure that other products build on.

- [ ] SDK v2 with React hooks and pre-built UI components
- [ ] Embeddable market widget for third-party sites
- [ ] API access tier for data providers and analytics products
- [ ] Public data export — historical market and oracle data

---

## What Is Not on the Roadmap

**Multi-chain deployment** — We're focused on Arbitrum depth before breadth. When volume justifies it and liquidity can be sustained, we'll evaluate other chains. Not a current priority.

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
