import React from 'react';
import { MinerPackage } from '../types';
import { Cpu, Zap, Activity, Clock, Award, ShieldCheck, Check } from 'lucide-react';

interface MinerCardProps {
  miner: MinerPackage;
  onBuy: (minerId: string) => void;
  userBalance: number;
}

export const MinerCard: React.FC<MinerCardProps> = ({ miner, onBuy, userBalance }) => {
  const canAfford = userBalance >= miner.priceUGX;
  const totalReturnUGX = miner.dailyYieldUGX * miner.durationDays;
  const roiPercentage = Math.round(((totalReturnUGX - miner.priceUGX) / miner.priceUGX) * 100);

  return (
    <div className="group relative bg-gradient-to-b from-[#161F2E] via-[#121824] to-[#0D121C] border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:shadow-emerald-950/30 flex flex-col justify-between overflow-hidden">
      
      {/* Glow highlight on hover */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none"></div>

      <div>
        {/* Top Badge & Tier */}
        <div className="flex items-center justify-between mb-3">
          <span className="bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
            <Cpu className="w-3 h-3 text-amber-400" />
            {miner.tier} Class
          </span>
          {miner.badge && (
            <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md">
              {miner.badge}
            </span>
          )}
        </div>

        {/* ASIC Hardware Graphic Visualizer */}
        <div className="relative w-full h-44 rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden mb-4 group-hover:border-slate-700 transition-all">
          <img
            src={miner.image}
            alt={miner.name}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D121C] via-transparent to-transparent"></div>
          
          {/* LED Status Lights Overlay */}
          <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-slate-800 text-[10px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">ONLINE</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-bold">{miner.hashRate}</span>
          </div>

          {/* Model Tag Overlay */}
          <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
            <span className="text-xs font-mono font-bold text-slate-200 drop-shadow">
              {miner.model}
            </span>
          </div>
        </div>

        {/* Miner Name */}
        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
          {miner.name}
        </h3>
        <p className="text-xs text-slate-400 font-mono mb-4 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          {miner.algo}
        </p>

        {/* Technical Hardware Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Hash Rate</span>
            <span className="font-bold text-amber-400 font-mono flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" />
              {miner.hashRate}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Power Draw</span>
            <span className="font-bold text-cyan-400 font-mono flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              {miner.powerDraw}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Contract Lifecycle</span>
            <span className="font-semibold text-slate-300 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {miner.durationDays} Days
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Estimated ROI</span>
            <span className="font-bold text-emerald-400 font-mono">
              +{roiPercentage}% Profit
            </span>
          </div>
        </div>

        {/* Pricing & Yield Summary Box */}
        <div className="p-3 bg-gradient-to-r from-emerald-950/30 to-teal-950/30 border border-emerald-500/20 rounded-xl mb-4">
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-xs text-slate-400 font-medium">Daily Mining Profit:</span>
            <span className="text-base font-extrabold text-emerald-400 font-mono">
              UGX {miner.dailyYieldUGX.toLocaleString()} / day
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Total 30-Day Return:</span>
            <span className="font-bold text-amber-400 font-mono">
              UGX {totalReturnUGX.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Buy Button & Machine Price */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs text-slate-400">Package Price:</span>
          <span className="text-lg font-black text-white font-mono">
            UGX {miner.priceUGX.toLocaleString()}
          </span>
        </div>

        <button
          onClick={() => onBuy(miner.id)}
          className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
            canAfford
              ? 'bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-slate-950 shadow-emerald-950/50 active:scale-[0.98]'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-750 cursor-pointer border border-slate-700'
          }`}
        >
          <Cpu className="w-4 h-4" />
          {canAfford ? `Purchase ${miner.name}` : `Deposit to Buy (UGX ${miner.priceUGX.toLocaleString()})`}
        </button>
      </div>

    </div>
  );
};
