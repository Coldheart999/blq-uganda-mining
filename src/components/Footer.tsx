import React from 'react';
import { BlqLogo } from './BlqLogo';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="relative z-20 border-t border-slate-800/80 bg-[#070A10] text-slate-400 py-6 pb-24 md:pb-6 px-4 mt-12">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Brand & Copyright */}
        <div 
          className="flex items-center gap-2.5 select-none hover:text-slate-200 transition-colors"
          title="BLQ Platform Uganda"
        >
          <BlqLogo size="sm" showSubtitle={false} />
          <span className="text-slate-400 text-[11px] sm:text-xs">
            © {new Date().getFullYear()} BLQ Platform Uganda. All rights reserved.
          </span>
        </div>

        {/* Security Badge */}
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-400 transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/80" />
            <span>256-Bit SSL</span>
            <span>• Uganda 🇺🇬</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
