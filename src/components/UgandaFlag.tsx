import React from 'react';

interface UgandaFlagProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UgandaFlag: React.FC<UgandaFlagProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-3.5',
    md: 'w-6 h-4',
    lg: 'w-8 h-5'
  };

  return (
    <div className={`relative inline-block overflow-hidden rounded-[2px] border border-slate-700 shadow-sm shrink-0 ${sizeClasses[size]} ${className}`}>
      <svg 
        viewBox="0 0 1200 800" 
        className="w-full h-full object-cover" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 6 Official Equal Horizontal Stripes: Black, Yellow, Red, Black, Yellow, Red */}
        <rect width="1200" height="133.33" y="0" fill="#000000" />
        <rect width="1200" height="133.33" y="133.33" fill="#FCD116" />
        <rect width="1200" height="133.33" y="266.66" fill="#D21034" />
        <rect width="1200" height="133.33" y="400.00" fill="#000000" />
        <rect width="1200" height="133.33" y="533.33" fill="#FCD116" />
        <rect width="1200" height="133.33" y="666.66" fill="#D21034" />

        {/* Center White Disc */}
        <circle cx="600" cy="400" r="160" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

        {/* Crested Crane Silhouette Details */}
        {/* Legs & Ground */}
        <path d="M580 480 L585 520 M595 480 L605 520" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
        {/* Body */}
        <ellipse cx="590" cy="450" rx="35" ry="25" fill="#555555" />
        <path d="M605 440 Q630 435 635 450 Q620 465 590 460" fill="#000000" />
        {/* Wing Feather Accents (Red & White) */}
        <path d="M565 445 Q550 455 580 460" fill="#D21034" />
        <path d="M570 440 Q560 450 585 452" fill="#FFFFFF" />
        {/* Neck S-Curve */}
        <path d="M610 440 Q635 410 620 370" fill="none" stroke="#000000" strokeWidth="12" strokeLinecap="round" />
        {/* Head */}
        <circle cx="618" cy="365" r="10" fill="#000000" />
        <path d="M625 365 L640 368 L625 372 Z" fill="#FCD116" />
        {/* Crown (Crest of Feathers) */}
        <path d="M612 355 L618 340 M616 354 L624 340 M620 356 L630 344" stroke="#FCD116" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
};
