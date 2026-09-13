import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MtnLogo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className={`relative ${sizeClasses[size]} shrink-0 rounded-xl bg-[#FFCC00] flex items-center justify-center p-1 shadow-md border border-amber-300/40 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="48" height="48" rx="10" fill="#FFCC00" />
        <ellipse cx="24" cy="24" rx="20" ry="13" stroke="#000000" strokeWidth="3" fill="none" />
        <text x="24" y="29" fontSize="15" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" textAnchor="middle" fill="#000000" letterSpacing="-0.5">MTN</text>
      </svg>
    </div>
  );
};

export const AirtelLogo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className={`relative ${sizeClasses[size]} shrink-0 rounded-xl bg-[#E60000] flex items-center justify-center p-1 shadow-md border border-rose-400/40 ${className}`}>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="48" height="48" rx="10" fill="#E60000" />
        <path d="M12 32C12 20 18 12 30 12C36 12 38 15 36 17C33 20 28 20 24 23C20 26 18 32 18 32H12Z" fill="#FFFFFF" />
        <circle cx="32" cy="28" r="4" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
