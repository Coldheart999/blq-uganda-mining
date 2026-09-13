import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownLeft, Zap, ShieldCheck } from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'withdrawal' | 'deposit' | 'purchase';
  user: string;
  location: string;
  amountUGX: number;
  provider: string;
  timeAgo: string;
}

const UGANDAN_NAMES = [
  'Kato M.', 'Mukasa D.', 'Okello J.', 'Kizito P.', 'Mugerwa S.', 'Akello G.',
  'Nalubega S.', 'Tumusiime E.', 'Kigozi B.', 'Ssali F.', 'Byaruhanga R.', 'Waiswa I.',
  'Ochieng P.', 'Ninsiima A.', 'Atuhaire C.', 'Kimbugwe A.', 'Kiconco D.', 'Nabatanzi R.',
  'Ssemwanga K.', 'Lule J.', 'Mugisha P.', 'Namubiru M.', 'Ssekandi T.', 'Odoi E.',
  'Nalwoga F.', 'Tukahirwa G.', 'Kateregga I.', 'Businge H.', 'Ainomugisha B.', 'Lwanga V.'
];

const TOWNS = [
  'Kampala', 'Mbarara', 'Jinja', 'Gulu', 'Entebbe', 'Mukono', 'Arua', 'Masaka',
  'Mbale', 'Fort Portal', 'Kasese', 'Lira', 'Hoima', 'Iganga', 'Soroti'
];

const PREFIXES = ['077', '078', '076', '070', '075', '074'];
const PLANS = [
  'Starter Plan (5-Day)', 'Turbo Plan (5-Day)', 'VIP Express Plan (5-Day)',
  'Silver Plan (10-Day)', 'Gold Hydro Plan (10-Day)', 'Platinum Plan (10-Day)',
  'Master Plan (30-Day)', 'Diamond Plan (30-Day)', 'Crown Executive (30-Day)'
];

const AMOUNTS = [10000, 30000, 50000, 100000, 150000, 200000, 500000, 1000000, 2500000];

// Generate 100 realistic Ugandan proof items dynamically
const GENERATED_PROOFS: ActivityItem[] = Array.from({ length: 100 }, (_, i) => {
  const name = UGANDAN_NAMES[i % UGANDAN_NAMES.length];
  const town = TOWNS[(i * 3) % TOWNS.length];
  const prefix = PREFIXES[(i * 2) % PREFIXES.length];
  const lastDigits = Math.floor(100 + Math.random() * 900);
  const user = `${name} (${prefix}****${lastDigits})`;
  const type = i % 3 === 0 ? 'withdrawal' : i % 3 === 1 ? 'purchase' : 'deposit';
  const amountUGX = AMOUNTS[i % AMOUNTS.length];
  const plan = PLANS[i % PLANS.length];
  const minutes = (i % 12) + 1;

  return {
    id: i + 1,
    type,
    user,
    location: town,
    amountUGX,
    provider: type === 'withdrawal' ? (i % 2 === 0 ? 'MTN Mobile Money' : 'Airtel Money') : type === 'deposit' ? (i % 2 === 0 ? 'MTN Mobile Money' : 'Airtel Money') : plan,
    timeAgo: `${minutes}m ago`
  };
});

export const SocialProofTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Slower rotation speed (7.5 seconds)
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        // Pick random proof item from the 100 pool
        const randomIndex = Math.floor(Math.random() * GENERATED_PROOFS.length);
        setCurrentIndex(randomIndex);
        setIsVisible(true);
      }, 500);
    }, 7500);

    return () => clearInterval(interval);
  }, []);

  const current = GENERATED_PROOFS[currentIndex];

  return (
    <div className="fixed bottom-20 left-4 z-40 max-w-xs sm:max-w-sm pointer-events-none">
      <div 
        className={`bg-[#0C1019]/95 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-3.5 shadow-2xl shadow-cyan-950/40 transition-all duration-500 pointer-events-auto flex items-center gap-3 ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
        }`}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
          current.type === 'withdrawal' 
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            : current.type === 'deposit'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
        }`}>
          {current.type === 'withdrawal' ? (
            <ArrowUpRight className="w-5 h-5 text-amber-400" />
          ) : current.type === 'deposit' ? (
            <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
          ) : (
            <Zap className="w-5 h-5 text-cyan-400" />
          )}
        </div>

        <div className="flex-1 text-xs">
          <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
            <span className="text-cyan-400 font-semibold">{current.location} Investor</span>
            <span>{current.timeAgo}</span>
          </div>

          <div className="font-bold text-white tracking-tight mt-0.5 font-mono">
            {current.user}
          </div>

          <div className="text-[11px] font-mono mt-0.5">
            {current.type === 'withdrawal' ? (
              <span className="text-amber-400 font-bold">Withdrew UGX {current.amountUGX.toLocaleString()} via {current.provider}</span>
            ) : current.type === 'deposit' ? (
              <span className="text-emerald-400 font-bold">Deposited UGX {current.amountUGX.toLocaleString()}</span>
            ) : (
              <span className="text-cyan-300 font-bold">Activated {current.provider}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
