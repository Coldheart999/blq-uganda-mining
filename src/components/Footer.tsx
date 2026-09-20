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
        
        {/* Brand & Copyright */}
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

        {/* Security Badge & Direct Admin Link */}
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <div 
            onClick={handleSecretTrigger}
            className="flex items-center gap-1.5 text-slate-500 cursor-pointer hover:text-emerald-400 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/80" />
            <span>256-Bit SSL</span>
            <span>• Uganda 🇺🇬</span>
          </div>

          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Open Owner Admin Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal</span>
            </button>
          )}
        </div>

      </div>
    </footer>
  );
};

