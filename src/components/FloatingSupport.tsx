import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';

export const FloatingSupport: React.FC = () => {
  const handleOpenWhatsApp = () => {
    // Open WhatsApp support link (replace number with user's support line if needed)
    window.open('https://wa.me/256789123456?text=Hello%20BLQ%20Support,%20I%20need%20help%20with%20my%20deposit/account', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleOpenWhatsApp}
        className="flex items-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-full shadow-2xl transition-all active:scale-95 group border border-emerald-400/50"
      >
        <MessageCircle className="w-5 h-5 fill-slate-950" />
        <span className="hidden sm:inline">WhatsApp Support</span>
        <span className="w-2 h-2 rounded-full bg-emerald-950 animate-ping"></span>
      </button>
    </div>
  );
};
