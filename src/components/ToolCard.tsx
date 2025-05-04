import { Star, ExternalLink } from 'lucide-react';
import { Tool } from '../types';
import StarRatings from 'react-star-ratings';
import { TwitterShareButton, LinkedinShareButton } from 'react-share';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const shareUrl = `https://yourwebsite.com/tools/${tool.id}`;
  const shareTitle = `Check out ${tool.name} - ${tool.description}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={tool.imageUrl} 
          alt={tool.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <div className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl} title={shareTitle}>
            <div className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
              </svg>
            </div>
          </LinkedinShareButton>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${tool.pricing.type === 'Free' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            tool.pricing.type === 'Freemium' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}`}>
            {tool.pricing.type}
            {tool.pricing.startingPrice && ` • ${tool.pricing.startingPrice}`}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">{tool.description}</p>
        
        <div className="flex items-center mb-4">
          <StarRatings
            rating={tool.rating}
            starRatedColor="#FBBF24"
            starEmptyColor="#E5E7EB"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
          />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            ({tool.reviews} reviews)
          </span>
        </div>
        
        <div className="space-y-2 mb-6">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Features:</div>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {tool.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            View Details
            <ExternalLink className="w-4 h-4" />
          </button>
          {tool.pricing.type !== 'Paid' && (
            <button className="flex-1 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 py-2 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              Try Free
            </button>
          )}
        </div>
      </div>
    </div>
  );
}