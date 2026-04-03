---
sidebar_position: 2
title: Earned Trust
description: How TrendZap earns trust through security, transparency, and non-custodial design.
---

# Earned Trust

Trust in a prediction market protocol is not granted — it's earned. This page documents exactly what we have done, what we are doing, and what the verifiable facts are. No vague claims.

---

## Non-Custodial by Design

TrendZap never holds your funds. Here is what actually happens to your USDC:

1. You call `approve()` on the USDC contract — authorising the market contract to spend a specific amount
2. You call `bet()` on the market contract — your USDC moves directly into the market contract
3. At resolution, the market contract distributes winnings to whoever calls `claim()`
4. If the market disputes, you call `withdrawStake()` to get your original USDC back

At no point does TrendZap hold your USDC in a team wallet or multisig. The smart contract is the custodian. The smart contract executes deterministically. There is no human in the middle.

---

## No Admin Keys on Markets

Once a `TrendZapMarket` contract is deployed:

- **No address can change the market parameters** — postUrl, threshold, endTime are immutable
- **No address can alter the resolution** — only the whitelisted Chainlink oracle address can call `resolve()`, and only once
- **No address can pause or cancel the market** — except for the automated dispute logic triggered by oracle validation failure

The Factory contract has an owner (TrendZap's deployer multisig) for creating markets and updating the creation fee. It does not have the ability to reach into deployed market contracts and change their state.

This is verifiable. The contract source is on GitHub, verified on Arbiscan. Read it.

---

## Open Source

All TrendZap code is published under the MIT license:

| Repository | Contents |
|------------|---------|
| `trendzaphq/trendzap-contracts` | Solidity smart contracts, Foundry tests |
| `trendzaphq/trendzap-oracle` | Oracle pipeline, fetchers, validators |
| `trendzaphq/trendzap-subgraph` | The Graph subgraph schema and handlers |
| `trendzaphq/trendzap-sdk` | TypeScript SDK |

MIT license means anyone can fork, audit, deploy, and build on TrendZap without asking permission.

---

## Smart Contract Audits

We take smart contract security seriously. Our approach:

**Pre-mainnet audit**
The TrendZapFactory and TrendZapMarket contracts will be audited by an independent security firm before mainnet deployment. The full audit report will be published here and linked from the repository.

**Continuous testing**
The contract suite has comprehensive Foundry test coverage including:
- Unit tests for all core functions
- Fuzz tests for parimutuel math
- Invariant tests for pool accounting
- Fork tests against mainnet Arbitrum state

**Bug bounty**
A bug bounty programme is active during testnet. Critical vulnerabilities disclosed responsibly will be rewarded. Details in the repository README.

The audit report will be linked here once published. Until then, treat the contracts as pre-audit software and size your positions accordingly.

---

## Oracle Transparency

The oracle pipeline is open source. What this means in practice:

- The fetcher code that queries each platform API is publicly readable
- The anomaly detection thresholds are published as constants in the repository
- Every oracle delivery transaction is visible on Arbiscan — Chainlink node address, value, timestamp
- The raw API responses are hash-committed at fetch time, so the value posted on-chain can be traced back to the original data

If you believe an oracle result was wrong, you can independently query the same platform API and compare. The result is either consistent with public data or it isn't.

---

## What We Are Not Claiming

We will not make claims we can't back up.

- We are **not** claiming to be fully audited until the audit is complete and the report is public
- We are **not** claiming zero risk — all smart contract protocols carry risk, including bugs in audited code
- We are **not** claiming the oracle is infallible — that's why there's a dispute state and a fund-return mechanism
- We are **not** claiming regulatory clarity — prediction markets operate in a complex and evolving legal environment; do your own research for your jurisdiction

---

## Track Record

TrendZap launched on testnet in early 2026. Since testnet launch:

- Hundreds of markets created and resolved without incident
- Zero fund losses due to contract bugs
- Zero disputed oracle results on well-formed markets
- Hackathon winner — recognised by the Arbitrum ecosystem for technical quality and product clarity

We are a small, focused team building in public. Every commit is on GitHub. Every deployment is on Arbiscan. We don't ask you to trust our word — we ask you to check the on-chain data.

---

## Reporting a Security Issue

If you discover a vulnerability, please report it responsibly:

**Email:** security@trendzap.xyz

Do not open a public GitHub issue for security vulnerabilities. We respond to all security disclosures within 24 hours.

---

## Next Steps

- [Finding PMF](/docs/protocol/product-market-fit) — Why this market exists and who it's for
- [Roadmap](/docs/protocol/roadmap) — Where the protocol is going
- [Architecture Overview](/docs/architecture/overview) — How the system is built
