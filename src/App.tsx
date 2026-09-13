import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MinerCard } from './components/MinerCard';
import { MiningDashboard } from './components/MiningDashboard';
import { HistoryTab } from './components/HistoryTab';
import { AuthModal } from './components/AuthModal';
import { DepositModal } from './components/DepositModal';
import { WithdrawModal } from './components/WithdrawModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { Cpu, ShieldCheck, ArrowRight, Activity, TrendingUp, Wallet, CheckCircle, Clock } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentUser, minerPackages, buyMiner } = useApp();

  const [activeTab, setActiveTab] = useState<string>('store');
  const [durationFilter, setDurationFilter] = useState<number | 'all'>('all');
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isDepositOpen, setIsDepositOpen] = useState<boolean>(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [purchaseNotice, setPurchaseNotice] = useState<string>('');

  // Keyboard shortcut (Ctrl + Shift + A) to secretly trigger Admin Panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBuyMiner = (minerId: string) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }

    const pkg = minerPackages.find(p => p.id === minerId);
    if (!pkg) return;

    if (currentUser.balanceUGX < pkg.priceUGX) {
      setIsDepositOpen(true);
      return;
    }

    const res = buyMiner(minerId);
    setPurchaseNotice(res.message);
    setTimeout(() => setPurchaseNotice(''), 4000);
  };

  const filteredPackages = durationFilter === 'all' 
    ? minerPackages 
    : minerPackages.filter(p => p.durationDays === durationFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuth={() => setIsAuthOpen(true)}
        openDeposit={() => {
          if (!currentUser) setIsAuthOpen(true);
          else setIsDepositOpen(true);
        }}
        openWithdraw={() => {
          if (!currentUser) setIsAuthOpen(true);
          else setIsWithdrawOpen(true);
        }}
        openAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Global Feedback Banner */}
        {purchaseNotice && (
          <div className="p-4 bg-emerald-950/90 border border-emerald-500/80 rounded-2xl text-emerald-300 text-sm font-bold flex items-center justify-between shadow-xl">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              {purchaseNotice}
            </span>
            <button
              onClick={() => setActiveTab('my-rigs')}
              className="px-3.5 py-1.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-emerald-400 transition-colors"
            >
              View Active Rigs
            </button>
          </div>
        )}

        {/* Executive Hero Banner */}
        {activeTab === 'store' && (
          <div className="relative bg-gradient-to-br from-[#141C2B] via-[#101726] to-[#0A0F1A] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-400 font-medium text-xs">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Instant 5-Day, 10-Day & 30-Day Mining Offers
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Earn Up to <span className="text-amber-400">UGX 70,000 in 5 Days</span> or <span className="text-emerald-400">UGX 550,000 / day</span>
                </h1>
                
                <p className="text-sm text-slate-300 leading-relaxed">
                  Start with as little as <strong>UGX 10,000</strong>. Choose ultra-fast <strong>5-Day Express Rigs</strong>, <strong>10-Day VIP Farms</strong>, or <strong>30-Day Executive Nodes</strong>. Payouts settled directly to your MTN or Airtel Mobile Money.
                </p>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
                  <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>MTN & Airtel Direct</span>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>5, 10 & 30 Day Contracts</span>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Daily Automatic Returns</span>
                  </div>
                </div>
              </div>

              {/* Pool Overview Box */}
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span className="text-xs text-slate-400">BLQ Global Network:</span>
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Operational (100% Pool Uptime)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-mono">Minimum Deposit</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">UGX 5,000</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-mono">Payout Speed</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">5 - 15 Mins</span>
                  </div>
                </div>

                {!currentUser ? (
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>Create Account & Start Earning Now</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                ) : (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 text-center font-medium">
                    Your balance: UGX {currentUser.balanceUGX.toLocaleString()} • Select a contract package below.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: Miner Hardware Store */}
        {activeTab === 'store' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-amber-400" />
                  Investment Mining Packages
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select your contract duration. 5-Day Express packages offer ultra-fast daily returns!
                </p>
              </div>

              {/* Duration Filter Tabs */}
              <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800/80 text-xs font-bold self-start sm:self-auto">
                <button
                  onClick={() => setDurationFilter('all')}
                  className={`px-3 py-2 rounded-xl transition-all ${
                    durationFilter === 'all'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All Packages
                </button>
                <button
                  onClick={() => setDurationFilter(5)}
                  className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1 ${
                    durationFilter === 5
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ 5 Days
                </button>
                <button
                  onClick={() => setDurationFilter(10)}
                  className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1 ${
                    durationFilter === 10
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⭐ 10 Days
                </button>
                <button
                  onClick={() => setDurationFilter(30)}
                  className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1 ${
                    durationFilter === 30
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  💎 30 Days
                </button>
              </div>
            </div>

            {/* Miner Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((miner) => (
                <MinerCard
                  key={miner.id}
                  miner={miner}
                  onBuy={handleBuyMiner}
                  userBalance={currentUser ? currentUser.balanceUGX : 0}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: My Rigs & Mining Yield */}
        {activeTab === 'my-rigs' && (
          <MiningDashboard
            onGoToStore={() => setActiveTab('store')}
            onOpenDeposit={() => {
              if (!currentUser) setIsAuthOpen(true);
              else setIsDepositOpen(true);
            }}
          />
        )}

        {/* TAB 3: Transactions History */}
        {activeTab === 'history' && <HistoryTab />}

      </main>

      {/* Modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} />
      <WithdrawModal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
