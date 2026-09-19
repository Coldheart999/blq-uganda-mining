import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BackButton } from './BackButton';
import { X, Gift, Users, Copy, Check, Lock, Sparkles, ArrowRight, Share2, Award, ShieldCheck } from 'lucide-react';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToStore: () => void;
}

export const ReferralModal: React.FC<ReferralModalProps> = ({ isOpen, onClose, onGoToStore }) => {
  const { currentUser, purchasedRigs, referredUsers } = useApp();
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen || !currentUser) return null;

  // User MUST have purchased at least 1 miner rig to activate their referral link
  const userRigs = purchasedRigs.filter(r => r.userId === currentUser.id);
  const isReferralActivated = userRigs.length > 0;

  // Generate unique personal referral link
  const referralCode = currentUser.referralCode || `BLQ-${currentUser.phone.slice(-5)}`;
  const referralLink = `${window.location.origin}/?ref=${referralCode}`;

  const handleCopyLink = () => {
    if (!isReferralActivated) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    if (!isReferralActivated) return;
    const shareText = encodeURIComponent(
      `Join me on BLQ Uganda Crypto Mining! Earn daily Mobile Money profits directly to your wallet. Register using my official link:\n${referralLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto bg-gradient-to-b from-[#161D2B] via-[#111724] to-[#0A0E18] border border-amber-500/40 rounded-3xl shadow-2xl p-5 sm:p-7 scrollbar-thin">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <BackButton onClick={onClose} />
        </div>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-2.5 text-amber-400 shadow-md">
            <Gift className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-1.5">
            Refer & Earn <span className="text-amber-400">UGX 15,000</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Earn UGX 15,000 instant bonus for every friend who activates a miner!
          </p>
        </div>

        {/* Captivating Status Card */}
        {isReferralActivated ? (
          /* ACTIVATED STATE */
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-emerald-950/60 to-slate-950 border border-emerald-500/40 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Referral Challenge: ACTIVE
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full font-mono">
                  Unlocked
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Congratulations! Your referral challenge is fully activated. Share your link below to earn <strong className="text-amber-400">UGX 15,000</strong> per friend.
              </p>
            </div>

            {/* Personal Referral Link Input Box */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Your Personal Referral Link:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-mono text-xs focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow shrink-0 flex items-center gap-1.5 transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct WhatsApp Share Button */}
            <button
              onClick={handleShareWhatsApp}
              className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Link via WhatsApp</span>
            </button>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase">Friends Invited</span>
                <span className="text-lg font-bold text-white">{referredUsers.length}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase">Commission Earned</span>
                <span className="text-lg font-bold text-amber-400">UGX {(currentUser.referralEarningsUGX || 0).toLocaleString()}</span>
              </div>
            </div>

            {/* Referred Members Section */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5 font-mono">
                  <Users className="w-4 h-4 text-amber-400" />
                  Your Invited Investors ({referredUsers.length})
                </h4>
              </div>

              {referredUsers.length === 0 ? (
                <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl text-center space-y-1">
                  <p className="text-xs text-slate-400">No friends invited yet.</p>
                  <p className="text-[11px] text-slate-500 font-mono">Share your link via WhatsApp or copy link above!</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                  {referredUsers.map((usr) => (
                    <div key={usr.id} className="p-3 bg-slate-950 border border-slate-800/80 rounded-2xl flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          {usr.name}
                          <span className="font-mono text-[10px] text-slate-400">
                            ({usr.phone.slice(0, 3)}****{usr.phone.slice(-3)})
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Joined {new Date(usr.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {usr.isActivated ? (
                        <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px] rounded-full flex items-center gap-1 border border-emerald-500/30">
                          <Check className="w-3 h-3 text-emerald-400" />
                          Activated (+UGX 15k)
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-amber-500/15 text-amber-400 font-mono font-semibold text-[10px] rounded-full border border-amber-500/30">
                          Pending Activation
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* LOCKED STATE (NO MINERS PURCHASED YET) */
          <div className="space-y-4">
            <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-400" />
                  Referral Challenge: Locked
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full font-mono">
                  1 Miner Required
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Dear Valued Investor 🌟 To join the <strong className="text-amber-400">BLQ UGX 15,000 Referral Challenge</strong> and generate your active referral link, you need to have purchased at least 1 mining rig!
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Requirement Progress:</span>
                  <span className="text-amber-400 font-bold">0 / 1 Miner Purchased</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-amber-500 w-[5%] transition-all"></div>
                </div>
              </div>
            </div>

            {/* Locked Link Preview Box */}
            <div className="space-y-1.5 opacity-60 pointer-events-none">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Your Referral Link (Locked):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="https://blq-uganda-mining-n77i.vercel.app/?ref=LOCKED"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-500 font-mono text-xs"
                />
                <button className="px-4 py-2.5 bg-slate-800 text-slate-500 font-bold text-xs rounded-xl cursor-not-allowed">
                  Locked
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onGoToStore();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50 transition-all active:scale-95"
            >
              <span>Activate Your First Miner in Store</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Hospitable Rule Note */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
            💡 Commissions (UGX 15,000) are paid directly to your withdrawable wallet balance once your invited investor activates their miner.
          </p>
        </div>

      </div>
    </div>
  );
};
