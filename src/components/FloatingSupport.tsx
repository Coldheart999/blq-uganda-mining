import React from 'react';
import { Send } from 'lucide-react';

export const FloatingSupport: React.FC = () => {
  const handleOpenTelegram = () => {
    window.open('https://t.me/Robin_hood_project', '_blank');
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 z-40">
      <button
        onClick={handleOpenTelegram}
        className="flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs rounded-full shadow-2xl shadow-cyan-950/60 transition-all active:scale-95 border border-cyan-400/40 group"
      >
        <Send className="w-4 h-4 fill-white shrink-0 group-hover:translate-x-0.5 transition-transform" />
        <span className="hidden xs:inline sm:inline font-mono">Telegram Support</span>
        <span className="xs:hidden sm:hidden font-mono">Help</span>
        <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping shrink-0"></span>
      </button>
    </div>
  );
};
