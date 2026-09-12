import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowDownLeft, X, Smartphone, CheckCircle2, AlertCircle, Copy, Info, Check } from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, adminConfig, submitDeposit } = useApp();

  const [provider, setProvider] = useState<'MTN Mobile Money' | 'Airtel Money'>('MTN Mobile Money');
  const [amount, setAmount] = useState<string>('50000');
  const [txId, setTxId] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  if (!isOpen || !currentUser) return null;

  const targetNumber = provider === 'MTN Mobile Money' ? adminConfig.mobileMoneyNumber : adminConfig.airtelMoneyNumber;
  const targetName = provider === 'MTN Mobile Money' ? adminConfig.mobileMoneyName : adminConfig.airtelMoneyName;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(targetNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const numAmount = parseInt(amount, 10);
    if (isNaN(numAmount) || numAmount < 5000) {
      setError('Minimum deposit is UGX 5,000');
      return;
    }

    if (!txId.trim()) {
      setError('Please enter your Mobile Money Transaction ID (TxID / Reference Number)');
      return;
    }

    const res = submitDeposit(numAmount, provider, txId.trim());
    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        setSuccessMsg('');
        setTxId('');
        onClose();
      }, 2500);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#141B26] to-[#0E131C] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Deposit Money via Mobile Money</h2>
            <p className="text-xs text-slate-400">Send deposit to account below & enter your Transaction ID</p>
          </div>
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
          
          {/* Provider Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              1. Select Mobile Money Provider
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setProvider('MTN Mobile Money')}
                className={`py-3 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  provider === 'MTN Mobile Money'
                    ? 'bg-amber-400/10 border-amber-400 text-amber-400 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                MTN Mobile Money
              </button>

              <button
                type="button"
                onClick={() => setProvider('Airtel Money')}
                className={`py-3 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  provider === 'Airtel Money'
                    ? 'bg-rose-500/10 border-rose-500 text-rose-400 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                Airtel Money
              </button>
            </div>
          </div>

          {/* Receiver Details Card */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
            <div className="text-xs text-slate-400 font-medium mb-1">
              2. Send your deposit money to this mobile account:
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Receiver Number:</span>
              <div className="flex items-center gap-2 font-mono font-extrabold text-amber-400 text-base">
                <span>{targetNumber}</span>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors"
                  title="Copy Phone Number"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            {copied && <p className="text-[10px] text-emerald-400 text-right font-mono">Phone number copied!</p>}

            <div className="flex items-center justify-between text-xs border-t border-slate-800/80 pt-2">
              <span className="text-slate-400 font-mono">Account Name:</span>
              <span className="font-bold text-slate-200">{targetName}</span>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              3. Deposit Amount (UGX)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 50000"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 font-mono font-bold text-lg focus:outline-none focus:border-emerald-500"
              required
            />
            <div className="flex gap-2 mt-2">
              {['20000', '50000', '100000', '300000', '1000000'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className="flex-1 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono rounded-lg"
                >
                  {parseInt(preset).toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Transaction ID / Reference Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              4. Mobile Money Transaction ID (TxID / Ref)
            </label>
            <input
              type="text"
              value={txId}
              onChange={(e) => setTxId(e.target.value)}
              placeholder="e.g. 24589102391"
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
              required
            />
            <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              Copy the transaction ID from your MTN / Airtel SMS confirmation message.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-emerald-950/50 transition-all active:scale-[0.98]"
          >
            Submit Deposit Confirmation
          </button>
        </form>

      </div>
    </div>
  );
};
