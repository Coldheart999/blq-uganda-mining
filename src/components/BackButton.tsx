import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, label = 'Back' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-700 transition-all"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
};
