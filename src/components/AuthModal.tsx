import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Lock, CheckCircle2, ShieldCheck, Smartphone, X, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginWithPhone } = useApp();
  
  const [step, setStep] = useState<'phone' | 'otp' | 'password'>('phone');
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('0771234567');
  const [otpCode, setOtpCode] = useState<string>('');
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [otpSentMsg, setOtpSentMsg] = useState<string>('');

  if (!isOpen) return null;

  // Step 1: Send OTP to Ugandan Phone Number
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanPhone = phone.trim();
    // Validate Ugandan Phone Formats (MTN: 077/078/076, Airtel: 070/075/074)
    if (!/^(07\d{8}|\+2567\d{8})$/.test(cleanPhone)) {
      setError('Please enter a valid Ugandan mobile number (e.g. 0771234567 or 0751234567)');
      return;
    }

    if (isLoginMode) {
      // Direct password login mode
      setStep('password');
      return;
    }

    // Generate random 6-digit OTP code for instant testing & simulation
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpSentMsg(`OTP code sent via SMS to ${cleanPhone}. (Test OTP Code: ${code})`);
    setStep('otp');
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otpCode !== generatedOtp && otpCode !== '123456') {
      setError('Invalid OTP code. Please enter the 6-digit code shown above or 123456');
      return;
    }

    setStep('password');
  };

  // Step 3: Complete Password & Login / Sign Up
  const handleCompleteAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    if (!isLoginMode && password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    // Process user login or creation via AppContext
    const fullFormattedPhone = phone.startsWith('+256') ? phone : `+256${phone.startsWith('0') ? phone.slice(1) : phone}`;
    loginWithPhone(fullFormattedPhone, fullName.trim() || undefined);
    
    // Reset state & close
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#121824] to-[#0D121D] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 p-0.5 mb-3 shadow-lg shadow-emerald-950/50">
            <div className="w-full h-full bg-[#0B0E14] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            {isLoginMode ? 'Welcome Back to BLQ' : 'Join BLQ Mining Pool'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Uganda\'s premier cloud crypto mining platform
          </p>
        </div>

        {/* Step Indicator Pill */}
        {!isLoginMode && (
          <div className="flex items-center justify-between mb-6 bg-slate-900/80 p-2 rounded-xl border border-slate-800 text-xs font-mono">
            <div className={`flex items-center gap-1 ${step === 'phone' ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
              <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">1</span>
              Phone
            </div>
            <ArrowRight className="w-3 h-3 text-slate-700" />
            <div className={`flex items-center gap-1 ${step === 'otp' ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
              <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">2</span>
              OTP
            </div>
            <ArrowRight className="w-3 h-3 text-slate-700" />
            <div className={`flex items-center gap-1 ${step === 'password' ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
              <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">3</span>
              Password
            </div>
          </div>
        )}

        {/* Error Notice */}
        {error && (
          <div className="mb-4 p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Phone Input Form */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Mobile Money Phone Number (MTN / Airtel)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0771234567 or 0751234567"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Enter your registered MTN or Airtel phone number to receive your OTP code.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-emerald-950/50 transition-all active:scale-[0.98]"
            >
              {isLoginMode ? 'Continue to Login' : 'Send Verification OTP'}
            </button>
          </form>
        )}

        {/* STEP 2: OTP Verification Form */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-emerald-300 text-xs">
              <p className="font-semibold flex items-center gap-1.5 mb-1">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                {otpSentMsg}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Enter 6-Digit Verification Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="e.g. 123456"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-emerald-400 font-mono font-bold text-center tracking-widest text-lg focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-1/3 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-xl transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all"
              >
                Verify & Next
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Set Password Form */}
        {step === 'password' && (
          <form onSubmit={handleCompleteAuth} className="space-y-4">
            {!isLoginMode && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Full Name / Investor Alias (Optional)
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Mukasa David"
                  className="w-full px-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Account Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            {!isLoginMode && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-emerald-950/50 transition-all"
            >
              {isLoginMode ? 'Login Now' : 'Create Account & Access Dashboard'}
            </button>
          </form>
        )}

        {/* Toggle Login vs Register */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <button
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setStep('phone');
              setError('');
            }}
            className="text-xs text-amber-400 hover:underline font-medium"
          >
            {isLoginMode
              ? "Don't have an account? Sign up with Phone OTP"
              : 'Already have an account? Login here'}
          </button>
        </div>

      </div>
    </div>
  );
};
