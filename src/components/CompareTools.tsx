import { useState } from 'react';
import { Tool } from '../types';
import { tools } from '../data/tools';
import { Check, X } from 'lucide-react';
import StarRatings from 'react-star-ratings';

export default function CompareTools() {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);

  const handleToolSelect = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (tool) {
      setSelectedTools(prev => {
        if (prev.length >= 3) {
          return [...prev.slice(1), tool];
        }
        return [...prev, tool];
      });
    }
  };

  const handleRemoveTool = (toolId: string) => {
    setSelectedTools(prev => prev.filter(tool => tool.id !== toolId));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Compare Tools</h2>

      {/* Tool Selection */}
      <div className="mb-8">
        <select
          onChange={(e) => handleToolSelect(e.target.value)}
          value=""
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">Add tool to compare</option>
          {tools.map(tool => (
            <option key={tool.id} value={tool.id}>
              {tool.name}
            </option>
          ))}
        </select>
      </div>

      {/* Comparison Table */}
      {selectedTools.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-4 px-6 text-left text-gray-600 dark:text-gray-400"></th>
                {selectedTools.map(tool => (
                  <th key={tool.id} className="py-4 px-6">
                    <div className="flex flex-col items-center">
                      <img
                        src={tool.imageUrl}
                        alt={tool.name}
                        className="w-16 h-16 object-cover rounded-lg mb-2"
                      />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {tool.name}
                      </span>
                      <button
                        onClick={() => handleRemoveTool(tool.id)}
                        className="mt-2 text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Rating</td>
                {selectedTools.map(tool => (
                  <td key={tool.id} className="py-4 px-6">
                    <div className="flex flex-col items-center">
                      <StarRatings
                        rating={tool.rating}
                        starRatedColor="#FBBF24"
                        starEmptyColor="#E5E7EB"
                        numberOfStars={5}
                        starDimension="16px"
                        starSpacing="2px"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        ({tool.reviews} reviews)
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Pricing</td>
                {selectedTools.map(tool => (
                  <td key={tool.id} className="py-4 px-6 text-center">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {tool.pricing.type}
                    </span>
                    {tool.pricing.startingPrice && (
                      <span className="block text-sm text-gray-600 dark:text-gray-400">
                        From {tool.pricing.startingPrice}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Features</td>
                {selectedTools.map(tool => (
                  <td key={tool.id} className="py-4 px-6">
                    <ul className="space-y-2">
                      {tool.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Integrations</td>
                {selectedTools.map(tool => (
                  <td key={tool.id} className="py-4 px-6">
                    <div className="flex flex-wrap gap-2">
                      {tool.integrations.map((integration, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300"
                        >
                          {integration}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedTools.length === 0 && (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          Select tools to compare their features and pricing
        </div>
      )}
    </div>
  );
}