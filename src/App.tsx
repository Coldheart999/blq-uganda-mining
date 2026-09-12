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
import { Cpu, Zap, ShieldCheck, ArrowRight, Activity, TrendingUp } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentUser, minerPackages, buyMiner } = useApp();

  const [activeTab, setActiveTab] = useState<string>('store');
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

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0E14]">
      {/* Top Navbar Header (Admin button hidden) */}
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

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Global Purchase Feedback Banner */}
        {purchaseNotice && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/80 rounded-2xl text-emerald-300 text-sm font-bold flex items-center justify-between shadow-xl animate-bounce">
            <span className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              {purchaseNotice}
            </span>
            <button
              onClick={() => setActiveTab('my-rigs')}
              className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-emerald-400"
            >
              View My Rigs
            </button>
          </div>
        )}

        {/* Hero Section (Displayed on Store Tab) */}
        {activeTab === 'store' && (
          <div className="relative bg-gradient-to-r from-[#141B28] via-[#101724] to-[#0A0E18] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
            
            {/* Cyber Glow backdrop */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-400 font-mono text-xs">
                  <Activity className="w-3.5 h-3.5" />
                  Uganda\'s Premier Crypto Mining Hub
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Rent ASIC Crypto Miners & Earn <span className="bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">Daily UGX Returns</span>
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                  Deposit funds directly using MTN Mobile Money or Airtel Money. Select realistic Bitmain & MicroBT hardware rigs, watch your mining hash rate generate profit 24/7, and withdraw your funds anytime directly to your phone.
                </p>

                {/* Hero Feature Badges */}
                <div className="grid grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-300">
                  <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instant Mobile Money</span>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Daily Automatic Yield</span>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Real Crypto Rigs</span>
                  </div>
                </div>
              </div>

              {/* Live Pool Monitor Stats Box */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-slate-400">BLQ Global SHA-256 Hashrate:</span>
                  <span className="text-sm font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    1,420.50 TH/s
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Supported Network</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">MTN / Airtel UG</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Average Payout Speed</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">5 - 15 Mins</span>
                  </div>
                </div>

                {!currentUser && (
                  <button
                    onClick={() => setIsAuthOpen(true)}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all"
                  >
                    Register with Phone Number & Start Mining <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: Miner Hardware Marketplace */}
        {activeTab === 'store' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-amber-400" />
                  ASIC Virtual Mining Packages
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select a miner package to rent. Higher tier rigs deliver higher daily UGX mining yields.
                </p>
              </div>

              {currentUser && (
                <div className="hidden sm:flex items-center gap-2 text-xs font-mono bg-slate-900 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Your Balance:</span>
                  <span className="font-bold text-emerald-400">UGX {currentUser.balanceUGX.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Miner Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {minerPackages.map((miner) => (
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

        {/* TAB 2: My Active Mining Rigs & Live Yield */}
        {activeTab === 'my-rigs' && (
          <MiningDashboard
            onGoToStore={() => setActiveTab('store')}
            onOpenDeposit={() => {
              if (!currentUser) setIsAuthOpen(true);
              else setIsDepositOpen(true);
            }}
          />
        )}

        {/* TAB 3: Deposit & Withdrawal Transactions History */}
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
