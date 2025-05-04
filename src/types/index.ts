export interface Tool {
  id: string;
  name: string;
  description: string;
  category: Category;
  pricing: {
    type: 'Free' | 'Freemium' | 'Paid';
    startingPrice?: string;
  };
  features: string[];
  integrations: string[];
  rating: number;
  reviews: number;
  imageUrl: string;
  useCases: string[];
}

export type ToolCategory = 
  | 'Customer Analytics'
  | 'Support Automation'
  | 'Sentiment Analysis'
  | 'Onboarding Tools'
  | 'Retention Management'
  | 'Customer Health Scoring'
  | 'Product Adoption'
  | 'Strategic Account Management'
  | 'Revenue Intelligence'
  | 'Customer Education'
  | 'Self-Service Solutions'
  | 'Predictive Analytics'
  | 'Workflow Automation'
  | 'Customer Journey Mapping'
  | 'Feedback Management'
  | 'Partner Success';