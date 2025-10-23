import { ArrowLeft, ArrowRight } from 'lucide-react';

interface LearnPageProps {
  onNavigate: (page: string) => void;
}

export function LearnPage({ onNavigate }: LearnPageProps) {
  const steps = [
    {
      number: 1,
      title: 'You Click Buy or Sell',
      description: 'When you place an order through your trading app or broker, your order enters the market system.',
      details: 'Your broker validates your order (checks if you have sufficient funds/shares) and forwards it to the stock exchange where the security is listed. The order contains key details: security name, price, quantity, and order type (market or limit).',
      extendedInfo: [
        'Market orders execute at the best available price immediately',
        'Limit orders execute only at your specified price or better',
        'Your broker acts as an intermediary, ensuring regulatory compliance',
        'Orders are transmitted electronically within milliseconds'
      ],
      color: 'blue'
    },
    {
      number: 2,
      title: 'Exchange Matches Orders',
      description: 'The exchange uses price-time priority to match buy and sell orders.',
      details: 'The matching engine is a sophisticated algorithm that continuously scans the order book. Best buy price (highest) is matched with best sell price (lowest). When buy price ≥ sell price, execution occurs at the resting order\'s price.',
      extendedInfo: [
        'Price Priority: Orders with better prices get matched first',
        'Time Priority: Among same-priced orders, earlier orders have priority',
        'Partial Fills: If quantity doesn\'t match fully, remaining order stays in book',
        'The matching engine processes millions of orders per second',
        'All matched trades are immediately reported to both parties'
      ],
      color: 'emerald'
    },
    {
      number: 3,
      title: 'Clearing House Guarantees',
      description: 'The clearing house acts as the middleman and guarantees both sides of the trade.',
      details: 'After matching, the clearing house becomes the buyer to every seller and the seller to every buyer. This novation process eliminates counterparty risk and ensures market stability.',
      extendedInfo: [
        'Validates all trade details and confirms both parties\' obligations',
        'Calculates net positions for all participants (netting)',
        'Collects margins from members to cover potential defaults',
        'Monitors risk continuously throughout the settlement cycle',
        'In India: NSCCL for NSE, ICCL for BSE handle clearing operations',
        'Guarantees settlement even if one party defaults'
      ],
      color: 'yellow'
    },
    {
      number: 4,
      title: 'T+2 Settlement',
      description: 'Two business days after the trade, the actual exchange happens.',
      details: 'T stands for Trade day. T+1 is day 1, T+2 is day 2. On T+2, the clearing house facilitates the delivery-versus-payment (DVP) mechanism, ensuring simultaneous transfer of securities and funds.',
      extendedInfo: [
        'T+0: Trade executed and recorded',
        'T+1: Clearing house calculates obligations, members verify positions',
        'T+2: Actual settlement occurs - atomic transfer of money and shares',
        'Funds move: Buyer\'s bank account → Clearing house → Seller\'s bank account',
        'Shares move: Seller\'s demat account → Clearing house → Buyer\'s demat account',
        'Settlement is final and irrevocable',
        'Any failures result in penalties and auction processes',
        'Your trading app shows "settled" status once complete'
      ],
      color: 'green'
    }
  ];

  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500',
    emerald: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500',
    yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500',
    green: 'from-green-500/20 to-green-600/20 border-green-500'
  };

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
              Understanding Stock Trading
            </h1>
            <p className="text-xl text-slate-300">
              The journey of your trade from click to settlement
            </p>
          </div>

          <div className="space-y-8 mb-12">
            {steps.map((step, index) => (
              <div key={step.number}>
                <div
                  className={`bg-gradient-to-r ${colorClasses[step.color as keyof typeof colorClasses]} border-2 rounded-xl p-6 transition-all duration-300 hover:scale-102 hover:shadow-2xl`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-xl font-bold">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-lg text-slate-200 mb-3">{step.description}</p>
                      <p className="text-slate-300 mb-4">{step.details}</p>

                      <div className="bg-slate-900/50 rounded-lg p-4 mt-4 border border-slate-700">
                        <h4 className="font-semibold text-sm text-slate-300 mb-2">Key Details:</h4>
                        <ul className="space-y-1.5 text-sm text-slate-400">
                          {step.extendedInfo.map((info, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-400 mt-1">•</span>
                              <span>{info}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <ArrowRight className="w-8 h-8 text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-8 border border-slate-700 mb-8">
            <h3 className="text-2xl font-bold mb-6">Key Concepts Explained</h3>
            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-lg p-5 border border-emerald-500/30">
                <h4 className="text-lg font-semibold text-emerald-400 mb-3">Price-Time Priority Algorithm</h4>
                <p className="text-slate-300 mb-3">
                  The fundamental matching rule used by all modern exchanges. Orders are matched based on the best price first. If multiple orders have the same price,
                  the order that was placed earlier gets matched first.
                </p>
                <div className="bg-slate-800/50 rounded p-3 text-sm text-slate-400">
                  <strong className="text-slate-300">Example:</strong> If there are buy orders at $100, $101, and $102, and a sell order arrives at $100,
                  it will match with the $102 buyer first (best price). If multiple buyers are at $102, the earliest order wins.
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-5 border border-yellow-500/30">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Clearing House & Central Counterparty (CCP)</h4>
                <p className="text-slate-300 mb-3">
                  Acts as an intermediary between buyers and sellers, guaranteeing trade settlement and
                  managing risk. Once a trade is matched, the clearing house steps in between both parties through a process called "novation."
                </p>
                <div className="bg-slate-800/50 rounded p-3 text-sm text-slate-400 space-y-2">
                  <p><strong className="text-slate-300">In India:</strong> NSCCL (for NSE) and ICCL (for BSE) perform this role</p>
                  <p><strong className="text-slate-300">Risk Management:</strong> Collects margins, monitors positions, maintains guarantee funds</p>
                  <p><strong className="text-slate-300">Netting:</strong> Calculates net obligations for each participant, reducing settlement volume</p>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-5 border border-blue-500/30">
                <h4 className="text-lg font-semibold text-blue-400 mb-3">T+2 Settlement Cycle</h4>
                <p className="text-slate-300 mb-3">
                  T stands for Trade date. The +2 means settlement happens 2 business days after the trade.
                  This gives time for clearing, validation, and risk management to ensure smooth settlement.
                </p>
                <div className="bg-slate-800/50 rounded p-3 text-sm text-slate-400 space-y-1">
                  <p><strong className="text-slate-300">Why 2 days?</strong> Allows time for trade confirmation, clearing calculations, and fund/security transfers</p>
                  <p><strong className="text-slate-300">Global Standards:</strong> Many markets have moved from T+3 to T+2, some are moving to T+1</p>
                  <p><strong className="text-slate-300">Delivery vs Payment (DVP):</strong> Ensures atomic exchange - you get shares only when seller gets money</p>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-5 border border-red-500/30">
                <h4 className="text-lg font-semibold text-red-400 mb-3">Demat Account (Dematerialized Account)</h4>
                <p className="text-slate-300 mb-3">
                  Your dematerialized account where shares are held electronically, eliminating physical share certificates. When settlement happens,
                  shares are credited or debited from this account automatically.
                </p>
                <div className="bg-slate-800/50 rounded p-3 text-sm text-slate-400 space-y-1">
                  <p><strong className="text-slate-300">Maintained by:</strong> Depositories like NSDL and CDSL in India</p>
                  <p><strong className="text-slate-300">Benefits:</strong> Safe, no risk of loss/theft/forgery, instant transfers, easy pledging</p>
                  <p><strong className="text-slate-300">Integration:</strong> Linked to your trading account for seamless settlement</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
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
