import { Category, Tool } from '../types';
import DocLayout from './DocLayout';
import ToolCard from './ToolCard';

interface CategoryDocPageProps {
  category: Category;
  tools: Tool[];
}

export default function CategoryDocPage({ category, tools }: CategoryDocPageProps) {
  return (
    <DocLayout
      breadcrumbs={[
        { label: 'Documentation', href: '/docs' },
        { label: category, href: `/docs/categories/${category}` }
      ]}
    >
      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{category}</h1>
          <p className="text-xl text-gray-600">
            Discover the best AI tools for {category.toLowerCase()} and learn how to
            implement them effectively in your CS workflow.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Quick Start Guide</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold mr-3">1</span>
                <div>
                  <h3 className="font-semibold">Choose Your Tool</h3>
                  <p className="text-gray-600">Review the available tools below and select one that matches your needs</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold mr-3">2</span>
                <div>
                  <h3 className="font-semibold">Review Requirements</h3>
                  <p className="text-gray-600">Check technical requirements and prepare your environment</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold mr-3">3</span>
                <div>
                  <h3 className="font-semibold">Integration</h3>
                  <p className="text-gray-600">Follow the integration guide for your selected tool</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Available Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Best Practices</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Data Collection</h3>
              <p className="text-gray-600">Ensure consistent and accurate data collection across all touchpoints</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Integration Strategy</h3>
              <p className="text-gray-600">Plan your integration approach based on your existing tech stack</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Team Training</h3>
              <p className="text-gray-600">Provide comprehensive training to team members who will use these tools</p>
            </div>
          </div>
        </section>
      </article>
    </DocLayout>
  );
}