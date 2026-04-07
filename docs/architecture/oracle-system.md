---
sidebar_position: 3
title: Oracle System
description: How TrendZap's oracle pipeline fetches, verifies, and delivers social media metrics on-chain.
---

# Oracle System

The oracle is the most trust-sensitive component of any prediction market. If the oracle can be manipulated, every market can be manipulated. This page documents how TrendZap's oracle pipeline works and where the trust assumptions lie.

---

## The Problem

Blockchain contracts cannot access external data on their own. When a TrendZap market asks "did this tweet get 500K likes?" — the contract needs a trustworthy external answer.

That answer must be:
- **Accurate** — it reflects the actual metric, not a manipulated or stale value
- **Verifiable** — anyone can independently confirm the value posted on-chain
- **Tamper-resistant** — no single party can alter the result unilaterally
- **Fallback-safe** — if it fails, funds are protected, not frozen or lost

---

## Pipeline Overview

```
Market end time reached
        │
        ▼
[1] FETCH — Primary call to platform's official API
        │
        ▼
[2] CROSS-REFERENCE — Secondary independent source queried
        │
        ▼
[3] CONSISTENCY CHECK — Values compared against each other
        │                        ─── Discrepancy? → DISPUTE
        ▼
[4] ANOMALY DETECTION — Engagement pattern analysis
        │                        ─── Anomaly detected? → DISPUTE
        ▼
[5] ON-CHAIN DELIVERY — Verified result posted to contract
        │
        ▼
[6] CONTRACT RESOLUTION — Market records outcome
```

---

## Step 1 — Primary Fetch

The oracle queries the official API of the relevant platform to retrieve the current metric for the tracked post.

| Platform | Data Source |
|----------|-------------|
| X/Twitter | Official X/Twitter API |
| YouTube | Official YouTube API |
| TikTok | Official TikTok API |
| Instagram | Official Instagram API |

All calls use authenticated API access. The raw response is recorded and hash-committed before any processing.

---

## Step 2 — Cross-Reference

A second independent data source is queried for the same metric. This guards against:
- Primary API returning stale or cached data
- Platform-side errors or maintenance windows
- Discrepancies introduced between fetch and delivery

If the two values differ beyond the configured tolerance, the oracle does not post a result. The market enters dispute state.

---

## Step 3 — Anomaly Detection

Before accepting the metric, the oracle applies anomaly detection to identify and filter artificial engagement. The goal is to ensure the final metric reflects genuine audience interaction, not coordinated manipulation.

A flagged result triggers a dispute rather than a potentially manipulated resolution.

---

## Step 4 — On-Chain Delivery

Once the metric passes all validation checks, the verified result is posted to the `TrendZapMarket` contract by the oracle service address. The contract verifies the sender before accepting the result. The final metric value is permanently recorded on-chain.

Only the whitelisted oracle address can call `resolve()`. This address is set at market deployment and cannot be changed.

---

## Dispute State

A market enters dispute if:

- Primary and secondary sources differ beyond tolerance
- Anomaly detection threshold is exceeded
- The oracle fails to deliver within the resolution window

In dispute state:
- The market cannot be resolved to OVER or UNDER
- All participants can claim their original USDC back
- The dispute is logged on-chain for transparency

Disputed markets are surfaced in the UI with an explanation of the failure reason.

---

## Verifying a Result

Every oracle result is publicly verifiable:

1. Find the market on [Snowtrace](https://snowtrace.io) using the contract address
2. Look for the `MarketResolved` event
3. The `finalMetricValue` parameter is the exact number the oracle posted
4. Cross-check against the platform's public data or any third-party archive

The oracle delivery transaction is visible in the contract's transaction history, with the oracle service address as the sender.

---

## Trust Assumptions

| Component | Trust Assumption |
|-----------|----------------|
| Oracle service | Dedicated address; whitelisted in contract at deployment |
| Platform API | Official first-party data endpoint |
| Secondary source | Independent provider; discrepancy triggers dispute |
| Anomaly detection | Applied before any result is accepted |
| TrendZap team | Cannot alter individual market results; no admin key on deployed markets |

---

## Next Steps

- [Smart Contracts](/docs/architecture/smart-contracts) — The `resolve()` interface
- [Earned Trust](/docs/protocol/trust) — Security and transparency commitments
