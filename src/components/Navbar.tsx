import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Cpu, ArrowUpRight, ArrowDownLeft, LogOut, User as UserIcon, LogIn, ChevronDown, Wallet } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAuth: () => void;
  openDeposit: () => void;
  openWithdraw: () => void;
  openAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openAuth,
  openDeposit,
  openWithdraw,
  openAdmin
}) => {
  const { currentUser, logout, liveUnclaimedYield } = useApp();
  const [logoClicks, setLogoClicks] = useState<number>(0);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);

  // Hidden secret gesture: 5 rapid clicks on logo opens Admin Panel
  const handleLogoClick = () => {
    const nextClicks = logoClicks + 1;
    setLogoClicks(nextClicks);
    if (nextClicks >= 5) {
      openAdmin();
      setLogoClicks(0);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F141C]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Clean top bar */}
      <div className="bg-[#0A0D14] px-4 py-1.5 text-xs border-b border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          {/* Uganda Flag Badge */}
          <div className="flex items-center h-3 w-4.5 rounded overflow-hidden border border-slate-700">
            <div className="h-full w-1/3 bg-black"></div>
            <div className="h-full w-1/3 bg-amber-400"></div>
            <div className="h-full w-1/3 bg-red-600"></div>
          </div>
          <span className="font-medium text-slate-300">BLQ Mining Pool</span>
          <span className="text-slate-700">•</span>
          <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            UGX Network Online
          </span>
        </div>

        <div className="text-[11px] text-slate-400 font-mono">
          MTN & Airtel Settlement: Active
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer select-none group" 
          onClick={() => {
            setActiveTab('store');
            handleLogoClick();
          }}
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white">
                BLQ
              </span>
              <span className="bg-amber-400/10 text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded">
                UGX
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Crypto Miners Uganda</p>
          </div>
        </div>

        {/* Clean Center Navigation Tabs */}
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
            {liveUnclaimedYield > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            )}
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
        </nav>

        {/* Right User Actions & Balance */}
        <div className="flex items-center space-x-2.5">
          {currentUser ? (
            <>
              {/* Virtual Balance Display */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs">
                <Wallet className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400 font-mono">Balance:</span>
                <span className="text-white font-bold font-mono">
                  UGX {currentUser.balanceUGX.toLocaleString()}
                </span>
              </div>

              {/* Deposit Action */}
              <button
                onClick={openDeposit}
                className="flex items-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow transition-all active:scale-95"
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                Deposit
              </button>

              {/* Withdraw Action */}
              <button
                onClick={openWithdraw}
                className="flex items-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-400/30 font-semibold text-xs rounded-xl transition-all active:scale-95"
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
                  <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{currentUser.phone}</p>
                    </div>
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
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In / Register
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden border-t border-slate-800/80 bg-[#0F141C] px-2 py-1.5 justify-around">
        <button
          onClick={() => setActiveTab('store')}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg ${
            activeTab === 'store' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          Store
        </button>
        <button
          onClick={() => setActiveTab('my-rigs')}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg ${
            activeTab === 'my-rigs' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          My Miners
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg ${
            activeTab === 'history' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
          }`}
        >
          History
        </button>
      </div>
    </header>
  );
};
