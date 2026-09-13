import React from 'react';
import { MinerPackage } from '../types';
import { Cpu, Zap, Activity, Clock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

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
    <div className="group relative bg-[#111724] border border-slate-800/80 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col justify-between overflow-hidden">
      
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3">
          <span className="bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-lg flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            {miner.durationDays}-Day Contract
          </span>
          {miner.badge && (
            <span className="bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[11px] font-bold px-2.5 py-0.5 rounded-lg">
              {miner.badge}
            </span>
          )}
        </div>

        {/* Hardware Visualizer */}
        <div className="relative w-full h-44 rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden mb-4 group-hover:border-slate-700 transition-all">
          <img
            src={miner.image}
            alt={miner.name}
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111724] via-transparent to-transparent"></div>
          
          {/* Status Badge Overlay */}
          <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-200 font-semibold">{miner.hashRate}</span>
          </div>

          <div className="absolute bottom-3 right-3 bg-amber-500 text-slate-950 text-xs font-black font-mono px-2 py-0.5 rounded">
            {miner.durationDays} DAYS
          </div>
        </div>

        {/* Package Title */}
        <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-amber-400 transition-colors">
          {miner.name}
        </h3>
        <p className="text-xs text-slate-400 font-mono mb-4">
          {miner.model} • {miner.algo}
        </p>

        {/* Profit Highlights Box */}
        <div className="p-3.5 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent border border-amber-500/20 rounded-xl mb-4 space-y-1.5">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-slate-300 font-medium">Daily Profit:</span>
            <span className="text-base font-black text-emerald-400 font-mono">
              + UGX {miner.dailyYieldUGX.toLocaleString()} / day
            </span>
          </div>
          <div className="flex justify-between items-center text-xs border-t border-slate-800/60 pt-1.5">
            <span className="text-slate-400">{miner.durationDays}-Day Total Return:</span>
            <span className="font-bold text-amber-400 font-mono">
              UGX {totalReturnUGX.toLocaleString()} (+{roiPercentage}%)
            </span>
          </div>
        </div>

        {/* Hardware Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs font-mono">
          <div>
            <span className="text-[10px] text-slate-500 block">Hash Power</span>
            <span className="font-semibold text-slate-200">{miner.hashRate}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Power Rating</span>
            <span className="font-semibold text-slate-200">{miner.powerDraw}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Contract Duration</span>
            <span className="font-bold text-amber-400">{miner.durationDays} Days</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Net Profit</span>
            <span className="font-bold text-emerald-400">+UGX {netProfitUGX.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Pricing & Purchase Action */}
      <div className="pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">Package Price:</span>
          <span className="text-xl font-black text-white font-mono">
            UGX {miner.priceUGX.toLocaleString()}
          </span>
        </div>

        <button
          onClick={() => onBuy(miner.id)}
          className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow ${
            canAfford
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 active:scale-[0.98]'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700'
          }`}
        >
          {canAfford ? (
            <>
              <span>Buy {miner.durationDays}-Day Package (UGX {miner.priceUGX.toLocaleString()})</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </>
          ) : (
            <span>Deposit UGX to Purchase</span>
          )}
        </button>
      </div>

    </div>
  );
};
