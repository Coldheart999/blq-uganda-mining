import React from 'react';
import { MinerPackage } from '../types';
import { Cpu, Clock, ArrowRight } from 'lucide-react';

interface MinerCardProps {
  miner: MinerPackage;
  onBuy: (minerId: string) => void;
  userBalance: number;
}

export const MinerCard: React.FC<MinerCardProps> = ({ miner, onBuy, userBalance }) => {
  const canAfford = userBalance >= miner.priceUGX;
  const totalReturnUGX = miner.dailyYieldUGX * miner.durationDays;
  const netProfitUGX = totalReturnUGX - miner.priceUGX;

  return (
    <div className="bg-[#121722] border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all">
      
      <div>
        {/* Card Header Tag */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {miner.durationDays}-Day Contract
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            {miner.algo}
          </span>
        </div>

        {/* Machine Thumbnail */}
        <div className="relative w-full h-40 rounded-xl bg-slate-950 overflow-hidden mb-4 border border-slate-800">
          <img
            src={miner.image}
            alt={miner.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute top-2.5 left-2.5 bg-slate-900/90 text-slate-200 text-[11px] font-mono px-2 py-0.5 rounded border border-slate-800">
            {miner.hashRate}
          </div>
          <div className="absolute bottom-2.5 right-2.5 bg-amber-500 text-slate-950 text-[11px] font-bold px-2 py-0.5 rounded font-mono">
            {miner.durationDays} DAYS
          </div>
        </div>

        {/* Title & Model */}
        <h3 className="text-lg font-bold text-white tracking-tight">
          {miner.name}
        </h3>
        <p className="text-xs text-slate-400 font-mono mb-4">
          {miner.model}
        </p>

        {/* Organized Earnings Box */}
        <div className="bg-[#0B0F17] p-3.5 rounded-xl border border-slate-800/80 mb-4 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">Daily Profit:</span>
            <span className="font-bold text-emerald-400 font-mono text-sm">
              + UGX {miner.dailyYieldUGX.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-slate-800/80 pt-2">
            <span className="text-slate-400">Total Contract Return:</span>
            <span className="font-bold text-amber-400 font-mono">
              UGX {totalReturnUGX.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-500">
            <span>Net Profit Earned:</span>
            <span className="font-mono text-emerald-400 font-semibold">
              + UGX {netProfitUGX.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-800/60">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs text-slate-400">Cost:</span>
          <span className="text-lg font-bold text-white font-mono">
            UGX {miner.priceUGX.toLocaleString()}
          </span>
        </div>

        <button
          onClick={() => onBuy(miner.id)}
          className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            canAfford
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-[0.98]'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700'
          }`}
        >
          {canAfford ? (
            <>
              <span>Purchase {miner.durationDays}-Day Contract</span>
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <span>Deposit Funds to Purchase</span>
          )}
        </button>
      </div>

    </div>
  );
};
