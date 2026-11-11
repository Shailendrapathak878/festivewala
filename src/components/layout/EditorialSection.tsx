import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { PrimaryButton } from '../common/PrimaryButton';
import { EDITORIAL_ARTICLES } from '../../data/editorial';
import { useLanguage } from '../../hooks/useLanguage';
import { BookOpen, X, Clock, ArrowRight, Sparkles } from 'lucide-react';
import type { EditorialArticle } from '../../data/types';

export const EditorialSection: React.FC = () => {
  const { isHindi } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [selectedArticle, setSelectedArticle] = useState<EditorialArticle | null>(null);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#FAF6EE] relative overflow-hidden border-t border-brand-gold/25" id="editorial">
      {/* Decorative side mandala motif */}
      <div
        className="absolute -right-24 top-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-mandala opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={isHindi ? 'सांस्कृतिक पत्रिका व दर्शन' : 'Cultural Journal & Lore'}
          title={isHindi ? 'आधुनिक उत्सवों की सुरुचिपूर्ण कला' : 'The Living Spirit of Indian Celebration'}
          subtitle={
            isHindi
              ? 'जहाँ सदियों पुरानी भारतीय परंपराएं समकालीन कला, विचार और मानवीय स्नेह से मिलती हैं'
              : 'Essays on ritual symbolism, threshold geometries, and the enduring beauty of mindful celebrations'
          }
        />

        {/* Editorial Pull Quote */}
        <div className="mt-8 sm:mt-12 max-w-3xl mx-auto text-center px-4 py-6 sm:py-7 rounded-2xl bg-white/80 border border-brand-gold/25 backdrop-blur-sm shadow-card-luxury">
          <span className="font-serif text-3xl sm:text-4xl text-brand-gold/50 leading-none select-none block mb-1">
            “
          </span>
          <blockquote className="font-serif italic text-sm sm:text-lg md:text-xl text-brand-deep leading-relaxed px-2 sm:px-6">
            {isHindi
              ? 'उत्सव केवल एक अवसर नहीं, बल्कि वह पावन सूत्र है जो हमारे रिश्तों, सांस्कृतिक गौरव और मानवीय स्नेह को दूरियों के पार भी जीवंत रखता है।'
              : 'True celebration is not merely marking an occasion; it is the poetic thread weaving affection across miles, bridging centuries of heritage with contemporary grace.'}
          </blockquote>
          <div className="w-10 sm:w-12 h-[1px] bg-brand-gold/40 mx-auto my-3" />
          <cite className="font-sans text-[10px] sm:text-xs uppercase tracking-widest-luxury font-bold text-brand-gold not-italic">
            {isHindi ? 'शैलेंद्र पाठक — संस्थापक, फेस्टिववाला' : 'Shailendra Pathak — Founder, FestiveWala'}
          </cite>
        </div>

        {/* 3 Quality Editorial Previews */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDITORIAL_ARTICLES.map((article) => (
            <motion.div
              key={article.id}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedArticle(article)}
              className="cursor-pointer rounded-2xl bg-white p-5 sm:p-7 border border-brand-gold/25 shadow-card-luxury hover:shadow-card-luxury-hover hover:border-brand-gold/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-sans uppercase tracking-widest-luxury font-bold bg-brand-light text-brand-royal border border-brand-gold/30">
                    {isHindi ? article.categoryHi : article.categoryEn}
                  </span>
                  <span className="text-[10px] text-brand-muted flex items-center gap-1">
                    <Clock size={11} className="text-brand-gold" />
                    <span>{isHindi ? article.readTimeHi : article.readTimeEn}</span>
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-deep tracking-tight group-hover:text-brand-royal transition-colors">
                  {isHindi ? article.titleHi : article.titleEn}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-brand-dark/75 leading-relaxed line-clamp-3">
                  {isHindi ? article.excerptHi : article.excerptEn}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-brand-gold/15 flex items-center justify-between text-xs font-semibold text-brand-gold group-hover:text-brand-deep transition-colors">
                <span className="flex items-center gap-1.5">
                  <BookOpen size={13} />
                  <span>{isHindi ? 'निबंध पढ़ें' : 'Read Article'}</span>
                </span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Link to Full Inspiration Page */}
        <div className="mt-10 sm:mt-12 text-center">
          <PrimaryButton
            to="/inspiration"
            size="md"
            variant="royal"
            icon={<Sparkles size={16} className="text-brand-gold" />}
            className="w-full sm:w-auto"
          >
            {isHindi ? 'सम्पूर्ण सांस्कृतिक दर्शन पढ़ें' : 'Explore Cultural Journal'}
          </PrimaryButton>
        </div>
      </div>

      {/* Article Detail Reading Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
          >
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 border border-brand-gold shadow-royal"
            >
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-brand-light text-brand-deep hover:bg-brand-light/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                aria-label="Close Article"
              >
                <X size={18} />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-sans uppercase tracking-widest-luxury font-bold bg-brand-light text-brand-royal border border-brand-gold/30">
                    {isHindi ? selectedArticle.categoryHi : selectedArticle.categoryEn}
                  </span>
                  <span className="text-xs text-brand-muted font-sans">
                    {isHindi ? selectedArticle.readTimeHi : selectedArticle.readTimeEn}
                  </span>
                </div>

                <h3 id="article-modal-title" className="font-display text-2xl sm:text-3xl font-bold text-brand-deep">
                  {isHindi ? selectedArticle.titleHi : selectedArticle.titleEn}
                </h3>

                <p className="font-serif italic text-base text-brand-gold font-medium">
                  {isHindi ? selectedArticle.subtitleHi : selectedArticle.subtitleEn}
                </p>

                <div className="w-12 h-[1px] bg-brand-gold/40 my-3" />

                <div className="space-y-3 font-sans text-sm sm:text-base text-brand-dark/85 leading-relaxed">
                  <p>{isHindi ? selectedArticle.excerptHi : selectedArticle.excerptEn}</p>
                  {(selectedArticle.quoteEn || selectedArticle.quoteHi) && (
                    <blockquote className="p-4 rounded-xl bg-brand-light/40 border-l-2 border-brand-gold font-serif italic text-brand-deep text-sm my-3">
                      "{isHindi ? selectedArticle.quoteHi : selectedArticle.quoteEn}"
                    </blockquote>
                  )}
                  <p>
                    {isHindi
                      ? 'फेस्टिववाला का यह संपादकीय भारतीय संस्कृति की समृद्ध विरासत को संजोने और नई पीढ़ी को इसके वास्तविक मर्म से अवगत कराने के उद्देश्य से लिखा गया है।'
                      : 'This FestiveWala editorial essay is curated to celebrate timeless Indian heritage and inspire contemporary digital connections with cultural depth.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-gold/20 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(null)}
                    className="min-h-[44px] px-5 py-2 rounded-full bg-brand-deep text-brand-champagne text-xs font-semibold hover:shadow-gold-glow transition-all"
                  >
                    {isHindi ? 'बंद करें' : 'Close'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
