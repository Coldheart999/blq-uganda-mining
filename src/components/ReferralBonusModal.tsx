import React from 'react';
import { Sparkles, Heart, Gift, ArrowRight, X, ShieldCheck } from 'lucide-react';
import { ReferralNotification } from '../types';

interface ReferralBonusModalProps {
  notification: ReferralNotification | null;
  onClose: () => void;
}

export const ReferralBonusModal: React.FC<ReferralBonusModalProps> = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#1E192B] via-[#161324] to-[#0D0B18] border-2 border-amber-400/60 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-center space-y-5 animate-scale-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Icon Badge */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-emerald-400 p-1 shadow-xl shadow-amber-500/30 mx-auto">
          <div className="w-full h-full bg-[#120F1F] rounded-full flex items-center justify-center">
            <Gift className="w-10 h-10 text-amber-400 animate-bounce" />
          </div>
          <div className="absolute -top-1 -right-1 bg-rose-500 text-white p-1 rounded-full text-xs shadow-md">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Special Invitation Reward
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight leading-snug">
            🎉 Sweet News! <span className="text-amber-400">UGX 15,000</span> Bonus Credited! 💖
          </h2>
        </div>

        {/* Sweet Body Message */}
        <div className="p-4 bg-slate-950/80 border border-amber-500/30 rounded-2xl space-y-3 text-xs text-slate-200 text-left leading-relaxed">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-emerald-400 font-semibold font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Miner Activation Confirmed</span>
          </div>

          <p>
            Dear Valued Partner 🌟 We are overjoyed to inform you that your invited investor <strong className="text-white">{notification.referredName}</strong> ({notification.referredPhone.slice(0, 3)}****{notification.referredPhone.slice(-3)}) has officially activated their first mining machine!
          </p>

          <div className="p-3 bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-slate-950 border border-amber-500/40 rounded-xl flex items-center justify-between font-mono">
            <span className="text-slate-400">Commission Earned:</span>
            <span className="text-lg font-black text-amber-400">+UGX {notification.amountUGX.toLocaleString()}</span>
          </div>

          <p className="text-slate-400 text-[11px]">
            Your referral commission of <strong>UGX 15,000</strong> has been credited directly to your withdrawable balance. Keep sharing your link to earn unlimited rewards!
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-extrabold rounded-xl text-sm shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>Awesome! View My Balance</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
