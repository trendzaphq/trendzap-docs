---
sidebar_position: 1
title: Architecture Overview
description: How TrendZap's components fit together — smart contracts, oracle, risk engine, and data layer.
---

# Architecture Overview

TrendZap is composed of four layers: the smart contract protocol, the oracle pipeline, the intelligence engine, and the data layer. Each is designed to fail safely and operates non-custodially.

---

## How the layers connect

```
┌─────────────────────────────────────┐
│          USER INTERFACE             │
│        app.trendzap.xyz             │
└────────────────┬────────────────────┘
                 │ read / write
┌────────────────▼────────────────────┐
│    SMART CONTRACTS (Avalanche)      │
│  Factory  ·  Market Contracts       │
│  LMSR pricing  ·  AVAX settlement   │
└────────┬────────────────┬───────────┘
         │ resolve        │ events
┌────────▼────────┐  ┌────▼───────────┐
│ ORACLE PIPELINE │  │   DATA LAYER   │
│ Verify metrics  │  │ Market history │
│ Resolve on-chain│  │ Leaderboard    │
└────────┬────────┘  └────────────────┘
         │
┌────────▼────────┐
│ INTELLIGENCE    │
│ AI market assist│
│ Risk checks     │
└─────────────────┘
```

---

## Layer 1 — Smart contracts

The protocol lives entirely on **Avalanche C-Chain** mainnet. Two core contracts:

**ViralityMarket Factory**
Deploys and tracks all markets. Maintains the global market registry.

**ViralityMarket**
One contract per market. Holds the LMSR pool, manages share records, receives oracle results, and distributes payouts. Immutable after deployment.

Key properties:
- Market parameters cannot be altered after deployment
- AVAX flows directly from user wallets into the market contract
- Claims are permissionless — any winning wallet can trigger their own payout
- Admin roles secured via multisig — no single point of failure

---

## Layer 2 — Oracle pipeline

The oracle bridges social media reality to on-chain state. When a market reaches its deadline, the oracle:

1. Fetches the current metric from the platform's official data API
2. Verifies consistency across multiple data sources
3. Determines the outcome against the threshold
4. Writes the resolution on-chain

All resolution transactions are publicly visible on [Snowtrace](https://snowtrace.io). Results are attributable and independently verifiable.

---

## Layer 3 — Intelligence engine

TrendZap's intelligence layer provides market creators with AI-assisted tooling:

- **Virality scoring** — analyses a post's current engagement and predicts its trajectory
- **Threshold suggestions** — recommends data-backed thresholds based on the post's performance
- **Risk checks** — validates market parameters and flags obviously one-sided setups before creation

This layer is pre-market only — it does not participate in resolution.

---

## Layer 4 — Data layer

On-chain events from the market contracts are indexed to power the app's feed, leaderboard, and user bets history. All indexed data traces back to on-chain transactions and is publicly verifiable at any time.

---

## Design principles

**Fail safe.** If the oracle cannot deliver a verified result, the market is dissolved and all funds are returnable. No outcome is ever forced.

**Minimal trust surface.** Individual market contracts have no admin keys after deployment. Payouts are permissionless.

**Verifiable.** Every bet, resolution, and payout is a public transaction on Snowtrace.

**Non-custodial.** AVAX flows directly into smart contracts — never into TrendZap-controlled wallets.

---

## Next steps

- [Oracle System](/docs/architecture/oracle-system) — data verification in depth
- [Smart Contracts](/docs/architecture/smart-contracts) — contract interfaces
- [Earned Trust](/docs/protocol/trust) — security and transparency commitments
