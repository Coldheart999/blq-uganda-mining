import React from 'react';
import { MinerPackage } from '../types';
import { Clock, ArrowRight, Zap, Cpu, Activity, TrendingUp } from 'lucide-react';

interface MinerCardProps {
  miner: MinerPackage;
  onBuy: (minerId: string) => void;
  userBalance: number;
}

export const MinerCard: React.FC<MinerCardProps> = ({ miner, onBuy, userBalance }) => {
  const canAfford = userBalance >= miner.priceUGX;
  const totalReturnUGX = miner.dailyYieldUGX * miner.durationDays;
  const netProfitUGX = totalReturnUGX - miner.priceUGX;
  const roiPercentage = Math.round((netProfitUGX / miner.priceUGX) * 100);

  return (
    <div className="bg-gradient-to-b from-[#111724] via-[#0E131F] to-[#0A0D16] border border-cyan-500/20 hover:border-cyan-400/50 rounded-3xl p-6 shadow-xl transition-all duration-300 hover:shadow-cyan-950/40 flex flex-col justify-between space-y-6">
      
      {/* Vertical Section 1: Visual Header */}
      <div className="space-y-4">
        
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            {miner.durationDays}-Day Contract
          </span>

          <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-md">
            +{roiPercentage}% ROI
          </span>
        </div>

        {/* Hardware Visual */}
        <div className="relative w-full h-48 rounded-2xl bg-slate-950 overflow-hidden border border-slate-800">
          <img
            src={miner.image}
            alt={miner.name}
            className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D16] via-transparent to-transparent"></div>
          
          <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md text-emerald-400 text-xs font-mono font-bold px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {miner.hashRate}
          </div>
        </div>

        {/* Plan Title & Subtitle */}
        <div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            {miner.name}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {miner.model} • {miner.algo}
          </p>
        </div>

        {/* Vertical Stack Earnings Summary */}
        <div className="bg-[#070A10] p-4 rounded-2xl border border-slate-800/90 space-y-2.5 text-xs font-mono">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Daily Mining Yield:</span>
            <span className="text-emerald-400 font-bold text-sm">
              + UGX {miner.dailyYieldUGX.toLocaleString()} / day
            </span>
          </div>

          <div className="flex justify-between items-center border-t border-slate-800/80 pt-2 text-slate-300">
            <span>Total Contract Payout:</span>
            <span className="font-extrabold text-amber-400 text-sm">
              UGX {totalReturnUGX.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center border-t border-slate-800/80 pt-2 text-emerald-400 font-bold text-[11px]">
            <span>Net Investment Profit:</span>
            <span>+ UGX {netProfitUGX.toLocaleString()}</span>
          </div>
        </div>

      </div>

      {/* Vertical Section 2: Action Button & Price */}
      <div className="space-y-3 pt-3 border-t border-slate-800/80">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-slate-400">Plan Price:</span>
          <span className="text-2xl font-black text-white font-mono">
            UGX {miner.priceUGX.toLocaleString()}
          </span>
        </div>

        <button
          onClick={() => onBuy(miner.id)}
          className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
            canAfford
              ? 'bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-slate-950 shadow-emerald-950/50 active:scale-[0.98]'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700'
          }`}
        >
          {canAfford ? (
            <>
              <span>Activate {miner.durationDays}-Day Contract (UGX {miner.priceUGX.toLocaleString()})</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </>
          ) : (
            <span>Deposit UGX to Activate</span>
          )}
        </button>
      </div>

    </div>
  );
};
