import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';

interface EarningsCalculatorProps {
  onSelectPlan: (amountUGX: number) => void;
}

export const EarningsCalculator: React.FC<EarningsCalculatorProps> = ({ onSelectPlan }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(50000);
  const [durationDays, setDurationDays] = useState<number>(5);

  // Profit calculation logic
  const dailyReturnMap: Record<number, Record<number, number>> = {
    5: {
      10000: 3000,
      50000: 16000,
      200000: 70000,
      500000: 180000,
      1000000: 380000,
    },
    10: {
      30000: 6000,
      100000: 22000,
      500000: 125000,
      1000000: 260000,
    },
    30: {
      150000: 27000,
      1000000: 210000,
      2500000: 550000,
    }
  };

  const dailyYield = dailyReturnMap[durationDays]?.[selectedAmount] || Math.round(selectedAmount * (durationDays === 5 ? 0.32 : durationDays === 10 ? 0.22 : 0.18));
  const totalReturn = dailyYield * durationDays;
  const netProfit = totalReturn - selectedAmount;
  const roiPercent = Math.round((netProfit / selectedAmount) * 100);

  const presetAmounts = durationDays === 5 
    ? [10000, 50000, 200000, 500000, 1000000]
    : durationDays === 10
    ? [30000, 100000, 500000, 1000000]
    : [150000, 1000000, 2500000];

  return (
    <div className="bg-[#121824] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Profit Estimator</h3>
            <p className="text-xs text-slate-400">Calculate your daily & total payout before investing</p>
          </div>
        </div>

        {/* Duration Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => {
              setDurationDays(5);
              setSelectedAmount(50000);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              durationDays === 5 ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            5 Days
          </button>
          <button
            onClick={() => {
              setDurationDays(10);
              setSelectedAmount(100000);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              durationDays === 10 ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            10 Days
          </button>
          <button
            onClick={() => {
              setDurationDays(30);
              setSelectedAmount(150000);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              durationDays === 30 ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Preset Amount Selector Buttons */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase font-mono mb-2">
          Select Your Investment Amount (UGX):
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {presetAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => setSelectedAmount(amt)}
              className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-bold transition-all ${
                selectedAmount === amt
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              UGX {amt.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Calculation Summary Card */}
      <div className="bg-[#0B0E17] border border-slate-800/80 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        
        <div className="space-y-1">
          <span className="text-xs text-slate-400 block font-mono">Daily Profit Paid:</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            + UGX {dailyYield.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ day</span>
          </div>
        </div>

        <div className="space-y-1 md:border-l border-slate-800 md:pl-4">
          <span className="text-xs text-slate-400 block font-mono">Total Payout ({durationDays} Days):</span>
          <div className="text-2xl font-black text-amber-400 font-mono">
            UGX {totalReturn.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-400 font-mono font-bold">+UGX {netProfit.toLocaleString()} Net Profit (+{roiPercent}%)</p>
        </div>

        <div>
          <button
            onClick={() => onSelectPlan(selectedAmount)}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Activate Plan (UGX {selectedAmount.toLocaleString()})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
