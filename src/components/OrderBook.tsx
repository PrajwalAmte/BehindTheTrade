import { OrderBook as OrderBookType } from '../types';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface OrderBookProps {
  orderBook: OrderBookType;
}

export function OrderBook({ orderBook }: OrderBookProps) {
  const topBids = orderBook.bids.slice(0, 5);
  const topAsks = orderBook.asks.slice(0, 5);

  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold mb-4 text-white">Order Book</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3 text-emerald-400 font-medium">
            <TrendingUp className="w-4 h-4" />
            Bids (Buy)
          </div>
          <div className="space-y-2">
            {topBids.length === 0 ? (
              <div className="text-slate-500 text-sm">No buy orders</div>
            ) : (
              topBids.map((bid) => (
                <div
                  key={bid.id}
                  className="bg-emerald-500/10 border border-emerald-500/30 rounded p-2 text-sm"
                >
                  <div className="flex justify-between">
                    <span className="text-emerald-400 font-mono">
                      ${bid.price.toFixed(2)}
                    </span>
                    <span className="text-slate-300">{bid.quantity}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3 text-red-400 font-medium">
            <TrendingDown className="w-4 h-4" />
            Asks (Sell)
          </div>
          <div className="space-y-2">
            {topAsks.length === 0 ? (
              <div className="text-slate-500 text-sm">No sell orders</div>
            ) : (
              topAsks.map((ask) => (
                <div
                  key={ask.id}
                  className="bg-red-500/10 border border-red-500/30 rounded p-2 text-sm"
                >
                  <div className="flex justify-between">
                    <span className="text-red-400 font-mono">
                      ${ask.price.toFixed(2)}
                    </span>
                    <span className="text-slate-300">{ask.quantity}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-slate-500">Price</div>
          <div className="text-slate-500 text-center">Quantity</div>
          <div className="text-slate-500 text-right">Side</div>
        </div>
      </div>
    </div>
  );
}
