---
sidebar_position: 1
title: Architecture Overview
description: How TrendZap's components fit together — smart contracts, oracle pipeline, risk engine, and indexer.
---

# Architecture Overview

TrendZap is composed of four layers: the smart contract protocol, the oracle pipeline, the risk engine, and the data indexer. Each layer is independently verifiable and designed to fail safely.

---

## System Diagram

```
┌─────────────────────────────────────────────┐
│              USER INTERFACE                 │
│         trendzap.xyz  ·  SDK                │
└──────────────────┬──────────────────────────┘
                   │ read / write
┌──────────────────▼──────────────────────────┐
│           SMART CONTRACTS (Arbitrum)         │
│  TrendZapFactory  ·  TrendZapMarket          │
│  Parimutuel pool  ·  USDC settlement         │
└──────────┬────────────────────┬─────────────┘
           │ create/resolve     │ events
┌──────────▼──────────┐  ┌─────▼─────────────┐
│    ORACLE PIPELINE  │  │  SUBGRAPH INDEXER  │
│  API fetch → verify │  │  GraphQL endpoint  │
│  → Chainlink relay  │  │  Historical data   │
└──────────┬──────────┘  └────────────────────┘
           │ on-chain result
┌──────────▼──────────┐
│    RISK ENGINE      │
│  Position limits    │
│  Anomaly detection  │
│  Dispute logic      │
└─────────────────────┘
```

---

## Layer 1 — Smart Contracts

The protocol lives entirely on **Arbitrum One**. Two core contracts:

**TrendZapFactory**
Deploys and tracks all markets. Enforces creation fees. Maintains the global market registry.

**TrendZapMarket**
One contract per market. Holds the parimutuel pool, manages position records, enforces bet limits, receives oracle results, and distributes payouts. Immutable after deployment.

Key properties:
- No admin keys on individual markets — once deployed, no one can alter parameters
- USDC flows directly between user wallets and the market contract
- `claim()` is permissionless — anyone can trigger payout distribution

See [Smart Contracts](/docs/architecture/smart-contracts) for addresses, ABIs, and interface details.

---

## Layer 2 — Oracle Pipeline

The oracle is the bridge between social media reality and on-chain state. It runs off-chain but delivers results verifiably on-chain via Chainlink.

Pipeline steps:

1. **Trigger** — At market end time, the oracle job fires
2. **Fetch** — Primary API call to the platform's official data endpoint
3. **Cross-reference** — A second independent source is queried and compared
4. **Bot filter** — Anomaly detection flags synthetic engagement spikes
5. **Sign and deliver** — Verified result is signed and posted on-chain via Chainlink

The Chainlink node is independently operated. The signed result is publicly verifiable on Arbiscan before the market contract accepts it.

See [Oracle System](/docs/architecture/oracle-system) for the full pipeline specification.

---

## Layer 3 — Risk Engine

The risk engine runs at multiple levels:

**Contract-level (on-chain)**
- Maximum position size per wallet per market
- Maximum total pool size per market (limits oracle manipulation incentive)
- Dispute state when oracle delivery fails

**Oracle-level (off-chain)**
- Bot detection on fetched metrics
- Cross-source consistency checks
- Anomaly thresholds that trigger a dispute rather than a bad resolution

**UI-level**
- Warnings when a single wallet has a disproportionate share of one side
- Display of current pool concentration

See [Risk Engine](/docs/architecture/risk-engine) for detailed thresholds and logic.

---

## Layer 4 — Subgraph Indexer

A Graph Protocol subgraph indexes all on-chain events from TrendZapFactory and TrendZapMarket contracts, providing a fast GraphQL API for:

- Market list and metadata
- Position history per wallet
- Pool snapshots over time
- Resolution results and payout records

The subgraph is read-only and open — anyone can query it directly or run their own instance.

See [Subgraph](/docs/developers/subgraph) for the schema and query examples.

---

## Design Principles

**Fail safe over fail silent.** If the oracle cannot deliver a verified result, the market disputes and all funds are returnable. No outcome is forced.

**Minimal trust surface.** Individual market contracts have no admin keys. Oracle delivery is Chainlink-signed. Payouts are permissionless.

**Verifiability at every step.** Every oracle result, every bet, every payout is a public transaction on Arbiscan. Nothing happens off-chain that can't be independently verified.

**Open source throughout.** Contracts, oracle adapters, subgraph schema, and SDK are all MIT licensed and publicly available.

---

## Next Steps

- [Smart Contracts](/docs/architecture/smart-contracts) — Addresses, ABIs, interfaces
- [Oracle System](/docs/architecture/oracle-system) — Data pipeline detail
- [Risk Engine](/docs/architecture/risk-engine) — Position limits and dispute logic
