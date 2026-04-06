---
sidebar_position: 2
title: Earned Trust
description: How TrendZap earns trust through security, transparency, and non-custodial design.
---

# Earned Trust

Trust in a prediction market protocol is not granted — it's earned. This page documents exactly what we've done, what we're doing, and what the verifiable facts are. No vague claims.

---

## Non-custodial by design

TrendZap never holds your funds. Here is what actually happens to your AVAX:

1. You call `bet()` on the market contract — your AVAX moves directly into the market contract
2. At resolution, the oracle writes the outcome on-chain
3. You call `claim()` on the market contract — your AVAX payout goes directly to your wallet
4. If the market is dissolved, you call `claim()` to get your original AVAX back

At no point does TrendZap hold your AVAX in a team wallet or multisig. The smart contract is the custodian. It executes deterministically. There is no human in the middle.

---

## No admin keys on markets

Once a market contract is deployed:

- **No address can change the market parameters** — post URL, threshold, deadline are immutable
- **No address can alter the resolution** — only the oracle service address can call `resolve()`, and only once
- **No address can pause or cancel the market** — except the automated dissolution triggered by oracle failure

The Factory contract has a secure admin multisig for managing the market registry. It cannot reach into deployed market contracts and change their state.

This is verifiable on [Snowtrace](https://snowtrace.io). The contracts are deployed and readable.

---

## Open source

Core TrendZap smart contracts and documentation are publicly available. The contracts can be read and verified by anyone.

The codebase is published at [github.com/trendzaphq](https://github.com/trendzaphq).

---

## Smart contract security

The TrendZapFactory and ViralityMarket contracts are deployed on Avalanche C-Chain mainnet. A formal security audit is planned. Until published, treat the contracts as unaudited software and size your positions accordingly.

The contracts are open source and can be reviewed by anyone at any time.

---

## Oracle transparency

The oracle pipeline:

- Fetches from official platform APIs — not scraping
- Writes resolution results as on-chain transactions, publicly visible on Snowtrace
- Uses a dedicated oracle wallet address — all resolution calls are attributable

If you believe an oracle result was wrong, you can independently query the same platform API and compare. The result is either consistent with public data or it isn't.

---

## What we are not claiming

We won't make claims we can't back up.

- We're **not** claiming to be fully audited until the audit is complete and published
- We're **not** claiming zero risk — all smart contracts carry risk, including audited ones
- We're **not** claiming the oracle is infallible — that's why there's a dissolution mechanism for failed resolutions
- We're **not** claiming regulatory clarity — do your own research for your jurisdiction

---

## Reporting a security issue

If you discover a vulnerability, report it responsibly:

**Email:** security@trendzap.xyz

Do not open a public GitHub issue for security vulnerabilities. We respond to all disclosures within 24 hours.

---

## Next steps

- [Architecture Overview](/docs/architecture/overview) — how the system is built
- [Roadmap](/docs/protocol/roadmap) — where the protocol is going
