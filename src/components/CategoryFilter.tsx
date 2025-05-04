import { Tool, Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: Category[];
  onSelectCategory: (category: Category) => void;
  onClearFilters: () => void;
}

export default function CategoryFilter({
  categories,
  selectedCategories,
  onSelectCategory,
  onClearFilters,
}: CategoryFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Categories</h2>
        {selectedCategories.length > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Clear filters
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
              ${selectedCategories.includes(category)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {category}
            {selectedCategories.includes(category) && (
              <span className="ml-2">×</span>
            )}
          </button>
        ))}
      </div>

      {selectedCategories.length > 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing tools in {selectedCategories.length === 1 ? 'category' : 'categories'}:{' '}
          {selectedCategories.join(', ')}
        </p>
      )}
    </div>
  );
}