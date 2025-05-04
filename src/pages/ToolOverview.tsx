import { useState } from 'react';
import { ChevronRight, Star, Check, HelpCircle, ArrowRight, MessageSquare, Bot, Zap, BarChart3 } from 'lucide-react';
import { Tool } from '../types';

interface ToolOverviewProps {
  tool: Tool;
}

export default function ToolOverview({ tool }: ToolOverviewProps) {
  const [activeTab, setActiveTab] = useState('features');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <a href="/" className="hover:text-brand-emerald">Home</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <a href="/tools" className="hover:text-brand-emerald">Tools</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 dark:text-white">{tool.name}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-brand-emerald/10 text-brand-emerald">
                  {tool.pricing.type}
                </span>
              </div>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{tool.description}</p>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(tool.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {tool.rating} ({tool.reviews} reviews)
                </span>
              </div>

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-brand-emerald hover:bg-brand-emerald/90 text-white rounded-lg font-semibold transition-colors">
                  Start Free Trial
                </button>
                <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 hover:border-brand-emerald dark:hover:border-brand-emerald text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="flex-1">
              <img
                src={tool.imageUrl}
                alt="AutoSupport Pro Dashboard"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <div className="text-brand-emerald font-bold text-3xl mb-2">85%</div>
              <p className="text-gray-600 dark:text-gray-400">Reduction in Response Time</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <div className="text-brand-emerald font-bold text-3xl mb-2">24/7</div>
              <p className="text-gray-600 dark:text-gray-400">Automated Support Coverage</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <div className="text-brand-emerald font-bold text-3xl mb-2">40%</div>
              <p className="text-gray-600 dark:text-gray-400">Cost Reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Content */}
            <div className="flex-1">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
                {['features', 'technical', 'pricing', 'faq'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium transition-colors ${
                      activeTab === tab
                        ? 'border-b-2 border-brand-emerald text-brand-emerald'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Features Tab */}
              <div className={activeTab === 'features' ? 'block' : 'hidden'}>
                <div className="grid gap-8">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <Bot className="w-8 h-8 text-brand-emerald" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        AI-Powered Responses
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Intelligent response suggestions based on historical data and context,
                      ensuring accurate and consistent support across all channels.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <Zap className="w-8 h-8 text-brand-emerald" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Automated Workflows
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Create and customize support workflows that automatically handle routine
                      inquiries and escalate complex issues to the right team members.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <BarChart3 className="w-8 h-8 text-brand-emerald" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Analytics Dashboard
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Comprehensive analytics and reporting tools to track performance metrics,
                      response times, and customer satisfaction scores.
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Tab */}
              <div className={activeTab === 'technical' ? 'block' : 'hidden'}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    System Requirements
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-brand-emerald" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Modern web browser (Chrome, Firefox, Safari, Edge)
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-brand-emerald" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Stable internet connection (minimum 5 Mbps)
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-brand-emerald" />
                      <span className="text-gray-600 dark:text-gray-400">
                        SSO-compatible authentication system
                      </span>
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                    Supported Integrations
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {tool.integrations.map((integration) => (
                      <div key={integration} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Check className="w-4 h-4 text-brand-emerald" />
                        {integration}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing Tab */}
              <div className={activeTab === 'pricing' ? 'block' : 'hidden'}>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Starter
                    </h3>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      $99<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-brand-emerald" />
                        <span className="text-gray-600 dark:text-gray-400">Basic automation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-brand-emerald" />
                        <span className="text-gray-600 dark:text-gray-400">5 team members</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-brand-emerald" />
                        <span className="text-gray-600 dark:text-gray-400">Email support</span>
                      </li>
                    </ul>
                    <button className="w-full px-4 py-2 bg-brand-emerald hover:bg-brand-emerald/90 text-white rounded-lg transition-colors">
                      Start Free Trial
                    </button>
                  </div>
                  
                  {/* Add Professional and Enterprise pricing tiers similarly */}
                </div>
              </div>

              {/* FAQ Tab */}
              <div className={activeTab === 'faq' ? 'block' : 'hidden'}>
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      How long does implementation typically take?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Basic implementation can be completed in 1-2 days. Full integration with
                      existing systems typically takes 1-2 weeks depending on complexity.
                    </p>
                  </div>
                  
                  {/* Add more FAQ items */}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-80">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Links
                </h3>
                <nav className="space-y-2">
                  <a
                    href="#documentation"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  >
                    Documentation
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#support"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  >
                    Support Center
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#community"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  >
                    Community
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Need Help?
                  </h3>
                  <div className="flex gap-4">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-brand-emerald hover:bg-brand-emerald/90 text-white rounded-lg transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      Chat
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 hover:border-brand-emerald dark:hover:border-brand-emerald text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
                      <HelpCircle className="w-4 h-4" />
                      Help
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}