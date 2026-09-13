import React from 'react';

export const AnimatedCryptoBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle glowing ambient mesh orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '7s' }}></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '9s' }}></div>

      {/* Modern Grid Line overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15"></div>
    </div>
  );
};
