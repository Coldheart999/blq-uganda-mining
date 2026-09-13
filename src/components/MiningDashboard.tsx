import React from 'react';
import { useApp } from '../context/AppContext';
import { Cpu, Activity, Clock, ArrowUpRight, AlertCircle } from 'lucide-react';

interface MiningDashboardProps {
  onGoToStore: () => void;
  onOpenDeposit: () => void;
}

export const MiningDashboard: React.FC<MiningDashboardProps> = ({ onGoToStore, onOpenDeposit }) => {
  const { currentUser, purchasedRigs } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-slate-900/60 border border-slate-800 rounded-2xl text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
        <div>
          <h3 className="text-xl font-bold text-white">Sign In Required</h3>
          <p className="text-slate-400 text-sm mt-1">
            Please sign in with your phone number and password to view your active mining plans.
          </p>
        </div>
      </div>
    );
  }

  const [rigFilter, setRigFilter] = React.useState<'all' | 'active' | 'expired'>('all');
  const userRigs = purchasedRigs.filter(r => r.userId === currentUser.id);
  const activeRigs = userRigs.filter(r => r.status === 'active');
  const expiredRigs = userRigs.filter(r => r.status === 'expired');

  const displayedRigs = rigFilter === 'active' 
    ? activeRigs 
    : rigFilter === 'expired' 
    ? expiredRigs 
    : userRigs;

  const totalDailyYield = activeRigs.reduce((sum, r) => sum + r.dailyYieldUGX, 0);

  const [countdown, setCountdown] = React.useState<{ hours: number; minutes: number; seconds: number }>({ hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextPayout = new Date(now);
      nextPayout.setHours(24, 0, 0, 0); // Next 24-hour cycle mark
      
      const diffMs = nextPayout.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setCountdown({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* 24-Hour Payout Timer Card */}
      <div className="relative bg-gradient-to-r from-[#141C2B] via-[#101726] to-[#0A0F1A] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Farm Overview Info */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Farm Connection: Live (24/7 Cloud Mining)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              My Mining Plans
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              All active hardware rigs mine continuously. Your daily earnings are automatically credited directly to your main account balance every 24 hours.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs font-mono">
                <span className="text-slate-400">Active Rigs: </span>
                <span className="text-emerald-400 font-bold">{activeRigs.length} Rigs</span>
              </div>
              <div className="px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs font-mono">
                <span className="text-slate-400">Daily Earnings: </span>
                <span className="text-amber-400 font-bold">+UGX {totalDailyYield.toLocaleString()} / day</span>
              </div>
            </div>
          </div>

          {/* 24-Hour Countdown Box */}
          <div className="bg-slate-950/90 p-5 sm:p-6 rounded-2xl border border-amber-500/40 text-center space-y-3 shadow-xl">
            <div className="flex items-center justify-center gap-2 text-xs text-amber-300 font-mono font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              Next Daily Payout In
            </div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight bg-slate-900 py-2.5 px-4 rounded-xl border border-slate-800 inline-block shadow-inner">
              {String(countdown.hours).padStart(2, '0')}h : {String(countdown.minutes).padStart(2, '0')}m : {String(countdown.seconds).padStart(2, '0')}s
            </div>
            <p className="text-[11px] text-slate-400 font-mono leading-tight">
              Automatic deposit timer • Renews every 24 hours
            </p>
          </div>

        </div>
      </div>

      {/* Rigs Catalog Header & Filter Bar */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-400" />
              My Purchased Packages ({userRigs.length})
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Review and monitor your active and past mining packages
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Buttons */}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setRigFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  rigFilter === 'all'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({userRigs.length})
              </button>
              <button
                onClick={() => setRigFilter('active')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  rigFilter === 'active'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Active ({activeRigs.length})
              </button>
              <button
                onClick={() => setRigFilter('expired')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  rigFilter === 'expired'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Expired ({expiredRigs.length})
              </button>
            </div>

            <button
              onClick={onGoToStore}
              className="text-xs text-amber-400 hover:underline font-bold flex items-center gap-1 shrink-0 ml-2"
            >
              Buy More <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {displayedRigs.length === 0 ? (
          <div className="p-8 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <Cpu className="w-7 h-7 text-slate-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                {rigFilter === 'expired' ? 'No Expired Packages' : 'No Mining Packages in this filter'}
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Explore the store to rent 5-Day Express, 10-Day VIP, or 30-Day Executive ASIC rigs.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={onOpenDeposit}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-all"
              >
                Deposit Funds
              </button>
              <button
                onClick={onGoToStore}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl border border-slate-700 transition-all"
              >
                Browse Store Plans
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedRigs.map((rig) => {
              const isRunning = rig.status === 'active';
              return (
                <div
                  key={rig.id}
                  className={`bg-[#111724] border rounded-2xl p-5 shadow-lg space-y-4 transition-all ${
                    isRunning 
                      ? 'border-slate-800/80 hover:border-amber-500/50' 
                      : 'border-slate-900 opacity-75'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                        isRunning 
                          ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400' 
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}>
                        {isRunning ? 'ACTIVE & RUNNING' : 'CONTRACT COMPLETED'}
                      </span>
                      <h4 className="text-base font-extrabold text-white mt-1.5">{rig.packageName}</h4>
                      <p className="text-xs text-slate-400 font-mono">{rig.model}</p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <Activity className={`w-5 h-5 ${isRunning ? 'text-emerald-400' : 'text-slate-500'}`} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Daily Profit</span>
                      <span className="font-bold text-emerald-400">+UGX {rig.dailyYieldUGX.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Hash Power</span>
                      <span className="font-bold text-amber-400">{rig.hashRate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Purchase Date</span>
                      <span className="text-slate-300 text-[11px]">
                        {new Date(rig.purchaseDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Expiry Date</span>
                      <span className="text-slate-300 text-[11px]">
                        {new Date(rig.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
