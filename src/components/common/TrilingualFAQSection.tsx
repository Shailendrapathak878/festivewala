import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import type { FestivalFAQ } from '../../data/festivals/types';

interface TrilingualFAQSectionProps {
  faqs: FestivalFAQ[];
  festivalNameEn: string;
  festivalNameHi: string;
  initialLang?: 'en' | 'hi' | 'hinglish';
}

export const TrilingualFAQSection: React.FC<TrilingualFAQSectionProps> = ({
  faqs,
  festivalNameEn,
  festivalNameHi,
  initialLang = 'en',
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'en' | 'hi' | 'hinglish'>(initialLang);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  if (!faqs || faqs.length === 0) return null;

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getQuestion = (faq: FestivalFAQ) => {
    if (selectedFormat === 'hi') return faq.questionHi;
    if (selectedFormat === 'hinglish') return faq.questionHinglish;
    return faq.questionEn;
  };

  const getAnswer = (faq: FestivalFAQ) => {
    if (selectedFormat === 'hi') return faq.answerHi;
    if (selectedFormat === 'hinglish') return faq.answerHinglish;
    return faq.answerEn;
  };

  return (
    <section className="py-12 bg-white rounded-3xl border border-brand-gold/30 shadow-sm p-6 sm:p-10 space-y-8">
      {/* Header with Title and Language Format Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-gold/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-deep text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle size={14} className="text-brand-gold-dark" />
            <span>
              {selectedFormat === 'hi'
                ? 'प्रायः पूछे जाने वाले प्रश्न'
                : selectedFormat === 'hinglish'
                  ? 'Log Aksar Kya Poochte Hain'
                  : 'Frequently Asked Questions & Answers'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-deep">
            {selectedFormat === 'hi'
              ? `${festivalNameHi} — महत्वपूर्ण प्रश्नोत्तरी`
              : selectedFormat === 'hinglish'
                ? `${festivalNameEn} FAQs in Hinglish`
                : `${festivalNameEn} — Questions, Rituals & Answers`}
          </h2>
          <p className="text-sm text-brand-dark/70 font-sans mt-2 max-w-2xl">
            {selectedFormat === 'hi'
              ? 'मुहूर्त, पारंपरिक पूजन विधि, पकवान और सजावट से जुड़े वास्तविक प्रश्नों के प्रामाणिक उत्तर।'
              : selectedFormat === 'hinglish'
                ? 'Puja muhurat, vidhi, recipes aur decoration se jude common sawalon ke authentic answers.'
                : 'Verified answers covering auspicious dates, sacred rituals, authentic recipes, and festive celebration tips.'}
          </p>
        </div>

        {/* Trilingual Format Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-brand-ivory rounded-2xl border border-brand-gold/30 self-start md:self-auto flex-shrink-0">
          <button
            type="button"
            onClick={() => setSelectedFormat('en')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedFormat === 'en'
                ? 'bg-brand-deep text-brand-gold shadow-sm font-bold'
                : 'text-brand-dark/70 hover:text-brand-deep'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setSelectedFormat('hi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedFormat === 'hi'
                ? 'bg-brand-deep text-brand-gold shadow-sm font-bold'
                : 'text-brand-dark/70 hover:text-brand-deep'
            }`}
          >
            हिन्दी (Devanagari)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFormat('hinglish')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedFormat === 'hinglish'
                ? 'bg-brand-deep text-brand-gold shadow-sm font-bold'
                : 'text-brand-dark/70 hover:text-brand-deep'
            }`}
          >
            Hinglish (Roman)
          </button>
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = expandedIndex === index;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl transition-all border ${
                isOpen
                  ? 'bg-brand-ivory/60 border-brand-gold shadow-sm'
                  : 'bg-white border-brand-gold/20 hover:border-brand-gold/40'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full py-4 px-5 sm:px-6 flex items-center justify-between gap-4 text-left font-sans group"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="w-6 h-6 rounded-full bg-brand-gold/20 text-brand-deep font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand-gold group-hover:text-brand-deep transition-colors">
                    {index + 1}
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-brand-deep group-hover:text-brand-royal transition-colors">
                    {getQuestion(faq)}
                  </span>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-brand-gold/30 text-brand-deep' : 'text-brand-dark/50 group-hover:bg-brand-ivory'
                  }`}
                >
                  <ChevronDown size={18} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-brand-dark/85 font-sans leading-relaxed border-t border-brand-gold/15 mt-1">
                      <p>{getAnswer(faq)}</p>
                      {faq.category && (
                        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-brand-gold/10 text-brand-deep text-xs font-medium">
                          <Sparkles size={12} className="text-brand-gold-dark" />
                          <span className="capitalize">{faq.category} guide</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

