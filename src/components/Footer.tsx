import React from 'react';
import { BlqLogo } from './BlqLogo';
import { ShieldCheck, HelpCircle, Lock, Sparkles, Cpu, ExternalLink, Activity, ArrowRight, KeyRound } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onNavigateTab }) => {
  return (
    <footer className="relative z-20 border-t border-amber-500/20 bg-gradient-to-b from-[#0D121F] via-[#090D17] to-[#05070B] text-slate-300 pt-14 pb-32 md:pb-14 px-4 sm:px-6 mt-16 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      {/* Top accent glow line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>

      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Column 1: Brand & Security */}
          <div className="space-y-4">
            <BlqLogo size="md" showSubtitle={false} />
            <p className="text-xs text-slate-400 leading-relaxed">
              Uganda's leading automated crypto mining cloud infrastructure. Rent virtual ASIC computing power with instant Airtel & MTN Mobile Money deposits and withdrawals.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>256-Bit SSL Encrypted & Verified</span>
            </div>
          </div>

          {/* Column 2: Announcements */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Platform Announcements
            </h4>
            <div className="p-4 bg-gradient-to-b from-amber-500/10 to-amber-950/20 border border-amber-500/30 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs font-mono">
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>More Packages On The Way</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Our engineering team is actively testing new high-hashrate ASIC server pools. Stay tuned for upcoming mining tiers with increased daily yields!
              </p>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button 
                  onClick={() => {
                    onNavigateTab?.('store');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-amber-500">›</span> Mining Packages Store
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onNavigateTab?.('my-rigs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-amber-500">›</span> My Active Miners
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onNavigateTab?.('history');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-amber-500">›</span> Transaction History
                </button>
              </li>
              <li>
                <a 
                  href="https://t.me/BLQ_UG" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-cyan-400/90 font-semibold"
                >
                  <span className="text-cyan-400">›</span> Official Telegram Community
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: 24/7 Investor Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">
              24/7 Investor Care
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fast processing on all mobile money networks. Payouts arrive directly to your phone number within minutes.
            </p>
            <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1 text-xs">
              <div className="text-slate-300 font-semibold flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Support Hours</span>
              </div>
              <p className="text-[11px] text-slate-400">Monday – Sunday, 24 Hours Active</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright & ADMIN ACCESS BUTTON */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="text-xs text-slate-400 text-center sm:text-left flex items-center gap-2">
            <span>© {new Date().getFullYear()} BLQ Platform Uganda. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-amber-400/80 font-mono text-[11px]">Kampala, Uganda 🇺🇬</span>
          </div>

          {/* Explicit and Prominent Admin Access Portal Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900/90 hover:bg-amber-500/10 border border-slate-700/80 hover:border-amber-400/60 rounded-xl text-xs font-mono font-bold text-slate-300 hover:text-amber-300 transition-all shadow-md active:scale-95 group"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
              <span>Admin Portal</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
