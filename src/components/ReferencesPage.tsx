import { ArrowLeft, ExternalLink, BookOpen, Video, FileText } from 'lucide-react';

interface ReferencesPageProps {
  onNavigate: (page: string) => void;
}

export function ReferencesPage({ onNavigate }: ReferencesPageProps) {
  const references = [
    {
      category: 'Official Resources',
      icon: FileText,
      items: [
        {
          title: 'SEBI - Securities and Exchange Board of India',
          description: 'India\'s securities market regulator',
          url: 'https://www.sebi.gov.in/',
        },
        {
          title: 'NSE - National Stock Exchange',
          description: 'Learn about trading, clearing, and settlement',
          url: 'https://www.nseindia.com/',
        },
        {
          title: 'BSE - Bombay Stock Exchange',
          description: 'India\'s oldest stock exchange',
          url: 'https://www.bseindia.com/',
        },
      ],
    },
    {
      category: 'Educational Platforms',
      icon: BookOpen,
      items: [
        {
          title: 'Zerodha Varsity',
          description: 'Comprehensive free trading and investment education',
          url: 'https://zerodha.com/varsity/',
        },
        {
          title: 'Groww Learn',
          description: 'Beginner-friendly investment concepts',
          url: 'https://groww.in/blog/',
        },
        {
          title: 'Investopedia',
          description: 'Global financial education resource',
          url: 'https://www.investopedia.com/',
        },
        {
          title: 'NSE Academy',
          description: 'Professional certification courses',
          url: 'https://www.nseindia.com/education',
        },
      ],
    },
    {
      category: 'Video Resources',
      icon: Video,
      items: [
        {
          title: 'How Stock Exchange Works (YouTube)',
          description: 'Visual explanation of stock market mechanics',
          url: 'https://www.youtube.com/results?search_query=how+stock+exchange+works',
        },
        {
          title: 'Clearing and Settlement Process',
          description: 'Deep dive into post-trade operations',
          url: 'https://www.youtube.com/results?search_query=clearing+and+settlement+stock+market',
        },
        {
          title: 'Zerodha YouTube Channel',
          description: 'Indian market-focused educational content',
          url: 'https://www.youtube.com/@zerodhaonline',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => onNavigate('home')}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              References & Resources
            </h1>
            <p className="text-xl text-slate-300">
              Continue your learning journey with these trusted resources
            </p>
          </div>

          <div className="space-y-8">
            {references.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.category}>
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-emerald-400" />
                    <h2 className="text-2xl font-bold">{section.category}</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {section.items.map((item) => (
                      <a
                        key={item.title}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-slate-800/50 backdrop-blur border border-slate-700 hover:border-emerald-500 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-emerald-400 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-slate-400">{item.description}</p>
                          </div>
                          <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Important Disclaimers</h3>
            <div className="space-y-3 text-slate-300">
              <p>
                This is an educational simulator designed to help understand stock market mechanics.
                It does not represent actual market conditions or real trading.
              </p>
              <p>
                Stock market investments carry risk. Always do your own research and consider consulting
                with a qualified financial advisor before making investment decisions.
              </p>
              <p>
                The settlement cycle and trading rules may vary by country and exchange. This simulator
                demonstrates the T+2 settlement cycle commonly used in India.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('simulation')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/30 transition-all duration-200 transform hover:scale-105"
            >
              Try the Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
