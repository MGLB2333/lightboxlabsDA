export const mockProviders = [
  {
    id: 'Dentsu CCS',
    name: 'CCS',
    description: 'Lifestyle and demographic data',
    priority: 1,
    favicon: 'https://www.Dentsu.com/favicon.ico',
    segments: [
      {
        id: 'exp_1',
        name: 'I prefer to spend time with my family over friends',
        category: 'Interest',
        reach: '12M',
        cpm: 3.50,
        rationale: 'Indicates a strong family-oriented mindset, aligning with behaviors typical of households that prioritize family life, including pet ownership.'
      },
      {
        id: 'exp_2',
        name: 'Fresco – Flourishing Families ',
        category: 'Demographic',
        reach: '25M',
        cpm: 2.80,
        rationale: 'A segmentation label that likely captures stable, family-focused households — a prime target for pet-related products and services.'
      }
    ]
  },
  {
    id: 'Circana',
    name: 'Circana',
    description: 'Identity resolution and audience data',
    priority: 2,
    favicon: 'https://www.Circana.com/favicon.ico',
    segments: [
      {
        id: 'lr_1',
        name: 'Buy: All Pet food',
        category: 'Behavioral',
        reach: '4M',
        cpm: 4.20,
        rationale: 'Demonstrates direct purchasing behavior related to pet care, confirming pet ownership and interest in pet products'
      },
    ]
  },
  {
    id: 'Experian',
    name: 'Experian',
    description: 'Identity resolution and audience data',
    priority: 2,
    favicon: 'https://www.Experian.com/favicon.ico',
    segments: [
      {
        id: 'lr_1',
        name: 'Own Pet',
        category: 'Behavioral',
        reach: '4M',
        cpm: 4.20,
        rationale: 'Explicitly identifies individuals as pet owners — the most essential qualifier for a pet-related segment'
      },
    ]
  },
  {
    id: 'Vodafone',
    name: 'Vodafone',
    description: 'Identity resolution and audience data',
    priority: 2,
    favicon: 'https://www.Vodafone.co.uk/favicon.ico',
    segments: [
      {
        id: 'lr_1',
        name: 'Visited Pet store locations',
        category: 'Behavioral',
        reach: '4M',
        cpm: 4.20,
        rationale: 'Location data confirms offline engagement with pet-related retail, reinforcing real-world behavioral relevance to the segment'
      },
    ]
  },
  {
    id: 'ONS',
    name: 'ONS',
    description: 'Brand affinity and survey data',
    priority: 3,
    favicon: 'https://www.ons.gov.uk/favicon.ico',
    segments: [
      {
        id: 'yg_1',
        name: 'Age: 25-54',
        category: 'Interest',
        reach: '3.2M',
        cpm: 4.50,
        rationale: 'This age range captures the core life stage for parents raising children, where pet ownership is often integrated into family life'
      },
    ]
  }
];

export const mockSequences = [
  {
    id: 'seq_1',
    name: 'Women\'s Sports Fan Journey',
    steps: [
      {
        phase: 1,
        segment: 'Women 18-34',
        provider: 'Experian',
        rationale: 'Broad demographic targeting'
      },
      {
        phase: 2,
        segment: 'Female Sports Enthusiasts',
        provider: 'Experian',
        rationale: 'Interest-based refinement'
      },
      {
        phase: 3,
        segment: 'Women\'s Sports App Users',
        provider: 'LiveRamp',
        rationale: 'Behavioral targeting'
      }
    ]
  }
]; 