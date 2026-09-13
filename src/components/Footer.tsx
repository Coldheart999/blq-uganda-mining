import React from 'react';
import { BlqLogo } from './BlqLogo';
import { ShieldCheck, HelpCircle, Lock, Sparkles, Cpu } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const [footerClicks, setFooterClicks] = React.useState<number>(0);

  const handleFooterSecretClick = () => {
    const nextClicks = footerClicks + 1;
    setFooterClicks(nextClicks);
    if (nextClicks >= 5) {
      onOpenAdmin?.();
      setFooterClicks(0);
    }
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#070A0F] text-slate-400 pt-12 pb-32 md:pb-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-3">
          <BlqLogo size="md" showSubtitle={false} />
          <p className="text-xs text-slate-400 leading-relaxed">
            High-yield cloud crypto mining platform tailored for investors in Uganda. Powered by SHA-256 ASIC virtual rigs and instant Mobile Money settlement.
          </p>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            256-Bit SSL Encrypted & Verified
          </div>
        </div>

        {/* More Packages On The Way Announcement */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            More Packages On The Way
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our mining hardware fleet is expanding rapidly. Stay tuned for new specialized ASIC virtual rigs and custom plans designed for Ugandan investors.
          </p>
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-300 font-mono flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400 shrink-0" />
            <span>New ASIC Batches Deploying Soon 🚀</span>
          </div>
        </div>

        {/* Mining Hardware Pool Specs */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
            ASIC Hardware Fleet
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
            <li>• Bitmain Antminer S19 Pro Hydro</li>
            <li>• MicroBT Whatsminer M30S+</li>
            <li>• Canaan AvalonMiner 1246</li>
            <li>• IceRiver KS3 HeavyHash Kaspa</li>
          </ul>
        </div>

        {/* Customer Care / Support Notice */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
            24/7 Investor Support
          </h4>
          <p className="text-xs text-slate-400">
            Deposits are reviewed within 5-15 minutes. Withdrawals are paid directly to your MTN / Airtel number.
          </p>
          <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-[11px] text-amber-300 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <span>Need assistance? Contact your BLQ pool manager or Mobile Money support line.</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 select-none">
        <div 
          onClick={handleFooterSecretClick}
          className="cursor-pointer hover:text-slate-400 transition-colors"
          title="BLQ Mining Platform Uganda"
        >
          © {new Date().getFullYear()} BLQ Platform Uganda. All rights reserved. Built for Ugandan Investors.
        </div>
        
        {/* Hidden secret lock icon for Admin access */}
        <button
          onClick={onOpenAdmin}
          className="text-slate-800 hover:text-slate-600 transition-colors p-1"
          title="Security Portal"
        >
          <Lock className="w-3 h-3" />
        </button>
      </div>
    </footer>
  );
};
