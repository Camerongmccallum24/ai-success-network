import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success('Thanks for subscribing! Check your email for confirmation.');
    setEmail('');
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 my-12">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-block p-3 bg-blue-500 rounded-full mb-4">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Stay Updated with AI Tools
        </h2>
        <p className="text-blue-100 mb-6">
          Get weekly insights on the latest AI tools, exclusive deals, and expert tips
          for optimizing your customer success workflow.
        </p>
        
        <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? 'Subscribing...' : (
              <>
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}