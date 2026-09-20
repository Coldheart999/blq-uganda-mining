import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, Gift, Users, Check, Clock, TrendingUp, Wallet, Copy, Lock, ArrowRight, Share2, Sparkles } from 'lucide-react';

interface ReferralsTabProps {
  onGoToStore?: () => void;
}

export const ReferralsTab: React.FC<ReferralsTabProps> = ({ onGoToStore }) => {
  const { currentUser, referredUsers, purchasedRigs } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-[#0F1420]/80 border border-slate-800 rounded-3xl text-center space-y-4 shadow-2xl">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto animate-pulse" />
        <div>
          <h3 className="text-xl font-bold text-white">Sign In Required</h3>
          <p className="text-slate-400 text-xs mt-1">
            Please sign in to view your personal referral dashboard.
          </p>
        </div>
      </div>
    );
  }

  const userRigs = purchasedRigs.filter(r => r.userId === currentUser.id);
  const isReferralUnlocked = userRigs.length > 0;

  const referralCode = currentUser.referralCode || `BLQ-${currentUser.phone.slice(-5)}`;
  const referralLink = `${window.location.origin}/?ref=${referralCode}`;

  const [linkCopied, setLinkCopied] = React.useState(false);

  const handleCopyLink = () => {
    if (!isReferralUnlocked) return;
    navigator.clipboard.writeText(referralLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    if (!isReferralUnlocked) return;
    const shareText = encodeURIComponent(
      `Join me on BLQ Uganda Crypto Mining! Earn daily Mobile Money profits directly to your wallet. Register using my official link:\n${referralLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  // Compute referred users with extra balance/mining info
  const detailedReferred = React.useMemo(() => {
    return referredUsers.map(usr => {
      const activeRigs = purchasedRigs.filter(r => r.userId === usr.id && r.status === 'active');
      const dailyYield = activeRigs.reduce((sum, r) => sum + r.dailyYieldUGX, 0);
      return { ...usr, isActivated: activeRigs.length > 0, dailyYield };
    });
  }, [referredUsers, purchasedRigs]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      
      {/* Header Challenge Banner */}
      <div className="relative bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-emerald-500/15 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-2xl overflow-hidden">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 mb-1 text-amber-400 shadow-lg">
          <Gift className="w-7 h-7 text-amber-400 animate-pulse" />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            UGX 15,000 / Activated Friend
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2 mt-1">
            <Users className="w-6 h-6 text-amber-400" />
            Referral Partner Challenge
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Invite friends to join Uganda's trusted mining platform. Earn <strong className="text-amber-400">UGX 15,000</strong> instantly credited to your wallet for every friend who activates a miner!
        </p>
      </div>

      {/* Referral Link Container: Locked vs Unlocked State */}
      {!isReferralUnlocked ? (
        /* LOCKED STATE CARD */
        <div className="bg-gradient-to-b from-[#182132]/90 via-[#121826]/90 to-[#0A0E18]/90 backdrop-blur-md border-2 border-dashed border-amber-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-lg">
            <Lock className="w-8 h-8 text-amber-400 animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest font-mono bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              🔒 Referral Link Locked
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              1st Machine Purchase Required to Unlock Link
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Your personal referral link activates automatically as soon as you purchase your first mining package. Unlock your link now to start earning <strong className="text-amber-400">UGX 15,000</strong> per referral!
          </p>

          <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-2xl max-w-md mx-auto space-y-2 text-left font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between text-slate-400">
              <span>Link Access Status:</span>
              <span className="text-amber-400 font-bold">LOCKED (0 Active Machines)</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value="BLQ-XXXXX (Unlocks after 1st machine purchase)"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800/80 rounded-xl text-slate-500 font-mono text-xs cursor-not-allowed select-none"
              />
              <button
                disabled
                className="px-4 py-2.5 bg-slate-800/80 text-slate-500 font-bold text-xs rounded-xl cursor-not-allowed shrink-0"
              >
                Locked
              </button>
            </div>
          </div>

          {onGoToStore && (
            <button
              onClick={onGoToStore}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 hover:from-amber-400 hover:to-emerald-300 text-slate-950 font-black text-xs rounded-2xl shadow-xl shadow-amber-500/20 transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Store & Activate 1st Machine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        /* UNLOCKED STATE CARD */
        <div className="bg-gradient-to-b from-[#161D2B]/90 via-[#111724]/90 to-[#0A0E18]/90 backdrop-blur-md border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-amber-400 uppercase font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Your Active Referral Link
            </h2>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full font-mono border border-emerald-500/30">
              Unlocked & Ready
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="w-full px-3.5 py-3 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-mono text-xs focus:outline-none shadow-inner"
            />
            <button
              onClick={handleCopyLink}
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow shrink-0 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              {linkCopied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
              {linkCopied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          <button
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all active:scale-95 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Link via WhatsApp</span>
          </button>

          {/* Real-time Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5 pt-2 font-mono text-xs">
            <div className="bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800 text-center space-y-1 shadow-inner">
              <Users className="w-4 h-4 text-amber-400 mx-auto" />
              <div className="text-slate-400 text-[10px] uppercase">Invited Friends</div>
              <div className="text-xl font-black text-white">{detailedReferred.length}</div>
            </div>
            <div className="bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800 text-center space-y-1 shadow-inner">
              <Gift className="w-4 h-4 text-emerald-400 mx-auto" />
              <div className="text-slate-400 text-[10px] uppercase">Activated</div>
              <div className="text-xl font-black text-emerald-400">
                {detailedReferred.filter(u => u.isActivated).length}
              </div>
            </div>
            <div className="bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800 text-center space-y-1 shadow-inner">
              <Wallet className="w-4 h-4 text-amber-400 mx-auto" />
              <div className="text-slate-400 text-[10px] uppercase">Commission Earned</div>
              <div className="text-xl font-black text-amber-400">
                UGX {(currentUser.referralEarningsUGX || 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invited Members List */}
      <div className="bg-gradient-to-b from-[#161D2B]/90 via-[#111724]/90 to-[#0A0E18]/90 backdrop-blur-md border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-4 shadow-2xl">
        <h2 className="text-sm font-bold text-amber-400 uppercase font-mono flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-400" />
          Your Invited Investors ({detailedReferred.length})
        </h2>

        {detailedReferred.length === 0 ? (
          <div className="p-8 bg-slate-950/60 border border-slate-800/80 rounded-2xl text-center space-y-3">
            <Users className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400 font-semibold">
              No members have registered with your referral link yet.
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              {isReferralUnlocked 
                ? 'Share your link via WhatsApp or social media to start inviting!'
                : 'Unlock your link above by purchasing your 1st mining machine!'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {detailedReferred.map((usr) => (
              <div
                key={usr.id}
                className="p-4 bg-slate-950/90 border border-slate-800/80 rounded-2xl flex items-center justify-between text-xs hover:border-slate-700 transition-all shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm font-mono">
                    {usr.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                      {usr.name}
                      {usr.isActivated ? (
                        <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      📞 {usr.phone.slice(0, 3)}****{usr.phone.slice(-3)} • Joined: {new Date(usr.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                    usr.isActivated
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}>
                    {usr.isActivated ? 'Activated (+UGX 15k)' : 'Pending Activation'}
                  </div>
                  {usr.isActivated && (
                    <div className="text-[10px] text-slate-400 mt-1">
                      Mining: UGX {usr.dailyYield.toLocaleString()}/day
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
