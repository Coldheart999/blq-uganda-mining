import React, { useState } from 'react';
import { BackButton } from './BackButton';
import { HelpCircle, ChevronDown, X, Sparkles, ShieldCheck, MessageCircle } from 'lucide-react';
import { BlqLogo } from './BlqLogo';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What is the minimum deposit required to start mining?",
    answer: "The minimum deposit amount is UGX 10,000 via Airtel Money or MTN Mobile Money Uganda. Deposited funds reflect in your account balance instantly once verified by our system."
  },
  {
    question: "What is the minimum withdrawal limit and how fast are payouts?",
    answer: "The minimum withdrawal limit is UGX 3,000. Withdrawals are sent directly to your Mobile Money account (MTN or Airtel) within 5 to 15 minutes after approval."
  },
  {
    question: "How does the UGX 15,000 Referral Challenge work?",
    answer: "Once you activate your first mining rig, your personal referral link is unlocked. Share your link with friends—when an invited friend registers and activates a miner, you receive an instant cash bonus of UGX 15,000 credited directly to your withdrawable balance!"
  },
  {
    question: "When are daily mining profits distributed?",
    answer: "Mining packages generate daily returns that accumulate continuously 24/7. Payouts are credited every 24 hours directly into your account balance."
  },
  {
    question: "Is my investment safe on BLQ Mining Uganda?",
    answer: "Yes! BLQ operates genuine ASIC mining hardware pool infrastructure with guaranteed daily contract yields, low 2.5% withdrawal fees, and instant Mobile Money settlement."
  }
];

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#182132] via-[#101625] to-[#0A0E17] border-2 border-amber-500/40 rounded-3xl shadow-2xl p-5 sm:p-7 scrollbar-thin">
        
        {/* Ambient Corner Glow */}
        <div className="absolute -top-12 -left-12 w-28 h-28 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <BackButton onClick={onClose} />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <HelpCircle className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/15 text-amber-300 rounded-full text-[10px] font-mono font-bold mb-0.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Investor Guide</span>
            </div>
            <h3 className="text-lg font-black text-white">Frequently Asked Questions</h3>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-2.5 pt-1">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen 
                    ? 'bg-slate-950 border-amber-500/50 shadow-md' 
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white focus:outline-none"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-3.5 pb-4 pt-1 text-xs text-slate-300 border-t border-slate-900 leading-relaxed font-mono">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Telegram Direct Help CTA */}
        <div className="mt-5 p-3.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-5 h-5 text-cyan-400 shrink-0" />
            <span className="text-xs text-slate-300">Still have questions? Join our Telegram group.</span>
          </div>
          <a
            href="https://t.me/BLQ_UG"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors shrink-0"
          >
            Ask Support
          </a>
        </div>

      </div>
    </div>
  );
};
