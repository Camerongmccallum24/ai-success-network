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
    ],
    website: 'https://csinsightai.example.com'
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
    ],
    website: 'https://autosupportpro.example.com'
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
    ],
    website: 'https://sentimentscope.example.com'
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
    ],
    website: 'https://onboardingai.example.com'
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
    ],
    website: 'https://retentionguard.example.com'
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
    ],
    website: 'https://healthscore360.example.com'
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
    ],
    website: 'https://voiceaiinsights.example.com'
  },
  {
    id: '8',
    name: 'ProactiveReach',
    description: 'AI-powered communication platform that automates personalized outreach based on customer behavior and lifecycle stage.',
    category: 'Support Automation',
    pricing: {
      type: 'Freemium',
      startingPrice: '$59/mo'
    },
    features: [
      'Behavior-triggered messaging',
      'Personalized email sequences',
      'In-app notification automation',
      'Multi-channel campaign builder',
      'Engagement analytics dashboard'
    ],
    integrations: ['HubSpot', 'Salesforce', 'Braze', 'Intercom', 'Slack'],
    rating: 4.7,
    reviews: 103,
    imageUrl: 'https://images.unsplash.com/photo-1581092160612-3d4d75a1d7ca?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Lifecycle email campaigns',
      'Customer engagement automation',
      'Proactive support outreach'
    ],
    website: 'https://proactivereach.example.com'
  },
  {
    id: '9',
    name: 'SurveyGenius',
    description: 'AI-driven customer feedback platform that creates intelligent surveys and provides actionable insights from responses.',
    category: 'Customer Analytics',
    pricing: {
      type: 'Paid',
      startingPrice: '$129/mo'
    },
    features: [
      'Smart survey question generation',
      'NLP-based response analysis',
      'Real-time sentiment dashboards',
      'Predictive analytics engine',
      'Automated action item suggestions'
    ],
    integrations: ['Typeform', 'SurveyMonkey', 'Google Forms', 'Zendesk', 'CRM'],
    rating: 4.6,
    reviews: 81,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce687b7?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Customer satisfaction surveys',
      'Product feedback collection',
      'Experience improvement tracking'
    ],
    website: 'https://surveygenius.example.com'
  },
  {
    id: '10',
    name: 'StrategizeAI',
    description: 'Interactive strategy planning tool for customer success managers to build and optimize playbooks using AI guidance.',
    category: 'Retention Management',
    pricing: {
      type: 'Paid',
      startingPrice: '$219/mo'
    },
    features: [
      'AI playbook suggestions',
      'Scenario planning simulator',
      'Playbook effectiveness analysis',
      'Cross-functional workflow builder',
      'Best practice knowledge base'
    ],
    integrations: ['Gainsight', 'Totango', 'Salesforce', 'Miro', 'Asana'],
    rating: 4.5,
    reviews: 67,
    imageUrl: 'https://images.unsplash.com/photo-1560448070-cf5de7c2be2d?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Playbook optimization',
      'Risk mitigation planning',
      'Cross-functional strategy alignment'
    ],
    website: 'https://strategizeai.example.com'
  },
  {
    id: '11',
    name: 'TrainingBot',
    description: 'Personalized learning platform for customer success teams with AI-curated training paths and skills assessments.',
    category: 'Support Automation',
    pricing: {
      type: 'Freemium',
      startingPrice: '$39/mo'
    },
    features: [
      'Skills gap analysis',
      'Interactive training simulations',
      'Knowledge retention quizzes',
      'Role-specific learning paths',
      'Team performance tracking'
    ],
    integrations: ['LearnUpon', 'Docebo', 'Udemy', 'LMS platforms', 'Zoom'],
    rating: 4.4,
    reviews: 55,
    imageUrl: 'https://images.unsplash.com/photo-1581090762342-fbs562c72575e?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'New hire onboarding',
      'Product knowledge training',
      'Customer interaction simulations'
    ],
    website: 'https://trainingbot.example.com'
  },
  {
    id: '12',
    name: 'CollabHub',
    description: 'AI-enhanced collaboration platform for cross-functional teams working on customer success initiatives.',
    category: 'Retention Management',
    pricing: {
      type: 'Paid',
      startingPrice: '$179/mo'
    },
    features: [
      'Meeting agenda generator',
      'Action item tracker',
      'Shared customer context workspace',
      'Task automation engine',
      'Meeting transcription & summary'
    ],
    integrations: ['Microsoft Teams', 'Slack', 'Asana', 'Notion', 'Google Workspace'],
    rating: 4.5,
    reviews: 92,
    imageUrl: 'https://images.unsplash.com/photo-1526044800702-f4f5bd26f597?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Cross-team customer meetings',
      'Success plan collaboration',
      'Shared account management'
    ],
    website: 'https://collabhub.example.com'
  },
  {
    id: '13',
    name: 'AdoptionPilot',
    description: 'AI-driven product adoption platform that identifies user behavior patterns and delivers personalized in-app guidance to drive customer success.',
    category: 'Product Adoption',
    pricing: {
      type: 'Freemium',
      startingPrice: '$99/mo'
    },
    features: [
      'Behavioral analytics dashboard',
      'Personalized in-app walkthroughs',
      'Adoption success scoring',
      'Feature usage tracking'
    ],
    integrations: ['Mixpanel', 'Amplitude', 'Salesforce', 'Segment'],
    rating: 4.7,
    reviews: 88,
    imageUrl: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Driving feature adoption',
      'Reducing time-to-value',
      'Improving user activation'
    ],
    website: 'https://adoptionpilot.example.com'
  },
  {
    id: '14',
    name: 'AccountIntel',
    description: 'Strategic account management tool that uses AI to analyze customer relationships and identify upsell/retention opportunities.',
    category: 'Strategic Account Management',
    pricing: {
      type: 'Paid',
      startingPrice: '$199/mo'
    },
    features: [
      'Opportunity detection engine',
      'Cross-functional account planning',
      'Risk alert system',
      'Competitor benchmarking'
    ],
    integrations: ['Salesforce', 'LinkedIn Sales Navigator', 'G Suite', 'ZoomInfo'],
    rating: 4.6,
    reviews: 76,
    imageUrl: 'https://images.unsplash.com/photo-1596394512332-ecb7a74f0d1f?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Maximizing account growth',
      'Mitigating relationship risks',
      'Coordinating cross-functional teams'
    ],
    website: 'https://accountintel.example.com'
  },
  {
    id: '15',
    name: 'RevForecast AI',
    description: 'Revenue intelligence platform that predicts customer revenue risks and opportunities using historical and behavioral data.',
    category: 'Revenue Intelligence',
    pricing: {
      type: 'Paid',
      startingPrice: '$249/mo'
    },
    features: [
      'Predictive revenue modeling',
      'Deal risk probability scoring',
      'Expansion opportunity mapping',
      'Renewal likelihood analysis'
    ],
    integrations: ['Stripe', 'HubSpot', 'Tableau', 'Looker'],
    rating: 4.5,
    reviews: 63,
    imageUrl: 'https://images.unsplash.com/photo-1602073441803-112fcda04576?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Forecasting renewal rates',
      'Identifying expansion risks',
      'Optimizing upsell timing'
    ],
    website: 'https://revforecastai.example.com'
  },
  {
    id: '16',
    name: 'Learnify',
    description: 'AI-powered customer education platform that creates personalized learning paths to improve product proficiency.',
    category: 'Customer Education',
    pricing: {
      type: 'Freemium',
      startingPrice: '$49/mo'
    },
    features: [
      'Adaptive learning paths',
      'Knowledge gap analysis',
      'Interactive training modules',
      'Certification tracking'
    ],
    integrations: ['LearnUpon', 'Docebo', 'Udemy', 'Salesforce'],
    rating: 4.4,
    reviews: 57,
    imageUrl: 'https://images.unsplash.com/photo-1603398938378-3b3e9b426a6c?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Onboarding new users',
      'Product certification programs',
      'Continuous skill development'
    ],
    website: 'https://www.learnfy.co/'
  },
  {
    id: '17',
    name: 'KnowledgeMate',
    description: 'Self-service support platform with AI-powered knowledge base that evolves with customer queries and feedback.',
    category: 'Self-Service Solutions',
    pricing: {
      type: 'Paid',
      startingPrice: '$89/mo'
    },
    features: [
      'Smart search with intent recognition',
      'Predictive content suggestions',
      'Usage analytics dashboard',
      'Automated content updates'
    ],
    integrations: ['Zendesk', 'Intercom', 'Freshdesk', 'Notion'],
    rating: 4.5,
    reviews: 71,
    imageUrl: 'https://images.unsplash.com/photo-1581090762342-fbs562c72575e?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Reducing support tickets',
      'Scaling customer education',
      'Improving resolution speed'
    ],
    website: 'https://knowledgemate.example.com'
  },
  {
    id: '18',
    name: 'FutureInsight',
    description: 'Advanced predictive analytics engine that forecasts customer behavior and recommends proactive actions.',
    category: 'Predictive Analytics',
    pricing: {
      type: 'Paid',
      startingPrice: '$349/mo'
    },
    features: [
      'Multi-scenario forecasting',
      'Anomaly detection',
      'Action recommendation engine',
      'Custom prediction models'
    ],
    integrations: ['Snowflake', 'AWS SageMaker', 'Google BigQuery', 'Microsoft Azure'],
    rating: 4.6,
    reviews: 94,
    imageUrl: 'https://images.unsplash.com/photo-1550751822-b3c4ffd2f7c6?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Churn risk prediction',
      'Expansion opportunity identification',
      'Behavioral forecasting'
    ],
    website: 'https://futureinsight.example.com'
  },
  {
    id: '19',
    name: 'TaskFlow AI',
    description: 'Workflow automation tool that prioritizes and automates repetitive customer success tasks using AI-driven insights.',
    category: 'Workflow Automation',
    pricing: {
      type: 'Freemium',
      startingPrice: '$39/mo'
    },
    features: [
      'Task prioritization engine',
      'Rule-based automation',
      'Time-saving analytics',
      'Team workload balancing'
    ],
    integrations: ['Zapier', 'Slack', 'Asana', 'Trello'],
    rating: 4.3,
    reviews: 52,
    imageUrl: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Streamlining daily workflows',
      'Automating follow-ups',
      'Optimizing team productivity'
    ],
    website: 'https://www.taskflowai.org/'
  },
  {
    id: '20',
    name: 'PathFinder',
    description: 'AI-powered customer journey mapping tool that visualizes touchpoints and recommends optimizations.',
    category: 'Customer Journey Mapping',
    pricing: {
      type: 'Paid',
      startingPrice: '$149/mo'
    },
    features: [
      'Interactive journey visualization',
      'Touchpoint optimization',
      'Behavioral pattern recognition',
      'Impact analysis simulations'
    ],
    integrations: ['Google Analytics', 'Hotjar', 'Heap', 'Segment'],
    rating: 4.4,
    reviews: 68,
    imageUrl: 'https://images.unsplash.com/photo-1552674603-0e1fd9b2398e?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Identifying friction points',
      'Optimizing onboarding flows',
      'Aligning cross-functional teams'
    ],
    website: 'https://pathfinder.example.com'
  },
  {
    id: '21',
    name: 'VoiceHub',
    description: 'Unified feedback management platform that consolidates and analyzes customer feedback across all channels.',
    category: 'Feedback Management',
    pricing: {
      type: 'Paid',
      startingPrice: '$109/mo'
    },
    features: [
      'Omnichannel feedback aggregation',
      'Trend detection engine',
      'Sentiment clustering',
      'Action item prioritization'
    ],
    integrations: ['SurveyMonkey', 'Typeform', 'Zendesk', 'Intercom'],
    rating: 4.5,
    reviews: 83,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce687b7?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Centralizing feedback',
      'Prioritizing product improvements',
      'Tracking satisfaction trends'
    ],
    website: 'https://voicehub.example.com'
  },
  {
    id: '22',
    name: 'PartnerSync',
    description: 'AI-enabled partner success platform that manages and optimizes relationships with resellers, agencies, and integrators.',
    category: 'Partner Success',
    pricing: {
      type: 'Paid',
      startingPrice: '$189/mo'
    },
    features: [
      'Partner performance analytics',
      'Co-selling opportunity identification',
      'Collaboration hub',
      'Joint success planning'
    ],
    integrations: ['Slack', 'Salesforce', 'Microsoft Teams', 'HubSpot'],
    rating: 4.3,
    reviews: 47,
    imageUrl: 'https://images.unsplash.com/photo-1526044800702-f4f5bd26f597?auto=format&fit=crop&w=800&q=80',
    useCases: [
      'Managing channel partners',
      'Aligning co-selling strategies',
      'Optimizing ecosystem relationships'
    ],
    website: 'https://partnersync.example.com'
  }
];