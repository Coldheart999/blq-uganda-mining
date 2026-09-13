import React from 'react';
import { MinerPackage } from '../types';
import { Sparkles, ShieldCheck, ArrowRight, X, Clock, Zap, Cpu, Wallet, AlertCircle, Heart } from 'lucide-react';

interface ConfirmPurchaseModalProps {
  packageToBuy: MinerPackage | null;
  userBalance: number;
  onConfirm: (packageId: string) => void;
  onClose: () => void;
}

export const ConfirmPurchaseModal: React.FC<ConfirmPurchaseModalProps> = ({
  packageToBuy,
  userBalance,
  onConfirm,
  onClose
}) => {
  if (!packageToBuy) return null;

  const totalReturnUGX = packageToBuy.dailyYieldUGX * packageToBuy.durationDays;
  const netProfitUGX = totalReturnUGX - packageToBuy.priceUGX;
  const balanceAfter = userBalance - packageToBuy.priceUGX;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-gradient-to-b from-[#182132] via-[#111726] to-[#0A0E17] border-2 border-amber-500/50 rounded-3xl shadow-2xl p-5 sm:p-7 space-y-5 scrollbar-thin">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-500/15 border border-amber-500/40 rounded-full text-amber-300 font-mono text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Investment Confirmation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Confirm Miner Activation
          </h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Please review your contract details before activating your mining machine.
          </p>
        </div>

        {/* Selected Package Card Preview */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 space-y-3.5 shadow-inner">
          <div className="flex items-center gap-3.5 pb-3 border-b border-slate-800/80">
            <img 
              src={packageToBuy.image} 
              alt={packageToBuy.name} 
              className="w-16 h-16 rounded-xl object-cover border border-slate-700 shadow-md shrink-0" 
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-mono font-bold px-2 py-0.5 rounded-full">
                {packageToBuy.durationDays}-Day Contract
              </span>
              <h3 className="text-base font-extrabold text-white mt-1 truncate">
                {packageToBuy.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {packageToBuy.model} • {packageToBuy.hashRate}
              </p>
            </div>
          </div>

          {/* Investment Figures Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Activation Cost</span>
              <span className="font-extrabold text-white text-sm">UGX {packageToBuy.priceUGX.toLocaleString()}</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Daily Profit</span>
              <span className="font-extrabold text-emerald-400 text-sm">+UGX {packageToBuy.dailyYieldUGX.toLocaleString()}</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Total Payout</span>
              <span className="font-extrabold text-amber-400 text-sm">UGX {totalReturnUGX.toLocaleString()}</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Net Profit</span>
              <span className="font-extrabold text-emerald-300 text-sm">+UGX {netProfitUGX.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* User Balance Breakdown */}
        <div className="p-3.5 bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800/90 rounded-2xl space-y-2 text-xs font-mono">
          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Wallet className="w-3.5 h-3.5 text-amber-400" />
              Your Available Balance:
            </span>
            <span className="font-bold text-white">UGX {userBalance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center border-t border-slate-800/80 pt-2 text-slate-300">
            <span className="text-slate-400">Balance After Activation:</span>
            <span className={`font-bold ${balanceAfter >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              UGX {balanceAfter.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Polite & Hospitable Prompt */}
        <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-amber-200 leading-relaxed">
          <Heart className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 fill-amber-400/20" />
          <p>
            Dear Investor 🌟 Are you sure you would like to activate the <strong className="text-white">{packageToBuy.name}</strong>? Your daily profits of <strong className="text-emerald-400">UGX {packageToBuy.dailyYieldUGX.toLocaleString()}</strong> will start accumulating automatically!
          </p>
        </div>

        {/* Dual Actions: Confirm vs Cancel */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => onConfirm(packageToBuy.id)}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 hover:from-amber-400 hover:to-emerald-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Yes, Activate My Package Now 🚀</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white font-bold rounded-xl text-xs transition-all"
          >
            Review Other Packages First
          </button>
        </div>

      </div>
    </div>
  );
};
