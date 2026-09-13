import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownLeft, Sparkles, CheckCircle2 } from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'withdrawal' | 'deposit' | 'purchase';
  user: string;
  location: string;
  amountUGX: number;
  provider: string;
  timeAgo: string;
}

const MOCK_ACTIVITIES: ActivityItem[] = [
  { id: 1, type: 'withdrawal', user: 'David M. (077****892)', location: 'Kampala', amountUGX: 70000, provider: 'MTN Mobile Money', timeAgo: '1m ago' },
  { id: 2, type: 'purchase', user: 'Sarah K. (075****104)', location: 'Mbarara', amountUGX: 50000, provider: 'Turbo Plan (5-Day)', timeAgo: '2m ago' },
  { id: 3, type: 'withdrawal', user: 'Grace N. (078****321)', location: 'Jinja', amountUGX: 125000, provider: 'Airtel Money', timeAgo: '3m ago' },
  { id: 4, type: 'deposit', user: 'Peter O. (070****954)', location: 'Gulu', amountUGX: 200000, provider: 'MTN Mobile Money', timeAgo: '4m ago' },
  { id: 5, type: 'purchase', user: 'Emmanuel B. (077****612)', location: 'Entebbe', amountUGX: 100000, provider: 'Gold Plan (10-Day)', timeAgo: '5m ago' },
  { id: 6, type: 'withdrawal', user: 'Anita T. (075****482)', location: 'Mukono', amountUGX: 210000, provider: 'MTN Mobile Money', timeAgo: '6m ago' }
];

export const SocialProofTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % MOCK_ACTIVITIES.length);
        setIsVisible(true);
      }, 400);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const current = MOCK_ACTIVITIES[currentIndex];

  return (
    <div className="fixed bottom-20 left-4 z-40 max-w-xs sm:max-w-sm pointer-events-none">
      <div 
        className={`bg-[#121824]/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 shadow-2xl transition-all duration-500 pointer-events-auto flex items-center gap-3 ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
        }`}
      >
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
          current.type === 'withdrawal' 
            ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
            : current.type === 'deposit'
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
            : 'bg-teal-500/10 border border-teal-500/30 text-teal-400'
        }`}>
          {current.type === 'withdrawal' ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : current.type === 'deposit' ? (
            <ArrowDownLeft className="w-4 h-4" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
        </div>

        <div className="flex-1 text-xs">
          <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
            <span>{current.location} Investor</span>
            <span>{current.timeAgo}</span>
          </div>

          <div className="font-bold text-white tracking-tight mt-0.5">
            {current.user}
          </div>

          <div className="text-[11px] font-mono mt-0.5 flex items-center gap-1">
            {current.type === 'withdrawal' ? (
              <span className="text-amber-400 font-bold">Withdrew UGX {current.amountUGX.toLocaleString()} via {current.provider}</span>
            ) : current.type === 'deposit' ? (
              <span className="text-emerald-400 font-bold">Deposited UGX {current.amountUGX.toLocaleString()}</span>
            ) : (
              <span className="text-teal-300 font-bold">Activated {current.provider}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
