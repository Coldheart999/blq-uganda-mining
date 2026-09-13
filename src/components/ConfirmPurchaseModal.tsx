import React from 'react';
import { MinerPackage } from '../types';
import { Sparkles, Check, X, Heart, Zap, Coins } from 'lucide-react';

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
  const balanceAfter = userBalance - packageToBuy.priceUGX;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#182132] via-[#111726] to-[#0A0E17] border-2 border-amber-500/40 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5">
        
        {/* Close Icon */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cute Hospitable Header Icon */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shadow-lg">
            <Heart className="w-7 h-7 text-amber-400 fill-amber-400/20" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Activate Package?
          </h2>
        </div>

        {/* Hospitable Warm Question */}
        <div className="p-4 bg-slate-950/80 border border-slate-800/90 rounded-2xl text-center space-y-3 shadow-inner">
          <p className="text-sm text-slate-200 leading-relaxed">
            Dear miner, would you like to activate the <strong className="text-amber-400">{packageToBuy.name}</strong> for <strong className="text-white">UGX {packageToBuy.priceUGX.toLocaleString()}</strong>?
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block uppercase">Daily Profit</span>
              <span className="font-extrabold text-emerald-400 text-sm">+UGX {packageToBuy.dailyYieldUGX.toLocaleString()}</span>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block uppercase">Duration</span>
              <span className="font-extrabold text-amber-300 text-sm">{packageToBuy.durationDays} Days</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 font-mono pt-1 px-1">
            <span>Remaining Balance:</span>
            <span className="font-bold text-white">UGX {balanceAfter.toLocaleString()}</span>
          </div>
        </div>

        {/* Simple Yes or No Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={onClose}
            className="py-3.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-bold rounded-2xl text-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <X className="w-4 h-4 text-slate-400" />
            <span>No</span>
          </button>

          <button
            onClick={() => onConfirm(packageToBuy.id)}
            className="py-3.5 px-4 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black rounded-2xl text-sm shadow-xl shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Yes</span>
          </button>
        </div>

      </div>
    </div>
  );
};
