import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, Gift, Users, Check, Clock, TrendingUp, Wallet, Copy } from 'lucide-react';

export const ReferralsTab: React.FC = () => {
  const { currentUser, referredUsers, purchasedRigs } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-slate-900/60 border border-slate-800 rounded-2xl text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
        <div>
          <h3 className="text-xl font-bold text-white">Sign In Required</h3>
          <p className="text-slate-400 text-sm mt-1">
            Please sign in to view your referral dashboard.
          </p>
        </div>
      </div>
    );
  }

  const referralCode = currentUser.referralCode || `BLQ-${currentUser.phone.slice(-5)}`;
  const referralLink = `${window.location.origin}/?ref=${referralCode}`;

  const [linkCopied, setLinkCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const shareText = encodeURIComponent(
      `Join me on BLQ Uganda Crypto Mining! Earn daily Mobile Money profits directly to your wallet. Register using my official link:\n${referralLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  // Compute referred users with extra balance/mining info
  const detailedReferred = React.useMemo(() => {
    return referredUsers.map(usr => {
      const userRigs = purchasedRigs.filter(r => r.userId === usr.id && r.status === 'active');
      const dailyYield = userRigs.reduce((sum, r) => sum + r.dailyYieldUGX, 0);
      return { ...usr, isActivated: userRigs.length > 0, dailyYield };
    });
  }, [referredUsers, purchasedRigs]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-emerald-500/20 border border-amber-500/40 rounded-2xl p-6 sm:p-7 text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-1 text-amber-400">
          <Gift className="w-6 h-6 text-amber-400" />
        </div>
        <h1 className="text-2xl font-black text-white flex items-center justify-center gap-2">
          <Users className="w-5 h-5 text-amber-400" />
          My Referral Dashboard
        </h1>
        <p className="text-xs text-slate-300">
          Earn <strong className="text-amber-400">UGX 15,000</strong> for every friend who activates a miner with your link.
        </p>
      </div>

      {/* My Referral Link Card */}
      <div className="bg-gradient-to-b from-[#161D2B] via-[#111724] to-[#0A0E18] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-amber-400 uppercase font-mono flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          Your Personal Referral Link
        </h2>
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
            {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {linkCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <button
          onClick={handleShareWhatsApp}
          className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <span>Share via WhatsApp</span>
        </button>

        {/* Referral Stats */}
        <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center space-y-1">
            <Users className="w-4 h-4 text-amber-400 mx-auto" />
            <div className="text-slate-400 text-[10px] uppercase">Friends Joined</div>
            <div className="text-xl font-bold text-white">{detailedReferred.length}</div>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center space-y-1">
            <Gift className="w-4 h-4 text-emerald-400 mx-auto" />
            <div className="text-slate-400 text-[10px] uppercase">Activated</div>
            <div className="text-xl font-bold text-emerald-400">
              {detailedReferred.filter(u => u.isActivated).length}
            </div>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center space-y-1">
            <Wallet className="w-4 h-4 text-amber-400 mx-auto" />
            <div className="text-slate-400 text-[10px] uppercase">Commission Earned</div>
            <div className="text-xl font-bold text-amber-400">
              UGX {(currentUser.referralEarningsUGX || 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Referred Users List */}
      <div className="bg-gradient-to-b from-[#161D2B] via-[#111724] to-[#0A0E18] border border-slate-800 rounded-2xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-amber-400 uppercase font-mono flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-400" />
          Your Invited Investors ({detailedReferred.length})
        </h2>

        {detailedReferred.length === 0 ? (
          <div className="p-6 bg-slate-950/60 border border-slate-800/80 rounded-2xl text-center space-y-3">
            <Users className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-xs text-slate-400">
              No investors have joined using your link yet.
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Share your referral link via WhatsApp or copy the link above!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {detailedReferred.map((usr) => (
              <div
                key={usr.id}
                className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 font-bold text-xs font-mono">
                    {usr.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      {usr.name}
                      {usr.isActivated ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-400" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {usr.phone.slice(0, 3)}****{usr.phone.slice(-3)}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Joined: {new Date(usr.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
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
