import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MinerCard } from './components/MinerCard';
import { MiningDashboard } from './components/MiningDashboard';
import { HistoryTab } from './components/HistoryTab';
import { AuthModal } from './components/AuthModal';
import { DepositModal } from './components/DepositModal';
import { WithdrawModal } from './components/WithdrawModal';
import { ReferralModal } from './components/ReferralModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { SocialProofTicker } from './components/SocialProofTicker';
import { EarningsCalculator } from './components/EarningsCalculator';
import { FloatingSupport } from './components/FloatingSupport';
import { AnimatedCryptoBackground } from './components/AnimatedCryptoBackground';
import { Cpu, ShieldCheck, ArrowRight, TrendingUp, CheckCircle, Zap, Activity, Gift, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentUser, minerPackages, buyMiner } = useApp();

  const [activeTab, setActiveTab] = useState<string>('store');
  const [durationFilter, setDurationFilter] = useState<number | 'all'>('all');
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isDepositOpen, setIsDepositOpen] = useState<boolean>(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState<boolean>(false);
  const [isReferralOpen, setIsReferralOpen] = useState<boolean>(false);
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

  const handleCalculatorSelect = (amountUGX: number) => {
    const matched = minerPackages.find(p => p.priceUGX === amountUGX);
    if (matched) {
      handleBuyMiner(matched.id);
    } else if (!currentUser) {
      setIsAuthOpen(true);
    } else {
      setIsDepositOpen(true);
    }
  };

  const filteredPackages = durationFilter === 'all' 
    ? minerPackages 
    : minerPackages.filter(p => p.durationDays === durationFilter);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#070A10] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Dynamic Ambient Crypto Background */}
      <AnimatedCryptoBackground />

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
        openReferral={() => {
          if (!currentUser) setIsAuthOpen(true);
          else setIsReferralOpen(true);
        }}
        openAdmin={() => setIsAdminOpen(true)}
      />

      {/* Vertical Container */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 mb-20 md:mb-8">
        
        {/* Global Feedback Banner */}
        {purchaseNotice && (
          <div className="p-4 bg-emerald-950/90 border border-emerald-500/80 rounded-2xl text-emerald-300 text-sm font-semibold flex items-center justify-between shadow-xl">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              {purchaseNotice}
            </span>
            <button
              onClick={() => setActiveTab('my-rigs')}
              className="px-3.5 py-1.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-emerald-400 transition-colors"
            >
              View Active Plans
            </button>
          </div>
        )}

        {/* Captivating Referral Challenge Banner */}
        <div 
          onClick={() => {
            if (!currentUser) setIsAuthOpen(true);
            else setIsReferralOpen(true);
          }}
          className="cursor-pointer bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-emerald-500/20 border border-amber-500/40 rounded-3xl p-4 sm:p-5 flex items-center justify-between shadow-xl hover:border-amber-400 transition-all group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 group-hover:scale-110 transition-transform">
              <Gift className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider font-mono">Referral Challenge</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono font-bold">UGX 15,000 / Invite</span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-white mt-0.5 leading-snug">
                Invite Friends & Earn UGX 15,000 Instant Cash Bonus!
              </h3>
            </div>
          </div>
          <button className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow group-hover:bg-amber-400 transition-colors shrink-0">
            <span>Open Challenge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Vertical Hero Stack */}
        {activeTab === 'store' && (
          <div className="bg-gradient-to-b from-[#111724]/90 via-[#0D121F]/90 to-[#080B12]/90 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 font-mono text-xs">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                BLQ SHA-256 Mining Pool • Active Node
              </div>
              <h1 className="text-2xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                High Yield Crypto Mining <span className="bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">Uganda</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Deposit money via Airtel or MTN Mobile Money. Rent 5-Day Express, 10-Day VIP, or 30-Day Executive ASIC miners and receive daily profits paid directly to your balance.
              </p>
            </div>

            {/* Vertical Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
              <div className="bg-[#070A10]/90 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-slate-500 block text-[10px] uppercase">Min Deposit</span>
                <span className="font-bold text-amber-400 text-xs sm:text-sm">UGX 5,000</span>
              </div>
              <div className="bg-[#070A10]/90 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-slate-500 block text-[10px] uppercase">Payout Speed</span>
                <span className="font-bold text-emerald-400 text-xs sm:text-sm">5 - 15 Mins</span>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-[#070A10]/90 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-slate-500 block text-[10px] uppercase">Networks</span>
                <span className="font-bold text-cyan-400 text-xs sm:text-sm">MTN / AIRTEL</span>
              </div>
            </div>

            {/* Profit Calculator */}
            <EarningsCalculator onSelectPlan={handleCalculatorSelect} />

          </div>
        )}

        {/* TAB 1: Vertical Packages Catalog */}
        {activeTab === 'store' && (
          <div className="space-y-6">
            
            {/* Filter Pill Selector with horizontal scrolling on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-amber-400" />
                  Mining Packages Store
                </h2>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Select your preferred contract lifecycle:
                </p>
              </div>

              <div className="flex overflow-x-auto max-w-full space-x-1.5 bg-[#0D121B] p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold self-start sm:self-auto scrollbar-none">
                <button
                  onClick={() => setDurationFilter('all')}
                  className={`px-3.5 py-2 rounded-xl shrink-0 transition-all ${
                    durationFilter === 'all'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All Plans
                </button>
                <button
                  onClick={() => setDurationFilter(5)}
                  className={`px-3.5 py-2 rounded-xl shrink-0 transition-all ${
                    durationFilter === 5
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ 5-Day Express
                </button>
                <button
                  onClick={() => setDurationFilter(10)}
                  className={`px-3.5 py-2 rounded-xl shrink-0 transition-all ${
                    durationFilter === 10
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⭐ 10-Day VIP
                </button>
                <button
                  onClick={() => setDurationFilter(30)}
                  className={`px-3.5 py-2 rounded-xl shrink-0 transition-all ${
                    durationFilter === 30
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  💎 30-Day Executive
                </button>
              </div>
            </div>

            {/* Vertical Stack Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* TAB 2: My Active Investments */}
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

      {/* Social Proof Live Ugandan Activity Ticker (Slower rotation between 5s-30s) */}
      <SocialProofTicker />

      {/* Floating Telegram Support Button */}
      <FloatingSupport />

      {/* Modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} />
      <WithdrawModal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} />
      <ReferralModal isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} onGoToStore={() => setActiveTab('store')} />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(false)} />
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
