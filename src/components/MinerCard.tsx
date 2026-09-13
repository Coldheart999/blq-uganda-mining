import React from 'react';
import { MinerPackage } from '../types';
import { TrendingUp, Clock, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface MinerCardProps {
  miner: MinerPackage;
  onBuy: (minerId: string) => void;
  userBalance: number;
}

export const MinerCard: React.FC<MinerCardProps> = ({ miner, onBuy, userBalance }) => {
  const canAfford = userBalance >= miner.priceUGX;
  const totalReturnUGX = miner.dailyYieldUGX * miner.durationDays;
  const netProfitUGX = totalReturnUGX - miner.priceUGX;

  // Clean human color accents per tier
  const isExpress = miner.durationDays === 5;
  const isVip = miner.priceUGX >= 500000;

  return (
    <div className="bg-[#151C28] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-md transition-all flex flex-col justify-between">
      
      <div>
        {/* Header Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
            isExpress 
              ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' 
              : 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            {miner.durationDays}-Day Investment Plan
          </span>

          {isVip && (
            <span className="text-[11px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
              VIP High Yield
            </span>
          )}
        </div>

        {/* Plan Title */}
        <h3 className="text-xl font-bold text-white tracking-tight mb-1">
          {miner.name}
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Guaranteed daily profit paid directly to your balance.
        </p>

        {/* Clear Investment & Return Numbers */}
        <div className="bg-[#0D121B] rounded-xl p-4 border border-slate-800/80 mb-5 space-y-3">
          
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-slate-400">Daily Payout:</span>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">
              + UGX {miner.dailyYieldUGX.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ day</span>
            </span>
          </div>

          <div className="flex justify-between items-center text-xs border-t border-slate-800/80 pt-2.5">
            <span className="text-slate-400">Total Payout ({miner.durationDays} Days):</span>
            <span className="font-bold text-white font-mono text-sm">
              UGX {totalReturnUGX.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs text-emerald-400 border-t border-slate-800/80 pt-2 font-medium">
            <span>Net Profit Earned:</span>
            <span className="font-bold font-mono">
              + UGX {netProfitUGX.toLocaleString()}
            </span>
          </div>

        </div>

        {/* Feature List */}
        <ul className="space-y-2 text-xs text-slate-300 mb-6">
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Automatic daily collection to account balance</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant MTN & Airtel Mobile Money withdrawal</span>
          </li>
        </ul>
      </div>

      {/* Plan Price & Action Button */}
      <div className="pt-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-slate-400 font-medium">Plan Investment Price:</span>
          <span className="text-xl font-extrabold text-white font-mono">
            UGX {miner.priceUGX.toLocaleString()}
          </span>
        </div>

        <button
          onClick={() => onBuy(miner.id)}
          className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            canAfford
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-[0.98]'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
          }`}
        >
          {canAfford ? (
            <>
              <span>Invest UGX {miner.priceUGX.toLocaleString()}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </>
          ) : (
            <span>Deposit Funds to Invest</span>
          )}
        </button>
      </div>

    </div>
  );
};
