/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      collapsed: false,
      items: [
        'introduction/what-is-trendzap',
        'introduction/how-it-works',
        'introduction/why-this-chain',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/quick-start',
        'getting-started/connect-wallet',
        'getting-started/first-bet',
      ],
    },
    {
      type: 'category',
      label: 'User Guide',
      items: [
        'user-guide/placing-bets',
        'user-guide/creating-markets',
        'user-guide/understanding-odds',
        'user-guide/claiming-winnings',
      ],
    },
    {
      type: 'category',
      label: 'Protocol',
      items: [
        'protocol/vision',
        'protocol/product-market-fit',
        'protocol/trust',
        'protocol/roadmap',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
        'architecture/smart-contracts',
        'architecture/oracle-system',
        'architecture/risk-engine',
      ],
    },
    {
      type: 'category',
      label: 'Developers',
      items: [
        'developers/sdk-reference',
        'developers/smart-contracts',
        'developers/subgraph',
        'developers/oracle-integration',
      ],
    },
    'faq/index',
    {
      type: 'category',
      label: 'Legal',
      collapsed: true,
      items: [
        'legal/terms',
        'legal/privacy',
      ],
    },
  ],
};

export default sidebars;
