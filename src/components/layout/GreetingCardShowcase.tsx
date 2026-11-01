import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { PrimaryButton } from '../common/PrimaryButton';
import { GREETING_EDITIONS } from '../../data/greetings';
import { useLanguage } from '../../hooks/useLanguage';
import { Sparkles, Eye, X, ArrowRight } from 'lucide-react';
import type { GreetingEdition } from '../../data/types';

export const GreetingCardShowcase: React.FC = () => {
  const { isHindi } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [selectedEdition, setSelectedEdition] = useState<GreetingEdition | null>(null);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-brand-ivory relative overflow-hidden" id="greeting-showcase">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={isHindi ? 'शाही ग्रीटिंग कार्ड विन्यास' : 'Signature Card Editions'}
          title={isHindi ? 'डिजिटल शुभकामना पत्र — एक अद्वितीय कला' : 'The Art of Tactile Digital Greetings'}
          subtitle={
            isHindi
              ? 'आधुनिक तकनीक और पारंपरिक भारतीय सौंदर्य का संगम — हर रिश्ते और उत्सव के लिए विशिष्ट हस्ताक्षर संस्करण'
              : 'A curated preview of bespoke celebration folds designed with metallic foil aesthetics and editorial poise'
          }
        />

        {/* 6 Curated Greeting Editions Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GREETING_EDITIONS.map((edition) => (
            <motion.div
              key={edition.id}
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
              transition={{ duration: 0.25 }}
              className="group cursor-pointer rounded-2xl bg-white p-5 sm:p-6 border border-brand-gold/30 shadow-card-luxury hover:shadow-card-luxury-hover hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between"
              onClick={() => setSelectedEdition(edition)}
            >
              {/* Card Thumbnail Area with Gold Inset */}
              <div className="relative aspect-[4/3] rounded-xl border border-brand-gold/25 bg-gradient-to-b from-[#FFFDF9] to-[#FAF6EE] p-4 flex flex-col justify-between overflow-hidden">
                {/* 4 Corner Ornaments */}
                <div className="absolute top-1.5 left-1.5 text-brand-gold opacity-50">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                </div>
                <div className="absolute top-1.5 right-1.5 text-brand-gold opacity-50">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                </div>

                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-sans uppercase tracking-widest-luxury font-bold bg-brand-light text-brand-royal border border-brand-gold/30">
                    {isHindi ? edition.badgeHi : edition.badgeEn}
                  </span>
                  <span className="text-[10px] text-brand-gold font-semibold uppercase">
                    {isHindi ? edition.categoryHi : edition.categoryEn}
                  </span>
                </div>

                {/* Center Motif Artwork */}
                <div className="my-auto flex flex-col items-center text-center">
                  <div className="w-14 h-14 mx-auto mb-2 flex items-center justify-center">
                    {edition.motifType === 'lotus' && (
                      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-brand-gold drop-shadow-md">
                        <circle cx="32" cy="32" r="28" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />
                        <path d="M32 12C32 12 24 24 24 34C24 38 27.5 42 32 42C36.5 42 40 38 40 34C40 24 32 12 32 12Z" fill="url(#lotusFoil)" />
                        <path d="M20 22C20 22 17 30 19 36C20.5 40 24 42 27 41C27 36 23 29 20 22Z" fill="#D4AF37" opacity="0.85" />
                        <path d="M44 22C44 22 47 30 45 36C43.5 40 40 42 37 41C37 36 41 29 44 22Z" fill="#D4AF37" opacity="0.85" />
                        <circle cx="32" cy="32" r="3" fill="#FFFFFF" />
                        <defs>
                          <linearGradient id="lotusFoil" x1="24" y1="12" x2="40" y2="42" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F2D98B" />
                            <stop offset="0.6" stopColor="#D4AF37" />
                            <stop offset="1" stopColor="#B45309" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                    {edition.motifType === 'diya' && (
                      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-brand-gold drop-shadow-md">
                        <circle cx="32" cy="26" r="16" fill="url(#diyaAura)" opacity="0.4" />
                        <path d="M16 38C16 48 24 52 32 52C40 52 48 48 48 38C46 39 39 40 32 40C25 40 18 39 16 38Z" fill="#B45309" stroke="#D4AF37" strokeWidth="1.5" />
                        <path d="M32 14C32 14 27 24 27 30C27 33 29.2 35 32 35C34.8 35 37 33 37 30C37 24 32 14 32 14Z" fill="url(#flameFoil)" />
                        <circle cx="32" cy="28" r="2" fill="#FFFFFF" />
                        <defs>
                          <radialGradient id="diyaAura" cx="32" cy="26" r="16" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FDE68A" />
                            <stop offset="1" stopColor="transparent" />
                          </radialGradient>
                          <linearGradient id="flameFoil" x1="27" y1="14" x2="37" y2="35" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FEF08A" />
                            <stop offset="0.5" stopColor="#F59E0B" />
                            <stop offset="1" stopColor="#DC2626" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                    {edition.motifType === 'rangoli' && (
                      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-brand-gold drop-shadow-md">
                        <circle cx="32" cy="32" r="26" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                        <path d="M32 8L36 24L48 20L40 32L52 36L38 42L42 54L32 44L22 54L26 42L12 36L24 32L16 20L28 24Z" fill="#DC2626" stroke="#FBBF24" strokeWidth="1" />
                        <circle cx="32" cy="32" r="8" fill="#F59E0B" stroke="#D4AF37" strokeWidth="1.5" />
                        <circle cx="32" cy="32" r="3" fill="#FFFFFF" />
                      </svg>
                    )}
                    {edition.motifType === 'peacock' && (
                      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-brand-gold drop-shadow-md">
                        <path d="M8 20C18 32 46 32 56 20" stroke="#047857" strokeWidth="2.5" />
                        <circle cx="16" cy="26" r="5" fill="#F59E0B" stroke="#D4AF37" strokeWidth="1" />
                        <circle cx="32" cy="30" r="6" fill="#EA580C" stroke="#D4AF37" strokeWidth="1" />
                        <circle cx="48" cy="26" r="5" fill="#F59E0B" stroke="#D4AF37" strokeWidth="1" />
                        <path d="M32 30V48" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="2 2" />
                        <circle cx="32" cy="48" r="3" fill="#047857" />
                      </svg>
                    )}
                    {edition.motifType === 'mandala' && (
                      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-brand-gold drop-shadow-md">
                        <circle cx="32" cy="32" r="26" stroke="#D4AF37" strokeWidth="1.5" />
                        <circle cx="32" cy="32" r="20" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="2 2" />
                        <circle cx="32" cy="32" r="14" stroke="#D4AF37" strokeWidth="1.5" />
                        <path d="M32 22C32 22 28 28 28 32C28 34.2 29.8 36 32 36C34.2 36 36 34.2 36 32C36 28 32 22 32 22Z" fill="#D4AF37" />
                      </svg>
                    )}
                    {edition.motifType === 'festive' && (
                      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full text-brand-gold drop-shadow-md">
                        <circle cx="32" cy="32" r="26" stroke="#45216B" strokeWidth="1" opacity="0.3" />
                        <path d="M32 14L35 26L47 22L39 32L50 38L37 42L40 54L32 46L24 54L27 42L14 38L25 32L17 22L29 26Z" fill="#45216B" stroke="#D4AF37" strokeWidth="1" />
                        <circle cx="32" cy="32" r="6" fill="#F2D98B" />
                        <circle cx="32" cy="32" r="2" fill="#FFFFFF" />
                      </svg>
                    )}
                  </div>
                  <p className="font-serif italic text-xs text-brand-dark/80 line-clamp-2 px-2">
                    "{isHindi ? edition.blessingHi : edition.blessingEn}"
                  </p>
                </div>

                {/* Bottom Line */}
                <div className="w-12 h-[1px] bg-brand-gold/40 mx-auto" />
              </div>

              {/* Card Meta & Action */}
              <div className="pt-4 space-y-2">
                <span className="text-[10px] font-sans uppercase tracking-widest-luxury text-brand-muted block">
                  {isHindi ? edition.editionHi : edition.editionEn}
                </span>
                <h4 className="font-display text-base sm:text-lg font-bold text-brand-deep group-hover:text-brand-royal transition-colors">
                  {isHindi ? edition.titleHi : edition.titleEn}
                </h4>

                <div className="pt-2 flex items-center justify-between border-t border-brand-gold/15 text-xs text-brand-gold font-semibold">
                  <span className="flex items-center gap-1 group-hover:text-brand-deep transition-colors">
                    <Eye size={13} />
                    <span>{isHindi ? 'कार्ड पूर्वावलोकन' : 'View Preview'}</span>
                  </span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Studio Destination CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <PrimaryButton
            to="/greeting-cards"
            size="lg"
            variant="royal"
            icon={<Sparkles size={18} className="text-brand-gold-light" />}
            className="w-full sm:w-auto"
          >
            {isHindi ? 'ग्रीटिंग कार्ड स्टूडियो देखें' : 'Explore Greeting Studio Creations'}
          </PrimaryButton>
        </div>
      </div>

      {/* Interactive Detail Modal / Dialog */}
      <AnimatePresence>
        {selectedEdition && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-card-title"
          >
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 border border-brand-gold shadow-royal overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedEdition(null)}
                className="absolute top-4 right-4 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-brand-light text-brand-deep hover:bg-brand-light/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                aria-label="Close Preview"
              >
                <X size={18} />
              </button>

              <div className="space-y-4 text-center">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-widest-luxury font-bold bg-brand-light text-brand-royal border border-brand-gold/30">
                  {isHindi ? selectedEdition.badgeHi : selectedEdition.badgeEn}
                </span>

                <h3 id="modal-card-title" className="font-display text-2xl font-bold text-brand-deep">
                  {isHindi ? selectedEdition.titleHi : selectedEdition.titleEn}
                </h3>
                <p className="text-xs uppercase tracking-widest-luxury text-brand-muted">
                  {isHindi ? selectedEdition.editionHi : selectedEdition.editionEn}
                </p>

                <div className="p-6 rounded-xl bg-brand-ivory border border-brand-gold/30 my-4">
                  <p className="font-serif italic text-base sm:text-lg text-brand-deep leading-relaxed">
                    "{isHindi ? selectedEdition.blessingHi : selectedEdition.blessingEn}"
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <PrimaryButton
                    to={`/greeting-cards?template=${selectedEdition.id}`}
                    size="md"
                    variant="gold"
                    icon={<Sparkles size={16} />}
                    className="w-full sm:w-auto"
                  >
                    {isHindi ? 'यह डिज़ाइन चुनें' : 'Select This Design'}
                  </PrimaryButton>
                  <button
                    type="button"
                    onClick={() => setSelectedEdition(null)}
                    className="min-h-[44px] px-4 py-2 text-xs font-semibold text-brand-muted hover:text-brand-deep focus:outline-none"
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
