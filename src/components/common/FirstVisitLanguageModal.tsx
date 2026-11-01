import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import type { SupportedLanguage } from '../../i18n/types';
import { Sparkles, Check, Globe } from 'lucide-react';
import { modalBackdropVariants, modalDialogVariants } from '../animation/motionVariants';

export const FirstVisitLanguageModal: React.FC = () => {
  const { showLanguageModal, confirmInitialLanguage, language: currentLang } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(currentLang || 'en');

  const OPTIONS: Array<{
    id: SupportedLanguage;
    title: string;
    subtitle: string;
    badge: string;
    scriptSample: string;
  }> = [
    {
      id: 'en',
      title: 'English',
      subtitle: 'Celebrate in English',
      badge: 'Global Edition',
      scriptSample: 'Happy Diwali & Festive Greetings',
    },
    {
      id: 'hi',
      title: 'हिन्दी',
      subtitle: 'अपनी भाषा में त्योहार मनाएं',
      badge: 'मातृभाषा संस्करण',
      scriptSample: 'शुभ दीपावली व पावन मंगलकामनाएं',
    },
    {
      id: 'hinglish',
      title: 'Hinglish',
      subtitle: 'Apni language mein celebrate karein',
      badge: 'Conversational Style',
      scriptSample: 'Diwali ki dher saari shubhkamnayein',
    },
  ];

  const handleContinue = () => {
    confirmInitialLanguage(selectedLang);
  };

  return (
    <AnimatePresence>
      {showLanguageModal && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={modalBackdropVariants}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-deep/80 backdrop-blur-md"
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={modalDialogVariants}
            className="relative w-full max-w-lg rounded-3xl bg-[#FAF7F0] border-2 border-[#F2D98B]/50 shadow-2xl p-6 sm:p-8 overflow-hidden text-brand-dark"
            role="dialog"
            aria-modal="true"
            aria-labelledby="language-selection-title"
          >
          {/* Subtle Ambient Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-brand-gold/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-brand-purple/20 blur-3xl pointer-events-none" />

          {/* Header Badge */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24113D] text-[#F2D98B] border border-[#F2D98B]/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={13} className="text-[#F2D98B]" />
              <span>Festive Experience</span>
            </div>

            <h2 id="language-selection-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#24113D] tracking-tight">
              Welcome to FestiveWala
            </h2>

            <p className="text-xs sm:text-sm text-brand-dark/75 max-w-sm mx-auto leading-relaxed">
              Choose your preferred language to celebrate your way.
            </p>
          </div>

          {/* Three Language Selection Cards */}
          <div className="mt-6 space-y-3" role="radiogroup" aria-label="Choose your preferred language">
            {OPTIONS.map((option) => {
              const isSelected = selectedLang === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedLang(option.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#24113D] ring-2 ring-[#24113D]/20 shadow-md scale-[1.01]'
                      : 'bg-white/60 border-brand-gold/30 hover:border-brand-gold hover:bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-colors mt-0.5 ${
                        isSelected
                          ? 'bg-[#24113D] text-[#F2D98B]'
                          : 'bg-brand-gold/15 text-brand-deep'
                      }`}
                    >
                      <Globe size={18} />
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base sm:text-lg font-bold text-[#24113D]">
                          {option.title}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-light text-brand-deep border border-brand-gold/25">
                          {option.badge}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-brand-dark/70">
                        {option.subtitle}
                      </p>
                      <p className="text-[11px] text-brand-gold-dark italic font-serif">
                        "{option.scriptSample}"
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-[#24113D] border-[#24113D] text-[#F2D98B]'
                        : 'border-brand-gold/50 bg-transparent text-transparent'
                    }`}
                  >
                    <Check size={14} className={isSelected ? 'opacity-100' : 'opacity-0'} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className="mt-7">
            <button
              type="button"
              onClick={handleContinue}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#24113D] via-[#361259] to-[#24113D] text-[#F2D98B] font-bold text-sm tracking-wide shadow-lg hover:shadow-xl active:scale-[0.99] transition-all border border-[#F2D98B]/30 flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <Sparkles size={16} />
            </button>
            <p className="text-[11px] text-center text-brand-dark/50 mt-2">
              You can change your language anytime from the top bar.
            </p>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  );
};

