import { Trade, LedgerEntry } from '../types';
import { Clock, CheckCircle2, Hourglass } from 'lucide-react';

interface TradeHistoryProps {
  trades: Trade[];
  ledger: LedgerEntry[];
  isSimulationRunning: boolean;
  settledTradeIds: Set<string>;
  currentSettlingTradeId: string | null;
}

export function TradeHistory({
  trades,
  ledger,
  settledTradeIds,
  currentSettlingTradeId,
}: TradeHistoryProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 transition-all duration-300">
      <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Recent Trades & Settlement Status
      </h3>

      <div className="space-y-3">
        {trades.length === 0 ? (
          <div className="text-slate-500 text-center py-8">
            No trades yet. Place an order to see it appear here.
          </div>
        ) : (
          trades.map((trade) => {
            const ledgerEntry = ledger.find(
              (entry) => entry.tradeId === trade.id
            );

            if (!ledgerEntry) {
              return (
                <div
                  key={trade.id}
                  className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-white font-mono font-semibold">
                        Trade #{trade.id}
                      </div>
                      <div className="text-sm text-slate-400">
                        {new Date(trade.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-mono font-semibold">
                        ${trade.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-slate-400">
                        Qty: {trade.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Determine persistent status based on settled trade IDs and current settling trade
            const tradeIdStr = String(trade.id);
            const isCurrentlySettling = currentSettlingTradeId === tradeIdStr;
            const isAlreadySettled = settledTradeIds.has(tradeIdStr);
            
            // Trade is settled only if it's in the settledTradeIds set
            const isSettled = isAlreadySettled;
            
            // Trade is pending if it's currently settling OR if ledger says pending but not yet settled
            const isPending = !isSettled && (isCurrentlySettling || 
              ledgerEntry.status.toLowerCase().includes('pending'));

            return (
              <div
                key={trade.id}
                className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-all duration-300"
              >
                {/* Trade Header */}
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-white font-mono font-semibold">
                      Trade #{trade.id}
                    </div>
                    <div className="text-sm text-slate-400">
                      {new Date(trade.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 font-mono font-semibold">
                      ${trade.price.toFixed(2)}
                    </div>
                    <div className="text-sm text-slate-400">
                      Qty: {trade.quantity}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-3 pt-3 border-t border-slate-600 flex items-center justify-between">
                  {isSettled ? (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Trade Settled</span>
                    </div>
                  ) : isPending ? (
                    <div className="flex items-center gap-2 text-sm">
                      <Hourglass className="w-4 h-4 text-yellow-400 animate-pulse" />
                      <span className="text-yellow-400">
                        {isCurrentlySettling ? 'Settling...' : 'Pending Settlement'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <Hourglass className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400">{ledgerEntry.status}</span>
                    </div>
                  )}

                  {isPending && isCurrentlySettling && (
                    <div className="text-xs text-slate-400">In progress...</div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}