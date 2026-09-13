import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowDownLeft, X, Smartphone, CheckCircle2, AlertCircle, Copy, Info, Clock, HeartHandshake, Bell, Lock } from 'lucide-react';
import { validateUgandanPhone } from '../utils/phoneValidation';
import { MtnLogo, AirtelLogo } from './ProviderLogos';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, adminConfig, submitDeposit } = useApp();

  // Locked to Airtel Money for deposits currently
  const [provider] = useState<'Airtel Money'>('Airtel Money');
  const [senderPhone, setSenderPhone] = useState<string>(currentUser?.phone || '');
  const [amount, setAmount] = useState<string>('50000');
  const [txId, setTxId] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [mtnNotice, setMtnNotice] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedTxId, setSubmittedTxId] = useState<string>('');
  const [submittedAmount, setSubmittedAmount] = useState<number>(0);

  if (!isOpen || !currentUser) return null;

  const targetNumber = adminConfig.airtelMoneyNumber;
  const targetName = adminConfig.airtelMoneyName;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(targetNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate Airtel phone number network prefix (070, 075, 074)
    const phoneVal = validateUgandanPhone(senderPhone, 'Airtel Money');
    if (!phoneVal.isValid) {
      setError(phoneVal.errorMessage || 'Please enter a valid Airtel Money phone number (070/075/074).');
      return;
    }

    const numAmount = parseInt(amount, 10);
    if (isNaN(numAmount) || numAmount < 5000) {
      setError('Minimum deposit is UGX 5,000');
      return;
    }

    if (!txId.trim()) {
      setError('Please enter your Mobile Money Transaction ID (TxID / Reference Number)');
      return;
    }

    const res = submitDeposit(numAmount, 'Airtel Money', txId.trim());
    if (res.success) {
      setSubmittedTxId(txId.trim());
      setSubmittedAmount(numAmount);
      setIsSubmitted(true);
    } else {
      setError(res.message);
    }
  };

  const handleCloseModal = () => {
    setIsSubmitted(false);
    setError('');
    setTxId('');
    setMtnNotice(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#141B26] to-[#0E131C] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button 
          onClick={handleCloseModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Hospitable Gentle Deposit Success Screen */
          <div className="text-center py-6 px-2 space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-950/50">
              <HeartHandshake className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white">Thank You So Much!</h3>
              <p className="text-xs text-emerald-400 font-semibold tracking-wide uppercase">
                Deposit Submission Received
              </p>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 text-left text-xs">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
                <AirtelLogo size="sm" />
                <span className="font-bold text-white text-sm">Airtel Money Uganda</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                We have received your deposit request of <span className="font-bold font-mono text-emerald-400">UGX {submittedAmount.toLocaleString()}</span>.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-lg flex justify-between items-center font-mono">
                <span className="text-slate-400">Transaction Ref (TxID):</span>
                <span className="text-amber-400 font-bold">{submittedTxId}</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Please wait gently while our financial accounts manager verifies your transaction. Your account balance will be updated automatically in just a moment.
              </p>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 text-xs flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 animate-spin" />
              <span>Verification in progress • You can close this window safely</span>
            </div>

            <button
              onClick={handleCloseModal}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-rose-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg transition-all active:scale-[0.98]"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          /* Normal Deposit Form */
          <>
            {/* Modal Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Deposit Money via Mobile Money</h2>
                <p className="text-xs text-slate-400">Send deposit to account below & enter your Transaction ID</p>
              </div>
            </div>

            {/* Hospitable Notification: Currently Airtel Only */}
            <div className="mb-5 p-3.5 bg-rose-950/40 border border-rose-500/40 rounded-xl space-y-1.5 text-xs text-rose-200">
              <div className="flex items-center gap-2 font-bold text-white">
                <AirtelLogo size="sm" />
                <span>Active Deposit Method: Airtel Money</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                Dear investor, we currently process deposit payments exclusively via <strong className="text-white font-semibold">Airtel Money Uganda</strong>. MTN Mobile Money deposit integration is coming soon in our upcoming release!
              </p>
            </div>

            {/* Error Message Banner */}
            {error && (
              <div className="mb-4 p-3 bg-rose-950/70 border border-rose-800/80 rounded-xl text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span className="leading-snug">{error}</span>
              </div>
            )}

            {/* MTN Non-Clickable Popover Notification */}
            {mtnNotice && (
              <div className="mb-4 p-3 bg-amber-950/70 border border-amber-500/60 rounded-xl text-amber-200 text-xs flex items-center gap-2 animate-bounce">
                <Bell className="w-4 h-4 text-amber-400 shrink-0" />
                <span>MTN Mobile Money deposits are coming soon! Please use Airtel Money below.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Provider Options */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  1. Select Mobile Money Provider
                </label>
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Active Airtel Money Button */}
                  <div className="py-3 px-3 rounded-xl border border-rose-500 bg-rose-500/10 text-white text-xs font-bold flex items-center justify-between shadow-md ring-1 ring-rose-500/50">
                    <div className="flex items-center gap-2">
                      <AirtelLogo size="sm" />
                      <span>Airtel Money</span>
                    </div>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">Active</span>
                  </div>

                  {/* Disabled Non-clickable MTN Button with Notification Trigger */}
                  <div
                    onClick={() => {
                      setMtnNotice(true);
                      setTimeout(() => setMtnNotice(false), 3500);
                    }}
                    className="py-3 px-3 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-500 text-xs font-bold flex items-center justify-between cursor-not-allowed opacity-75 hover:border-amber-500/40 transition-colors select-none"
                    title="MTN Deposits Coming Soon"
                  >
                    <div className="flex items-center gap-2">
                      <MtnLogo size="sm" />
                      <span>MTN MoMo</span>
                    </div>
                    <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-mono flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" />
                      Soon
                    </span>
                  </div>

                </div>
              </div>

              {/* Sender Phone Number Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  2. Your Airtel Money Sender Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Smartphone className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={senderPhone}
                    onChange={(e) => {
                      setSenderPhone(e.target.value);
                      setError('');
                    }}
                    placeholder="e.g. 0701234567 or 0751234567"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                  <AirtelLogo size="sm" className="w-4 h-4 p-0 rounded-sm" />
                  <span>Must be an Airtel Uganda line (070/075/074)</span>
                </p>
              </div>

              {/* Receiver Details Card */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
                  <span>3. Send deposit money to this official account:</span>
                  <AirtelLogo size="sm" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Receiver Number:</span>
                  <div className="flex items-center gap-2 font-mono font-extrabold text-rose-400 text-base">
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
                  4. Deposit Amount (UGX)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 50000"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 font-mono font-bold text-lg focus:outline-none focus:border-rose-500"
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
                  5. Mobile Money Transaction ID (TxID / Ref)
                </label>
                <input
                  type="text"
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                  placeholder="e.g. 24589102391"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-rose-500"
                  required
                />
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  Copy the transaction ID from your Airtel SMS confirmation message.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-rose-950/50 transition-all active:scale-[0.98]"
              >
                Submit Deposit Confirmation
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};
