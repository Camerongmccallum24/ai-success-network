import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface DocLayoutProps {
  children: ReactNode;
  breadcrumbs: Array<{ label: string; href: string }>;
}

export default function DocLayout({ children, breadcrumbs }: DocLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                <a href={crumb.href} className="hover:text-blue-600">
                  {crumb.label}
                </a>
              </div>
            ))}
          </nav>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}