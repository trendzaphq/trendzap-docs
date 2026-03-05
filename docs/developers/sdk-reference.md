---
sidebar_position: 1
title: SDK Reference
description: Complete reference for the TrendZap TypeScript SDK
last_update:
  date: 2026-03-05
  author: TrendZap Team
---

# SDK Reference

The TrendZap SDK provides a simple interface for integrating TrendZap into your applications.

## Installation

```bash
npm install @trendzap/sdk
# or
pnpm add @trendzap/sdk
# or
yarn add @trendzap/sdk
```

## Quick Start

```typescript
import { TrendZapClient } from '@trendzap/sdk';
import { createWalletClient, http } from 'viem';
import { arbitrum } from 'viem/chains';

const client = new TrendZapClient({
  chain: 'arbitrum',
  walletClient: createWalletClient({
    chain: arbitrum,
    transport: http(),
  }),
});

// Get active markets
const markets = await client.markets.list({ status: 'active' });

// Place a bet
await client.markets.bet('market-id', 'OVER', '10');
```

## Configuration

### TrendZapClientConfig

```typescript
interface TrendZapClientConfig {
  chain: 'arbitrum' | 'arbitrum-sepolia';
  walletClient?: WalletClient;
  publicClient?: PublicClient;
  oracleUrl?: string;
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `chain` | string | Yes | Network to connect to |
| `walletClient` | WalletClient | No | For write operations |
| `publicClient` | PublicClient | No | For read operations |
| `oracleUrl` | string | No | Custom oracle URL |

## Markets Module

### markets.create()

Create a new prediction market.

```typescript
const market = await client.markets.create({
  postUrl: 'https://twitter.com/user/status/123',
  platform: 'twitter',
  metric: 'likes',
  threshold: 100000,
  endTime: Date.now() + 86400000,
});
```

### markets.get()

Get market details by ID.

```typescript
const market = await client.markets.get('market-id');
```

### markets.list()

List markets with optional filters.

```typescript
const markets = await client.markets.list({
  status: 'active',
  platform: 'twitter',
  limit: 10,
});
```

### markets.bet()

Place a bet on a market.

```typescript
const txHash = await client.markets.bet('market-id', 'OVER', '10');
```

### markets.claim()

Claim winnings from a resolved market.

```typescript
const txHash = await client.markets.claim('market-id');
```

## Positions Module

### positions.get()

Get user's position in a market.

```typescript
const position = await client.positions.get('market-id', '0x...');
```

### positions.listByUser()

List all positions for a user.

```typescript
const positions = await client.positions.listByUser('0x...');
```

## Metrics Module

### metrics.get()

Get current social metrics.

```typescript
const metrics = await client.metrics.get(
  'https://twitter.com/user/status/123',
  'twitter',
  'likes'
);
```

## Utils Module

### utils.calculateProbability()

Calculate implied odds from stakes.

```typescript
const odds = client.utils.calculateProbability(
  totalOverStake,
  totalUnderStake
);
// { over: 0.65, under: 0.35 }
```

### utils.estimatePayout()

Estimate potential payout.

```typescript
const payout = client.utils.estimatePayout(
  totalOver,
  totalUnder,
  'OVER',
  betAmount
);
```

## Error Handling

```typescript
import { TrendZapError, MarketNotFoundError } from '@trendzap/sdk';

try {
  await client.markets.bet('invalid-id', 'OVER', '10');
} catch (error) {
  if (error instanceof MarketNotFoundError) {
    console.error('Market does not exist');
  }
}
```

## TypeScript Types

```typescript
import type {
  Market,
  Position,
  Platform,
  MetricType,
  Outcome,
} from '@trendzap/sdk';
```
