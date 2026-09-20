import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BlqLogo } from './BlqLogo';
import { ArrowUpRight, ArrowDownLeft, LogOut, User as UserIcon, LogIn, ChevronDown, Wallet, Store, Activity, History, Gift, Moon, Sun, Users, Bell, Check, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAuth: () => void;
  openDeposit: () => void;
  openWithdraw: () => void;
  openReferral: () => void;
  openAdmin: () => void;
  openFaq: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAuth,
  openDeposit,
  openWithdraw,
  openReferral,
  openAdmin,
  openFaq
}) => {
  const { currentUser, setCurrentUser, logout } = useApp();
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState<boolean>(false);
  const clickCountRef = React.useRef<number>(0);
  const clickTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTapTimeRef = React.useRef<number>(0);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('blq_dark_mode') === 'true'; // Default is false (Original Golden Amber Theme)
  });

  const handleLogoSecretClick = (e?: React.SyntheticEvent) => {
    const now = Date.now();
    // Debounce duplicate touchEnd + click fires in the same 40ms window
    if (now - lastTapTimeRef.current < 40) return;
    lastTapTimeRef.current = now;

    clickCountRef.current += 1;
    const count = clickCountRef.current;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (count >= 3) {
      clickCountRef.current = 0;
      openAdmin();
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
        setActiveTab('store');
      }, 2500);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    localStorage.setItem('blq_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0F141C]/95 backdrop-blur-md border-b border-slate-800/80">
        {/* Main Navbar Header */}
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand Logo with 3-Tap Secret Admin Gesture */}
          <div 
            onClick={handleLogoSecretClick}
            onTouchEnd={handleLogoSecretClick}
            style={{ touchAction: 'manipulation' }}
            className="cursor-pointer select-none"
          >
            <BlqLogo size="md" onClick={handleLogoSecretClick} />
          </div>

          {/* Center Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('store')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'store'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Packages Store
            </button>

            <button
              onClick={() => setActiveTab('my-rigs')}
              className={`px-4 py-2 rounded-lg transition-all relative ${
                activeTab === 'my-rigs'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              My Miners
            </button>

            <button
              onClick={() => setActiveTab('referrals')}
              className={`px-4 py-2 rounded-lg transition-all relative ${
                activeTab === 'referrals'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                Referrals
                {currentUser && (currentUser.referralCount || 0) > 0 && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                  </span>
                )}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'history'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Transactions
            </button>

            <button
              onClick={openReferral}
              className="relative px-3.5 py-2 rounded-xl transition-all text-slate-950 font-bold flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 shadow-md shadow-amber-500/20 border border-yellow-300/80 animate-smooth-hover hover:brightness-110 active:scale-95 cursor-pointer"
            >
              <Gift className="w-4 h-4 text-slate-950" />
              <span>Refer & Earn 15K</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
              </span>
            </button>
          </nav>

          {/* Right User Actions & Mobile Balance */}
          <div className="flex items-center space-x-2">
            {currentUser ? (
              <>
                {/* Balance Display */}
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs">
                  <Wallet className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-white font-bold font-mono text-xs">
                    UGX {currentUser.balanceUGX.toLocaleString()}
                  </span>
                </div>

                {/* Quick Action Buttons (Desktop) */}
                <button
                  onClick={openDeposit}
                  className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow transition-all active:scale-95"
                >
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  Deposit
                </button>

                <button
                  onClick={openWithdraw}
                  className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-400/30 font-semibold text-xs rounded-xl transition-all active:scale-95"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Withdraw
                </button>

                {/* Notification Bell Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setNotifDropdownOpen(!notifDropdownOpen);
                      setUserDropdownOpen(false);
                    }}
                    className="relative p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                    title="Notifications"
                  >
                    <Bell className="w-4 h-4 text-amber-400" />
                    {(currentUser.notifications?.filter(n => !n.read).length || 0) > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                        {currentUser.notifications?.filter(n => !n.read).length}
                      </span>
                    )}
                  </button>

                  {notifDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl p-3 z-50 animate-fade-in max-h-96 overflow-y-auto scrollbar-thin">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                        <span className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
                          <Bell className="w-3.5 h-3.5 text-amber-400" />
                          Notifications ({(currentUser.notifications || []).length})
                        </span>
                        {(currentUser.notifications?.filter(n => !n.read).length || 0) > 0 && (
                          <button
                            onClick={() => {
                              const updated = (currentUser.notifications || []).map(n => ({ ...n, read: true }));
                              setCurrentUser({ ...currentUser, notifications: updated });
                            }}
                            className="text-[10px] text-amber-400 hover:underline font-mono"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>

                      {(currentUser.notifications || []).length === 0 ? (
                        <div className="py-6 text-center text-xs text-slate-400">
                          No notifications yet
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {(currentUser.notifications || []).map((notif) => (
                            <div
                              key={notif.id}
                              onClick={() => {
                                const updated = (currentUser.notifications || []).map(n => n.id === notif.id ? { ...n, read: true } : n);
                                setCurrentUser({ ...currentUser, notifications: updated });
                              }}
                              className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                                notif.read
                                  ? 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                                  : 'bg-amber-500/10 border-amber-500/30 text-slate-200'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1 font-bold text-white mb-0.5">
                                <span className="truncate">{notif.title}</span>
                                <span className="text-[10px] font-mono text-slate-500 shrink-0">
                                  {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-[11px] leading-snug text-slate-300">{notif.message}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1 p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                  >
                    <UserIcon className="w-4 h-4" />
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in">
                      <div className="px-3 py-2 border-b border-slate-800">
                        <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{currentUser.phone}</p>
                      </div>

                      <button
                        onClick={() => {
                          openReferral();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-amber-400 hover:bg-amber-950/30 rounded-lg flex items-center gap-2 mt-1 font-semibold"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        Refer & Earn UGX 15,000
                      </button>

                      <button
                        onClick={() => {
                          openFaq();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center gap-2 transition-colors font-medium"
                      >
                        <span>📖</span>
                        <span>FAQs & Investor Guide</span>
                      </button>

                      <button
                        onClick={() => {
                          openDeposit();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-emerald-400 hover:bg-emerald-950/30 rounded-lg flex items-center gap-2 sm:hidden"
                      >
                        <ArrowDownLeft className="w-3.5 h-3.5" />
                        Deposit Funds
                      </button>

                      <button
                        onClick={() => {
                          openWithdraw();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-amber-400 hover:bg-amber-950/30 rounded-lg flex items-center gap-2 sm:hidden"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        Withdraw Profits
                      </button>

                      <button
                        onClick={toggleDarkMode}
                        className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg flex items-center justify-between mt-1 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {isDarkMode ? (
                            <Moon className="w-3.5 h-3.5 text-cyan-400" />
                          ) : (
                            <Sun className="w-3.5 h-3.5 text-amber-400" />
                          )}
                          <span>Blue Dark Mode</span>
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isDarkMode ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isDarkMode ? 'ON' : 'OFF'}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/30 rounded-lg flex items-center gap-2 mt-1 transition-colors border-t border-slate-800/80 pt-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={openFaq}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors text-xs flex items-center gap-1 font-medium"
                  title="FAQs & Help"
                >
                  <span>📖</span>
                  <span className="hidden sm:inline">FAQ</span>
                </button>

                <button
                  onClick={openAuth}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all active:scale-95"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Native App Fixed Bottom Navigation Bar for Mobile Screens */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0B0F17]/95 backdrop-blur-xl border-t border-slate-800/90 px-2 py-2 flex items-center justify-around shadow-2xl pb-[max(0.6rem,env(safe-area-inset-bottom))]">
        <button
          onClick={() => setActiveTab('store')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'store' 
              ? 'text-amber-400 font-bold scale-105' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px] font-mono">Store</span>
        </button>

        <button
          onClick={() => setActiveTab('my-rigs')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all relative ${
            activeTab === 'my-rigs' 
              ? 'text-amber-400 font-bold scale-105' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="text-[10px] font-mono">Miners</span>
        </button>

        <button
          onClick={() => setActiveTab('referrals')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all relative ${
            activeTab === 'referrals' 
              ? 'text-amber-400 font-bold scale-105' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-mono">Referrals</span>
          {currentUser && (currentUser.referralCount || 0) > 0 && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'history' 
              ? 'text-amber-400 font-bold scale-105' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <History className="w-5 h-5" />
          <span className="text-[10px] font-mono">History</span>
        </button>

        <button
          onClick={() => {
            if (!currentUser) openAuth();
            else openDeposit();
          }}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-extrabold shadow-md active:scale-95"
        >
          <ArrowDownLeft className="w-5 h-5" />
          <span className="text-[10px] font-mono">Deposit</span>
        </button>
      </div>
    </>
  );
};
