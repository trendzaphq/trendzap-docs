/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'introduction/what-is-trendzap',
        'introduction/how-it-works',
        'introduction/why-arbitrum',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
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
        'user-guide/creating-markets',
        'user-guide/placing-bets',
        'user-guide/understanding-odds',
        'user-guide/claiming-winnings',
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
    'faq/index',
  ],
};

export default sidebars;
