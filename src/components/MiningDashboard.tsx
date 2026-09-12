import React from 'react';
import { useApp } from '../context/AppContext';
import { Cpu, Zap, Activity, Coins, ShieldCheck, Play, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';

interface MiningDashboardProps {
  onGoToStore: () => void;
  onOpenDeposit: () => void;
}

export const MiningDashboard: React.FC<MiningDashboardProps> = ({ onGoToStore, onOpenDeposit }) => {
  const { currentUser, purchasedRigs, liveUnclaimedYield, claimEarnings } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-slate-900/60 border border-slate-800 rounded-2xl text-center">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">Please Login to Access Your Mining Rig Farm</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-4">
          Login with your Ugandan Mobile Money phone number to start operating active ASIC miners and earn daily UGX yields.
        </p>
      </div>
    );
  }

  const userRigs = purchasedRigs.filter(r => r.userId === currentUser.id);
  const activeRigs = userRigs.filter(r => r.status === 'active');
  const totalDailyYield = activeRigs.reduce((sum, r) => sum + r.dailyYieldUGX, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Mining Rig Controller & Real-Time Yield Collector */}
      <div className="relative bg-gradient-to-r from-[#141C2B] via-[#101724] to-[#0A0E18] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Cyber grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Left Column: Farm Status */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              BLQ Mining Pool: Active Connection
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              My Hardware Mining Farm
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Operating {activeRigs.length} Active ASIC Mining Rigs
            </p>
          </div>

          {/* Middle Column: Daily Yield Capacity */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">
              Total Daily Mining Capacity
            </span>
            <div className="text-2xl font-black text-amber-400 font-mono">
              UGX {totalDailyYield.toLocaleString()} <span className="text-xs text-slate-400">/ 24 hrs</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              30-Day Estimated Return: UGX {(totalDailyYield * 30).toLocaleString()}
            </p>
          </div>

          {/* Right Column: Real-Time Unclaimed Mined Yield Widget */}
          <div className="bg-gradient-to-br from-emerald-950/40 to-teal-950/40 p-5 rounded-xl border border-emerald-500/40 text-right space-y-2">
            <div className="flex items-center justify-between text-xs text-emerald-300 font-medium">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                Live Mined UGX:
              </span>
              <span className="font-mono text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300">
                AUTO-TICK
              </span>
            </div>

            <div className="text-3xl font-black text-emerald-300 font-mono tracking-tight drop-shadow-md">
              UGX {Math.floor(liveUnclaimedYield).toLocaleString()}
              <span className="text-xs text-emerald-500 font-normal">.{Math.floor((liveUnclaimedYield % 1) * 100).toString().padStart(2, '0')}</span>
            </div>

            <button
              onClick={claimEarnings}
              disabled={liveUnclaimedYield < 1}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                liveUnclaimedYield >= 1
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-950/50 active:scale-95 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <Coins className="w-4 h-4 text-slate-950" />
              Collect Mined UGX to Balance
            </button>
          </div>

        </div>
      </div>

      {/* Active Rigs Catalog / Empty State */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            Active Virtual Mining Hardware ({activeRigs.length})
          </h3>
          <button
            onClick={onGoToStore}
            className="text-xs text-amber-400 hover:underline font-semibold flex items-center gap-1"
          >
            Buy More Miners <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {activeRigs.length === 0 ? (
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <Cpu className="w-8 h-8 text-slate-500" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">No Active Mining Machines Purchased Yet</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Deposit money via MTN or Airtel Mobile Money to purchase your first BLQ ASIC virtual miner and start earning daily profit.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={onOpenDeposit}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
              >
                Deposit Mobile Money
              </button>
              <button
                onClick={onGoToStore}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl border border-slate-700 transition-all"
              >
                Browse Miners Store
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeRigs.map((rig) => (
              <div
                key={rig.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                      RUNNING 24/7
                    </span>
                    <h4 className="text-base font-bold text-white mt-1">{rig.packageName}</h4>
                    <p className="text-xs text-slate-400 font-mono">{rig.model}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Daily Yield</span>
                    <span className="font-bold text-emerald-400">UGX {rig.dailyYieldUGX.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Hash Power</span>
                    <span className="font-bold text-amber-400">{rig.hashRate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Purchased Date</span>
                    <span className="text-slate-300 text-[11px]">
                      {new Date(rig.purchaseDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Contract End</span>
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
