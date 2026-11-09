export const nav = [
  {
    label: 'Solutions',
    items: [
      { label: 'AI Anomaly Detection and Fraud Prevention', href: '/ai-anomaly-detection-for-government-agencies' },
      { label: 'AI Identity Management Solutions', href: '/voice-biometrics-security-for-the-us-public-sector' },
      { label: 'Citizen Experience Solutions', href: '/enhanced-citizen-solutions' },
      { label: 'Corporate AI Training and Enablement', href: '/ai-corporate-training' },
    ],
  },
  {
    label: 'About',
    items: [
      { label: 'About us', href: '/about-nforceai' },
      { label: 'Responsible use of AI', href: '/responsible-use-of-ai' },
      { label: 'Our NAICS codes', href: '/naics-codes' },
    ],
  },
  {
    label: 'Resources',
    items: [{ label: 'AI tools we love', href: '/resources/our-favorite-ai-tools' }],
  },
];

export const naics = [
  { code: '513210', title: 'Software Publishers' },
  { code: '518210', title: 'Data Processing, Hosting, and Related Services' },
  { code: '541511', title: 'Custom Computer Programming Services' },
  { code: '541512', title: 'Computer Systems Design Services' },
  { code: '541519', title: 'Other Computer Related Services' },
];

/** Listed as on the current site. Wording to be confirmed by nForce before launch. */
export const certifications = [
  'CMMC compliant',
  'ISO 27001',
  'ISO 27701',
  'ISO 22301',
  'ISO 9001',
  'PCI DSS Level 1 (v4.0)',
  'FedRAMP Ready',
  'AWS GovCloud certified',
];

export const email = 'contact@nforceai.com';

export const articles = {
  taxCompliance: {
    href: '/resources/how-ai-and-big-data-analytics-are-transforming-tax-compliance-and-closing-the-tax-gap',
    title: 'How AI and big data analytics are transforming tax compliance and closing the tax gap',
    kind: 'Article',
  },
  taxGapCase: {
    href: '/case-study/case-study-leveraging-big-data-analytics-and-ai-to-combat-the-tax-gap',
    title: 'Leveraging big data analytics and AI to combat the tax gap',
    kind: 'Case study',
  },
  efficiency: {
    href: '/resources/how-ai-is-transforming-operational-efficiency-and-citizen-services-for-federal-agencies',
    title: 'How AI is transforming operational efficiency and citizen services for federal agencies',
    kind: 'Article',
  },
  femaCase: {
    href: '/case-study/case-study-accelerating-disaster-financial-relief-with-digital-innovation-for-fema',
    title: 'Accelerating disaster financial relief with digital innovation for FEMA',
    kind: 'Case study',
  },
  voiceServices: {
    href: '/resources/how-ai-driven-voice-biometrics-can-improve-citizen-services-and-efficiency',
    title: 'How AI-driven voice biometrics can improve citizen services and efficiency',
    kind: 'Article',
  },
  voiceSecurity: {
    href: '/resources/securing-government-operations-with-ai-driven-voice-biometrics-and-deepfake-detection',
    title: 'Securing government operations with AI-driven voice biometrics and deepfake detection',
    kind: 'Article',
  },
} as const;

export const sources = {
  treasury: 'https://home.treasury.gov/news/press-releases/jy2134',
  treasuryOpi: 'https://paymentintegrity.treasury.gov/paymentintegrity/custom/fraud-detection',
  itrc: 'https://www.idtheftcenter.org/publication/2023-data-breach-report/',
  pindrop: 'https://www.pindrop.com/research/report/2024-voice-intelligence-security-report/',
};
