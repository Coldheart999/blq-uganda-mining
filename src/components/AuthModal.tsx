import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BlqLogo } from './BlqLogo';
import { UgandaFlag } from './UgandaFlag';
import { Phone, Lock, CheckCircle2, ShieldCheck, X, AlertCircle, User as UserIcon, LogIn, UserPlus, Sparkles, Zap, Heart, Eye, EyeOff } from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

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
    setIsSubmitting(true);

    try {
      if (isLoginMode) {
        // Strict verification login with cross-device cloud sync
        const res = await loginAccount(fullFormattedPhone, password);
        if (!res.success) {
          setError(res.message);
          setIsSubmitting(false);
          return;
        }
        setSuccessMsg('Welcome back! Login successful.');
      } else {
        // Real registration with cross-device cloud sync
        if (password !== confirmPassword) {
          setError('Passwords do not match. Please re-enter.');
          setIsSubmitting(false);
          return;
        }
        const res = await registerAccount(fullFormattedPhone, password, fullName.trim() || undefined);
        if (!res.success) {
          setError(res.message);
          setIsSubmitting(false);
          return;
        }
        setSuccessMsg('Account created successfully! Welcome to BLQ.');
      }
      
      setTimeout(() => {
        setSuccessMsg('');
        setIsSubmitting(false);
        onClose();
      }, 1200);
    } catch (err: any) {
      setError(err?.message || 'Authentication error. Please check your network and try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-gradient-to-b from-[#182132] via-[#101625] to-[#0A0E17] border-2 border-amber-500/40 rounded-3xl shadow-2xl p-4 sm:p-7 scrollbar-thin">
        
        {/* Glowing Ambient Corner Orbs */}
        <div className="absolute -top-12 -left-12 w-28 h-28 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Animated Header & Welcome Banner */}
        <div className="flex flex-col items-center text-center mb-5 relative z-10">
          <div className="mb-2.5 transform hover:scale-105 transition-transform">
            <BlqLogo size="md" />
          </div>

          {/* Welcoming Banner Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-emerald-500/20 border border-amber-500/40 rounded-full text-amber-300 font-mono text-[11px] font-bold shadow-sm mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>{isLoginMode ? 'Welcome Back Investor! 🌟' : 'Karibu / Welcome to BLQ! 🇺🇬✨'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {isLoginMode ? 'Sign In to Your Farm' : 'Create Investor Account'}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xs leading-relaxed">
            {isLoginMode 
              ? 'Access your daily mining profits and Mobile Money wallet.'
              : 'Join thousands earning daily Mobile Money profits in Uganda.'}
          </p>

          {/* Inviter Referral Badge */}
          {!isLoginMode && pendingRef && (
            <div className="mt-2.5 px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 border border-emerald-500/40 rounded-full text-emerald-300 font-mono text-[11px] font-bold flex items-center gap-1.5 animate-pulse">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Invited By Partner: <strong className="text-white underline">{pendingRef}</strong></span>
            </div>
          )}
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex bg-slate-950/90 p-1 rounded-2xl border border-slate-800 mb-5 text-xs font-bold shadow-inner">
          <button
            type="button"
            onClick={() => {
              setIsLoginMode(true);
              setError('');
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              isLoginMode
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black shadow-md'
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
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            Register
          </button>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="mb-4 p-3 bg-rose-950/80 border border-rose-800 rounded-2xl text-rose-300 text-xs flex flex-col gap-2 animate-fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
            {isLoginMode && error.includes('Register') && (
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(false);
                  setError('');
                }}
                className="self-start px-3 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-[11px] shadow transition-all active:scale-95 flex items-center gap-1.5 mt-0.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Account Now</span>
              </button>
            )}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-950/80 border border-emerald-800 rounded-2xl text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {/* Full Name (Register only) */}
          {!isLoginMode && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 font-mono">
                Full Name / Investor Name
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
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 font-mono">
              Phone Number (MTN / Airtel Uganda)
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
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-amber-400"
                required
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1 font-mono flex items-center gap-1">
              <span>Prefixes: MTN (077/078/076) • Airtel (070/075/074)</span>
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 font-mono">
              Account Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
                tabIndex={-1}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Register only) */}
          {!isLoginMode && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 font-mono">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
                  tabIndex={-1}
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 hover:from-amber-400 hover:to-emerald-300 disabled:opacity-60 text-slate-950 font-black rounded-xl text-sm shadow-xl shadow-amber-500/20 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                <span>Connecting to Cloud Vault...</span>
              </span>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>{isLoginMode ? 'Sign In to Farm Dashboard' : 'Start Mining & Earn Profits'}</span>
              </>
            )}
          </button>
        </form>

        {/* Toggle Login vs Register */}
        <div className="mt-5 pt-3.5 border-t border-slate-800/80 text-center">
          <button
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setError('');
            }}
            className="text-xs text-amber-400 hover:underline font-bold"
          >
            {isLoginMode
              ? "Don't have an account yet? Tap here to Register"
              : 'Already registered? Tap here to Sign In'}
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-around text-[10px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            SSL Secure
          </span>
          <span className="flex items-center gap-1">
            <UgandaFlag size="sm" />
            Uganda MoMo
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Fast Payouts
          </span>
        </div>

      </div>
    </div>
  );
};
