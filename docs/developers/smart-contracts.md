---
sidebar_position: 1
title: Smart Contracts
description: TrendZap's Solidity smart contracts — addresses, interfaces, and architecture on Avalanche.
last_update:
  date: 2026-03-20
  author: TrendZap Team
---

# Smart Contracts

TrendZap's on-chain logic is written in Solidity and deployed on Avalanche. All contracts are open-source, audited, and verified on Snowtrace.

---

## Deployed Addresses

### Avalanche Fuji Testnet (chain ID: 43113)

| Contract | Address | Explorer |
|----------|---------|---------|
| `ViralityMarketV2` | `0x...` | [View on Snowtrace](https://testnet.snowtrace.io/address/0x...) |
| `MarketFactoryV2` | `0x...` | [View on Snowtrace](https://testnet.snowtrace.io/address/0x...) |
| `SocialOracle` | `0x...` | [View on Snowtrace](https://testnet.snowtrace.io/address/0x...) |
| `Treasury` | `0x...` | [View on Snowtrace](https://testnet.snowtrace.io/address/0x...) |

### Avalanche C-Chain Mainnet (chain ID: 43114)

| Contract | Address | Explorer |
|----------|---------|---------|
| `ViralityMarketV2` | `Coming Q2 2026` | — |
| `MarketFactoryV2` | `Coming Q2 2026` | — |

---

## Contract Architecture

```
MarketFactoryV2
    └── Creates and manages ViralityMarketV2 instances
            └── Each market is an independent contract
            └── SocialOracle resolves outcomes
            └── Treasury receives protocol fees
```

---

## ViralityMarketV2

The core prediction market contract. Each market is an instance of this contract.

### Key Functions

#### `createMarket(params, initialBet, betOnOver)` → `marketId`

Creates a new prediction market. The creator may optionally seed initial liquidity.

```solidity
struct MarketParams {
    string postUrl;        // Full URL of the social media post
    Platform platform;     // TWITTER, YOUTUBE, TIKTOK, INSTAGRAM
    MetricType metricType; // LIKES, VIEWS, RETWEETS, COMMENTS, SHARES
    uint256 threshold;     // Engagement number to bet against
    uint256 startTime;     // When betting opens
    uint256 endTime;       // When betting closes
    uint256 resolutionTime;// When oracle resolution can begin
}
```

#### `buyShares(marketId, isOver)` → `payable`

Places a bet. Send AVAX with the call. Returns shares based on current LMSR pricing.

```solidity
// Bet OVER on market 1, sending 0.5 AVAX
viralityMarket.buyShares{value: 0.5 ether}(1, true);
```

#### `sellShares(marketId, shares, isOver)`

Exits a position before market resolution. Returns AVAX based on current market price (minus fee).

#### `resolveMarket(marketId, metricValue)`

Called only by the oracle address. Delivers the final engagement metric and settles the market.

#### `claimWinnings(marketId)`

Winners call this after resolution to receive their proportional payout.

#### `claimRefund(marketId)`

Available only on cancelled markets. Returns the original stake.

#### `getPrices(marketId)` → `(priceOver, priceUnder)`

View function returning current LMSR-derived prices as 18-decimal fixed-point numbers.

#### `getProbabilities(marketId)` → `(probOver, probUnder)`

View function returning current implied probabilities as percentages (0–100).

#### `quoteBuy(marketId, shares, isOver)` → `cost`

Preview the AVAX cost to purchase a given number of shares. Use this before calling `buyShares`.

### Fee Model

| Fee | Rate | Recipient |
|-----|------|-----------|
| Platform fee | 2.0% | Protocol treasury |
| Creator royalty | 0.5% | Market creator wallet |

Fees are collected at the point of market resolution and distributed via `_distributeFees()` automatically.

### Access Control Roles

| Role | Capabilities |
|------|-------------|
| `DEFAULT_ADMIN_ROLE` | Update treasury address |
| `ADMIN_ROLE` | Pause/unpause, cancel markets |
| `ORACLE_ROLE` | Call `resolveMarket` |
| `KEEPER_ROLE` | Call `closeMarket` when deadline passes |

---

## SocialOracle

The bridge between Chainlink's decentralized oracle network and TrendZap smart contracts.

### How It Works

1. `requestMetric(marketId, postUrl, platform, metricType)` is called by an authorized requester
2. The contract builds a Chainlink Any API request pointing at the TrendZap oracle adapter
3. The Chainlink DON executes the job, fetches the social media metric, and aggregates results
4. `fulfill(requestId, metricValue)` is called back by the Chainlink DON
5. The oracle stores the result and triggers market resolution

### Key State

```solidity
mapping(bytes32 => uint256) public requestToMarket;  // Chainlink requestId → marketId
mapping(uint256 => uint256) public latestMetricValue; // marketId → resolved metric
mapping(uint256 => uint256) public lastUpdateTime;    // marketId → timestamp
```

### Chainlink Configuration (Fuji)

| Parameter | Value |
|-----------|-------|
| LINK Token | `0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846` |
| Oracle Address | TrendZap dedicated Chainlink node |
| Job ID | Social media metric fetcher |
| Fee | 0.1 LINK per request |

---

## MarketFactoryV2

A factory contract that manages the creation and registry of all TrendZap markets.

- Maintains a list of all deployed markets
- Validates creator parameters before deployment
- Emits `MarketCreated` events indexed by The Graph subgraph

---

## Security

### Audit Status

Smart contract security review is in progress. The audit report will be published at `docs.trendzap.xyz/security` before mainnet launch.

### Known Protections

| Vector | Mitigation |
|--------|-----------|
| Reentrancy | OpenZeppelin `ReentrancyGuard` on all fund-transfer functions |
| Access control | OpenZeppelin `AccessControl` with role separation |
| Integer overflow | Solidity 0.8.20+ (built-in overflow protection) |
| Oracle manipulation | Chainlink DON aggregation + minimum 3-node threshold |
| Emergency | `Pausable` contract — admin can halt new bets without touching locked funds |

### Bug Bounty

A bug bounty programme will launch alongside the mainnet deployment. Issues should be reported to **security@trendzap.xyz** before public disclosure.

---

## Source Code

All contracts are open-source under MIT License:

📦 [github.com/trendzaphq/trendzap-contracts](https://github.com/trendzaphq/trendzap-contracts)

- `contracts/core/ViralityMarketV2.sol` — Main market logic
- `contracts/core/MarketFactoryV2.sol` — Factory
- `contracts/oracle/SocialOracle.sol` — Chainlink integration
- `contracts/libraries/LMSR.sol` — Market scoring math
- `contracts/libraries/FixedPointMath.sol` — Precision arithmetic

---

## Next Steps

- [Oracle Integration](/docs/developers/oracle-integration) — How the Chainlink oracle delivers data
- [SDK Reference](/docs/developers/sdk-reference) — Interact with contracts via TypeScript
- [Subgraph](/docs/developers/subgraph) — Query market data via GraphQL
