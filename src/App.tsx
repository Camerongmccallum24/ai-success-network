import { useState } from 'react';
import { Tool, Category } from './types';
import { tools } from './data/tools';
import BrandHeader from './components/BrandHeader';
import ToolCard from './components/ToolCard';
import CategoryFilter from './components/CategoryFilter';
import ThemeToggle from './components/ThemeToggle';
import Newsletter from './components/Newsletter';
import CompareTools from './components/CompareTools';
import { Toaster } from 'react-hot-toast';

const categories: Category[] = [
  'Customer Analytics',
  'Support Automation',
  'Sentiment Analysis',
  'Onboarding Tools',
  'Retention Management',
  'Customer Health Scoring',
];

function App() {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const filteredTools = selectedCategories.length > 0
    ? tools.filter((tool) => selectedCategories.includes(tool.category))
    : tools;

  const handleCategorySelect = (category: Category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Toaster position="top-right" />
      <ThemeToggle />
      <BrandHeader />
      
      <main className="container mx-auto px-4 py-12">
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategory={handleCategorySelect}
          onClearFilters={handleClearFilters}
        />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <Newsletter />
        <CompareTools />
      </main>
    </div>
  );
}

export default App;