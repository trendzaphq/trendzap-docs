---
sidebar_position: 1
title: Quick Start
description: Get from zero to your first TrendZap bet in under five minutes.
---

# Quick Start

Get from zero to your first prediction in under five minutes.

---

## What You Need

- A browser wallet: MetaMask, Coinbase Wallet, Rabby, or any WalletConnect-compatible wallet
- The Arbitrum One network added to your wallet
- A small amount of ETH for gas (typically less than $0.10 per transaction)
- USDC to stake on a market

---

## Step 1 — Add Arbitrum to Your Wallet

If Arbitrum One isn't in your wallet yet, add it manually:

| Field | Value |
|-------|-------|
| Network Name | Arbitrum One |
| RPC URL | `https://arb1.arbitrum.io/rpc` |
| Chain ID | `42161` |
| Currency Symbol | ETH |
| Block Explorer | `https://arbiscan.io` |

Most wallets will add Arbitrum automatically when you connect to [trendzap.xyz](https://trendzap.xyz) for the first time.

:::tip Using a hardware wallet?
Arbitrum One is fully supported by Ledger and Trezor via MetaMask. Use the same network config above.
:::

---

## Step 2 — Get ETH on Arbitrum

You need a small amount of ETH on Arbitrum for gas. Options:

**Bridge from Ethereum mainnet**
Use the official [Arbitrum Bridge](https://bridge.arbitrum.io) to move ETH from mainnet. Takes ~15 minutes.

**Buy directly on-chain**
Most centralised exchanges (Coinbase, Binance, Kraken) support direct withdrawal to Arbitrum One.

**Testnet (Arbitrum Sepolia)**
If you want to test without real funds, use Arbitrum Sepolia. Request testnet ETH from the [Alchemy Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia) or [Chainlink Faucet](https://faucets.chain.link/arbitrum-sepolia).

---

## Step 3 — Get USDC

TrendZap uses USDC (Circle's native USDC on Arbitrum One) for all bets and payouts.

**Already have USDC on Ethereum mainnet?**
Bridge it via the official [Arbitrum Bridge](https://bridge.arbitrum.io) or [Stargate](https://stargate.finance).

**Swap for USDC on Arbitrum**
Use [Uniswap on Arbitrum](https://app.uniswap.org) to swap ETH or any Arbitrum token for USDC.

**Testnet USDC**
On Arbitrum Sepolia, use the faucet link in the TrendZap app to get testnet USDC for free.

---

## Step 4 — Connect Your Wallet

1. Go to [trendzap.xyz](https://trendzap.xyz)
2. Click **Connect Wallet** in the top right
3. Select your wallet provider
4. Approve the connection request
5. If prompted, switch to Arbitrum One

Your address will appear in the navbar once connected.

---

## Step 5 — Browse Markets

The main feed shows all active prediction markets. Each card shows:

- The social media post and platform
- The threshold (e.g. "500K likes")
- Current OVER / UNDER split
- Pool size in USDC
- Time remaining

Click any market to open the full detail view.

---

## Step 6 — Place Your Bet

1. Open a market you want to trade
2. Click **OVER** or **UNDER**
3. Enter your stake amount in USDC
4. Review the estimated payout
5. Click **Confirm Bet**
6. Approve the transaction in your wallet

That's it. Your position is recorded on Arbitrum. You can view it in your **Portfolio** tab at any time.

---

## What Happens Next?

When the market's end time arrives, the oracle fetches the final metric. If your side wins, a **Claim** button appears on the market card. Click it, confirm the transaction, and your USDC arrives in your wallet.

See [Claiming Winnings](/docs/user-guide/claiming-winnings) for the full flow.

---

## Need Help?

- [Connect Wallet Guide](/docs/getting-started/connect-wallet) — Detailed wallet setup for each provider
- [Your First Bet](/docs/getting-started/first-bet) — Walkthrough with screenshots
- [FAQ](/docs/faq) — Common questions answered
