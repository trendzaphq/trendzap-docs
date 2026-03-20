---
sidebar_position: 2
title: Oracle Integration
description: How TrendZap's Chainlink-powered SocialOracle fetches and delivers social media metrics on-chain.
last_update:
  date: 2026-03-20
  author: TrendZap Team
---

# Oracle Integration

TrendZap's oracle system is what makes prediction markets on social media possible. Every market resolution depends on a verified, tamper-proof delivery of real social media data from the internet to the blockchain.

---

## Architecture Overview

```
Social Media Platform APIs
(Twitter v2, YouTube Data API, TikTok, Instagram Graph)
        │
        ▼
TrendZap Oracle Adapter (trendzap-oracle)
Node.js Express server — Chainlink External Adapter format
        │
        ▼
Chainlink Decentralized Oracle Network (DON)
Multiple independent nodes fetch, aggregate, and sign the result
        │
        ▼
SocialOracle.sol — fulfill(requestId, metricValue)
Stores the verified metric on-chain
        │
        ▼
ViralityMarketV2.sol — resolveMarket(marketId, metricValue)
Market settles, payouts become claimable
```

No single node controls the result. The Chainlink DON requires a threshold of independent nodes to agree on the value before it is delivered to the contract. This is the same mechanism that secures billions of dollars in DeFi protocols.

---

## The Oracle Adapter

TrendZap runs a **Chainlink External Adapter** — a Node.js service that the Chainlink DON calls when a metric request arrives. The adapter:

1. Receives the request parameters: `postUrl`, `platform`, `metricType`
2. Authenticates with the social media platform's official API
3. Fetches the exact engagement metric
4. Returns the value in Chainlink's expected response format: `{ data: { value: 1234567 } }`

### Supported Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/metrics?url=&platform=&metric=` | Fetch a specific metric |
| `POST` | `/chainlink` | Chainlink external adapter entry point |
| `GET` | `/health` | Service health check |
| `GET` | `/platforms` | List supported platforms and metrics |

### Example Request

```bash
curl "https://oracle.trendzap.xyz/metrics?url=https://x.com/user/status/123&platform=twitter&metric=likes"
```

```json
{
  "success": true,
  "data": {
    "url": "https://x.com/user/status/123",
    "platform": "twitter",
    "metric": "likes",
    "value": 847293,
    "fetchedAt": "2026-03-20T10:00:00Z"
  }
}
```

---

## How a Resolution Happens (Step by Step)

### 1. Deadline Passes

When a market's `endTime` timestamp is reached, the market enters `CLOSED` status. The Chainlink keeper or an authorized caller triggers the resolution request.

### 2. On-Chain Request

```solidity
// SocialOracle.sol
function requestMetric(
    uint256 marketId,
    string calldata postUrl,
    string calldata platform,
    string calldata metricType
) external onlyRole(REQUESTER_ROLE) returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(
        jobId,
        address(this),
        this.fulfill.selector
    );

    string memory url = string(abi.encodePacked(
        oracleApiUrl, "/metrics?",
        "url=", postUrl,
        "&platform=", platform,
        "&metric=", metricType
    ));

    req.add("get", url);
    req.add("path", "data,value");
    req.addInt("times", 1);

    requestId = sendChainlinkRequest(req, fee); // fee paid in LINK
    requestToMarket[requestId] = marketId;
}
```

### 3. Chainlink DON Executes

The Chainlink node network:
- Fetches the URL (our oracle adapter)
- Parses the JSON path (`data.value`)
- Aggregates results from multiple nodes
- Calls `fulfill()` with the agreed value

### 4. On-Chain Fulfillment

```solidity
// SocialOracle.sol
function fulfill(bytes32 _requestId, uint256 _metricValue)
    public
    recordChainlinkFulfillment(_requestId)
{
    uint256 marketId = requestToMarket[_requestId];
    latestMetricValue[marketId] = _metricValue;
    lastUpdateTime[marketId] = block.timestamp;
    emit MetricFulfilled(_requestId, marketId, _metricValue);
}
```

### 5. Market Resolves

The `ViralityMarketV2` contract compares the delivered metric against the market threshold:

```solidity
market.outcome = metricValue >= market.params.threshold
    ? Outcome.OVER
    : Outcome.UNDER;
market.status = MarketStatus.RESOLVED;
```

The outcome is permanent. Every step is on-chain and verifiable via Snowtrace.

---

## Data Integrity and Anti-Manipulation

### Why Fake Engagement Doesn't Work

A common concern: can someone buy fake likes to win a TrendZap market?

Our oracle adapter applies multiple checks before returning a value:

1. **Official API only** — We fetch exclusively from authenticated official platform APIs (Twitter API v2, YouTube Data API v3). We do not scrape and cannot be fooled by cached page views.
2. **Platform-native filtering** — Platforms themselves filter bot engagement before it appears in API responses. Twitter's API already excludes accounts flagged as automated.
3. **Anomaly detection** — Sudden spikes significantly above baseline engagement velocity are flagged and escalate to human review before the value is delivered on-chain.
4. **Time-locked resolution** — Markets resolve at a defined `resolutionTime`, not at the moment of highest engagement, reducing the viability of short-term manipulation.

### What Happens if the Oracle Fails?

If the Chainlink request times out or returns an invalid response:
- The market remains in `CLOSED` state
- Admin can trigger a re-request or escalate to manual review
- If resolution is impossible (e.g., post deleted), the market is `CANCELLED` and all stakes are refunded

---

## Running Your Own Oracle Node (Advanced)

For developers who want to run an independent TrendZap oracle node:

1. Clone the oracle adapter repository:
   ```bash
   git clone https://github.com/trendzaphq/trendzap-oracle
   cd trendzap-oracle
   ```

2. Configure environment variables (see `.env.example`):
   ```env
   TWITTER_BEARER_TOKEN=...
   YOUTUBE_API_KEY=...
   TIKTOK_CLIENT_KEY=...
   INSTAGRAM_ACCESS_TOKEN=...
   ```

3. Run the adapter:
   ```bash
   npm install
   npm start
   ```

4. Register with the Chainlink DON and provide your node URL when applying to become a TrendZap oracle provider.

---

## Chainlink Configuration Reference

| Parameter | Fuji Testnet | C-Chain Mainnet |
|-----------|-------------|-----------------|
| LINK Token | `0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846` | `0x5947BB275c521040051D82396192181b413227A3` |
| Oracle Fee | 0.1 LINK | 0.1 LINK |
| Job Type | General Purpose Any API | General Purpose Any API |

---

## Next Steps

- [Smart Contracts](/docs/developers/smart-contracts) — SocialOracle.sol full reference
- [SDK Reference](/docs/developers/sdk-reference) — Trigger oracle requests from TypeScript
- [FAQ](/docs/faq) — Common oracle questions
