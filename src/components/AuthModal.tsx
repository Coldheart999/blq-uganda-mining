import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BlqLogo } from './BlqLogo';
import { Phone, Lock, CheckCircle2, ShieldCheck, X, AlertCircle, User as UserIcon, LogIn, UserPlus } from 'lucide-react';
import { validateUgandanPhone } from '../utils/phoneValidation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { registerAccount, loginAccount } = useApp();
  
  const pendingRef = typeof window !== 'undefined' ? localStorage.getItem('blq_pending_ref') : null;
  const [isLoginMode, setIsLoginMode] = useState<boolean>(() => !pendingRef);
  const [phone, setPhone] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanPhone = phone.trim();
    const phoneVal = validateUgandanPhone(cleanPhone);
    if (!phoneVal.isValid) {
      setError(phoneVal.errorMessage || 'Please enter a valid MTN (077/078/076/039) or Airtel (070/075/074) phone number.');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    const fullFormattedPhone = phoneVal.formattedPhone || cleanPhone;

    if (isLoginMode) {
      // Perform strict login verification against stored accounts
      const res = loginAccount(fullFormattedPhone, password);
      if (!res.success) {
        setError(res.message);
        return;
      }
      setSuccessMsg('Welcome back! Login successful.');
    } else {
      // Perform real account registration
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please re-enter.');
        return;
      }
      const res = registerAccount(fullFormattedPhone, password, fullName.trim() || undefined);
      if (!res.success) {
        setError(res.message);
        return;
      }
      setSuccessMsg('Account created successfully! Welcome to BLQ.');
    }
    
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#161D2B] via-[#111724] to-[#0B0F19] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="mb-3">
            <BlqLogo size="lg" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-white mt-1">
            {isLoginMode ? 'Sign In to BLQ Platform' : 'Create Investor Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isLoginMode ? 'Enter your registered phone number & password' : 'Register with your MTN or Airtel number'}
          </p>

          {/* Inviter Referral Badge */}
          {!isLoginMode && pendingRef && (
            <div className="mt-3 px-3.5 py-1.5 bg-amber-500/15 border border-amber-500/40 rounded-full text-amber-300 font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
              <span className="animate-pulse">🎁</span>
              <span>Invited By Partner: <strong className="text-white underline">{pendingRef}</strong></span>
            </div>
          )}
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800/80 mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setIsLoginMode(true);
              setError('');
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              isLoginMode
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            Sign In
          </button>

          <button
            type="button"
            onClick={() => {
              setIsLoginMode(false);
              setError('');
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              !isLoginMode
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            Register
          </button>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="mb-4 p-3 bg-rose-950/70 border border-rose-800/80 rounded-xl text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-950/70 border border-emerald-800/80 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name (Register only) */}
          {!isLoginMode && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Full Name / Investor Alias
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Mukasa David"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Mobile Money Phone Number (MTN / Airtel)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError('');
                }}
                placeholder="0771234567 or 0751234567"
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                required
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Valid prefixes: MTN (077/078/076/039) • Airtel (070/075/074)
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Account Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          {/* Confirm Password (Register only) */}
          {!isLoginMode && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] mt-2"
          >
            {isLoginMode ? 'Sign In to Dashboard' : 'Complete Registration & Start Mining'}
          </button>
        </form>

        {/* Toggle Login vs Register */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <button
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setError('');
            }}
            className="text-xs text-amber-400 hover:underline font-medium"
          >
            {isLoginMode
              ? "Don't have an account yet? Click here to Register"
              : 'Already registered? Click here to Sign In'}
          </button>
        </div>

      </div>
    </div>
  );
};
