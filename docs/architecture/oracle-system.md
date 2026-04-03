---
sidebar_position: 3
title: Oracle System
description: How TrendZap's oracle pipeline fetches, verifies, and delivers social media metrics on-chain.
---

# Oracle System

The oracle is the most trust-sensitive component of any prediction market. If the oracle can be manipulated, every market can be manipulated. This page documents exactly how TrendZap's oracle pipeline works and where the trust assumptions lie.

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
[1] FETCH — Primary API call to platform endpoint
        │
        ▼
[2] CROSS-REFERENCE — Secondary independent source queried
        │
        ▼
[3] CONSISTENCY CHECK — Values compared against each other
        │                        ─── Discrepancy? → DISPUTE
        ▼
[4] BOT FILTER — Anomaly detection on metric delta
        │                        ─── Spike detected? → DISPUTE
        ▼
[5] CHAINLINK DELIVERY — Signed result posted on-chain
        │
        ▼
[6] CONTRACT RESOLUTION — TrendZapMarket records outcome
```

---

## Step 1 — Primary Fetch

The oracle calls the official API of the relevant platform to retrieve the current metric for the tracked post.

| Platform | Data Source |
|----------|-------------|
| X/Twitter | X API v2 — tweet metrics endpoint |
| TikTok | TikTok Research API — video stats |
| Instagram | Instagram Graph API — media insights |
| YouTube | YouTube Data API v3 — video statistics |

All calls use authenticated, rate-limited API access. The raw response is recorded and hash-committed before any processing.

---

## Step 2 — Cross-Reference

A second independent data provider is queried for the same metric. This guards against:
- Primary API returning stale or cached data
- Platform-side errors or maintenance windows
- Discrepancies introduced between fetch and delivery

If the two values differ by more than the configured tolerance, the oracle does not post a result. The market enters dispute state.

---

## Step 3 — Bot Filter

Before accepting the metric, the oracle applies anomaly detection:

- **Velocity check** — Was the metric delta in the last window consistent with the preceding trajectory? Sudden large spikes inconsistent with historical growth are flagged.
- **Account quality** — Cross-referenced with known bot farm fingerprints where available.
- **Platform signal** — If the platform's own spam filter has removed engagement (as X/Twitter does), the cleaned metric is used, not the raw count.

A flagged result triggers a dispute rather than a potentially manipulated resolution.

---

## Step 4 — Chainlink Delivery

Verified data is delivered on-chain via a Chainlink node:

1. The oracle computes a signed attestation of the final value
2. The Chainlink node posts this to the `TrendZapMarket` contract via a trusted call
3. The contract verifies the Chainlink node address before accepting the result
4. The final metric value is permanently recorded on-chain

The Chainlink node address is whitelisted in the market contract at deployment. Only that address can call `resolve()`.

---

## Dispute State

A market enters dispute if:

- Primary and secondary sources differ beyond tolerance
- Bot filter threshold is exceeded
- The oracle fails to deliver within the resolution window (default: 60 minutes after end time)

In dispute state:
- The market cannot be resolved to OVER or UNDER
- All participants can call `withdrawStake()` to recover their original USDC
- The dispute is logged on-chain for transparency

Disputed markets are surfaced in the UI with an explanation of the failure reason.

---

## Verifying a Result

Every oracle result is publicly verifiable:

1. Find the market on Arbiscan using the contract address
2. Look for the `MarketResolved` event
3. The `finalMetricValue` parameter is the exact number the oracle posted
4. Cross-check against the platform's public API or any third-party archive

The signed Chainlink delivery transaction is also visible in the contract's transaction history, with the Chainlink node address as the sender.

---

## Trust Assumptions

| Component | Trust Assumption |
|-----------|----------------|
| Chainlink node | Operated independently; node address is verified in contract |
| Platform API | Official first-party data endpoint |
| Secondary source | Independent provider; discrepancy triggers dispute |
| Bot filter | Open-source rules; parameters published in repo |
| TrendZap team | Cannot alter individual market results; no admin key on markets |

The only meaningful trust assumption is that the Chainlink node operator and the platform APIs are not simultaneously compromised. This is the same assumption underpinning all Chainlink-powered DeFi protocols.

---

## Next Steps

- [Risk Engine](/docs/architecture/risk-engine) — How bot detection parameters and dispute thresholds are set
- [Smart Contracts](/docs/architecture/smart-contracts) — The `resolve()` interface
- [Oracle Integration](/docs/developers/oracle-integration) — For developers building custom oracle adapters
