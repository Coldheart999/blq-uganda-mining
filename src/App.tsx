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
import { Cpu, ShieldCheck, ArrowRight, TrendingUp, CheckCircle, Clock } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentUser, minerPackages, buyMiner } = useApp();

  const [activeTab, setActiveTab] = useState<string>('store');
  const [durationFilter, setDurationFilter] = useState<number | 'all'>('all');
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isDepositOpen, setIsDepositOpen] = useState<boolean>(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [purchaseNotice, setPurchaseNotice] = useState<string>('');

  // Secret keyboard shortcut (Ctrl + Shift + A) for Admin Panel
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
    <div className="min-h-screen flex flex-col bg-[#0B0E14] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
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

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Global Feedback Banner */}
        {purchaseNotice && (
          <div className="p-4 bg-emerald-950/90 border border-emerald-500/80 rounded-xl text-emerald-300 text-sm font-semibold flex items-center justify-between shadow">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              {purchaseNotice}
            </span>
            <button
              onClick={() => setActiveTab('my-rigs')}
              className="px-3.5 py-1.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-emerald-400 transition-colors"
            >
              View Active Rigs
            </button>
          </div>
        )}

        {/* Organized Clean Hero Header */}
        {activeTab === 'store' && (
          <div className="bg-[#121722] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Uganda Cloud Crypto Mining Platform
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  High Yield Investment Packages (UGX)
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                  Choose from 5-Day Express, 10-Day VIP, or 30-Day Executive packages. Deposit via MTN or Airtel Mobile Money and collect daily profits directly into your account balance.
                </p>
              </div>

              {/* Quick Info Pill */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto font-mono text-xs">
                <div className="bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase">Min Deposit</span>
                  <span className="font-bold text-amber-400">UGX 5,000</span>
                </div>
                <div className="bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase">Payout Speed</span>
                  <span className="font-bold text-emerald-400">5 - 15 Mins</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: Packages Store */}
        {activeTab === 'store' && (
          <div className="space-y-6">
            {/* Clean Segmented Filter Control */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-amber-400" />
                  Available Packages
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Filter packages by contract duration:
                </p>
              </div>

              <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold self-start sm:self-auto">
                <button
                  onClick={() => setDurationFilter('all')}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    durationFilter === 'all'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All Packages
                </button>
                <button
                  onClick={() => setDurationFilter(5)}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    durationFilter === 5
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  5-Day Express
                </button>
                <button
                  onClick={() => setDurationFilter(10)}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    durationFilter === 10
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  10-Day VIP
                </button>
                <button
                  onClick={() => setDurationFilter(30)}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    durationFilter === 30
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  30-Day Executive
                </button>
              </div>
            </div>

            {/* Organized Grid */}
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

        {/* TAB 2: My Active Rigs */}
        {activeTab === 'my-rigs' && (
          <MiningDashboard
            onGoToStore={() => setActiveTab('store')}
            onOpenDeposit={() => {
              if (!currentUser) setIsAuthOpen(true);
              else setIsDepositOpen(true);
            }}
          />
        )}

        {/* TAB 3: Transactions */}
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
