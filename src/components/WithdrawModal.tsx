import React, { useState } from 'react';
import { useApp, normalizePhoneKey } from '../context/AppContext';
import { BackButton } from './BackButton';
import { ArrowUpRight, X, Smartphone, CheckCircle2, AlertCircle, ShieldCheck, Clock } from 'lucide-react';
import { validateUgandanPhone } from '../utils/phoneValidation';
import { MtnLogo, AirtelLogo } from './ProviderLogos';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, adminConfig, submitWithdrawal, purchasedRigs, withdrawals } = useApp();

  const [provider, setProvider] = useState<'MTN Mobile Money' | 'Airtel Money'>('MTN Mobile Money');
  const [amount, setAmount] = useState<string>('20000');
  const [destinationNumber, setDestinationNumber] = useState<string>(currentUser?.phone || '');
  const [error, setError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  if (!isOpen || !currentUser) return null;

  const numAmount = parseInt(amount, 10) || 0;
  const feeUGX = Math.round(numAmount * (adminConfig.withdrawalFeePercent / 100));
  const netPayoutUGX = Math.max(0, numAmount - feeUGX);

  const userRigs = (purchasedRigs || []).filter(r => r.userId === currentUser.id);
  const totalSpentOnMiners = userRigs.reduce((sum, r) => sum + r.priceUGX, 0);
  const uninvestedDeposit = Math.max(0, (currentUser.totalDepositedUGX || 0) - totalSpentOnMiners);
  const maxWithdrawable = Math.max(0, currentUser.balanceUGX - uninvestedDeposit);

  // Time Window Check (6:00 PM to 12:00 AM EAT / 18:00 to 00:00)
  const now = new Date();
  const currentHour = now.getHours();
  const isWithinWindow = currentHour >= 18 && currentHour < 24;

  // Daily Limit Check (1 per day per account)
  const todayStr = now.toDateString();
  const myUserPhoneKey = normalizePhoneKey(currentUser.phone);
  const withdrawalsToday = (withdrawals || []).filter(w => {
    if (!w || w.status === 'rejected') return false;
    const isMyWithdrawal = w.userId === currentUser.id || normalizePhoneKey(w.userPhone || '') === myUserPhoneKey;
    return isMyWithdrawal && new Date(w.createdAt).toDateString() === todayStr;
  });
  const hasWithdrawnToday = withdrawalsToday.length >= 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!isWithinWindow) {
      setError('Withdrawals are currently closed! Due to high withdrawal rate, payouts are open daily between 6:00 PM and 12:00 AM (18:00 - 00:00 EAT). This is done to ensure quick, reliable, and fast withdrawals for all investors.');
      return;
    }

    if (hasWithdrawnToday) {
      setError('Daily withdrawal limit reached! Each account is allowed maximum 1 withdrawal request per day to handle the high withdrawal rate and ensure quick, reliable, and fast payouts.');
      return;
    }

    if (numAmount < 3000) {
      setError('Minimum withdrawal amount is UGX 3,000');
      return;
    }

    if (numAmount > maxWithdrawable) {
      if (uninvestedDeposit > 0) {
        setError(`Withdrawal blocked! You have UGX ${uninvestedDeposit.toLocaleString()} in un-invested deposit funds. Initial deposits must be invested in a mining package before profits can be withdrawn. Your max withdrawable profits: UGX ${maxWithdrawable.toLocaleString()}`);
      } else {
        setError(`Insufficient withdrawable balance. Your max withdrawable limit is UGX ${maxWithdrawable.toLocaleString()}`);
      }
      return;
    }

    // Validate phone number network match (MTN vs Airtel)
    const phoneVal = validateUgandanPhone(destinationNumber, provider);
    if (!phoneVal.isValid) {
      setError(phoneVal.errorMessage || 'Invalid phone number for selected recipient network.');
      return;
    }

    const res = submitWithdrawal(numAmount, provider, destinationNumber.trim());
    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 3000);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#121824] to-[#0D121D] border border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-7 scrollbar-thin">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <BackButton onClick={onClose} />
        </div>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-500 p-0.5 shadow-lg shadow-amber-950/50">
            <div className="w-full h-full bg-[#0B0E14] rounded-[10px] flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Withdraw Mining Profits</h2>
            <p className="text-xs text-slate-400">Direct payout to your MTN or Airtel Mobile Money</p>
          </div>
        </div>

        {/* Withdrawal Schedule & High-Volume Notice Banner */}
        <div className="mb-5 p-3.5 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-slate-900/50 border border-amber-500/30 rounded-2xl space-y-2">
          <div className="flex items-center justify-between font-bold text-amber-300 text-xs">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Daily Payout Window: 6:00 PM – 12:00 AM</span>
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${isWithinWindow ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
              {isWithinWindow ? '● Open Now' : '● Closed'}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Due to high withdrawal volume, payouts are strictly limited to <strong>1 withdrawal daily per account</strong> between <strong>6:00 PM and 12:00 AM midnight (18:00 – 00:00 EAT)</strong>. This schedule is enforced to ensure quick, reliable, and fast withdrawals for all investors!
          </p>
          {hasWithdrawnToday && (
            <div className="pt-1 text-[11px] font-bold text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>You have already submitted your 1 daily withdrawal allowance for today.</span>
            </div>
          )}
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="mb-4 p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Balance Bar */}
          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-mono">Total Wallet Balance:</span>
              <span className="font-extrabold text-slate-200 font-mono text-sm">
                UGX {currentUser.balanceUGX.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs border-t border-slate-800/60 pt-2">
              <span className="text-amber-400 font-semibold font-mono flex items-center gap-1">
                <span>Withdrawable Profits:</span>
              </span>
              <span className="font-extrabold text-emerald-400 font-mono text-base">
                UGX {maxWithdrawable.toLocaleString()}
              </span>
            </div>
            {uninvestedDeposit > 0 && (
              <div className="mt-1.5 p-2 bg-amber-950/40 border border-amber-800/40 rounded-xl text-[11px] text-amber-300/90 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  UGX {uninvestedDeposit.toLocaleString()} initial deposit is un-invested. Activate a miner package to unlock earnings withdrawals.
                </span>
              </div>
            )}
          </div>

          {/* Provider Selection with Authentic Logos */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Receive Mobile Network
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setProvider('MTN Mobile Money');
                  setError('');
                }}
                className={`py-3 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2.5 transition-all ${
                  provider === 'MTN Mobile Money'
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-md ring-1 ring-amber-400/50'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <MtnLogo size="sm" />
                <span>MTN Mobile</span>
                <span className="ml-auto text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">Instant</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProvider('Airtel Money');
                  setError('');
                }}
                className={`py-3 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2.5 transition-all ${
                  provider === 'Airtel Money'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md ring-1 ring-rose-500/50'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <AirtelLogo size="sm" />
                <span>Airtel Money</span>
                <span className="ml-auto text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">Instant</span>
              </button>
            </div>
          </div>

          {/* Target Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-2">
              <span>Recipient Phone Number</span>
              {provider === 'MTN Mobile Money' ? <MtnLogo size="sm" /> : <AirtelLogo size="sm" />}
            </label>
            <input
              type="text"
              value={destinationNumber}
              onChange={(e) => {
                setDestinationNumber(e.target.value);
                setError('');
              }}
              placeholder={provider === 'MTN Mobile Money' ? '0771234567 or 0781234567' : '0701234567 or 0751234567'}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-amber-400"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">
              {provider === 'MTN Mobile Money'
                ? 'Must match an MTN line (077/078/076/039)'
                : 'Must match an Airtel line (070/075/074)'
              }
            </p>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Withdrawal Amount (UGX)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Minimum UGX 3,000"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-amber-400 font-mono font-bold text-lg focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          {/* Payout Calculation Breakdown */}
          <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Gross Withdrawal:</span>
              <span>UGX {numAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[11px]">
              <span>Processing Fee ({adminConfig.withdrawalFeePercent}%):</span>
              <span>- UGX {feeUGX.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-emerald-400 font-bold border-t border-slate-800/80 pt-1.5 text-sm">
              <span>Net Mobile Money Transfer:</span>
              <span>UGX {netPayoutUGX.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isWithinWindow || hasWithdrawnToday}
            className={`w-full py-3 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-[0.98] ${
              !isWithinWindow || hasWithdrawnToday
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 shadow-amber-950/50'
            }`}
          >
            {!isWithinWindow 
              ? 'Withdrawals Closed (Opens 6 PM – 12 AM)' 
              : hasWithdrawnToday 
                ? 'Daily Limit Reached (1 Withdrawal Daily)' 
                : 'Submit Withdrawal Order'
            }
          </button>
        </form>

      </div>
    </div>
  );
};
