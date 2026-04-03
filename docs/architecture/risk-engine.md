---
sidebar_position: 4
title: Risk Engine
description: How TrendZap protects market integrity through position limits, anomaly detection, and dispute logic.
---

# Risk Engine

TrendZap's risk engine operates at three levels: on-chain contract rules, oracle-level data validation, and UI-level warnings. The goal is to make market manipulation economically unviable without requiring trust in any centralised authority.

---

## Why a Risk Engine?

Prediction markets face two primary attack vectors:

**Oracle manipulation** — An attacker creates a market, takes a large position, then artificially inflates the tracked metric to win. Example: buying fake likes to push a tweet's count over the threshold.

**Pool domination** — A single whale takes such a large position on one side that the market no longer reflects genuine prediction — it reflects their capital.

The risk engine targets both.

---

## On-Chain Controls

These are enforced by the smart contract and cannot be overridden by any party.

### Maximum Position Size

Each market has a cap on how much a single wallet can stake on either side:

```
Max position per wallet = min(flat cap, % of current pool)
```

The flat cap and percentage are set per market based on total pool size. Larger pools permit larger individual positions, but the percentage cap prevents any single wallet from dominating.

If a transaction would exceed the position limit, it reverts. There is no soft warning — the contract enforces it hard.

### Maximum Pool Cap

Each market has a maximum total pool size. Once the cap is reached:
- No new bets are accepted
- The market enters a "pool full" state
- Existing positions remain valid

The pool cap is designed so that the maximum potential payout from manipulating the oracle is always less than the cost of the manipulation itself. This removes the economic incentive.

### One Resolution Only

The `resolve()` function can only be called once, and only by the whitelisted Chainlink node address. Even if the Chainlink node were compromised, it cannot alter a resolution already on-chain.

---

## Oracle-Level Controls

These run off-chain but are enforced before any on-chain state changes.

### Velocity Anomaly Detection

Before accepting a metric, the oracle compares the final value against the post's engagement trajectory:

- What was the metric 24h before close? 12h? 6h? 1h?
- Does the final value fit the exponential or linear growth pattern?
- Is there a sudden spike in the final window inconsistent with prior growth?

An anomalous spike — even one that genuinely happened — can be caused by coordinated bot activity. If the spike exceeds the velocity threshold, the market disputes rather than resolves.

### Cross-Source Consistency

Two independent data sources are queried. If they disagree beyond the tolerance threshold (configurable per platform, default ±5%), the market disputes. A legitimate metric should be consistent across two independent sources within seconds of each other.

### Platform-Filtered Metrics

Major platforms (especially X/Twitter) actively remove bot engagement. The oracle uses the platform's "cleaned" metric count where available, not the raw count. This means artificially inflated likes that the platform has already removed do not count toward the threshold.

---

## Dispute Logic

A market enters dispute when any oracle check fails. In this state:

| Action | Available |
|--------|-----------|
| New bets | No |
| Resolution to OVER/UNDER | No |
| Stake withdrawal | Yes — original stake only |
| Admin override | No — there is no admin override |

Disputes are permanent. A disputed market cannot be un-disputed and resolved later. This is intentional: a market with an uncertain or manipulated result should not be force-resolved.

---

## UI-Level Warnings

The app surfaces real-time risk signals that do not block transactions but inform users:

- **Concentration warning** — If one wallet holds more than 40% of one side, a banner appears showing pool concentration
- **Low liquidity** — Markets with under 500 USDC total pool display a low-liquidity indicator
- **Approaching cap** — When a market is within 10% of its pool cap, users see a "near capacity" indicator
- **Thin markets** — Markets with more than 90% on one side show an "unbalanced market" warning

---

## Parameters

Current risk engine parameters are published in the open-source repository. Key values:

| Parameter | Default Value |
|-----------|---------------|
| Max wallet position (% of pool) | 15% |
| Velocity spike threshold | 3× trailing 6h average |
| Cross-source tolerance | ±5% |
| Oracle resolution window | 60 min after end time |
| Pool concentration warning | 40% single wallet |

These parameters can be adjusted via governance proposal as the protocol matures. Any changes are applied to newly created markets only — existing markets retain the parameters set at creation.

---

## Next Steps

- [Oracle System](/docs/architecture/oracle-system) — The data pipeline that feeds into risk decisions
- [Smart Contracts](/docs/architecture/smart-contracts) — Where position limits are enforced on-chain
- [Earned Trust](/docs/protocol/trust) — Audit history and security posture
