import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BackButton } from './BackButton';
import { ShieldCheck, Check, X, Smartphone, ArrowDownLeft, ArrowUpRight, Settings, Lock, AlertCircle, MessageSquare, CreditCard, Users, Search, Edit3, DollarSign } from 'lucide-react';
import { getSMSGatewaySettings, saveSMSGatewaySettings, SMSGatewaySettings } from '../services/smsService';
import { getPaymentGatewaySettings, savePaymentGatewaySettings, PaymentGatewaySettings } from '../services/paymentGateway';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const {
    deposits,
    withdrawals,
    approveDeposit,
    rejectDeposit,
    approveWithdrawal,
    rejectWithdrawal,
    adminConfig,
    setAdminConfig,
    updateUserBalanceByPhone,
    getAllAccounts
  } = useApp();

  const [pinInput, setPinInput] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'withdrawals' | 'deposits' | 'users' | 'gateway' | 'sms' | 'settings'>('withdrawals');
  const [pinError, setPinError] = useState<string>('');

  // User Balance Management State
  const [userSearchTerm, setUserSearchTerm] = useState<string>('');
  const [targetPhoneInput, setTargetPhoneInput] = useState<string>('');
  const [newBalanceInput, setNewBalanceInput] = useState<string>('');
  const [balanceFeedback, setBalanceFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Mobile Money Settings Form State
  const [mtnNum, setMtnNum] = useState<string>(adminConfig.mobileMoneyNumber);
  const [mtnName, setMtnName] = useState<string>(adminConfig.mobileMoneyName);
  const [airtelNum, setAirtelNum] = useState<string>(adminConfig.airtelMoneyNumber);
  const [airtelName, setAirtelName] = useState<string>(adminConfig.airtelMoneyName);
  const [newPin, setNewPin] = useState<string>(adminConfig.adminPin);
  const [saveSuccess, setSaveSuccess] = useState<string>('');

  // Gateway & SMS Settings State
  const [smsSettings, setSmsSettings] = useState<SMSGatewaySettings>(getSMSGatewaySettings());
  const [paymentSettings, setPaymentSettings] = useState<PaymentGatewaySettings>(getPaymentGatewaySettings());

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    if (pinInput === adminConfig.adminPin || pinInput === '8888') {
      setIsAuthenticated(true);
    } else {
      setPinError('Incorrect Admin PIN. Default PIN is 8888.');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminConfig(prev => ({
      ...prev,
      mobileMoneyNumber: mtnNum,
      mobileMoneyName: mtnName,
      airtelMoneyNumber: airtelNum,
      airtelMoneyName: airtelName,
      adminPin: newPin
    }));
    setSaveSuccess('Admin Mobile Money configuration saved successfully!');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleSaveSmsSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSMSGatewaySettings(smsSettings);
    setSaveSuccess("Live SMS Gateway credentials saved!");
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleSavePaymentSettings = (e: React.FormEvent) => {
    e.preventDefault();
    savePaymentGatewaySettings(paymentSettings);
    setSaveSuccess("Payment Gateway Secret Key saved! Instant USSD Push prompt is now live.");
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending');
  const pendingDeposits = deposits.filter(d => d.status === 'pending');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-b from-[#141B28] via-[#101622] to-[#0B0F19] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Header */}
        <div className="p-5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                BLQ Admin Control Panel
                <span className="bg-amber-400/10 text-amber-400 border border-amber-400/30 text-[10px] px-2 py-0.5 rounded font-mono">
                  PAYOUT & DEPOSIT MANAGER
                </span>
              </h2>
              <p className="text-xs text-slate-400">Owner Portal for Uganda Mobile Money Transfers</p>
            </div>
          </div>
          {/* Back Button */}
          <div className="absolute top-4 left-4 z-10">
            <BackButton onClick={onClose} />
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Enter Admin Access PIN</h3>
              <p className="text-xs text-slate-400 mt-1">
                Security key required to view profit payouts and approve deposits.
              </p>
            </div>

            {pinError && (
              <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            <form onSubmit={handleUnlock} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (Default: 8888)"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-center text-amber-400 font-mono font-bold tracking-widest text-xl focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-950/50 hover:from-amber-400 hover:to-yellow-400 transition-all"
              >
                Unlock Admin Portal
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Admin Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Admin Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-900/60 px-4 pt-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('withdrawals')}
                className={`px-5 py-3 font-bold text-xs rounded-t-xl border-t border-x transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'withdrawals'
                    ? 'bg-[#101622] border-slate-700 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
                Withdrawal Payouts Queue
                {pendingWithdrawals.length > 0 && (
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {pendingWithdrawals.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('deposits')}
                className={`px-5 py-3 font-bold text-xs rounded-t-xl border-t border-x transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'deposits'
                    ? 'bg-[#101622] border-slate-700 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                Deposit Approvals
                {pendingDeposits.length > 0 && (
                  <span className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {pendingDeposits.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`px-5 py-3 font-bold text-xs rounded-t-xl border-t border-x transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'users'
                    ? 'bg-[#101622] border-slate-700 text-purple-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-4 h-4 text-purple-400" />
                Client Balances
              </button>

              <button
                onClick={() => setActiveTab('gateway')}
                className={`px-5 py-3 font-bold text-xs rounded-t-xl border-t border-x transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'gateway'
                    ? 'bg-[#101622] border-slate-700 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-400" />
                USSD Push Gateway Keys
              </button>

              <button
                onClick={() => setActiveTab('sms')}
                className={`px-5 py-3 font-bold text-xs rounded-t-xl border-t border-x transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'sms'
                    ? 'bg-[#101622] border-slate-700 text-teal-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-teal-400" />
                SMS Gateway API
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-5 py-3 font-bold text-xs rounded-t-xl border-t border-x transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'settings'
                    ? 'bg-[#101622] border-slate-700 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Settings className="w-4 h-4 text-cyan-400" />
                Mobile Money Numbers
              </button>
            </div>

            {/* Tab 1: Payout Requests Queue */}
            {activeTab === 'withdrawals' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase font-mono">
                    Pending Withdrawal Orders to Pay ({pendingWithdrawals.length})
                  </h3>
                </div>

                {pendingWithdrawals.length === 0 ? (
                  <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-xl text-slate-400 text-xs">
                    No pending withdrawal orders at the moment.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pendingWithdrawals.map((wth) => (
                      <div
                        key={wth.id}
                        className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-amber-500/40 transition-all"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{wth.userName}</span>
                            <span className="text-xs text-amber-400 font-mono bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                              {wth.provider}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 font-mono font-bold flex items-center gap-1">
                            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                            Send Payout To: <span className="text-amber-400 text-sm">{wth.destinationNumber}</span>
                          </p>

                          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-3 pt-1">
                            <span>Total Deposited: UGX {wth.userTotalDeposited.toLocaleString()}</span>
                            <span>|</span>
                            <span>Total Mined: UGX {wth.userTotalMined.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                          <div className="text-right font-mono">
                            <div className="text-xs text-slate-400">Net Transfer Amount:</div>
                            <div className="text-lg font-black text-amber-400">
                              UGX {wth.netAmountUGX.toLocaleString()}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => approveWithdrawal(wth.id)}
                              className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5"
                            >
                              <Check className="w-4 h-4" />
                              Mark Paid / Approve
                            </button>

                            <button
                              onClick={() => rejectWithdrawal(wth.id)}
                              className="px-3 py-2 bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold text-xs rounded-xl transition-all"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Deposit Approvals Queue */}
            {activeTab === 'deposits' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase font-mono">
                  Pending Deposits to Verify ({pendingDeposits.length})
                </h3>

                {pendingDeposits.length === 0 ? (
                  <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-xl text-slate-400 text-xs">
                    No pending deposit verification requests.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pendingDeposits.map((dep) => (
                      <div
                        key={dep.id}
                        className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-emerald-500/40 transition-all"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{dep.userName}</span>
                            <span className="text-xs text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                              {dep.provider}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 font-mono">
                            User Phone: <span className="text-slate-100 font-bold">{dep.userPhone}</span>
                          </p>

                          <p className="text-xs font-mono font-bold text-amber-400">
                            TxID / Ref: <span className="underline">{dep.transactionId}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                          <div className="text-right font-mono">
                            <div className="text-xs text-slate-400">Deposit Amount:</div>
                            <div className="text-lg font-black text-emerald-400">
                              UGX {dep.amountUGX.toLocaleString()}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => approveDeposit(dep.id)}
                              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5"
                            >
                              <Check className="w-4 h-4" />
                              Approve & Credit Balance
                            </button>

                            <button
                              onClick={() => rejectDeposit(dep.id)}
                              className="px-3 py-2 bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold text-xs rounded-xl transition-all"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Client Balances & Accounts Manager */}
            {activeTab === 'users' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Balance Update Form */}
                <div className="p-5 bg-slate-900 border border-purple-500/30 rounded-2xl space-y-4">
                  <h4 className="text-xs font-extrabold text-purple-400 uppercase font-mono tracking-wider flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-purple-400" />
                    Direct Client Balance Modifier
                  </h4>
                  <p className="text-xs text-slate-300">
                    Enter any registered client's phone number and the new account balance (UGX).
                  </p>

                  {balanceFeedback && (
                    <div className={`p-3 rounded-xl text-xs flex items-center gap-2 font-mono ${
                      balanceFeedback.success
                        ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                        : 'bg-rose-950/80 border border-rose-800 text-rose-300'
                    }`}>
                      {balanceFeedback.success ? <Check className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
                      <span>{balanceFeedback.message}</span>
                    </div>
                  )}

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBalanceFeedback(null);
                      const num = parseInt(newBalanceInput, 10);
                      if (!targetPhoneInput.trim()) {
                        setBalanceFeedback({ success: false, message: 'Please enter a registered client phone number' });
                        return;
                      }
                      if (isNaN(num) || num < 0) {
                        setBalanceFeedback({ success: false, message: 'Please enter a valid non-negative balance amount' });
                        return;
                      }
                      const res = updateUserBalanceByPhone(targetPhoneInput.trim(), num);
                      setBalanceFeedback(res);
                      if (res.success) {
                        setNewBalanceInput('');
                      }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
                  >
                    <div>
                      <label className="block text-[11px] text-slate-400 font-mono mb-1">Client Phone Number:</label>
                      <input
                        type="text"
                        placeholder="e.g. 0771234567 or 0744696416"
                        value={targetPhoneInput}
                        onChange={(e) => setTargetPhoneInput(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-purple-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 font-mono mb-1">New Balance (UGX):</label>
                      <input
                        type="number"
                        placeholder="e.g. 150000"
                        value={newBalanceInput}
                        onChange={(e) => setNewBalanceInput(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-mono text-xs font-bold focus:outline-none focus:border-purple-400"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-4 h-4" />
                      Save & Update Balance
                    </button>
                  </form>
                </div>

                {/* All Registered Clients List */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-400" />
                      All Registered Client Accounts ({getAllAccounts().length})
                    </h3>

                    {/* Search filter */}
                    <div className="relative w-full sm:w-64">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search phone or name..."
                        value={userSearchTerm}
                        onChange={(e) => setUserSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  {getAllAccounts().length === 0 ? (
                    <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-xl text-slate-400 text-xs">
                      No client accounts registered yet.
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
                      {getAllAccounts()
                        .filter(acc => {
                          if (!userSearchTerm) return true;
                          const term = userSearchTerm.toLowerCase();
                          return (
                            acc.phone.toLowerCase().includes(term) ||
                            (acc.user.name && acc.user.name.toLowerCase().includes(term))
                          );
                        })
                        .map(acc => (
                          <div
                            key={acc.user.id || acc.phone}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-purple-500/40 transition-all text-xs"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white">{acc.user.name || 'Investor User'}</span>
                                <span className="text-purple-400 font-mono font-bold">{acc.phone}</span>
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono flex items-center gap-3 pt-1">
                                <span>Deposited: UGX {(acc.user.totalDepositedUGX || 0).toLocaleString()}</span>
                                <span>|</span>
                                <span>Withdrawn: UGX {(acc.user.totalWithdrawnUGX || 0).toLocaleString()}</span>
                                <span>|</span>
                                <span>Mined: UGX {(acc.user.totalMinedUGX || 0).toLocaleString()}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                              <div className="text-right font-mono">
                                <div className="text-[10px] text-slate-400">Current Balance:</div>
                                <div className="text-base font-black text-amber-400">
                                  UGX {(acc.user.balanceUGX || 0).toLocaleString()}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setTargetPhoneInput(acc.phone);
                                  setNewBalanceInput(String(acc.user.balanceUGX || 0));
                                  setBalanceFeedback(null);
                                }}
                                className="px-3 py-1.5 bg-purple-950/80 hover:bg-purple-900 border border-purple-800 text-purple-300 font-bold text-xs rounded-xl transition-all flex items-center gap-1 shrink-0"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                Edit Balance
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Tab 3: USSD Push Payment Gateway Keys */}
            {activeTab === 'gateway' && (
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSavePaymentSettings} className="max-w-2xl space-y-6">
                  {saveSuccess && (
                    <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>{saveSuccess}</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-amber-400 uppercase font-mono tracking-wider">
                      Automated Mobile Money USSD Push API Gateway
                    </h4>
                    <p className="text-xs text-slate-400">
                      To send real USSD payment prompts (PIN entry pop-up) to investors' phones, enter your **Flutterwave Uganda** Secret API Key below.
                    </p>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Payment Gateway Provider</label>
                      <select
                        value={paymentSettings.provider}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, provider: e.target.value as any })}
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-sm"
                      >
                        <option value="flutterwave">Flutterwave Uganda (MTN & Airtel USSD Push)</option>
                        <option value="yopayments">Yo! Payments Uganda</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Flutterwave / Gateway Secret Key</label>
                      <input
                        type="password"
                        value={paymentSettings.secretKey}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, secretKey: e.target.value })}
                        placeholder="FLWSECK_LIVEXXX..."
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-amber-400 font-mono text-sm"
                        required
                      />
                      <p className="text-[11px] text-slate-500 mt-1">Get this key from flutterwave.com dashboard -&gt; Settings -&gt; API Keys.</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg"
                  >
                    Save Live Payment Gateway Key
                  </button>
                </form>
              </div>
            )}

            {/* Tab 4: Real SMS Gateway Settings */}
            {activeTab === 'sms' && (
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSaveSmsSettings} className="max-w-2xl space-y-6">
                  {saveSuccess && (
                    <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>{saveSuccess}</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-teal-400 uppercase font-mono tracking-wider">
                      Uganda Live SMS Gateway Provider Configuration
                    </h4>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Africa\'s Talking API Key</label>
                      <input
                        type="password"
                        value={smsSettings.apiKey}
                        onChange={(e) => setSmsSettings({ ...smsSettings, apiKey: e.target.value })}
                        placeholder="e.g. atsks_1a2b3c4d5e..."
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-amber-400 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg"
                  >
                    Save Live SMS Gateway Credentials
                  </button>
                </form>
              </div>
            )}

            {/* Tab 5: Mobile Money Accounts Settings */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSaveSettings} className="max-w-2xl space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-amber-400 uppercase font-mono tracking-wider">
                      MTN Mobile Money Receiving Account
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">MTN Phone Number</label>
                        <input
                          type="text"
                          value={mtnNum}
                          onChange={(e) => setMtnNum(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">MTN Account Holder Name</label>
                        <input
                          type="text"
                          value={mtnName}
                          onChange={(e) => setMtnName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-slate-800 pt-4">
                    <h4 className="text-xs font-bold text-rose-400 uppercase font-mono tracking-wider">
                      Airtel Money Receiving Account
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Airtel Phone Number</label>
                        <input
                          type="text"
                          value={airtelNum}
                          onChange={(e) => setAirtelNum(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">Airtel Account Holder Name</label>
                        <input
                          type="text"
                          value={airtelName}
                          onChange={(e) => setAirtelName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/50"
                  >
                    Save Updated Accounts Config
                  </button>
                </form>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
