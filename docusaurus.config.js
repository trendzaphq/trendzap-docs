// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

// Load environment variables
import 'dotenv/config';

// Load ecosystem configuration
import { activeConfig, currentEcosystem } from './ecosystem.config.js';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: `TrendZap on ${activeConfig.name}`,
  tagline: activeConfig.tagline,
  favicon: 'img/trendzap_logo.png',

  url: process.env.SITE_URL || 'https://docs.trendzap.xyz',
  baseUrl: '/',

  organizationName: 'trendzaphq',
  projectName: 'trendzap-docs',
  
  // Custom fields for ecosystem data access in components
  customFields: {
    ecosystem: currentEcosystem,
    ecosystemConfig: activeConfig,
  },

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
      },
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/trendzaphq/trendzap-docs/tree/main/',
          routeBasePath: 'docs',
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      image: 'img/trendzap_logo.png',
      metadata: [
        { name: 'theme-color', content: '#0a0a0a' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'og:type', content: 'website' },
      ],
      navbar: {
        logo: {
          alt: 'TrendZap Logo',
          src: 'img/logo.svg',
          style: { borderRadius: '8px' },
        },
        hideOnScroll: false,
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://trendzap.xyz',
            label: 'App →',
            position: 'right',
          },
          {
            href: 'https://github.com/trendzaphq',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: '🚀 Introduction', to: '/docs/introduction/what-is-trendzap' },
              { label: '⚡ Quick Start', to: '/docs/getting-started/quick-start' },
              { label: '🛠 SDK Reference', to: '/docs/developers/sdk-reference' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: '𝕏 Twitter / X', href: 'https://twitter.com/TrendZapHQ' },
              { label: '💬 Discord', href: 'https://discord.gg/trendzap' },
              { label: '📢 Telegram', href: 'https://t.me/+fsKNAii3K-Q5NWY0' },
            ],
          },
          {
            title: `Built on ${activeConfig.name}`,
            items: [
              { label: activeConfig.name, href: activeConfig.links.ecosystem },
              { label: activeConfig.oracle.provider, href: activeConfig.oracle.docsUrl },
              { label: 'GitHub ↗', href: 'https://github.com/trendzaphq' },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} TrendZap — The first social virality prediction market. Built on ${activeConfig.name}.`,
      },
      prism: {
        theme: {
          plain: {
            color: '#e2e8f0',
            backgroundColor: '#0a0a0a',
          },
          styles: [
            { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: '#4a5568', fontStyle: 'italic' } },
            { types: ['punctuation'], style: { color: '#718096' } },
            { types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'deleted'], style: { color: '#fc8181' } },
            { types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'], style: { color: '#4ade80' } },
            { types: ['operator', 'entity', 'url'], style: { color: '#22d3ee' } },
            { types: ['atrule', 'attr-value', 'keyword'], style: { color: '#a78bfa' } },
            { types: ['function', 'class-name'], style: { color: '#fbbf24' } },
            { types: ['regex', 'important', 'variable'], style: { color: '#f472b6' } },
          ],
        },
        darkTheme: {
          plain: {
            color: '#e2e8f0',
            backgroundColor: '#0a0a0a',
          },
          styles: [
            { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: '#4a5568', fontStyle: 'italic' } },
            { types: ['punctuation'], style: { color: '#718096' } },
            { types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'deleted'], style: { color: '#fc8181' } },
            { types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'], style: { color: '#4ade80' } },
            { types: ['operator', 'entity', 'url'], style: { color: '#22d3ee' } },
            { types: ['atrule', 'attr-value', 'keyword'], style: { color: '#a78bfa' } },
            { types: ['function', 'class-name'], style: { color: '#fbbf24' } },
            { types: ['regex', 'important', 'variable'], style: { color: '#f472b6' } },
          ],
        },
        additionalLanguages: ['solidity', 'typescript', 'bash', 'json'],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
    }),
};

export default config;
