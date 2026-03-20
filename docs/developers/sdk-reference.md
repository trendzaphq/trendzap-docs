---
sidebar_position: 1
title: SDK Reference
description: Complete reference for the TrendZap TypeScript SDK — built for Avalanche.
last_update:
  date: 2026-03-20
  author: TrendZap Team
---

# SDK Reference

The `@trendzap/sdk` TypeScript SDK gives developers a clean, type-safe interface for reading market data, placing bets, managing positions, and integrating TrendZap into any application — from Farcaster frames to Discord bots.

## Installation

```bash
npm install @trendzap/sdk
# or
pnpm add @trendzap/sdk
```

## Quick Start

```typescript
import { TrendZapClient } from '@trendzap/sdk';
import { createWalletClient, createPublicClient, http } from 'viem';
import { avalanche, avalancheFuji } from 'viem/chains';

// Read-only client (no wallet needed for queries)
const client = new TrendZapClient({
  chain: 'avalanche',       // or 'avalanche-fuji' for testnet
  rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
});

// Full client with wallet for transactions
const clientWithWallet = new TrendZapClient({
  chain: 'avalanche',
  walletClient: createWalletClient({
    chain: avalanche,
    transport: http(),
  }),
});
```

## Configuration

### TrendZapClientConfig

```typescript
interface TrendZapClientConfig {
  chain: 'avalanche' | 'avalanche-fuji';
  rpcUrl?: string;
  walletClient?: WalletClient;
  publicClient?: PublicClient;
  oracleUrl?: string;        // Override oracle adapter URL
  subgraphUrl?: string;      // Override The Graph endpoint
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `chain` | string | **Yes** | `'avalanche'` (mainnet) or `'avalanche-fuji'` (testnet) |
| `rpcUrl` | string | No | Custom Avalanche RPC endpoint |
| `walletClient` | WalletClient | No | Required for write operations (bet, claim, create) |
| `publicClient` | PublicClient | No | For read-only on-chain calls |
| `oracleUrl` | string | No | Custom oracle adapter URL |
| `subgraphUrl` | string | No | Custom subgraph endpoint |

### Contract Addresses by Chain

| Chain | ViralityMarketV2 | MarketFactoryV2 | SocialOracle |
|-------|-----------------|-----------------|--------------|
| Avalanche C-Chain | Coming Q2 2026 | Coming Q2 2026 | Coming Q2 2026 |
| Avalanche Fuji | See `config.ts` | See `config.ts` | See `config.ts` |

---

## Markets Module

### `markets.list(filters?)` → `Market[]`

Fetch active, resolved, or all markets.

```typescript
// All active markets
const activeMarkets = await client.markets.list({ status: 'active' });

// Filter by platform
const tweetMarkets = await client.markets.list({
  status: 'active',
  platform: 'twitter',
  limit: 20,
  offset: 0,
});
```

### `markets.get(marketId)` → `Market`

Fetch a single market with full state.

```typescript
const market = await client.markets.get(42);

console.log(market.params.postUrl);         // Post URL
console.log(market.params.threshold);       // Engagement threshold
console.log(market.state.totalVolume);      // Total AVAX bet
console.log(market.status);                 // 'active' | 'closed' | 'resolved'
```

### `markets.getPrices(marketId)` → `{ priceOver, priceUnder }`

Get current LMSR-derived prices (18-decimal fixed point).

```typescript
const { priceOver, priceUnder } = await client.markets.getPrices(42);
// priceOver: 630000000000000000n  → 63% implied probability
// priceUnder: 370000000000000000n → 37% implied probability
```

### `markets.getProbabilities(marketId)` → `{ probOver, probUnder }`

Get implied probabilities as plain percentages.

```typescript
const { probOver, probUnder } = await client.markets.getProbabilities(42);
// probOver: 63, probUnder: 37
```

### `markets.quoteBuy(marketId, shares, isOver)` → `bigint`

Preview the AVAX cost to purchase a given number of shares.

```typescript
// How much AVAX to buy 100 OVER shares?
const cost = await client.markets.quoteBuy(42, 100n, true);
console.log(`Cost: ${formatEther(cost)} AVAX`);
```

### `markets.quoteSharesForPayment(marketId, payment, isOver)` → `bigint`

Preview how many shares you receive for a given AVAX amount.

```typescript
// How many OVER shares do I get for 0.5 AVAX?
const shares = await client.markets.quoteSharesForPayment(
  42,
  parseEther('0.5'),
  true
);
```

### `markets.create(params, initialBet?, betOnOver?)` → `{ marketId, txHash }`

Create a new prediction market. Requires wallet client.

```typescript
const { marketId } = await clientWithWallet.markets.create({
  postUrl: 'https://x.com/user/status/123456789',
  platform: 'twitter',
  metricType: 'likes',
  threshold: 500_000,
  startTime: Math.floor(Date.now() / 1000),
  endTime: Math.floor(Date.now() / 1000) + 86400,        // 24 hours
  resolutionTime: Math.floor(Date.now() / 1000) + 90000, // 25 hours
});

console.log(`Market created: ID ${marketId}`);
```

### `markets.buyShares(marketId, isOver, amountAvax)` → `txHash`

Place a bet. Sends AVAX on-chain.

```typescript
// Bet 0.5 AVAX on OVER
const txHash = await clientWithWallet.markets.buyShares(
  42,
  true,  // isOver
  parseEther('0.5')
);
```

### `markets.sellShares(marketId, shares, isOver)` → `txHash`

Exit a position before market resolution.

```typescript
// Sell 50 OVER shares back to the market
const txHash = await clientWithWallet.markets.sellShares(42, 50n, true);
```

### `markets.claimWinnings(marketId)` → `txHash`

Claim payout from a resolved market you won.

```typescript
const txHash = await clientWithWallet.markets.claimWinnings(42);
```

### `markets.claimRefund(marketId)` → `txHash`

Claim a full refund from a cancelled market.

```typescript
const txHash = await clientWithWallet.markets.claimRefund(42);
```

---

## Positions Module

### `positions.get(marketId, userAddress)` → `Position`

Get a user's position in a specific market.

```typescript
const position = await client.positions.get(42, '0xYourAddress');

console.log(position.overShares);  // OVER shares held
console.log(position.underShares); // UNDER shares held
console.log(position.claimed);     // Whether winnings have been claimed
```

### `positions.listByUser(userAddress)` → `Position[]`

List all positions for a user across all markets.

```typescript
const positions = await client.positions.listByUser('0xYourAddress');
```

---

## Oracle Module

### `oracle.getLatestMetric(marketId)` → `{ value, timestamp }`

Read the latest oracle result for a market.

```typescript
const { value, timestamp } = await client.oracle.getLatestMetric(42);
// value: 4872941n (actual likes fetched by Chainlink)
// timestamp: 1711929600n
```

### `oracle.fetchMetric(postUrl, platform, metricType)` → `MetricResult`

Directly query the TrendZap oracle adapter (off-chain).

```typescript
const result = await client.oracle.fetchMetric(
  'https://x.com/user/status/123',
  'twitter',
  'likes'
);
// result.value: 847293
```

---

## TypeScript Types

```typescript
import type {
  Market,
  MarketParams,
  MarketState,
  MarketStatus,
  Position,
  Platform,      // 'TWITTER' | 'YOUTUBE' | 'TIKTOK' | 'INSTAGRAM'
  MetricType,    // 'LIKES' | 'VIEWS' | 'RETWEETS' | 'COMMENTS' | 'SHARES'
  Outcome,       // 'NONE' | 'OVER' | 'UNDER'
  TrendZapClientConfig,
} from '@trendzap/sdk';
```

---

## Error Handling

```typescript
import {
  TrendZapError,
  MarketNotFoundError,
  MarketNotActiveError,
  InsufficientBalanceError,
  AlreadyClaimedError,
} from '@trendzap/sdk';

try {
  await clientWithWallet.markets.buyShares(999, true, parseEther('1'));
} catch (error) {
  if (error instanceof MarketNotFoundError) {
    console.error('Market 999 does not exist');
  } else if (error instanceof MarketNotActiveError) {
    console.error('Market is not accepting bets');
  } else if (error instanceof TrendZapError) {
    console.error('TrendZap error:', error.message, error.code);
  }
}
```

---

## Example: Farcaster Frame Integration

```typescript
import { TrendZapClient } from '@trendzap/sdk';
import { parseEther } from 'viem';

// Get top 3 active markets for display in a Frame
const client = new TrendZapClient({ chain: 'avalanche' });

export async function getTopMarkets() {
  const markets = await client.markets.list({
    status: 'active',
    limit: 3,
    sortBy: 'volume',
  });
  return markets.map(m => ({
    id: m.id,
    description: `${m.params.platform} · ${m.params.threshold.toLocaleString()} ${m.params.metricType}`,
    probOver: m.probOver,
    probUnder: m.probUnder,
    pool: formatEther(m.state.totalVolume) + ' AVAX',
  }));
}
```

---

## Source Code

📦 [github.com/trendzaphq/trendzap-sdk](https://github.com/trendzaphq/trendzap-sdk)

---

## Next Steps

- [Smart Contracts](/docs/developers/smart-contracts) — Direct contract interaction reference
- [Oracle Integration](/docs/developers/oracle-integration) — How the oracle pipeline works
- [Subgraph](/docs/developers/subgraph) — Query historical data via GraphQL
