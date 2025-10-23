import { useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { placeOrder, resetSimulation } from '../api/orders';
import { OrderBook } from './OrderBook';
import { TradeHistory } from './TradeHistory';
import { TradeFlowDiagram } from './TradeFlowDiagram';
import { ArrowLeft, Plus, Minus, RotateCcw, Zap, Trophy } from 'lucide-react';

interface SimulationPageProps {
  onNavigate: (page: string) => void;
}

export function SimulationPage({ onNavigate }: SimulationPageProps) {
  const { data, isConnected } = useWebSocket();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [activeStage, setActiveStage] = useState(-1);
  const [isMatched, setIsMatched] = useState(false);
  const [lastTradeCount, setLastTradeCount] = useState(0);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [settledTradeIds, setSettledTradeIds] = useState<Set<string>>(new Set());
  const [currentSettlingTradeId, setCurrentSettlingTradeId] = useState<string | null>(null);

  const [buyPrice, setBuyPrice] = useState('100');
  const [buyQuantity, setBuyQuantity] = useState('10');
  const [sellPrice, setSellPrice] = useState('100');
  const [sellQuantity, setSellQuantity] = useState('10');

  // Detect new trade and trigger flow
  useEffect(() => {
    if (data.trades.length > lastTradeCount) {
      const latestTrade = data.trades[data.trades.length - 1];
      setLastTradeCount(data.trades.length);
      setIsMatched(true);
      startTradeFlow(String(latestTrade.id)); // Ensure string type
      setTimeout(() => setIsMatched(false), 2000);
    }
  }, [data.trades.length]);

  const startTradeFlow = (tradeId: string) => {
    if (isSimulationRunning) return;
    setIsSimulationRunning(true);
    setCurrentSettlingTradeId(tradeId);
    setActiveStage(0);

    const totalStages = 5;
    const stageDuration = 2500; // 2.5s per stage for smooth animation

    for (let i = 0; i < totalStages; i++) {
      setTimeout(() => {
        setActiveStage(i);

        // Mark settled only after final stage completes
        if (i === totalStages - 1) {
          setTimeout(() => {
            setIsSimulationRunning(false);
            // Wait for the final stage animation to complete (2500ms + 700ms buffer)
            setTimeout(() => {
              setSettledTradeIds(prev => new Set(prev).add(tradeId));
              setCurrentSettlingTradeId(null);
            }, stageDuration + 700);
          }, 0);
        }
      }, i * stageDuration);
    }
  };

  const handleReset = async () => {
    try {
      await resetSimulation();
      setActiveStage(-1);
      setIsMatched(false);
      setIsSimulationRunning(false);
      setSettledTradeIds(new Set());
      setCurrentSettlingTradeId(null);
      setLastTradeCount(0);
    } catch (err) {
      console.error('Reset failed:', err);
    }
  };

  const handlePlaceOrder = async (side: 'buy' | 'sell') => {
    setIsPlacingOrder(true);
    try {
      const price = side === 'buy' ? parseFloat(buyPrice) : parseFloat(sellPrice);
      const quantity = side === 'buy' ? parseInt(buyQuantity) : parseInt(sellQuantity);

      if (isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
        alert('Please enter valid price and quantity values');
        return;
      }

      await placeOrder(side, price, quantity);
    } catch (error) {
      console.error('Order placement failed:', error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                }`}
              />
              <span className="text-sm text-slate-400">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Simulation Header */}
        <div className="mb-8 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-xl p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Live Trading Simulation</h2>
            <p className="text-slate-400">
              Place buy/sell orders to visualize trade matching and settlement.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/50 px-6 py-3 rounded-lg">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <div>
              <div className="text-sm text-slate-400">Settled Trades</div>
              <div className="text-2xl font-bold text-yellow-400">
                {settledTradeIds.size}
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Left Side */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Placement */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Place Orders
              </h3>

              <div className="space-y-4">
                {/* Buy Order */}
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Plus className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-emerald-400">Buy Order</span>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="number"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:border-emerald-500"
                      placeholder="Price"
                    />
                    <input
                      type="number"
                      value={buyQuantity}
                      onChange={(e) => setBuyQuantity(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:border-emerald-500"
                      placeholder="Quantity"
                    />
                    <button
                      onClick={() => handlePlaceOrder('buy')}
                      disabled={isPlacingOrder}
                      className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                      Place Buy
                    </button>
                  </div>
                </div>

                {/* Sell Order */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Minus className="w-4 h-4 text-red-400" />
                    <span className="font-semibold text-red-400">Sell Order</span>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="number"
                      value={sellPrice}
                      onChange={(e) => setSellPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:border-red-500"
                      placeholder="Price"
                    />
                    <input
                      type="number"
                      value={sellQuantity}
                      onChange={(e) => setSellQuantity(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:border-red-500"
                      placeholder="Quantity"
                    />
                    <button
                      onClick={() => handlePlaceOrder('sell')}
                      disabled={isPlacingOrder}
                      className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                      Place Sell
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <OrderBook orderBook={data.orderBook} />
          </div>

          {/* Right Side */}
          <div className="lg:col-span-2 space-y-6">
            <TradeFlowDiagram
              activeStage={activeStage}
              isMatched={isMatched}
              isTradeStarted={isSimulationRunning}
            />
            <TradeHistory
              trades={data.trades}
              ledger={data.ledger}
              isSimulationRunning={isSimulationRunning}
              settledTradeIds={settledTradeIds}
              currentSettlingTradeId={currentSettlingTradeId}
            />
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
          <h4 className="font-semibold mb-4 text-xl text-slate-200">How the Matching & Settlement Logic Works:</h4>

          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-emerald-500/30">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-bold">1</div>
                <div>
                  <h5 className="text-emerald-400 font-semibold mb-2">Order Matching (Price-Time Priority)</h5>
                  <p className="text-sm text-slate-300 mb-2">
                    When you place an order, it enters the order book. The matching engine follows these rules:
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                    <li><strong className="text-slate-300">Price Priority:</strong> Best buy price (highest) matches with best sell price (lowest)</li>
                    <li><strong className="text-slate-300">Time Priority:</strong> If prices are equal, earlier orders get matched first</li>
                    <li><strong className="text-slate-300">Match Condition:</strong> Trade executes when buy price ≥ sell price</li>
                    <li><strong className="text-slate-300">Match Price:</strong> The trade happens at the sell order's price (limit price of resting order)</li>
                    <li><strong className="text-slate-300">Quantity:</strong> Matches the minimum quantity available from both orders</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-yellow-500/30">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 font-bold">2</div>
                <div>
                  <h5 className="text-yellow-400 font-semibold mb-2">Clearing Process</h5>
                  <p className="text-sm text-slate-300 mb-2">
                    Once a trade is matched:
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                    <li>Trade is immediately sent to the clearing house</li>
                    <li>Status marked as <strong className="text-yellow-300">"Pending (T+2)"</strong></li>
                    <li>Clearing house validates the trade and guarantees both sides</li>
                    <li>It acts as the counterparty to both buyer and seller, eliminating default risk</li>
                    <li>Settlement date is calculated as T+2 (2 business days after trade date)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/30">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold">3</div>
                <div>
                  <h5 className="text-green-400 font-semibold mb-2">Settlement (T+2 Cycle)</h5>
                  <p className="text-sm text-slate-300 mb-2">
                    After 2 seconds (simulating 2 business days):
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                    <li>The simulator automatically checks all pending trades every second</li>
                    <li>Trades older than 2 seconds (T+2) are marked as <strong className="text-green-300">"Settled ✅"</strong></li>
                    <li>In real markets, this is when money moves from buyer's account to seller's account</li>
                    <li>Simultaneously, shares move from seller's demat account to buyer's demat account</li>
                    <li>Settlement is final and irreversible at this point</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-slate-300">
              <strong className="text-blue-400">💡 Try it:</strong> Place a buy order at $105 and a sell order at $100.
              Since buy price ($105) ≥ sell price ($100), they'll match instantly at $100. Watch the trade flow through
              all stages and automatically settle after 2 seconds!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}