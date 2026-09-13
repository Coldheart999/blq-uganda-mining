import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MtnLogo: React.FC<LogoProps> = ({ variant = 'full', size = 'md', className = '' }) => {
  const heightClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  };

  if (variant === 'icon') {
    return (
      <div className={`relative ${heightClasses[size]} aspect-square shrink-0 rounded-xl bg-[#FFCC00] flex items-center justify-center p-1 border border-amber-400/50 shadow-md ${className}`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="40" height="40" rx="8" fill="#FFCC00" />
          <ellipse cx="20" cy="20" rx="16" ry="11" stroke="#002B49" strokeWidth="3" fill="#FFCC00" />
          <text x="20" y="25" fontSize="13" fontWeight="900" fontFamily="Arial Black, Arial, sans-serif" textAnchor="middle" fill="#002B49" letterSpacing="-0.5">MTN</text>
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative ${heightClasses[size]} shrink-0 rounded-xl bg-[#FFCC00] flex items-center justify-center px-2 py-1 border border-amber-400/60 shadow-md ${className}`}>
      <svg viewBox="0 0 130 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
        <rect width="130" height="44" rx="8" fill="#FFCC00" />
        {/* MTN Oval */}
        <ellipse cx="40" cy="22" rx="30" ry="16" stroke="#002B49" strokeWidth="3.5" fill="#FFCC00" />
        <text x="40" y="28" fontSize="17" fontWeight="900" fontFamily="Arial Black, Arial, sans-serif" textAnchor="middle" fill="#002B49" letterSpacing="-0.5">MTN</text>
        {/* MoMo Badge */}
        <rect x="80" y="10" width="42" height="24" rx="5" fill="#002B49" />
        <text x="101" y="26" fontSize="11" fontWeight="800" fontFamily="Arial, sans-serif" textAnchor="middle" fill="#FFCC00">MoMo</text>
      </svg>
    </div>
  );
};

export const AirtelLogo: React.FC<LogoProps> = ({ variant = 'full', size = 'md', className = '' }) => {
  const heightClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  };

  if (variant === 'icon') {
    return (
      <div className={`relative ${heightClasses[size]} aspect-square shrink-0 rounded-xl bg-[#E40000] flex items-center justify-center p-1 border border-rose-500/50 shadow-md ${className}`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="40" height="40" rx="8" fill="#E40000" />
          <path d="M10 28C10 18 15 10 25 10C29 10 31 12 30 14C28 16 23 17 19 19C15 21 14 28 14 28H10Z" fill="#FFFFFF" />
          <circle cx="26" cy="24" r="3.5" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative ${heightClasses[size]} shrink-0 rounded-xl bg-[#E40000] flex items-center justify-center px-2 py-1 border border-rose-500/60 shadow-md ${className}`}>
      <svg viewBox="0 0 135 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
        <rect width="135" height="44" rx="8" fill="#E40000" />
        {/* Airtel Ribbon Logo Mark */}
        <path d="M12 32C12 20 18 11 29 11C33.5 11 35.5 13.5 34 15.5C31.5 18.5 26.5 19 22 21.5C17.5 24 16 32 16 32H12Z" fill="#FFFFFF" />
        <circle cx="30" cy="27" r="3.5" fill="#FFFFFF" />
        {/* Airtel Money Branding */}
        <text x="78" y="22" fontSize="14" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" fill="#FFFFFF" letterSpacing="-0.3">airtel</text>
        <text x="78" y="34" fontSize="10" fontWeight="700" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" fill="#FFFFFF" letterSpacing="0.8">MONEY</text>
      </svg>
    </div>
  );
};
