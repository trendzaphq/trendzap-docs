---
sidebar_position: 2
title: Connect Wallet
description: How to connect your wallet to TrendZap on Avalanche C-Chain.
---

# Connect Wallet

TrendZap is non-custodial. Your wallet is your account. Here's how to connect it.

---

## Supported wallets

| Wallet | Type | Notes |
|--------|------|-------|
| MetaMask | Browser extension / Mobile | Most widely used |
| Coinbase Wallet | Browser extension / Mobile | Smart Wallet support built-in |
| Rabby | Browser extension | Multi-chain with security hints |
| Rainbow | Mobile | Simple, clean UI |
| Ledger + MetaMask | Hardware | Most secure option |
| Any WalletConnect wallet | Mobile | 300+ wallets supported |

---

## Connecting MetaMask

1. Install [MetaMask](https://metamask.io) as a browser extension
2. Create or import a wallet
3. Go to [app.trendzap.xyz](https://app.trendzap.xyz)
4. Click **Connect Wallet** → **MetaMask**
5. MetaMask prompts you to connect — click **Connect**
6. If not already on Avalanche C-Chain, MetaMask will ask to switch — click **Switch Network**

MetaMask adds Avalanche C-Chain to your network list automatically. You only need to do this once.

:::caution
Never share your seed phrase. TrendZap will never ask for it. Any site asking for your seed phrase is a scam.
:::

---

## Connecting Coinbase Wallet

1. Install Coinbase Wallet as a browser extension or mobile app
2. Go to [app.trendzap.xyz](https://app.trendzap.xyz)
3. Click **Connect Wallet** → **Coinbase Wallet**
4. Approve the connection
5. Switch to Avalanche C-Chain if prompted

TrendZap supports Coinbase Smart Wallet — users without an existing wallet can create one through the connect flow without a seed phrase.

---

## Connecting via WalletConnect

WalletConnect supports 300+ mobile wallets including Trust Wallet, Rainbow, imToken, and many others.

1. Go to [app.trendzap.xyz](https://app.trendzap.xyz)
2. Click **Connect Wallet** → **WalletConnect**
3. A QR code appears in the modal
4. Open your mobile wallet and scan the QR code
5. Approve the connection on your phone

Ensure your mobile wallet is set to Avalanche C-Chain before connecting.

---

## Adding Avalanche C-Chain manually

If your wallet doesn't auto-detect Avalanche:

```
Network Name:    Avalanche C-Chain
RPC URL:         https://api.avax.network/ext/bc/C/rpc
Chain ID:        43114
Currency Symbol: AVAX
Block Explorer:  https://snowtrace.io
```

In MetaMask: Settings → Networks → Add a network → Add it manually.

---

## Troubleshooting

**"Wrong network" error**
Your wallet is on a different chain. Switch to Avalanche C-Chain (Chain ID 43114) in your wallet's network selector.

**Transaction failing**
Make sure you have enough AVAX for gas (a few cents worth is sufficient). On Avalanche, gas is very cheap but you need a non-zero balance.

**Wallet disconnects on page refresh**
This is a browser extension behaviour. Click **Connect Wallet** again — it reconnects without asking for full approval again.

**Can't see my AVAX balance**
Confirm you're on Avalanche C-Chain (not Ethereum or another network). AVAX is the native token — it should appear automatically once on the right network.

---

## Security notes

- TrendZap contracts are read-only until you sign a transaction
- For your first bet, the app will request a USDC spending approval transaction — this is a one-time step per wallet
- Always verify the URL is `app.trendzap.xyz` before connecting
- Check contract addresses against those in [Why Avalanche?](/docs/introduction/why-this-chain)

---

## Next steps

- [Quick Start](/docs/getting-started/quick-start) — back to the full onboarding flow
- [Your First Bet](/docs/getting-started/first-bet) — walkthrough of placing your first position
