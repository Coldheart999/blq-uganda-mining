import React from 'react';
import { useApp } from '../context/AppContext';
import { Cpu, Wallet, ArrowUpRight, ArrowDownLeft, Shield, LogOut, User as UserIcon, Zap, Lock } from 'lucide-react';

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
  const { currentUser, logout, liveUnclaimedYield, claimEarnings } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#0B0E14]/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner with Ugandan accents and live mining ticker */}
      <div className="bg-slate-900/80 px-4 py-1.5 text-xs border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Uganda Flag Stripes Pill */}
          <div className="flex items-center h-3 w-5 rounded overflow-hidden shadow-sm border border-slate-700">
            <div className="h-full w-1/3 bg-black"></div>
            <div className="h-full w-1/3 bg-amber-400"></div>
            <div className="h-full w-1/3 bg-red-600"></div>
          </div>
          <span className="font-semibold text-slate-300">BLQ Platform</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400 flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            BLQ SHA-256 Pool: Active (99.98% Uptime)
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={openAdmin}
            className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors font-mono text-[11px]"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            Admin Portal
          </button>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('store')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-blue-600 p-0.5 shadow-lg shadow-emerald-950/40">
            <div className="w-full h-full bg-[#0B0E14] rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-2xl tracking-wider bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                BLQ
              </span>
              <span className="bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-bold px-1.5 py-0.2 rounded">
                UGX
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">Crypto Mining Pool</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('store')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'store'
                ? 'bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Miner Packages
          </button>

          <button
            onClick={() => setActiveTab('my-rigs')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
              activeTab === 'my-rigs'
                ? 'bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Active Rigs & Yield
            {liveUnclaimedYield > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Transactions
          </button>
        </nav>

        {/* User / Auth & Wallet Balance Section */}
        <div className="flex items-center space-x-3">
          {currentUser ? (
            <>
              {/* Virtual Balance Display */}
              <div className="hidden sm:flex flex-col items-end px-3 py-1 bg-slate-900/90 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Virtual Balance</span>
                <span className="text-emerald-400 font-bold font-mono text-sm">
                  UGX {currentUser.balanceUGX.toLocaleString()}
                </span>
              </div>

              {/* Deposit Action */}
              <button
                onClick={openDeposit}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-emerald-900/30 transition-all active:scale-95"
              >
                <ArrowDownLeft className="w-4 h-4" />
                Deposit
              </button>

              {/* Withdraw Action */}
              <button
                onClick={openWithdraw}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 font-medium text-xs rounded-xl transition-all active:scale-95"
              >
                <ArrowUpRight className="w-4 h-4" />
                Withdraw
              </button>

              {/* User Account dropdown / Logout */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 p-2 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700">
                  <UserIcon className="w-4 h-4 text-slate-300" />
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-xs font-semibold text-slate-200">{currentUser.name}</p>
                    <p className="text-[11px] font-mono text-slate-400">{currentUser.phone}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/30 rounded-lg flex items-center gap-2 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout Account
                  </button>
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={openAuth}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-900/30 transition-all active:scale-95"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              Login / Sign Up
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden border-t border-slate-800 bg-[#0B0E14]/95 px-2 py-2 justify-around">
        <button
          onClick={() => setActiveTab('store')}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg ${
            activeTab === 'store' ? 'bg-slate-800 text-amber-400' : 'text-slate-400'
          }`}
        >
          Miners Store
        </button>
        <button
          onClick={() => setActiveTab('my-rigs')}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg ${
            activeTab === 'my-rigs' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400'
          }`}
        >
          My Rigs & Mining
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg ${
            activeTab === 'history' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'
          }`}
        >
          History
        </button>
      </div>
    </header>
  );
};
