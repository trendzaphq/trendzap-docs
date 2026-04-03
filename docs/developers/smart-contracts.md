---
sidebar_position: 2
title: Smart Contract Integration
description: How to interact directly with TrendZap contracts — placing bets, reading state, and listening to events.
---

# Smart Contract Integration

You can interact with TrendZap contracts directly using any EVM-compatible library. This guide covers the most common integration patterns using Viem and Ethers.js.

---

## ABIs

The full contract ABIs are available in the open-source repo at `github.com/trendzaphq/trendzap-contracts`. The key functions you'll need:

### TrendZapMarket ABI (excerpt)

```typescript
const MARKET_ABI = [
  // Read
  {
    name: 'postUrl',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'string' }],
  },
  {
    name: 'threshold',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'totalOverStake',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'totalUnderStake',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    name: 'getPosition',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [
      { name: 'overStake', type: 'uint256' },
      { name: 'underStake', type: 'uint256' },
    ],
  },
  {
    name: 'resolved',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'bool' }],
  },
  {
    name: 'outcomeIsOver',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'bool' }],
  },
  // Write
  {
    name: 'bet',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'isOver', type: 'bool' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [],
  },
  {
    name: 'claim',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
] as const;
```

---

## Reading Market State (Viem)

```typescript
import { createPublicClient, http } from 'viem';
import { arbitrum } from 'viem/chains';

const client = createPublicClient({
  chain: arbitrum,
  transport: http(),
});

const MARKET_ADDRESS = '0x...'; // specific market address

// Read basic market info
const [postUrl, threshold, endTime] = await Promise.all([
  client.readContract({ address: MARKET_ADDRESS, abi: MARKET_ABI, functionName: 'postUrl' }),
  client.readContract({ address: MARKET_ADDRESS, abi: MARKET_ABI, functionName: 'threshold' }),
  client.readContract({ address: MARKET_ADDRESS, abi: MARKET_ABI, functionName: 'endTime' }),
]);

// Read pool state
const [overStake, underStake] = await Promise.all([
  client.readContract({ address: MARKET_ADDRESS, abi: MARKET_ABI, functionName: 'totalOverStake' }),
  client.readContract({ address: MARKET_ADDRESS, abi: MARKET_ABI, functionName: 'totalUnderStake' }),
]);

// Implied probability
const total = overStake + underStake;
const overProbability = Number(overStake) / Number(total);

// Read a user's position
const [userOver, userUnder] = await client.readContract({
  address: MARKET_ADDRESS,
  abi: MARKET_ABI,
  functionName: 'getPosition',
  args: ['0xUserAddress'],
});
```

---

## Placing a Bet (Viem)

Betting requires two transactions: USDC approval (first time) and the actual bet.

```typescript
import { createWalletClient, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

const USDC_ADDRESS = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831';
const USDC_ABI = [
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [{ type: 'bool' }],
  },
] as const;

const walletClient = createWalletClient({
  account: privateKeyToAccount('0xPrivateKey'),
  chain: arbitrum,
  transport: http(),
});

const betAmount = parseUnits('10', 6); // 10 USDC (6 decimals)

// Step 1: Approve USDC spend
await walletClient.writeContract({
  address: USDC_ADDRESS,
  abi: USDC_ABI,
  functionName: 'approve',
  args: [MARKET_ADDRESS, betAmount],
});

// Step 2: Place bet
await walletClient.writeContract({
  address: MARKET_ADDRESS,
  abi: MARKET_ABI,
  functionName: 'bet',
  args: [true, betAmount], // true = OVER, false = UNDER
});
```

---

## Listening to Events

```typescript
// Watch for new bets on a market
const unwatch = client.watchContractEvent({
  address: MARKET_ADDRESS,
  abi: MARKET_ABI,
  eventName: 'BetPlaced',
  onLogs: (logs) => {
    for (const log of logs) {
      console.log('New bet:', {
        user: log.args.user,
        isOver: log.args.isOver,
        amount: log.args.amount,
      });
    }
  },
});

// Watch for market resolution
client.watchContractEvent({
  address: MARKET_ADDRESS,
  abi: MARKET_ABI,
  eventName: 'MarketResolved',
  onLogs: (logs) => {
    const log = logs[0];
    console.log('Market resolved:', {
      outcomeIsOver: log.args.outcomeIsOver,
      finalValue: log.args.finalMetricValue,
    });
  },
});
```

---

## Claiming Winnings

```typescript
// Check if user can claim
const isResolved = await client.readContract({
  address: MARKET_ADDRESS, abi: MARKET_ABI, functionName: 'resolved',
});

const outcomeIsOver = await client.readContract({
  address: MARKET_ADDRESS, abi: MARKET_ABI, functionName: 'outcomeIsOver',
});

const [userOverStake, userUnderStake] = await client.readContract({
  address: MARKET_ADDRESS,
  abi: MARKET_ABI,
  functionName: 'getPosition',
  args: ['0xUserAddress'],
});

const userWon = isResolved && (
  (outcomeIsOver && userOverStake > 0n) ||
  (!outcomeIsOver && userUnderStake > 0n)
);

if (userWon) {
  await walletClient.writeContract({
    address: MARKET_ADDRESS,
    abi: MARKET_ABI,
    functionName: 'claim',
  });
}
```

---

## Getting All Markets (Factory)

```typescript
const FACTORY_ABI = [
  {
    name: 'getMarkets',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'offset', type: 'uint256' },
      { name: 'limit', type: 'uint256' },
    ],
    outputs: [{ type: 'address[]' }],
  },
] as const;

const FACTORY_ADDRESS = '0x...';

const markets = await client.readContract({
  address: FACTORY_ADDRESS,
  abi: FACTORY_ABI,
  functionName: 'getMarkets',
  args: [0n, 20n], // first 20 markets
});
```

---

## Using the TypeScript SDK Instead

For most use cases, the [SDK Reference](/docs/developers/sdk-reference) is simpler and handles USDC approval, gas estimation, and error handling automatically.

Use direct contract interaction when:
- You need lower-level control
- You're building a custom frontend with your own state management
- You're integrating in a non-TypeScript environment

---

## Next Steps

- [SDK Reference](/docs/developers/sdk-reference) — High-level TypeScript SDK
- [Subgraph](/docs/developers/subgraph) — Query market state without RPC calls
- [Smart Contract Architecture](/docs/architecture/smart-contracts) — Full ABI and address reference
