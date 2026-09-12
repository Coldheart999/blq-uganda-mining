import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowDownLeft, ArrowUpRight, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export const HistoryTab: React.FC = () => {
  const { currentUser, deposits, withdrawals } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-slate-900/60 border border-slate-800 rounded-2xl text-center">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">Please Login</h3>
        <p className="text-slate-400 text-sm">Login with your phone number to view your deposit and withdrawal history.</p>
      </div>
    );
  }

  const userDeposits = deposits.filter(d => d.userId === currentUser.id);
  const userWithdrawals = withdrawals.filter(w => w.userId === currentUser.id);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Deposits History */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
          Mobile Money Deposits History ({userDeposits.length})
        </h3>

        {userDeposits.length === 0 ? (
          <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-xl text-center text-slate-400 text-xs">
            No deposits recorded yet.
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="divide-y divide-slate-800">
              {userDeposits.map((dep) => (
                <div key={dep.id} className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{dep.provider}</div>
                      <div className="text-xs text-slate-400 font-mono">
                        TxID: <span className="text-slate-200">{dep.transactionId}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {new Date(dep.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-emerald-400 font-mono text-base">
                      + UGX {dep.amountUGX.toLocaleString()}
                    </div>
                    <div className="mt-1">
                      {dep.status === 'approved' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      )}
                      {dep.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                          <Clock className="w-3 h-3 animate-spin" /> Verification Pending
                        </span>
                      )}
                      {dep.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded">
                          <XCircle className="w-3 h-3" /> Rejected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Withdrawals History */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <ArrowUpRight className="w-5 h-5 text-amber-400" />
          Mobile Money Profit Withdrawals ({userWithdrawals.length})
        </h3>

        {userWithdrawals.length === 0 ? (
          <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-xl text-center text-slate-400 text-xs">
            No withdrawal requests made yet.
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="divide-y divide-slate-800">
              {userWithdrawals.map((wth) => (
                <div key={wth.id} className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">Payout to {wth.provider}</div>
                      <div className="text-xs text-slate-400 font-mono">
                        Target Phone: <span className="text-amber-400 font-bold">{wth.destinationNumber}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {new Date(wth.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-amber-400 font-mono text-base">
                      - UGX {wth.amountUGX.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Net Received: UGX {wth.netAmountUGX.toLocaleString()}
                    </div>
                    <div className="mt-1">
                      {wth.status === 'approved' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" /> Mobile Money Paid
                        </span>
                      )}
                      {wth.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                          <Clock className="w-3 h-3 animate-spin" /> Payout Processing
                        </span>
                      )}
                      {wth.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded">
                          <XCircle className="w-3 h-3" /> Refunded / Rejected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
