import { BarChart3, Users, TrendingUp, Brain } from 'lucide-react';
import { tools } from '../data/tools';

export default function CategoryAnalytics() {
  const analyticsTools = tools.filter(tool => tool.category === 'Customer Analytics');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-midnight to-brand-darker py-20">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Customer Analytics
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Transform your customer data into actionable insights with AI-powered analytics tools
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-200">
                <TrendingUp className="w-5 h-5 mr-3" />
                <span>Predict customer behavior and identify trends</span>
              </div>
              <div className="flex items-center text-gray-200">
                <Users className="w-5 h-5 mr-3" />
                <span>Segment customers for personalized experiences</span>
              </div>
              <div className="flex items-center text-gray-200">
                <Brain className="w-5 h-5 mr-3" />
                <span>AI-driven recommendations and insights</span>
              </div>
            </div>
            
            <button className="bg-brand-emerald hover:bg-brand-emerald/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Explore Analytics Tools
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              What is Customer Analytics?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Customer Analytics leverages AI and machine learning to analyze customer data, 
              helping businesses understand behavior patterns, predict future actions, and 
              make data-driven decisions to improve customer experience and retention.
            </p>
          </div>

          {/* Use Cases */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <BarChart3 className="w-10 h-10 text-brand-emerald mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Behavioral Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track and analyze customer interactions across all touchpoints to understand 
                usage patterns and engagement levels.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <TrendingUp className="w-10 h-10 text-brand-emerald mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Predictive Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Forecast customer behavior and identify potential churn risks before they occur.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
              <Users className="w-10 h-10 text-brand-emerald mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Customer Segmentation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create detailed customer segments based on behavior, preferences, and value.
              </p>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="bg-brand-midnight text-white rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6">Impact on Customer Success</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-emerald mb-2">32%</div>
                <p>Average Churn Reduction</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-emerald mb-2">45%</div>
                <p>Increase in Customer Engagement</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-emerald mb-2">28%</div>
                <p>Revenue Growth</p>
              </div>
            </div>
          </div>

          {/* Available Tools */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Available Analytics Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {analyticsTools.map(tool => (
                <div key={tool.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <img 
                    src={tool.imageUrl} 
                    alt={tool.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {tool.description}
                    </p>
                    <button className="w-full bg-brand-emerald hover:bg-brand-emerald/90 text-white px-4 py-2 rounded-lg transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}