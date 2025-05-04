import { Tool } from '../types';

export const tools: Tool[] = [
  {
    id: '1',
    name: 'CS Insight AI',
    description: 'Advanced analytics platform for customer success teams with predictive insights and automated reporting.',
    category: 'Customer Analytics',
    pricing: {
      type: 'Freemium',
      startingPrice: '$49/mo'
    },
    features: [
      'Real-time customer health monitoring',
      'Predictive churn analysis',
      'Custom dashboard creation',
      'Automated reporting'
    ],
    integrations: ['Salesforce', 'HubSpot', 'Zendesk', 'Slack'],
    rating: 4.8,
    reviews: 128,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Early churn prediction',
      'Customer health monitoring',
      'Success planning'
    ]
  },
  {
    id: '2',
    name: 'AutoSupport Pro',
    description: 'AI-powered customer support automation tool that helps scale your CS operations.',
    category: 'Support Automation',
    pricing: {
      type: 'Paid',
      startingPrice: '$99/mo'
    },
    features: [
      'Automated ticket routing',
      'Smart response suggestions',
      'Knowledge base automation',
      'Performance analytics'
    ],
    integrations: ['Intercom', 'Zendesk', 'Freshdesk', 'Help Scout'],
    rating: 4.7,
    reviews: 95,
    imageUrl: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Ticket deflection',
      'Response time improvement',
      'Knowledge management'
    ]
  },
  {
    id: '3',
    name: 'SentimentScope',
    description: 'Advanced sentiment analysis platform that processes customer interactions across all channels.',
    category: 'Sentiment Analysis',
    pricing: {
      type: 'Paid',
      startingPrice: '$199/mo'
    },
    features: [
      'Multi-language sentiment detection',
      'Real-time emotion tracking',
      'Conversation tone analysis',
      'Sentiment trend reporting',
      'Custom alert thresholds'
    ],
    integrations: ['Slack', 'Microsoft Teams', 'Gmail', 'Outlook', 'Salesforce'],
    rating: 4.9,
    reviews: 156,
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Customer satisfaction monitoring',
      'Brand sentiment tracking',
      'Support quality assurance'
    ]
  },
  {
    id: '4',
    name: 'OnboardingAI',
    description: 'Intelligent customer onboarding platform that automates and personalizes the onboarding journey.',
    category: 'Onboarding Tools',
    pricing: {
      type: 'Freemium',
      startingPrice: '$79/mo'
    },
    features: [
      'Personalized onboarding flows',
      'Progress tracking dashboard',
      'Interactive tutorials',
      'Success milestone tracking',
      'Automated follow-ups'
    ],
    integrations: ['Salesforce', 'HubSpot', 'Segment', 'Mixpanel'],
    rating: 4.6,
    reviews: 89,
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Customer onboarding automation',
      'Training program management',
      'User activation optimization'
    ]
  },
  {
    id: '5',
    name: 'RetentionGuard',
    description: 'AI-powered retention management system that predicts and prevents customer churn.',
    category: 'Retention Management',
    pricing: {
      type: 'Paid',
      startingPrice: '$299/mo'
    },
    features: [
      'Predictive churn modeling',
      'Customer health scoring',
      'Automated intervention triggers',
      'Revenue impact analysis',
      'Retention strategy recommendations'
    ],
    integrations: ['Salesforce', 'Stripe', 'ChargeBee', 'Zuora'],
    rating: 4.8,
    reviews: 112,
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Churn prevention',
      'Revenue retention',
      'Customer loyalty programs'
    ]
  },
  {
    id: '6',
    name: 'HealthScore360',
    description: 'Comprehensive customer health scoring platform using machine learning for accurate predictions.',
    category: 'Customer Health Scoring',
    pricing: {
      type: 'Paid',
      startingPrice: '$249/mo'
    },
    features: [
      'ML-powered health scoring',
      'Custom scoring models',
      'Risk factor identification',
      'Automated alerts',
      'Trend analysis'
    ],
    integrations: ['Salesforce', 'Gainsight', 'Totango', 'Planhat'],
    rating: 4.7,
    reviews: 78,
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Customer health monitoring',
      'Risk assessment',
      'Success planning'
    ]
  },
  {
    id: '7',
    name: 'VoiceAI Insights',
    description: 'Voice analytics platform for customer calls and meetings with AI-powered insights.',
    category: 'Customer Analytics',
    pricing: {
      type: 'Paid',
      startingPrice: '$399/mo'
    },
    features: [
      'Call transcription & analysis',
      'Sentiment detection',
      'Key topic extraction',
      'Meeting summarization',
      'Action item tracking'
    ],
    integrations: ['Zoom', 'Google Meet', 'Microsoft Teams', 'RingCentral'],
    rating: 4.6,
    reviews: 64,
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Call quality monitoring',
      'Training improvement',
      'Customer feedback analysis'
    ]
  }
];