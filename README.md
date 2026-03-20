# TrendZap Documentation

> Official documentation for TrendZap - the decentralized prediction market for social media virality on Avalanche.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.0-green)](https://docusaurus.io/)

---

## Overview

This repository contains the official TrendZap documentation, built with Docusaurus 3. The docs cover everything from getting started to advanced SDK integration.

## Documentation Sections

| Section | Description |
|---------|-------------|
| **Introduction** | What is TrendZap, how it works |
| **Quick Start** | Get up and running in 5 minutes |
| **User Guide** | Creating markets, placing bets, claiming |
| **Developer Guide** | SDK, API, smart contracts |
| **Architecture** | System design and infrastructure |
| **FAQ** | Common questions answered |

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/trendzaphq/trendzap-docs.git
cd trendzap-docs

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to see the docs.

### Build

```bash
# Build for production
pnpm build

# Serve production build locally
pnpm serve
```

## Project Structure

```
trendzap-docs/
├── docs/
│   ├── introduction/
│   │   ├── what-is-trendzap.md
│   │   ├── how-it-works.md
│   │   └── why-avalanche.md
│   ├── getting-started/
│   │   ├── quick-start.md
│   │   ├── connect-wallet.md
│   │   └── first-bet.md
│   ├── user-guide/
│   │   ├── creating-markets.md
│   │   ├── placing-bets.md
│   │   ├── understanding-odds.md
│   │   └── claiming-winnings.md
│   ├── developers/
│   │   ├── sdk-reference.md
│   │   ├── smart-contracts.md
│   │   ├── subgraph.md
│   │   └── oracle-integration.md
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── smart-contracts.md
│   │   ├── oracle-system.md
│   │   └── risk-engine.md
│   └── faq/
│       └── index.md
├── src/
│   ├── components/
│   ├── css/
│   └── pages/
├── static/
│   └── img/
├── docusaurus.config.js
├── sidebars.js
├── package.json
└── README.md
```

## Writing Documentation

### Creating a New Page

1. Add a `.md` file in the appropriate `docs/` subfolder
2. Add frontmatter:

```markdown
---
sidebar_position: 1
title: My New Page
description: Description for SEO
---

# My New Page

Content goes here...
```

3. The page will automatically appear in the sidebar

### Code Blocks

Use triple backticks with language hints:

````markdown
```typescript
const client = new TrendZapClient({ chain: 'avalanche' });
```
````

### Admonitions

```markdown
:::note
This is a note
:::

:::tip
This is a tip
:::

:::warning
This is a warning
:::

:::danger
This is dangerous
:::
```

## Deployment

Documentation is automatically deployed to [docs.trendzap.xyz](https://docs.trendzap.xyz) on push to `main`.

### Manual Deployment

```bash
# Build and deploy to GitHub Pages
pnpm deploy
```

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Style Guide

- Use clear, concise language
- Include code examples where helpful
- Add screenshots for UI features
- Keep lines under 100 characters
- Use present tense

## Related Repositories

| Repository | Description |
|------------|-------------|
| [trendzap-app](https://github.com/trendzaphq/trendzap-app) | Main dApp |
| [trendzap-sdk](https://github.com/trendzaphq/trendzap-sdk) | SDK documented here |
| [trendzap-contracts](https://github.com/trendzaphq/trendzap-contracts) | Contracts documented here |

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">
  <strong>TrendZap Documentation 📚</strong>
</p>
