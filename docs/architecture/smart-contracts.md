---
sidebar_position: 2
title: Smart Contracts
description: TrendZap contract architecture, addresses, and interface reference on Arbitrum.
---

# Smart Contracts

TrendZap's protocol is two contracts: a factory that deploys markets and a market contract that manages each prediction pool. Both are deployed on Arbitrum One and Arbitrum Sepolia (testnet).

---

## Contract Addresses

### Arbitrum One (Mainnet)

| Contract | Address |
|----------|---------|
| TrendZapFactory | `0x` — published at mainnet launch |
| USDC (native) | `0xaf88d065e77c8cC2239327C5EDb3A432268e5831` |

### Arbitrum Sepolia (Testnet)

| Contract | Address |
|----------|---------|
| TrendZapFactory | `0x` — see app for latest testnet address |
| USDC (testnet) | Available via in-app faucet |

:::tip
All deployed contract addresses are verified on Arbiscan. Always verify the address matches what's listed here before interacting with any contract.
:::

---

## TrendZapFactory

The factory is the entry point for market creation. It:

- Deploys a new `TrendZapMarket` contract for each market
- Collects and burns the creation fee
- Maintains a registry of all deployed markets
- Emits `MarketCreated` events indexed by the subgraph

### Key Functions

```solidity
// Create a new prediction market
function createMarket(
    string calldata postUrl,
    Platform platform,
    MetricType metric,
    uint256 threshold,
    uint256 endTime
) external returns (address marketAddress);

// Get all markets
function getMarkets(uint256 offset, uint256 limit)
    external view returns (address[] memory);

// Get a single market address
function getMarket(uint256 marketId)
    external view returns (address);
```

### Events

```solidity
event MarketCreated(
    uint256 indexed marketId,
    address indexed marketAddress,
    address indexed creator,
    string postUrl,
    uint256 threshold,
    uint256 endTime
);
```

---

## TrendZapMarket

One contract per prediction market. Immutable after deployment. Holds all USDC for that market.

### State

```solidity
// Market parameters (set at creation, immutable)
string public postUrl;
Platform public platform;
MetricType public metric;
uint256 public threshold;
uint256 public endTime;

// Pool state
uint256 public totalOverStake;
uint256 public totalUnderStake;

// Resolution
bool public resolved;
bool public outcomeIsOver;
uint256 public finalMetricValue;

// Dispute
bool public disputed;
```

### Key Functions

```solidity
// Place a bet (OVER = true, UNDER = false)
function bet(bool isOver, uint256 amount) external;

// Claim winnings after resolution
function claim() external;

// Withdraw original stake if market is disputed
function withdrawStake() external;

// Oracle resolution callback (Chainlink only)
function resolve(uint256 finalValue) external;

// Query a user's position
function getPosition(address user)
    external view returns (uint256 overStake, uint256 underStake);

// Estimate payout given current pool state
function estimatePayout(address user, bool isOver)
    external view returns (uint256);
```

### Events

```solidity
event BetPlaced(
    address indexed user,
    bool isOver,
    uint256 amount,
    uint256 newTotalOverStake,
    uint256 newTotalUnderStake
);

event MarketResolved(
    bool outcomeIsOver,
    uint256 finalMetricValue
);

event WinningsClaimed(
    address indexed user,
    uint256 amount
);

event MarketDisputed(string reason);
```

---

## Data Types

```solidity
enum Platform {
    TWITTER,
    TIKTOK,
    INSTAGRAM,
    YOUTUBE
}

enum MetricType {
    LIKES,
    VIEWS,
    RETWEETS,
    COMMENTS,
    SHARES
}
```

---

## Fee Structure

| Fee | Amount | Destination |
|-----|--------|-------------|
| Market creation | Fixed USDC amount (see UI) | Burned |
| Platform fee | 2% of total pool | Protocol treasury |

The 2% platform fee is the only ongoing fee. It is deducted from the total pool before winners are paid.

---

## Security Properties

- **No admin keys on markets** — once deployed, no address can alter market parameters
- **Immutable resolution** — the oracle can only call `resolve()` once, and only before the market is resolved
- **Permissionless claim** — any external call to `claim()` by the winner address succeeds
- **Reentrancy protected** — all state mutations follow checks-effects-interactions pattern
- **USDC only** — no native ETH held in contracts; ETH is only used for gas

---

## Source Code

All contracts are open source under MIT license. Published on GitHub at `github.com/trendzaphq`.

Audit reports are linked in [Earned Trust](/docs/protocol/trust).

---

## Next Steps

- [Oracle System](/docs/architecture/oracle-system) — How `resolve()` is called
- [Risk Engine](/docs/architecture/risk-engine) — Position limits and dispute conditions
- [Developer Smart Contracts](/docs/developers/smart-contracts) — Integration guide with code examples
