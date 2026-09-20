import React from 'react';
import { Sparkles, Heart, Gift, ArrowRight, X, ShieldCheck, CheckCircle2, Zap, Wallet } from 'lucide-react';
import { ReferralNotification } from '../types';

interface ReferralBonusModalProps {
  notification: ReferralNotification | null;
  onClose: () => void;
}

export const ReferralBonusModal: React.FC<ReferralBonusModalProps> = ({ notification, onClose }) => {
  if (!notification) return null;

  const isDeposit = notification.type === 'deposit' || 
                    notification.title?.toLowerCase().includes('deposit') ||
                    (!notification.referredName && notification.amountUGX >= 5000);

  const isWelcome = notification.type === 'welcome' || 
                    notification.title?.toLowerCase().includes('welcome');

  if (isDeposit) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
        <div className="relative w-full max-w-md bg-gradient-to-b from-[#14231E] via-[#0E1A16] to-[#0A1210] border-2 border-emerald-400/60 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-center space-y-5 animate-scale-up">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Celebratory Deposit Icon Badge */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-400 p-1 shadow-xl shadow-emerald-500/30 mx-auto">
            <div className="w-full h-full bg-[#0A1713] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-bounce" />
            </div>
            <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 p-1 rounded-full text-xs shadow-md">
              <Zap className="w-4 h-4 fill-amber-400 text-slate-950" />
            </div>
          </div>

          {/* Title & Amount Banner */}
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-emerald-400 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Instant Deposit Auto-Credited
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight leading-snug">
              Deposit of <span className="text-emerald-400 font-mono">UGX {(notification.amountUGX || 0).toLocaleString()}</span> Credited!
            </h2>
          </div>

          {/* Deposit Details Container */}
          <div className="p-4 bg-slate-950/80 border border-emerald-500/30 rounded-2xl space-y-3 text-xs text-slate-200 text-left leading-relaxed">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-emerald-400 font-semibold font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mobile Money Payment Confirmed</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ⚡ Instant Balance
              </span>
            </div>

            <p className="text-slate-300">
              Your wallet balance has been successfully credited with <strong className="text-emerald-400 font-mono text-sm">UGX {(notification.amountUGX || 0).toLocaleString()}</strong>.
            </p>

            <div className="p-3 bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-slate-950 border border-emerald-500/40 rounded-xl flex items-center justify-between font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                Amount Added:
              </span>
              <span className="text-lg font-black text-emerald-400">
                +UGX {(notification.amountUGX || 0).toLocaleString()}
              </span>
            </div>

            {notification.transactionId && (
              <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 flex justify-between items-center font-mono text-[11px]">
                <span className="text-slate-400">Transaction ID (TxID):</span>
                <span className="text-amber-400 font-bold">{notification.transactionId}</span>
              </div>
            )}

            <p className="text-slate-400 text-[11px] leading-relaxed">
              Your transaction has been submitted to the audit queue. You can now start buying mining packages right away and earn daily profits!
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 font-extrabold rounded-xl text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Start Mining / Buy Miner</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </div>
    );
  }

  if (isWelcome) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
        <div className="relative w-full max-w-md bg-gradient-to-b from-[#1A1829] via-[#121120] to-[#0A0914] border-2 border-amber-400/60 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-center space-y-5 animate-scale-up">
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-emerald-400 p-1 shadow-xl shadow-amber-500/30 mx-auto">
            <div className="w-full h-full bg-[#120F1F] rounded-full flex items-center justify-center">
              <Gift className="w-10 h-10 text-amber-400 animate-bounce" />
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Welcome Gift
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight leading-snug">
              🎉 Welcome Bonus of <span className="text-amber-400 font-mono">UGX {(notification.amountUGX || 1000).toLocaleString()}</span> Credited!
            </h2>
          </div>

          <div className="p-4 bg-slate-950/80 border border-amber-500/30 rounded-2xl space-y-3 text-xs text-slate-200 text-left leading-relaxed">
            <p>
              Welcome to BLQ Mining! Your starter gift of <strong className="text-amber-400 font-mono">UGX {(notification.amountUGX || 1000).toLocaleString()}</strong> is waiting in your balance.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-extrabold rounded-xl text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Explore Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Default: Referral Bonus Notification
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
            🎉 Sweet News! <span className="text-amber-400 font-mono">+UGX {(notification.amountUGX || 15000).toLocaleString()}</span> Bonus Credited! 💖
          </h2>
        </div>

        {/* Sweet Body Message */}
        <div className="p-4 bg-slate-950/80 border border-amber-500/30 rounded-2xl space-y-3 text-xs text-slate-200 text-left leading-relaxed">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-emerald-400 font-semibold font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Miner Activation Confirmed</span>
          </div>

          <p>
            Dear Valued Partner 🌟 We are overjoyed to inform you that your invited investor{' '}
            <strong className="text-white">{notification.referredName || 'A new partner'}</strong>{' '}
            {notification.referredPhone ? `(${notification.referredPhone.slice(0, 3)}****${notification.referredPhone.slice(-3)})` : ''}{' '}
            has officially activated their first mining machine!
          </p>

          <div className="p-3 bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-slate-950 border border-amber-500/40 rounded-xl flex items-center justify-between font-mono">
            <span className="text-slate-400">Commission Earned:</span>
            <span className="text-lg font-black text-amber-400">+UGX {(notification.amountUGX || 15000).toLocaleString()}</span>
          </div>

          <p className="text-slate-400 text-[11px]">
            Your referral commission of <strong className="font-mono text-amber-300">UGX {(notification.amountUGX || 15000).toLocaleString()}</strong> has been credited directly to your withdrawable balance. Keep sharing your link to earn unlimited rewards!
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-extrabold rounded-xl text-sm shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>Awesome! View My Balance</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
