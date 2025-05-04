import { Tool } from '../types';
import DocLayout from './DocLayout';

interface ToolDocPageProps {
  tool: Tool;
}

export default function ToolDocPage({ tool }: ToolDocPageProps) {
  return (
    <DocLayout
      breadcrumbs={[
        { label: 'Documentation', href: '/docs' },
        { label: tool.category, href: `/docs/categories/${tool.category}` },
        { label: tool.name, href: `/docs/tools/${tool.id}` }
      ]}
    >
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>
          <p className="text-xl text-gray-600">{tool.description}</p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="space-y-2">
            {tool.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <div className="prose max-w-none">
            <h3>Technical Requirements</h3>
            <ul>
              <li>API Key (obtain from your account dashboard)</li>
              <li>Node.js v14 or higher</li>
              <li>Compatible CRM integration</li>
            </ul>

            <h3>Installation</h3>
            <pre className="bg-gray-800 text-white p-4 rounded-lg">
              <code>npm install @{tool.name.toLowerCase()}/sdk</code>
            </pre>

            <h3>Basic Configuration</h3>
            <pre className="bg-gray-800 text-white p-4 rounded-lg">
              <code>{`
import { ${tool.name} } from '@${tool.name.toLowerCase()}/sdk';

const client = new ${tool.name}({
  apiKey: 'your-api-key',
  environment: 'production'
});`}</code>
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
          <div className="grid gap-6">
            {tool.useCases.map((useCase, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">{useCase}</h3>
                <p className="text-gray-600">
                  Learn how to implement {useCase.toLowerCase()} with step-by-step guides
                  and best practices.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Integrations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tool.integrations.map((integration, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
                {integration}
              </div>
            ))}
          </div>
        </section>
      </article>
    </DocLayout>
  );
}