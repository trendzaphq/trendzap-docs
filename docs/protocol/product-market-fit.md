---
sidebar_position: 3
title: Finding PMF
description: The market thesis behind TrendZap — the demand signal, the user insights, and why this product has a place.
---

# Finding PMF

Product-Market Fit is not declared. It's observed. This page documents what we've seen, what we believe, and where the honest uncertainties are.

---

## The Core Observation

Social media engagement is the most-watched, least-financialized metric on the internet.

Billions of people track engagement metrics every day — creators monitoring their posts, marketers measuring campaigns, analysts reading cultural temperature, traders watching which narratives gain momentum. Everyone has opinions. No one has a financial instrument to express them.

TrendZap is that instrument.

---

## The Demand Signal

We did not build TrendZap and then look for users. We observed demand and built toward it.

**The pattern we kept seeing:**

- Prediction market users on other protocols building makeshift markets around viral events ("will this tweet blow up?") using generic yes/no contracts — clunky workarounds that proved the demand
- Crypto-adjacent social media analysts who publish engagement prediction threads with high follower counts but no way to monetise accuracy
- Content creators who obsessively check engagement data in the first 24 hours after posting — they already think in OVER/UNDER terms, they just don't have a market for it
- The enormous cultural weight of viral moments — a post going viral is a real economic event (brand deals, advertising rates, cultural relevance), yet it had no financial market

The gap was not conceptual. The gap was a product that made the market frictionless enough to actually use.

---

## Who We Built For First

Early prediction markets suffer from a bootstrapping problem: you need both sides of the bet for a market to function. We focused on user profiles who would naturally take opposing views on the same content.

**The analyst-observer:** Follows platforms obsessively, has strong models for what goes viral, wants to put conviction behind their read. Comfortable with on-chain tools. Already uses prediction markets for other topics.

**The creator-insider:** Posts content regularly, understands engagement dynamics from the inside, wants to hedge uncertainty. Has skin in the game before any market opens.

**The cultural trader:** Treats viral moments as signals — political, cultural, commercial. Wants exposure to viral velocity as an asset class.

These three profiles generate natural two-sided markets without needing external liquidity provision.

---

## What Hackathon Validation Told Us

We entered TrendZap in competitive web3 hackathons and won. That matters less for the trophy and more for what the evaluation process surfaces:

Technical reviewers asked hard questions about oracle manipulation and market integrity. We had answers — and refining those answers forced us to build the risk engine properly.

Non-technical judges responded immediately to the product concept without needing explanation. "I would have bet on that tweet" was the most common reaction. That's the closest thing to a cold PMF signal you get in an evaluation context.

Ecosystem judges from Arbitrum saw the protocol fitting naturally into the Arbitrum DeFi landscape — a new prediction surface that doesn't overlap with existing products. That led to ecosystem backing.

---

## What We Don't Know Yet

Honest PMF is specific about its uncertainties.

**Retention after the first market:** Does someone who bets on a trending tweet come back for the next one? We have early signal from testnet but not enough to be definitive.

**Market creation rate:** Will users create markets proactively, or will it be top-down seeded by the team? The answer shapes how we price creation fees and whether we need curation tooling.

**Bot manipulation in practice:** Our risk engine handles theoretical manipulation. Whether real adversaries probe it in earnest on mainnet is unknown. The dispute mechanism is there, but we'll learn a lot from early mainnet markets.

**Regulatory posture:** Prediction markets sit in a complex legal environment. We've structured TrendZap as a protocol, not a service, but we are not claiming legal clarity. This is a real risk.

---

## The Market Opportunity We're Targeting

We are not chasing a TAM number. We are targeting a specific behaviour shift:

There are tens of millions of people who already track viral metrics closely. A small fraction of those with on-chain access and prediction conviction is a large enough early cohort to build real market depth. You don't need the whole engagement economy on day one — you need the engaged edge.

As prediction accuracy compounds into reputation and on-chain track records, the user base expands from early adopters to anyone with an internet connection and an opinion on what goes viral.

---

## The Honest Summary

We built something that people immediately understand and want to use. The core loop works. The oracle risk is real but managed. The platform has ecosystem backing and a track record from hackathons through testnet.

PMF at scale is still ahead of us. We're building toward it honestly.

---

## Next Steps

- [Roadmap](/docs/protocol/roadmap) — What we're building and when
- [Earned Trust](/docs/protocol/trust) — Security, transparency, and what we can verify
- [What is TrendZap?](/docs/introduction/what-is-trendzap) — Back to the basics
