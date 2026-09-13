import React from 'react';

interface BlqLogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  showSubtitle?: boolean;
}

export const BlqLogo: React.FC<BlqLogoProps> = ({ 
  size = 'md', 
  onClick,
  showSubtitle = true 
}) => {
  const iconBoxSizes = {
    sm: 'w-9 h-9',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div 
      onClick={onClick}
      className="flex items-center space-x-3 cursor-pointer select-none group"
    >
      {/* Authentic BLQ Uganda Emblem Icon */}
      <div className={`relative ${iconBoxSizes[size]} rounded-2xl bg-gradient-to-br from-[#1E2738] via-[#121927] to-[#0A0F1A] border border-amber-400/40 p-0.5 shadow-lg shadow-amber-500/20 group-hover:border-amber-400 group-hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden`}>
        
        {/* Subtle Ugandan National Flag Ribbon Accent (Top Right) */}
        <div className="absolute top-0 right-0 w-3.5 h-3.5 overflow-hidden pointer-events-none z-10">
          <div className="w-5 h-1 bg-black rotate-45 translate-x-0.5 -translate-y-0.5"></div>
          <div className="w-5 h-1 bg-amber-400 rotate-45 translate-x-0.5 translate-y-0"></div>
          <div className="w-5 h-1 bg-red-600 rotate-45 translate-x-0.5 translate-y-0.5"></div>
        </div>

        {/* Inner Dark Core */}
        <div className="w-full h-full rounded-[14px] bg-[#0A0E17] flex items-center justify-center relative p-1.5">
          
          {/* Custom SVG Emblem: Mining Hash Rig + B Symbol */}
          <svg 
            viewBox="0 0 36 36" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full transform group-hover:rotate-6 transition-transform"
          >
            {/* Hexagon Mining Node */}
            <path 
              d="M18 3L31 10.5V25.5L18 33L5 25.5V10.5L18 3Z" 
              stroke="url(#blq_grad)" 
              strokeWidth="2" 
              strokeLinejoin="round"
            />
            {/* Dynamic Mining Node Dots */}
            <circle cx="18" cy="3" r="2" fill="#F59E0B" />
            <circle cx="31" cy="10.5" r="2" fill="#10B981" />
            <circle cx="31" cy="25.5" r="2" fill="#06B6D4" />
            <circle cx="18" cy="33" r="2" fill="#F59E0B" />
            <circle cx="5" cy="25.5" r="2" fill="#10B981" />
            <circle cx="5" cy="10.5" r="2" fill="#06B6D4" />

            {/* Stylized 'B' Core */}
            <path 
              d="M13 10H20C22.2091 10 24 11.7909 24 14C24 15.5 23.2 16.8 22 17.5C23.5 18.2 24.5 19.7 24.5 21.5C24.5 23.9853 22.4853 26 20 26H13V10Z" 
              fill="url(#blq_core_grad)" 
            />
            <path 
              d="M16 13H19C20.1046 13 21 13.8954 21 15C21 16.1046 20.1046 17 19 17H16V13Z" 
              fill="#070A10" 
            />
            <path 
              d="M16 19H19.5C20.8807 19 22 20.1193 22 21.5C22 22.8807 20.8807 24 19.5 24H16V19Z" 
              fill="#070A10" 
            />

            <defs>
              <linearGradient id="blq_grad" x1="5" y1="3" x2="31" y2="33" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F59E0B" />
                <stop offset="0.5" stopColor="#10B981" />
                <stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
              <linearGradient id="blq_core_grad" x1="13" y1="10" x2="24.5" y2="26" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FBBF24" />
                <stop offset="1" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      <div>
        <div className="flex items-center space-x-1.5">
          <span className={`font-black ${titleSizes[size]} tracking-tight bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent`}>
            BLQ
          </span>

          {/* Micro Uganda Badge */}
          <div className="flex items-center space-x-1 bg-slate-900 border border-amber-500/30 px-1.5 py-0.5 rounded-md text-[10px] font-extrabold text-amber-400 shadow-sm">
            <div className="flex h-2.5 w-3.5 rounded-[1px] overflow-hidden border border-slate-700">
              <div className="w-1/3 h-full bg-black"></div>
              <div className="w-1/3 h-full bg-amber-400"></div>
              <div className="w-1/3 h-full bg-red-600"></div>
            </div>
            <span>UGANDA</span>
          </div>
        </div>

        {showSubtitle && (
          <p className="text-[10px] font-medium text-slate-400 tracking-wide uppercase">
            Official Mobile Mining Pool
          </p>
        )}
      </div>
    </div>
  );
};
