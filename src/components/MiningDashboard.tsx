import React from 'react';
import { useApp } from '../context/AppContext';
import { Cpu, Zap, Activity, Coins, ShieldCheck, ArrowUpRight, Sparkles, AlertCircle } from 'lucide-react';

interface MiningDashboardProps {
  onGoToStore: () => void;
  onOpenDeposit: () => void;
}

export const MiningDashboard: React.FC<MiningDashboardProps> = ({ onGoToStore, onOpenDeposit }) => {
  const { currentUser, purchasedRigs, liveUnclaimedYield, claimEarnings } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-slate-900/60 border border-slate-800 rounded-2xl text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
        <div>
          <h3 className="text-xl font-bold text-white">Sign In Required</h3>
          <p className="text-slate-400 text-sm mt-1">
            Please sign in with your phone number and password to view your active mining rigs and collect daily profits.
          </p>
        </div>
      </div>
    );
  }

  const userRigs = purchasedRigs.filter(r => r.userId === currentUser.id);
  const activeRigs = userRigs.filter(r => r.status === 'active');
  const totalDailyYield = activeRigs.reduce((sum, r) => sum + r.dailyYieldUGX, 0);

  return (
    <div className="space-y-6">
      
      {/* Real-time Mining Farm Controller */}
      <div className="relative bg-gradient-to-r from-[#141C2B] via-[#101726] to-[#0A0F1A] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Farm Capacity */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Farm Connection: Live (24/7 Mining)
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              My Active Farm
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Operating {activeRigs.length} Mining Package(s)
            </p>
          </div>

          {/* Daily Capacity */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">
              Total Daily Profit Rate
            </span>
            <div className="text-2xl font-black text-amber-400 font-mono">
              UGX {totalDailyYield.toLocaleString()} <span className="text-xs text-slate-400">/ day</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Monthly Return: UGX {(totalDailyYield * 30).toLocaleString()}
            </p>
          </div>

          {/* Real-Time Live Yield Ticker */}
          <div className="bg-gradient-to-br from-emerald-950/40 to-teal-950/40 p-5 rounded-2xl border border-emerald-500/40 text-right space-y-3">
            <div className="flex items-center justify-between text-xs text-emerald-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                Live Unclaimed Mined UGX:
              </span>
              <span className="font-mono text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300 font-bold">
                AUTO-ACCUMULATING
              </span>
            </div>

            <div className="text-3xl font-black text-emerald-300 font-mono tracking-tight">
              UGX {Math.floor(liveUnclaimedYield).toLocaleString()}
              <span className="text-xs text-emerald-500 font-normal">.{Math.floor((liveUnclaimedYield % 1) * 100).toString().padStart(2, '0')}</span>
            </div>

            <button
              onClick={claimEarnings}
              disabled={liveUnclaimedYield < 1}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow ${
                liveUnclaimedYield >= 1
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 active:scale-95 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <Coins className="w-4 h-4 text-slate-950" />
              Collect Profits to Account Balance
            </button>
          </div>

        </div>
      </div>

      {/* Rigs Catalog / Empty State */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-400" />
            Active Packages ({activeRigs.length})
          </h3>
          <button
            onClick={onGoToStore}
            className="text-xs text-amber-400 hover:underline font-bold flex items-center gap-1"
          >
            Buy More Packages <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {activeRigs.length === 0 ? (
          <div className="p-8 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <Cpu className="w-7 h-7 text-slate-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">No Active Mining Package Purchased Yet</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Deposit funds via Mobile Money to purchase your first BLQ investment package and start earning daily profit.
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
                Browse Packages
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeRigs.map((rig) => (
              <div
                key={rig.id}
                className="bg-[#111724] border border-slate-800/80 rounded-2xl p-5 shadow-lg space-y-4 hover:border-amber-500/40 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded font-bold">
                      ACTIVE & RUNNING
                    </span>
                    <h4 className="text-base font-extrabold text-white mt-1.5">{rig.packageName}</h4>
                    <p className="text-xs text-slate-400 font-mono">{rig.model}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-emerald-400" />
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
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
