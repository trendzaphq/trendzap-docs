// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TrendZap Documentation',
  tagline: 'The decentralized prediction market for social media virality',
  favicon: 'img/favicon.ico',

  url: 'https://docs.trendzap.xyz',
  baseUrl: '/',

  organizationName: 'trendzaphq',
  projectName: 'trendzap-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/trendzaphq/trendzap-docs/tree/main/',
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
      image: 'img/trendzap-social-card.png',
      navbar: {
        title: 'TrendZap',
        logo: {
          alt: 'TrendZap Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://trendzap.xyz',
            label: 'App',
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
              { label: 'Introduction', to: '/docs/introduction/what-is-trendzap' },
              { label: 'Quick Start', to: '/docs/getting-started/quick-start' },
              { label: 'SDK Reference', to: '/docs/developers/sdk-reference' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Twitter', href: 'https://twitter.com/TrendZapHQ' },
              { label: 'Discord', href: 'https://discord.gg/trendzap' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'GitHub', href: 'https://github.com/trendzaphq' },
              { label: 'Arbitrum', href: 'https://arbitrum.io' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} TrendZap. Built on Arbitrum.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['solidity', 'typescript', 'bash'],
      },
    }),
};

export default config;
