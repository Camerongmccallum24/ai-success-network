import { Network } from 'lucide-react';

export default function BrandHeader() {
  return (
    <header className="brand-gradient">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-2">
            <Network size={32} className="text-brand-emerald" />
            <span className="text-2xl font-bold text-white">AI Success Network</span>
          </div>
          
          <div className="flex items-center space-x-8">
            <a href="/tools" className="text-gray-100 hover:text-brand-emerald transition-colors">Tools</a>
            <a href="/category" className="text-gray-100 hover:text-brand-emerald transition-colors">Categories</a>
            <a href="/community" className="text-gray-100 hover:text-brand-emerald transition-colors">Community</a>
            <button className="brand-button">Get Started</button>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Your Curated Network for the Best AI Tools in Customer Success
          </h1>
          <p className="text-xl text-gray-100 mb-8">
            Discover, compare, and implement the most relevant AI tools for your CS team
          </p>
          <button className="brand-button">
            Explore Tools
          </button>
        </div>
      </div>
    </header>
  );
}