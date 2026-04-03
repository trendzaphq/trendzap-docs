---
sidebar_position: 4
title: Oracle Integration
description: How to build custom oracle adapters for TrendZap — adding new platforms, metrics, and data sources.
---

# Oracle Integration

TrendZap's oracle pipeline is designed to be extended. If you want to add a new social platform, a new metric type, or an alternative data source, this guide explains the integration points.

---

## Oracle Architecture Recap

The oracle pipeline has three components:

1. **Fetcher** — Retrieves raw data from an external API
2. **Validator** — Cross-references and applies anomaly detection
3. **Deliverer** — Posts the verified result on-chain via Chainlink

You can extend at any layer. The most common integration point is adding a new Fetcher for a new platform or metric.

---

## Fetcher Interface

All platform fetchers implement a common interface:

```typescript
interface MetricFetcher {
  platform: Platform;
  supportedMetrics: MetricType[];

  fetch(postUrl: string, metric: MetricType): Promise<FetchResult>;
}

interface FetchResult {
  value: bigint;
  fetchedAt: number;      // Unix timestamp
  rawResponse: unknown;   // Original API response for audit logging
  source: string;         // Identifier for this data source
}
```

---

## Adding a New Platform Fetcher

### 1. Implement the Interface

```typescript
import type { MetricFetcher, FetchResult } from '@trendzap/oracle-core';

export class BlueskyFetcher implements MetricFetcher {
  platform = 'BLUESKY' as const;
  supportedMetrics = ['LIKES', 'REPOSTS'] as const;

  constructor(private apiKey: string) {}

  async fetch(postUrl: string, metric: MetricType): Promise<FetchResult> {
    const postId = this.extractPostId(postUrl);
    const endpoint = `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${postId}`;

    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });

    if (!response.ok) {
      throw new FetchError(`Bluesky API error: ${response.status}`);
    }

    const data = await response.json();
    const value = this.extractMetric(data, metric);

    return {
      value: BigInt(value),
      fetchedAt: Date.now(),
      rawResponse: data,
      source: 'bluesky-api-v1',
    };
  }

  private extractPostId(url: string): string {
    // Parse AT URI from Bluesky URL
    const match = url.match(/profile\/(.+)\/post\/(.+)/);
    if (!match) throw new Error('Invalid Bluesky URL');
    return `at://${match[1]}/app.bsky.feed.post/${match[2]}`;
  }

  private extractMetric(data: unknown, metric: MetricType): number {
    const thread = (data as any).thread?.post;
    switch (metric) {
      case 'LIKES': return thread?.likeCount ?? 0;
      case 'REPOSTS': return thread?.repostCount ?? 0;
      default: throw new Error(`Unsupported metric: ${metric}`);
    }
  }
}
```

### 2. Register the Fetcher

```typescript
import { OraclePipeline } from '@trendzap/oracle-core';
import { BlueskyFetcher } from './fetchers/bluesky';

const pipeline = new OraclePipeline({
  fetchers: [
    new BlueskyFetcher(process.env.BLUESKY_API_KEY!),
    // ... existing fetchers
  ],
  chainlinkConfig: { ... },
});
```

### 3. Add a Secondary Source

For the cross-reference validation step, add a secondary fetcher for the same platform if an independent API exists:

```typescript
export class BlueskySecondaryFetcher implements MetricFetcher {
  // Uses a different endpoint or API provider for cross-reference
}

const pipeline = new OraclePipeline({
  fetchers: [ new BlueskyFetcher(key), new BlueskySecondaryFetcher() ],
  crossReferenceTolerancePct: 5, // 5% max discrepancy
});
```

---

## Custom Validator

You can extend the validator with custom anomaly detection rules:

```typescript
import { BaseValidator, ValidationResult } from '@trendzap/oracle-core';

class CustomValidator extends BaseValidator {
  async validate(
    primary: FetchResult,
    secondary: FetchResult,
    historicalValues: bigint[],
  ): Promise<ValidationResult> {
    // Run base validation first
    const base = await super.validate(primary, secondary, historicalValues);
    if (!base.valid) return base;

    // Add custom rule: flag if value jumped 10× in last hour
    const lastHourValue = historicalValues.at(-1) ?? 0n;
    if (primary.value > lastHourValue * 10n && lastHourValue > 0n) {
      return {
        valid: false,
        reason: 'Anomalous 10× jump in last hour — possible bot activity',
      };
    }

    return { valid: true };
  }
}
```

---

## On-Chain Contract Requirements

For a new platform to be supported on-chain, the `Platform` enum in the Factory contract must include it. This requires a contract upgrade via governance. Submit a proposal in the TrendZap governance forum (link in community channels) with:

- Platform name and API documentation
- Evidence of stable, authenticated API access
- Proposed secondary data source for cross-referencing
- Your fetcher implementation (open source, MIT)

---

## Testing Your Integration

The oracle package includes a test harness:

```typescript
import { OracleTestHarness } from '@trendzap/oracle-core/testing';
import { BlueskyFetcher } from './fetchers/bluesky';

const harness = new OracleTestHarness();

// Run a dry-run oracle resolution without posting on-chain
const result = await harness.dryRun({
  fetcher: new BlueskyFetcher(process.env.BLUESKY_API_KEY!),
  postUrl: 'https://bsky.app/profile/user/post/123',
  metric: 'LIKES',
  threshold: 10000n,
});

console.log('Would resolve to:', result.outcomeIsOver ? 'OVER' : 'UNDER');
console.log('Final value:', result.finalValue);
console.log('Validation passed:', result.validationResult.valid);
```

---

## Next Steps

- [Oracle System](/docs/architecture/oracle-system) — Full pipeline architecture
- [Smart Contract Integration](/docs/developers/smart-contracts) — The `resolve()` interface the oracle calls
- [SDK Reference](/docs/developers/sdk-reference) — TypeScript SDK for end-to-end integration
