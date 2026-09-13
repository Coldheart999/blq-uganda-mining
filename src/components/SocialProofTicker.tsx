import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownLeft, Zap } from 'lucide-react';

interface ProofItem {
  user: string;
  location: string;
  amountUGX: number;
  provider: string;
  timeAgo: string;
  type: 'withdrawal' | 'deposit' | 'activation';
}

const UGANDAN_NAMES = [
  'Mugisha D.', 'Kato P.', 'Nakamya S.', 'Ochieng J.', 'Byaruhanga E.',
  'Tumusiime R.', 'Akello M.', 'Okello F.', 'Kyakuwa B.', 'Babirye J.',
  'Ssemwanga K.', 'Ainomugisha C.', 'Waiswa I.', 'Kintu A.', 'Nabirye H.',
  'Bwambale M.', 'Mukasa G.', 'Namukasa F.', 'Sserwadda T.', 'Lule S.',
  'Atuhaire N.', 'Mwesigwa B.', 'Tusubira M.', 'Opio D.', 'Nalubega E.'
];

const UGANDAN_TOWNS = [
  'Kampala', 'Entebbe', 'Jinja', 'Mbarara', 'Gulu', 'Arua',
  'Mbale', 'Kasese', 'Masaka', 'Lira', 'Hoima', 'Mukono', 'Fort Portal'
];

const PACKAGES = [
  '⚡ 5-Day Express (UGX 20,000)',
  '⚡ 5-Day Express (UGX 50,000)',
  '⭐ 10-Day VIP (UGX 100,000)',
  '⭐ 10-Day VIP (UGX 300,000)',
  '💎 30-Day Executive (UGX 1,000,000)'
];

const GENERATED_PROOFS: ProofItem[] = Array.from({ length: 100 }).map((_, i) => {
  const user = UGANDAN_NAMES[i % UGANDAN_NAMES.length];
  const town = UGANDAN_TOWNS[(i * 3) % UGANDAN_TOWNS.length];
  const type: 'withdrawal' | 'deposit' | 'activation' = i % 3 === 0 ? 'withdrawal' : i % 3 === 1 ? 'deposit' : 'activation';
  const plan = PACKAGES[i % PACKAGES.length];
  
  const amounts = [20000, 50000, 100000, 250000, 500000, 1000000, 2500000];
  const amountUGX = amounts[i % amounts.length];
  const minutes = Math.floor((i * 7) % 55) + 1;

  return {
    type,
    user,
    location: town,
    amountUGX,
    provider: type === 'withdrawal' ? (i % 2 === 0 ? 'Airtel Money' : 'MTN Mobile Money') : type === 'deposit' ? 'Airtel Money' : plan,
    timeAgo: `${minutes}m ago`
  };
});

export const SocialProofTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextShow = () => {
      const randomInterval = Math.floor(Math.random() * (30000 - 5000 + 1)) + 5000;
      
      timeoutId = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * GENERATED_PROOFS.length);
        setCurrentIndex(randomIndex);
        setIsVisible(true);

        setTimeout(() => {
          setIsVisible(false);
          scheduleNextShow();
        }, 4500);

      }, randomInterval);
    };

    scheduleNextShow();

    return () => clearTimeout(timeoutId);
  }, []);

  const current = GENERATED_PROOFS[currentIndex];

  return (
    <div className="fixed bottom-20 md:bottom-6 left-3 sm:left-6 z-40 max-w-[280px] sm:max-w-sm pointer-events-none">
      <div 
        className={`bg-[#0C1019]/95 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-3 sm:p-3.5 shadow-2xl shadow-cyan-950/50 transition-all duration-700 pointer-events-auto flex items-center gap-2.5 sm:gap-3 ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'
        }`}
      >
        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border ${
          current.type === 'withdrawal' 
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            : current.type === 'deposit'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
        }`}>
          {current.type === 'withdrawal' ? (
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          ) : current.type === 'deposit' ? (
            <ArrowDownLeft className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
          ) : (
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
          )}
        </div>

        <div className="flex-1 text-xs min-w-0">
          <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
            <span className="text-cyan-400 font-semibold truncate">{current.location} Investor</span>
            <span className="shrink-0 ml-1">{current.timeAgo}</span>
          </div>

          <div className="font-bold text-white tracking-tight mt-0.5 font-mono truncate">
            {current.user}
          </div>

          <div className="text-[10px] sm:text-[11px] font-mono mt-0.5 truncate">
            {current.type === 'withdrawal' ? (
              <span className="text-amber-400 font-bold">Withdrew UGX {current.amountUGX.toLocaleString()}</span>
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
