import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { tools } from '../data/tools';
import { Tool } from '../types';

const fuseOptions = {
  keys: ['name', 'description', 'category', 'features'],
  threshold: 0.3,
};

const fuse = new Fuse(tools, fuseOptions);

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      const results = fuse.search(query).map(result => result.item);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-8">
            <h1 className="text-[#1A1A1A] dark:text-gray-100 text-2xl md:text-3xl font-bold">
              CS AI Tools
            </h1>
            <div className="hidden md:flex items-center space-x-6">
              <a href="/directory" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Directory</a>
              <a href="/categories" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Categories</a>
              <a href="/trending" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Trending</a>
            </div>
          </div>
        </nav>
        
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[#4A4A4A] dark:text-gray-200 text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Discover AI Tools for Customer Success
          </h2>
          <p className="text-[#666666] dark:text-gray-400 text-lg md:text-xl font-normal mb-8">
            Find and compare the best AI tools to enhance your CS operations
          </p>
          
          <div className="relative max-w-2xl mx-auto" ref={searchRef}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search for tools, features, or use cases..."
              className="w-full px-6 py-4 rounded-full bg-white dark:bg-gray-800 
                text-gray-900 dark:text-gray-100 shadow-lg pl-12
                border border-gray-200 dark:border-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />

            {/* Search Results Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                {searchResults.map((tool) => (
                  <a
                    key={tool.id}
                    href={`/tools/${tool.id}`}
                    className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{tool.category}</p>
                      </div>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        View Details →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}