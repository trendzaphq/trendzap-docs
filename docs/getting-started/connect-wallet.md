---
sidebar_position: 2
title: Connect Wallet
description: How to connect your wallet to TrendZap on Arbitrum One.
---

# Connect Wallet

TrendZap is a non-custodial protocol. Your wallet is your account. Here's how to connect it.

---

## Supported Wallets

| Wallet | Type | Notes |
|--------|------|-------|
| MetaMask | Browser extension / Mobile | Most widely used |
| Coinbase Wallet | Browser extension / Mobile | Built-in Arbitrum support |
| Rabby | Browser extension | Multi-chain with security hints |
| Rainbow | Mobile | Simple, clean UI |
| Ledger + MetaMask | Hardware | Most secure option |
| Any WalletConnect wallet | Mobile | 300+ wallets supported |

---

## Connecting MetaMask

1. Install [MetaMask](https://metamask.io) as a browser extension
2. Create a new wallet or import an existing one with your seed phrase
3. Go to [trendzap.xyz](https://trendzap.xyz)
4. Click **Connect Wallet** → **MetaMask**
5. MetaMask will prompt you to connect — click **Connect**
6. If not already on Arbitrum One, MetaMask will ask to switch networks — click **Switch Network**

MetaMask will add Arbitrum One to your network list automatically. You only need to do this once.

:::caution
Never share your seed phrase. TrendZap will never ask for it. If any site asks for your seed phrase, it is a scam.
:::

---

## Connecting Coinbase Wallet

1. Install Coinbase Wallet as a browser extension or mobile app
2. Go to [trendzap.xyz](https://trendzap.xyz)
3. Click **Connect Wallet** → **Coinbase Wallet**
4. If on mobile, scan the QR code with the Coinbase Wallet app
5. Approve the connection

Coinbase Wallet has native Arbitrum One support — no manual network configuration needed.

---

## Connecting via WalletConnect

WalletConnect supports 300+ mobile wallets including Rainbow, Trust Wallet, imToken, and many others.

1. Go to [trendzap.xyz](https://trendzap.xyz)
2. Click **Connect Wallet** → **WalletConnect**
3. A QR code appears in the modal
4. Open your mobile wallet and scan the QR code
5. Approve the connection on your phone

Ensure your mobile wallet is set to Arbitrum One before connecting.

---

## Adding Arbitrum One Manually

If your wallet doesn't auto-detect Arbitrum, add it manually:

```
Network Name:    Arbitrum One
RPC URL:         https://arb1.arbitrum.io/rpc
Chain ID:        42161
Currency Symbol: ETH
Block Explorer:  https://arbiscan.io
```

In MetaMask: Settings → Networks → Add a network → Add it manually.

---

## Testnet (Arbitrum Sepolia)

For testing without real funds:

```
Network Name:    Arbitrum Sepolia
RPC URL:         https://sepolia-rollup.arbitrum.io/rpc
Chain ID:        421614
Currency Symbol: ETH
Block Explorer:  https://sepolia.arbiscan.io
```

Get testnet ETH from [Alchemy Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia).

---

## Troubleshooting

**"Wrong network" error**
Your wallet is connected to a different chain. Switch to Arbitrum One (Chain ID 42161) in your wallet's network selector.

**Transaction stuck or failing**
Try increasing the gas limit slightly. On Arbitrum, gas prices are stable but the limit matters for complex contract interactions.

**Wallet disconnects on page refresh**
This is a browser extension quirk. Click **Connect Wallet** again — it will reconnect without asking for approval a second time.

**Can't see my USDC balance**
Make sure you're on Arbitrum One and that USDC is added as a custom token: `0xaf88d065e77c8cC2239327C5EDb3A432268e5831` (native USDC on Arbitrum One).

---

## Security Notes

- TrendZap contracts are read-only until you sign a transaction
- The protocol only requests approval to spend the USDC amount you've entered — not unlimited approval
- Always verify the URL is `trendzap.xyz` before connecting
- Check contract addresses against those listed in [Smart Contracts](/docs/architecture/smart-contracts)

---

## Next Steps

- [Quick Start](/docs/getting-started/quick-start) — Back to the full onboarding flow
- [Your First Bet](/docs/getting-started/first-bet) — Walk through placing your first position
