---
sidebar_position: 3
title: Subgraph
description: Query TrendZap on-chain data via the Graph Protocol subgraph — market state, positions, and resolution history.
---

# Subgraph

TrendZap's subgraph indexes all on-chain events from the Factory and Market contracts and exposes them via a GraphQL API. Use it to query market data without making raw RPC calls.

---

## Endpoint

```
https://api.thegraph.com/subgraphs/name/trendzaphq/trendzap-arbitrum
```

Testnet (Arbitrum Sepolia):
```
https://api.thegraph.com/subgraphs/name/trendzaphq/trendzap-arbitrum-sepolia
```

---

## Schema

### Market

```graphql
type Market {
  id: ID!                    # Market contract address
  marketId: BigInt!          # Sequential ID from factory
  creator: Bytes!            # Creator wallet address
  postUrl: String!
  platform: String!          # TWITTER | TIKTOK | INSTAGRAM | YOUTUBE
  metric: String!            # LIKES | VIEWS | RETWEETS | COMMENTS | SHARES
  threshold: BigInt!
  endTime: BigInt!
  createdAt: BigInt!
  resolved: Boolean!
  disputed: Boolean!
  outcomeIsOver: Boolean
  finalMetricValue: BigInt
  resolvedAt: BigInt
  totalOverStake: BigInt!
  totalUnderStake: BigInt!
  betCount: BigInt!
  positions: [Position!]! @derivedFrom(field: "market")
}
```

### Position

```graphql
type Position {
  id: ID!             # marketAddress-userAddress
  market: Market!
  user: Bytes!
  overStake: BigInt!
  underStake: BigInt!
  claimed: Boolean!
  claimedAmount: BigInt
  lastUpdated: BigInt!
}
```

### Bet

```graphql
type Bet {
  id: ID!             # txHash-logIndex
  market: Market!
  user: Bytes!
  isOver: Boolean!
  amount: BigInt!
  timestamp: BigInt!
  txHash: Bytes!
}
```

---

## Example Queries

### Active Markets

```graphql
query ActiveMarkets {
  markets(
    where: { resolved: false, disputed: false }
    orderBy: totalOverStake
    orderDirection: desc
    first: 20
  ) {
    id
    postUrl
    platform
    metric
    threshold
    endTime
    totalOverStake
    totalUnderStake
    betCount
  }
}
```

### Market Detail

```graphql
query MarketDetail($id: ID!) {
  market(id: $id) {
    id
    postUrl
    platform
    metric
    threshold
    endTime
    totalOverStake
    totalUnderStake
    resolved
    outcomeIsOver
    finalMetricValue
    positions(orderBy: overStake, orderDirection: desc, first: 10) {
      user
      overStake
      underStake
      claimed
    }
  }
}
```

### User Positions

```graphql
query UserPositions($user: Bytes!) {
  positions(
    where: { user: $user, overStake_gt: "0" }
    orderBy: lastUpdated
    orderDirection: desc
  ) {
    market {
      id
      postUrl
      platform
      threshold
      endTime
      resolved
      outcomeIsOver
    }
    overStake
    underStake
    claimed
    claimedAmount
  }
}
```

### Recent Bets on a Market

```graphql
query RecentBets($market: String!) {
  bets(
    where: { market: $market }
    orderBy: timestamp
    orderDirection: desc
    first: 50
  ) {
    user
    isOver
    amount
    timestamp
    txHash
  }
}
```

### Resolved Markets

```graphql
query ResolvedMarkets {
  markets(
    where: { resolved: true }
    orderBy: resolvedAt
    orderDirection: desc
    first: 20
  ) {
    id
    postUrl
    platform
    threshold
    outcomeIsOver
    finalMetricValue
    totalOverStake
    totalUnderStake
    resolvedAt
  }
}
```

---

## Using with TypeScript

```typescript
const SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/trendzaphq/trendzap-arbitrum';

async function fetchActiveMarkets() {
  const query = `
    query {
      markets(
        where: { resolved: false }
        orderBy: totalOverStake
        orderDirection: desc
        first: 20
      ) {
        id
        postUrl
        platform
        threshold
        totalOverStake
        totalUnderStake
      }
    }
  `;

  const res = await fetch(SUBGRAPH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const { data } = await res.json();
  return data.markets;
}
```

---

## Running Your Own Instance

The subgraph is open source. To run your own instance:

```bash
git clone https://github.com/trendzaphq/trendzap-subgraph
cd trendzap-subgraph
npm install
graph deploy --node http://localhost:8020/ trendzap-local
```

See the repo README for full local setup instructions.

---

## Next Steps

- [SDK Reference](/docs/developers/sdk-reference) — TypeScript SDK that wraps subgraph queries
- [Oracle Integration](/docs/developers/oracle-integration) — Build custom oracle adapters
- [Architecture Overview](/docs/architecture/overview) — How the subgraph fits into the system
