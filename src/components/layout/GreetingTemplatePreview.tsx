import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { PrimaryButton } from '../common/PrimaryButton';
import { useLanguage } from '../../hooks/useLanguage';
import { Sparkles, Heart, Share2, Download } from 'lucide-react';

export const GreetingTemplatePreview: React.FC = () => {
  const { t, isHindi } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-10 sm:py-14 md:py-18 lg:py-24 bg-brand-ivory relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t.templatePreview.badge}
          title={t.templatePreview.title}
          subtitle={t.templatePreview.subtitle}
        />

        <div className="mt-8 sm:mt-12 flex flex-col items-center">
          {/* Card Mockup Showcase Frame */}
          <motion.div
            initial={shouldReduceMotion ? {} : { y: 16, opacity: 0 }}
            whileInView={shouldReduceMotion ? {} : { y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg relative group"
          >
            {/* Ambient card shadow glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold/30 via-brand-champagne/40 to-brand-gold/30 rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition duration-500" />

            {/* Main Greeting Card Body */}
            <div className="relative rounded-2xl bg-white p-4 sm:p-8 shadow-card-luxury border border-brand-gold/40 text-center">
              {/* Dual Inset Gold Border */}
              <div className="rounded-xl border border-brand-gold/30 p-4 sm:p-7 relative bg-gradient-to-b from-[#FFFDF9] to-[#FAF6EE]">
                {/* 4 Corner Floral Rosettes */}
                <div className="absolute top-2 left-2 text-brand-gold opacity-60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" fill="#D4AF37" />
                    <circle cx="12" cy="12" r="8" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="2 2" />
                  </svg>
                </div>
                <div className="absolute top-2 right-2 text-brand-gold opacity-60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" fill="#D4AF37" />
                    <circle cx="12" cy="12" r="8" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="2 2" />
                  </svg>
                </div>
                <div className="absolute bottom-2 left-2 text-brand-gold opacity-60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" fill="#D4AF37" />
                    <circle cx="12" cy="12" r="8" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="2 2" />
                  </svg>
                </div>
                <div className="absolute bottom-2 right-2 text-brand-gold opacity-60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" fill="#D4AF37" />
                    <circle cx="12" cy="12" r="8" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="2 2" />
                  </svg>
                </div>

                {/* Foil Embossed Top Tag */}
                <div className="mb-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-sans uppercase tracking-widest-luxury font-bold bg-brand-light text-brand-royal border border-brand-gold/30">
                    {t.templatePreview.goldFoilTag}
                  </span>
                </div>

                {/* Hand-drawn Lotus & Diya SVG Emblem */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3">
                  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-brand-gold drop-shadow-sm">
                    <path
                      d="M32 10C32 10 26 22 26 30C26 33.3 28.7 36 32 36C35.3 36 38 33.3 38 30C38 22 32 10 32 10Z"
                      fill="url(#cardGoldGrad2)"
                    />
                    <path
                      d="M20 22C20 22 18 28 20 33C21 35.5 24 37 27 36C27 32 23 27 20 22Z"
                      fill="#D4AF37"
                      opacity="0.8"
                    />
                    <path
                      d="M44 22C44 22 46 28 44 33C43 35.5 40 37 37 36C37 32 41 27 44 22Z"
                      fill="#D4AF37"
                      opacity="0.8"
                    />
                    <path
                      d="M14 38C14 48 22 52 32 52C42 52 50 48 50 38C48 39 40 40 32 40C24 40 16 39 14 38Z"
                      fill="#B8860B"
                    />
                    <circle cx="32" cy="28" r="2.5" fill="#FFFFFF" />
                    <defs>
                      <linearGradient id="cardGoldGrad2" x1="26" y1="10" x2="38" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F2D98B" />
                        <stop offset="0.6" stopColor="#D4AF37" />
                        <stop offset="1" stopColor="#A67C00" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Card Title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-deep tracking-tight">
                  {t.templatePreview.cardTitle}
                </h3>

                <div className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto my-2.5" />

                {/* Card Message */}
                <p className="font-serif italic text-xs sm:text-base text-brand-dark/90 leading-relaxed max-w-sm mx-auto my-3">
                  "{t.templatePreview.cardGreeting}"
                </p>

                {/* Personalized Signature Section */}
                <div className="pt-3 border-t border-brand-gold/20 flex flex-col items-center space-y-0.5">
                  <span className="text-[10px] font-sans uppercase tracking-widest-luxury text-brand-muted">
                    {t.templatePreview.personalizedFor}
                  </span>
                  <span className="font-display text-xs sm:text-sm font-semibold text-brand-royal">
                    {t.templatePreview.senderSample}
                  </span>
                </div>
              </div>

              {/* Action Toolbar on Card (Touch-Optimized) */}
              <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-brand-gold/15 text-xs text-brand-muted font-sans">
                <div className="flex items-center gap-1 sm:gap-3">
                  <button
                    type="button"
                    className="min-h-[44px] min-w-[44px] px-2.5 flex items-center gap-1.5 hover:text-brand-deep active:scale-95 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold rounded-lg"
                    aria-label={isHindi ? 'पसंद' : 'Save'}
                  >
                    <Heart size={15} className="text-brand-gold" />
                    <span className="text-xs">{isHindi ? 'पसंद' : 'Save'}</span>
                  </button>
                  <button
                    type="button"
                    className="min-h-[44px] min-w-[44px] px-2.5 flex items-center gap-1.5 hover:text-brand-deep active:scale-95 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold rounded-lg"
                    aria-label={isHindi ? 'शेयर' : 'Share'}
                  >
                    <Share2 size={15} className="text-brand-gold" />
                    <span className="text-xs">{isHindi ? 'शेयर' : 'Share'}</span>
                  </button>
                  <button
                    type="button"
                    className="min-h-[44px] min-w-[44px] px-2.5 flex items-center gap-1.5 hover:text-brand-deep active:scale-95 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold rounded-lg"
                    aria-label={isHindi ? 'डाउनलोड' : 'Download'}
                  >
                    <Download size={15} className="text-brand-gold" />
                    <span className="text-xs">{isHindi ? 'डाउनलोड' : 'Download'}</span>
                  </button>
                </div>

                <span className="text-[10px] sm:text-[11px] text-brand-gold font-semibold uppercase tracking-wider">
                  {t.templatePreview.cardCategory}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Primary Action to Customize */}
          <div className="mt-6 sm:mt-8 w-full sm:w-auto text-center">
            <PrimaryButton
              to="/greeting-cards"
              size="md"
              variant="royal"
              icon={<Sparkles size={16} className="text-brand-gold-light" />}
              className="w-full sm:w-auto"
            >
              {t.templatePreview.cta}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};
