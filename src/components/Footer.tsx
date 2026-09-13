import React from 'react';
import { BlqLogo } from './BlqLogo';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const [clickCount, setClickCount] = React.useState<number>(0);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSecretTrigger = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (nextCount >= 3) {
      setClickCount(0);
      onOpenAdmin?.();
    } else {
      timerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2500);
    }
  };

  return (
    <footer className="relative z-20 border-t border-slate-800/80 bg-[#070A10] text-slate-400 py-6 pb-24 md:pb-6 px-4 mt-12">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Brand & Copyright with 3-Tap Secret Trigger */}
        <div 
          onClick={handleSecretTrigger}
          className="flex items-center gap-2.5 cursor-pointer select-none hover:text-slate-200 transition-colors"
          title="BLQ Platform Uganda"
        >
          <BlqLogo size="sm" showSubtitle={false} />
          <span className="text-slate-400 text-[11px] sm:text-xs">
            © {new Date().getFullYear()} BLQ Platform Uganda. All rights reserved.
          </span>
        </div>

        {/* Security / SSL Badge with 3-Tap Secret Trigger */}
        <div 
          onClick={handleSecretTrigger}
          className="flex items-center gap-2 cursor-pointer select-none text-slate-500 hover:text-emerald-400 transition-colors text-[11px] font-mono"
          title="Verified Secure System"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/80" />
          <span>256-Bit SSL Encrypted</span>
          <span className="text-slate-700">•</span>
          <span className="text-slate-500">Uganda 🇺🇬</span>
        </div>

      </div>
    </footer>
  );
};

