import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What is the minimum deposit required to start mining?",
    answer: "The minimum deposit amount is UGX 10,000 via Airtel Money Uganda. Deposited funds reflect in your account balance instantly once verified."
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

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-[#0C111C]/90 backdrop-blur-md border border-slate-800/80 rounded-3xl p-5 sm:p-7 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <HelpCircle className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">Frequently Asked Questions</h3>
            <p className="text-[11px] text-slate-400 font-mono">Quick guide for BLQ Uganda Investors</p>
          </div>
        </div>
        <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
          24/7 Help
        </span>
      </div>

      {/* Accordion List */}
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
                className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white focus:outline-none"
              >
                <span className="leading-snug">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-3.5 pb-4 pt-1 sm:px-4 text-xs text-slate-300 border-t border-slate-900 leading-relaxed font-mono">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
