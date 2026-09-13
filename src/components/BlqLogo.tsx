import React, { useState } from 'react';
import { UgandaFlag } from './UgandaFlag';

interface BlqLogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  showSubtitle?: boolean;
}

const RANDOM_EMOJIS = ['💖', '❤️', '✨', '🌟', '🥰', '💎', '🚀', '🔥', '🎉', '👑', '💸', '🤑', '🍀', '💐', '🌸', '💫', '🦄', '🍰', '🍭', '🍯', '🏆', '🌈', '🌹', '🥂', '⚡', '💰'];

const CUTE_MESSAGES = [
  "You are doing amazing today! 💖",
  "Thank you for being a star BLQ investor! 🌟",
  "Sending you endless love and crypto gains! 💕",
  "You make BLQ Uganda shine bright! ✨",
  "We appreciate you so much! 🥰",
  "Keep glowing and growing your wealth! 💎",
  "Wishing you a blessed day ahead! 💖",
  "You are our favorite investor! 👑",
  "May your mining profits multiply today! 🚀",
  "Your financial freedom journey is unstoppable! 🔥",
  "Smile! Great profits are on their way to you! 🌸",
  "You've got that investor magic touch! ✨",
  "Sending you hugs, happiness and high hash rate! 🤗",
  "Big things are coming your way! 💰",
  "You are creating generational wealth! 🏆",
  "Uganda's top investor right here! 🇺🇬✨",
  "Stay awesome, stay winning! 💫",
  "Every small step brings you closer to your dreams! 🌟",
  "May your wallet overflow with blessings! 💸",
  "You bring positive energy to BLQ! 🌈",
  "Keep that beautiful smile on your face! 💖",
  "Today is going to be a lucky day for you! 🍀",
  "Smart investors make smart moves like you! 🧠💡",
  "We are so grateful to have you with us! 💐",
  "To the moon and beyond! 🚀🌙",
  "You are a true champion! 🥇",
  "Your dedication will pay off in abundance! 🍯",
  "Good vibes, positive minds, big profits! 🥂",
  "Never forget how capable and powerful you are! ⚡",
  "Sending you virtual roses and good luck! 🌹"
];

export const BlqLogo: React.FC<BlqLogoProps> = ({ 
  size = 'md', 
  onClick,
  showSubtitle = true 
}) => {
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; emoji: string; left: number; speed: number }>>([]);

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

  const handleLogoClick = (e: React.MouseEvent) => {
    if (onClick) onClick();

    // Trigger random sweet message
    const randomMsg = CUTE_MESSAGES[Math.floor(Math.random() * CUTE_MESSAGES.length)];
    setActiveMessage(randomMsg);

    // Generate random particle emojis
    const newParticles = Array.from({ length: 7 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      emoji: RANDOM_EMOJIS[Math.floor(Math.random() * RANDOM_EMOJIS.length)],
      left: Math.random() * 120 - 60,
      speed: Math.random() * 0.5 + 0.8
    }));
    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setActiveMessage(null);
    }, 3500);

    setTimeout(() => {
      setParticles([]);
    }, 2200);
  };

  return (
    <div className="relative inline-block">
      
      {/* Floating Random Emoji Particles Animation */}
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute -top-4 text-lg pointer-events-none z-50 select-none animate-bounce"
          style={{
            transform: `translate(${p.left}px, -40px) scale(1.4)`,
            transition: `all ${p.speed}s cubic-bezier(0.25, 1, 0.5, 1)`,
            opacity: 0.95
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Cute Sweet Popover Toast */}
      {activeMessage && (
        <div className="absolute -bottom-11 left-0 z-50 whitespace-nowrap px-3.5 py-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 text-slate-950 font-black text-xs rounded-full shadow-2xl animate-bounce flex items-center gap-1.5 border border-white/50 ring-2 ring-amber-400/50">
          <span>{activeMessage}</span>
        </div>
      )}

      <div 
        onClick={handleLogoClick}
        className="flex items-center space-x-3 cursor-pointer select-none group"
      >
        {/* Authentic BLQ Uganda Emblem Icon */}
        <div className={`relative ${iconBoxSizes[size]} rounded-2xl bg-gradient-to-br from-[#1E2738] via-[#121927] to-[#0A0F1A] border border-amber-400/40 p-0.5 shadow-lg shadow-amber-500/20 group-hover:border-amber-400 group-hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden`}>
          
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

            {/* Authentic Uganda Flag Badge */}
            <div className="flex items-center space-x-1 bg-slate-900 border border-amber-500/30 px-1.5 py-0.5 rounded-md text-[10px] font-extrabold text-amber-400 shadow-sm">
              <UgandaFlag size="sm" />
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
    </div>
  );
};
