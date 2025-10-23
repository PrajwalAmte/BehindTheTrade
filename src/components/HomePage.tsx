import { TrendingUp, BookOpen, ExternalLink, BarChart3, RefreshCcw, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="p-4 bg-emerald-500/10 rounded-full">
              <TrendingUp className="w-16 h-16 text-emerald-400" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            Behind the Trade
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
            See how your stock trade travels through the market
          </p>

          <p className="text-lg text-slate-400 mb-16 max-w-2xl mx-auto">
            Ever wondered what happens after you click "Buy" or "Sell"? This interactive simulator shows you the journey of a stock trade from order placement to final settlement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => onNavigate('simulation')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/30 transition-all duration-200 transform hover:scale-105"
            >
              Start Simulation
            </button>
            <button
              onClick={() => onNavigate('learn')}
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Learn More
            </button>
            <button
              onClick={() => onNavigate('references')}
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              References
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700">
              <BarChart3 className="w-12 h-12 text-emerald-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Order Matching</h3>
              <p className="text-slate-400">
                Watch how buy and sell orders are matched in real-time using price-time priority
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700">
              <RefreshCcw className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Clearing Process</h3>
              <p className="text-slate-400">
                See how trades move through the clearing house for verification and guarantee
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur p-6 rounded-xl border border-slate-700">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">T+2 Settlement</h3>
              <p className="text-slate-400">
                Experience the two-day settlement cycle where money and shares actually transfer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
