import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BlqLogo } from './BlqLogo';
import { UgandaFlag } from './UgandaFlag';
import { Cpu, ArrowUpRight, ArrowDownLeft, LogOut, User as UserIcon, LogIn, ChevronDown, Wallet, Store, Activity, History, Gift } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAuth: () => void;
  openDeposit: () => void;
  openWithdraw: () => void;
  openReferral: () => void;
  openAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAuth,
  openDeposit,
  openWithdraw,
  openReferral,
  openAdmin
}) => {
  const { currentUser, logout } = useApp();
  const [logoClicks, setLogoClicks] = useState<number>(0);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);

  // Hidden secret gesture: 5 rapid clicks on "Live Node" pill opens Admin Panel
  const handleNodeClick = () => {
    const nextClicks = logoClicks + 1;
    setLogoClicks(nextClicks);
    if (nextClicks >= 5) {
      openAdmin();
      setLogoClicks(0);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0F141C]/95 backdrop-blur-md border-b border-slate-800/80">
        {/* Clean top notification bar */}
        <div className="bg-[#0A0D14] px-3 sm:px-4 py-1.5 text-xs border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Uganda Flag Badge */}
            <UgandaFlag size="sm" />
            <span className="font-semibold text-slate-300 text-[11px] truncate">BLQ Pool Uganda</span>
            <span className="text-slate-700">•</span>
            <span 
              onClick={handleNodeClick}
              className="text-emerald-400 font-mono text-[10px] sm:text-[11px] flex items-center gap-1.5 shrink-0 cursor-pointer select-none"
              title="BLQ Node Status"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Node
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono">
            <button
              onClick={openReferral}
              className="animate-smooth-hover text-amber-300 font-extrabold hover:text-white flex items-center gap-1.5 bg-gradient-to-r from-amber-500/25 via-yellow-500/20 to-amber-500/25 px-2.5 py-0.5 rounded-full border border-amber-400/40 shadow-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <Gift className="w-3.5 h-3.5 text-yellow-300" />
              <span className="tracking-wide">🎁 Earn UGX 15K</span>
            </button>
          </div>
        </div>

        {/* Main Navbar Header */}
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <BlqLogo 
            size="md" 
            onClick={() => setActiveTab('store')} 
          />

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
                    <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50">
                      <div className="px-3 py-2 border-b border-slate-800">
                        <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{currentUser.phone}</p>
                      </div>
                      <button
                        onClick={() => {
                          openReferral();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-amber-400 hover:bg-amber-950/30 rounded-lg flex items-center gap-2 mt-1"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        Refer & Earn UGX 15,000
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
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/30 rounded-lg flex items-center gap-2 mt-1 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={openAuth}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
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
          onClick={openReferral}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-amber-300 hover:text-amber-200 transition-all animate-smooth-hover active:scale-95"
        >
          <div className="relative">
            <div className="p-1 rounded-lg bg-amber-500/15 border border-amber-500/30">
              <Gift className="w-5 h-5 text-yellow-300" />
            </div>
            <span className="absolute -top-1 -right-1 text-[8px]">✨</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-amber-300">Earn 15K</span>
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
