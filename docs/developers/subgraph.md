---
sidebar_position: 3
title: Subgraph
description: Query TrendZap market data, positions, and analytics via The Graph's GraphQL API.
last_update:
  date: 2026-03-20
  author: TrendZap Team
---

# Subgraph

TrendZap's on-chain events are indexed by [The Graph](https://thegraph.com), giving you fast, flexible access to historical market data, user positions, leaderboards, and analytics — all via a standard GraphQL API.

No RPC node required. No pagination through thousands of events. Just query what you need.

---

## Endpoint

```
# Fuji Testnet
https://api.thegraph.com/subgraphs/name/trendzaphq/trendzap-fuji

# Avalanche Mainnet (launching Q2 2026)
https://api.thegraph.com/subgraphs/name/trendzaphq/trendzap
```

---

## Schema

### Market

Represents a single prediction market.

```graphql
type Market @entity {
  id: ID!                         # Market ID (numeric string)
  postUrl: String!                # Social media post URL
  platform: Platform!             # TWITTER | YOUTUBE | TIKTOK | INSTAGRAM
  metricType: MetricType!         # LIKES | VIEWS | RETWEETS | COMMENTS | SHARES
  threshold: BigInt!              # Engagement threshold
  endTime: BigInt!                # Betting deadline (unix timestamp)
  resolutionTime: BigInt!         # Resolution timestamp
  status: MarketStatus!           # PENDING | ACTIVE | CLOSED | RESOLVED | CANCELLED
  outcome: Outcome                # OVER | UNDER (null until resolved)
  resolvedValue: BigInt           # Actual metric value from oracle
  totalOverStake: BigInt!         # Total AVAX bet on OVER
  totalUnderStake: BigInt!        # Total AVAX bet on UNDER
  totalVolume: BigInt!            # Total AVAX traded
  feesCollected: BigInt!          # Protocol fees collected
  creator: User!                  # Market creator
  positions: [Position!]!         @derivedFrom(field: "market")
  bets: [Bet!]!                   @derivedFrom(field: "market")
  createdAt: BigInt!
  resolvedAt: BigInt
}
```

### User

Aggregated stats per wallet address.

```graphql
type User @entity {
  id: ID!                         # Wallet address
  totalBets: BigInt!              # Lifetime number of bets placed
  totalWins: BigInt!              # Number of winning markets
  totalVolume: BigInt!            # Total AVAX bet across all markets
  totalProfit: BigInt!            # Net AVAX profit (can be negative)
  winRate: BigDecimal!            # Win rate (0.0 – 1.0)
  marketsCreated: [Market!]!      @derivedFrom(field: "creator")
  positions: [Position!]!         @derivedFrom(field: "user")
}
```

### Position

A user's stake in a specific market.

```graphql
type Position @entity {
  id: ID!                         # "{marketId}-{userAddress}"
  market: Market!
  user: User!
  overShares: BigInt!             # OVER shares held
  underShares: BigInt!            # UNDER shares held
  overCost: BigInt!               # Total AVAX paid for OVER shares
  underCost: BigInt!              # Total AVAX paid for UNDER shares
  claimed: Boolean!               # Whether payout has been claimed
  payout: BigInt                  # Payout received (null if not claimed)
  updatedAt: BigInt!
}
```

### Bet

Individual bet event (each `buyShares` call).

```graphql
type Bet @entity {
  id: ID!                         # Transaction hash + log index
  market: Market!
  user: User!
  isOver: Boolean!                # true = OVER, false = UNDER
  shares: BigInt!                 # Shares received
  cost: BigInt!                   # AVAX paid
  timestamp: BigInt!
  txHash: Bytes!
}
```

### DailyStat

Aggregate protocol statistics by day.

```graphql
type DailyStat @entity {
  id: ID!                         # Date string "YYYY-MM-DD"
  date: BigInt!                   # Unix timestamp (start of day)
  totalVolume: BigInt!            # AVAX traded that day
  totalMarkets: BigInt!           # New markets created
  totalBets: BigInt!              # Bets placed
  uniqueUsers: BigInt!            # Unique active wallets
}
```

---

## Example Queries

### Active Markets Feed

```graphql
query ActiveMarkets {
  markets(
    where: { status: "ACTIVE" }
    orderBy: totalVolume
    orderDirection: desc
    first: 20
  ) {
    id
    postUrl
    platform
    metricType
    threshold
    endTime
    totalOverStake
    totalUnderStake
    totalVolume
    creator {
      id
    }
  }
}
```

### User Portfolio

```graphql
query UserPortfolio($userAddress: String!) {
  user(id: $userAddress) {
    totalBets
    totalWins
    totalVolume
    totalProfit
    winRate
    positions(where: { market_: { status_not: "CANCELLED" } }) {
      market {
        id
        postUrl
        platform
        status
        outcome
      }
      overShares
      underShares
      overCost
      underCost
      claimed
      payout
    }
  }
}
```

### Leaderboard — Top Forecasters

```graphql
query Leaderboard {
  users(
    orderBy: winRate
    orderDirection: desc
    first: 50
    where: { totalBets_gte: "10" }  # Minimum 10 bets for credibility
  ) {
    id
    totalBets
    totalWins
    winRate
    totalProfit
    totalVolume
  }
}
```

### Protocol Analytics — Last 30 Days

```graphql
query ProtocolStats {
  dailyStats(
    orderBy: date
    orderDirection: desc
    first: 30
  ) {
    date
    totalVolume
    totalMarkets
    totalBets
    uniqueUsers
  }
}
```

### Market Resolution History

```graphql
query ResolvedMarkets($platform: String) {
  markets(
    where: {
      status: "RESOLVED"
      platform: $platform
    }
    orderBy: resolvedAt
    orderDirection: desc
    first: 50
  ) {
    id
    postUrl
    platform
    metricType
    threshold
    resolvedValue
    outcome
    totalVolume
    resolvedAt
  }
}
```

---

## Using the Subgraph in TypeScript

### With @apollo/client

```typescript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/trendzaphq/trendzap-fuji',
  cache: new InMemoryCache(),
});

const { data } = await client.query({
  query: gql`
    query {
      markets(where: { status: "ACTIVE" }, first: 10) {
        id
        postUrl
        totalVolume
      }
    }
  `,
});
```

### With the TrendZap SDK (Recommended)

The SDK wraps the subgraph automatically:

```typescript
import { TrendZapClient } from '@trendzap/sdk';

const client = new TrendZapClient({ chain: 'avalanche-fuji' });

// Leaderboard — top 20 forecasters
const leaderboard = await client.analytics.leaderboard({ limit: 20 });

// User portfolio
const portfolio = await client.analytics.userPortfolio('0xYourAddress');

// Protocol volume
const stats = await client.analytics.protocolStats({ days: 30 });
```

---

## Indexed Events

The subgraph listens to the following contract events:

| Event | Triggered When |
|-------|---------------|
| `MarketCreated` | New market deployed |
| `SharesBought` | User places a bet |
| `SharesSold` | User exits position early |
| `MarketResolved` | Oracle delivers final metric |
| `WinningsClaimed` | User claims payout |
| `MarketStatusChanged` | Market moves between states |
| `FeesWithdrawn` | Protocol/creator fees distributed |

---

## Source Code

📦 [github.com/trendzaphq/trendzap-subgraph](https://github.com/trendzaphq/trendzap-subgraph)

---

## Next Steps

- [SDK Reference](/docs/developers/sdk-reference) — Access subgraph data via the SDK
- [Smart Contracts](/docs/developers/smart-contracts) — On-chain contract reference
- [Oracle Integration](/docs/developers/oracle-integration) — How resolution data gets on-chain
