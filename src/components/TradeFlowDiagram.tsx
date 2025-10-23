import { useEffect, useState } from 'react';
import { User, Building2, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';

interface TradeFlowDiagramProps {
  activeStage: number; // -1 = idle, 0..4 = stages
  isMatched: boolean;
  isTradeStarted: boolean;
}

export function TradeFlowDiagram({ activeStage, isMatched, isTradeStarted }: TradeFlowDiagramProps) {
  const [animatingStage, setAnimatingStage] = useState<number>(-1);
  const [stageStatus, setStageStatus] = useState<
    Array<'pending' | 'active' | 'completed'>
  >(Array(5).fill('pending'));
  const [isAnimating, setIsAnimating] = useState(false);

  const stages = [
    {
      icon: User,
      label: 'Trader',
      color: 'text-blue-400',
      description: 'Placing order through trading app...',
      summary: 'Order placed successfully.',
    },
    {
      icon: Building2,
      label: 'Broker',
      color: 'text-cyan-400',
      description: 'Broker validating and routing order to exchange...',
      summary: 'Order routed to exchange.',
    },
    {
      icon: Building2,
      label: 'Exchange',
      color: 'text-emerald-400',
      description: 'Exchange matching buy and sell orders...',
      summary: 'Trade matched successfully.',
    },
    {
      icon: Shield,
      label: 'Clearing House',
      color: 'text-yellow-400',
      description: 'Clearing house verifying counterparties and guaranteeing trade...',
      summary: 'Trade guaranteed and cleared (T+2).',
    },
    {
      icon: CheckCircle2,
      label: 'Settlement',
      color: 'text-green-400',
      description: 'Transferring funds and shares to finalize settlement...',
      summary: 'Trade settled and finalized.',
    },
  ];

  // Sequential animation with clean reset and persistent summaries
  const animateStagesSequentially = async () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setStageStatus(Array(stages.length).fill('pending'));
    setAnimatingStage(-1);

    for (let i = 0; i < stages.length; i++) {
      setAnimatingStage(i);
      setStageStatus((prev) => {
        const next = [...prev];
        next[i] = 'active';
        return next;
      });

      // show description for a bit longer so user can read
      await new Promise((res) => setTimeout(res, 2500));

      // mark completed and persist summary
      setStageStatus((prev) => {
        const next = [...prev];
        next[i] = 'completed';
        return next;
      });

      // small pause before moving to next stage
      await new Promise((res) => setTimeout(res, 700));
    }

    // ensure end state persists
    setAnimatingStage(-1);
    setIsAnimating(false);
  };

  // Control animation lifecycle
  useEffect(() => {
    // start only when explicitly triggered by parent
    if (isTradeStarted && activeStage === 0 && !isAnimating) {
      animateStagesSequentially();
    }

    // reset completely when trade flow resets
    if (activeStage === -1 && !isTradeStarted) {
      setStageStatus(Array(stages.length).fill('pending'));
      setAnimatingStage(-1);
      setIsAnimating(false);
    }
  }, [activeStage, isTradeStarted]);

  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold mb-6 text-white">Trade Flow</h3>

      <div className="space-y-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const status = stageStatus[index];
          const isActive = status === 'active';
          const isCompleted = status === 'completed';

          return (
            <div key={index}>
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-lg transition-all duration-500 ${
                    isActive || isCompleted
                      ? 'bg-slate-700 border-2 border-emerald-500 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-800 border-2 border-slate-600'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors duration-500 ${
                      isActive || isCompleted ? stage.color : 'text-slate-500'
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <div
                    className={`font-medium transition-colors duration-500 ${
                      isActive || isCompleted ? 'text-white' : 'text-slate-500'
                    }`}
                  >
                    {stage.label}
                  </div>

                  {isActive && (
                    <div className="text-sm text-emerald-400 animate-pulse">
                      {stage.description}
                    </div>
                  )}

                  {isCompleted && (
                    <div className="text-sm text-slate-400 italic">
                      {stage.summary}
                    </div>
                  )}
                </div>

                {isActive && (
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <div
                      className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <div
                      className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                )}
              </div>

              {index < stages.length - 1 && (
                <div className="ml-8 my-2">
                  <ArrowRight
                    className={`w-5 h-5 transition-colors duration-500 ${
                      isActive || isCompleted ? 'text-emerald-400' : 'text-slate-600'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isMatched && (
        <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500 rounded-lg">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-5 h-5" />
            MATCH FOUND
          </div>
          <div className="text-sm text-slate-300 mt-1">
            Trade matched and sent to clearing house
          </div>
        </div>
      )}

      {!isAnimating && animatingStage === -1 && !isTradeStarted && (
        <div className="text-center text-slate-400 mt-4 italic">
          Waiting for trade to start...
        </div>
      )}
    </div>
  );
}
