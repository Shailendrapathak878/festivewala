import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { Sparkles, Eye, Wand2, ArrowRight } from 'lucide-react';
import { GREETING_EDITIONS } from '../../data/greetings';
import type { GreetingEdition } from '../../data/types';

export const PopularTemplatesSection: React.FC = () => {
  const { isHindi, loc } = useLanguage();
  const [activeEdition, setActiveEdition] = useState<GreetingEdition | null>(null);

  // Curate 6 top popular editions from verified GREETING_EDITIONS
  const popularTemplates = GREETING_EDITIONS.slice(0, 6);

  const renderMotifArtwork = (motifType: string) => {
    switch (motifType) {
      case 'lotus':
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 text-brand-gold drop-shadow-md">
            <circle cx="32" cy="32" r="28" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />
            <path d="M32 12C32 12 24 24 24 34C24 38 27.5 42 32 42C36.5 42 40 38 40 34C40 24 32 12 32 12Z" fill="url(#popLotusFoil)" />
            <path d="M20 22C20 22 17 30 19 36C20.5 40 24 42 27 41C27 36 23 29 20 22Z" fill="#D4AF37" opacity="0.85" />
            <path d="M44 22C44 22 47 30 45 36C43.5 40 40 42 37 41C37 36 41 29 44 22Z" fill="#D4AF37" opacity="0.85" />
            <circle cx="32" cy="32" r="3" fill="#FFFFFF" />
            <defs>
              <linearGradient id="popLotusFoil" x1="24" y1="12" x2="40" y2="42" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F2D98B" />
                <stop offset="0.6" stopColor="#D4AF37" />
                <stop offset="1" stopColor="#B45309" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'diya':
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 text-brand-gold drop-shadow-md">
            <circle cx="32" cy="26" r="16" fill="#FDE68A" opacity="0.3" />
            <path d="M16 38C16 48 24 52 32 52C40 52 48 48 48 38C46 39 39 40 32 40C25 40 18 39 16 38Z" fill="#B45309" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M32 14C32 14 27 24 27 30C27 33 29.2 35 32 35C34.8 35 37 33 37 30C37 24 32 14 32 14Z" fill="url(#popFlameFoil)" />
            <circle cx="32" cy="28" r="2" fill="#FFFFFF" />
            <defs>
              <linearGradient id="popFlameFoil" x1="27" y1="14" x2="37" y2="35" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FEF08A" />
                <stop offset="0.5" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#DC2626" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'rangoli':
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 text-brand-gold drop-shadow-md">
            <circle cx="32" cy="32" r="26" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <rect x="20" y="20" width="24" height="24" rx="4" transform="rotate(45 32 32)" stroke="#D4AF37" strokeWidth="1.5" fill="#FAF7F0" />
            <circle cx="32" cy="32" r="6" fill="#D81B60" />
            <circle cx="32" cy="32" r="2" fill="#FAF7F0" />
          </svg>
        );
      case 'peacock':
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 text-brand-gold drop-shadow-md">
            <circle cx="32" cy="32" r="26" stroke="#FFB300" strokeWidth="1" opacity="0.5" />
            <path d="M26 44C26 36 32 32 38 28C42 25 44 21 44 17" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
            <circle cx="44" cy="17" r="4" fill="#0284C7" />
            <circle cx="32" cy="40" r="10" fill="#FFB300" opacity="0.75" />
          </svg>
        );
      case 'mandala':
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 text-brand-gold drop-shadow-md">
            <circle cx="32" cy="32" r="24" stroke="#F2D98B" strokeWidth="1.5" />
            <circle cx="32" cy="32" r="16" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="32" cy="32" r="8" fill="#F2D98B" opacity="0.8" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 text-brand-gold drop-shadow-md">
            <circle cx="32" cy="32" r="25" stroke="#45216B" strokeWidth="1.5" />
            <polygon points="32,14 37,27 50,27 39,36 43,49 32,41 21,49 25,36 14,27 27,27" fill="#F2D98B" />
          </svg>
        );
    }
  };

  return (
    <section
      id="popular-templates"
      aria-labelledby="popular-templates-heading"
      className="py-14 sm:py-20 bg-brand-ivory text-brand-dark border-b border-brand-gold/25 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-deep text-[#F2D98B] border border-brand-gold/40 shadow-sm">
            <Sparkles size={13} className="text-[#F2D98B]" />
            <span>{loc('Curated Folds', 'हस्ताक्षर डिजाइन्स', 'Designer Templates')}</span>
          </div>

          <h2
            id="popular-templates-heading"
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#24113D] tracking-tight"
          >
            {loc(
              'Popular Greeting Templates',
              'लोकप्रिय ग्रीटिंग टेम्प्लेट्स',
              'Popular Greeting Templates'
            )}
          </h2>

          <p className="text-sm sm:text-base text-brand-dark/75 leading-relaxed">
            {loc(
              'Choose from our most cherished festival editions featuring gold foil aesthetics, sacred shlokas, and customizable text.',
              'पारंपरिक स्वर्ण पत्र, मांगलिक श्लोक और सुरुचिपूर्ण कला से सजे सबसे लोकप्रिय ग्रीटिंग कार्ड संस्करण।',
              'Royal gold foil aesthetics aur sacred shlokas ke sath ready greeting templates.'
            )}
          </p>
        </div>

        {/* 6 Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {popularTemplates.map((template) => {
            const title = isHindi ? template.titleHi : template.titleEn;
            const category = isHindi ? template.categoryHi : template.categoryEn;
            const badge = isHindi ? template.badgeHi : template.badgeEn;
            const blessing = isHindi ? template.blessingHi : template.blessingEn;

            return (
              <div
                key={template.id}
                className="group flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-white border border-brand-gold/30 shadow-card-luxury hover:shadow-card-luxury-hover hover:border-brand-gold transition-all duration-300"
              >
                <div>
                  {/* Card Motif Thumbnail Container */}
                  <div className="relative aspect-[4/3] rounded-2xl border border-brand-gold/25 bg-gradient-to-b from-[#FFFDF9] to-[#FAF6EE] p-4 flex flex-col justify-between items-center overflow-hidden mb-4 group-hover:border-brand-gold/50 transition-colors">
                    {/* Top Row: Badge & Category */}
                    <div className="w-full flex items-center justify-between z-10">
                      <span className="text-[10px] font-sans uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-light text-brand-royal border border-brand-gold/30">
                        {badge}
                      </span>
                      <span className="text-[11px] font-semibold text-brand-gold uppercase tracking-wider">
                        {category}
                      </span>
                    </div>

                    {/* Center Motif Artwork */}
                    <div className="my-auto flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      {renderMotifArtwork(template.motifType)}
                    </div>

                    {/* Subtle Bottom Accent */}
                    <p className="text-[11px] text-brand-muted font-sans italic truncate max-w-full px-2">
                      "{blessing}"
                    </p>
                  </div>

                  {/* Title & Category Info */}
                  <div className="space-y-1 mb-4">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-deep group-hover:text-brand-royal transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-brand-muted font-sans">
                      {isHindi ? template.editionHi : template.editionEn}
                    </p>
                  </div>
                </div>

                {/* Create Action Button */}
                <div className="pt-3 border-t border-brand-gold/15 flex items-center gap-2">
                  <Link
                    to={`/greeting-cards?template=${template.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-deep text-brand-champagne hover:bg-brand-royal text-xs font-bold transition-all shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold min-h-[42px]"
                  >
                    <Wand2 size={14} className="text-brand-gold" />
                    <span>{loc('Use Template', 'यह कार्ड बनाएं', 'Use Template')}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setActiveEdition(template)}
                    className="inline-flex items-center justify-center px-3 py-2.5 rounded-xl bg-brand-light text-brand-deep hover:bg-brand-gold/20 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold min-h-[42px]"
                    aria-label={loc('Preview Details', 'विवरण देखें', 'Preview')}
                  >
                    <Eye size={15} className="text-brand-gold" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Studio Cards CTA */}
        <div className="text-center">
          <Link
            to="/greeting-cards"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-royal to-brand-deep text-brand-champagne font-bold text-sm sm:text-base border border-brand-gold/40 shadow-royal hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles size={16} className="text-brand-gold" />
            <span>{loc('Open Greeting Studio & Explore All Designs', 'ग्रीटिंग स्टूडियो खोलें व सभी डिजाइन्स देखें', 'Explore All Templates in Studio')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Detail Preview Modal */}
      {activeEdition && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 border-2 border-brand-gold shadow-royal text-center space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-brand-light text-brand-royal border border-brand-gold/30">
              {isHindi ? activeEdition.badgeHi : activeEdition.badgeEn}
            </span>

            <h3 className="font-serif text-2xl font-bold text-brand-deep">
              {isHindi ? activeEdition.titleHi : activeEdition.titleEn}
            </h3>

            <p className="text-xs uppercase tracking-widest text-brand-muted">
              {isHindi ? activeEdition.editionHi : activeEdition.editionEn}
            </p>

            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-brand-gold/30 text-left space-y-2">
              <p className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                {loc('Blessing Inscription', 'मंगल कामना श्लोक', 'Blessing Inscription')}
              </p>
              <p className="font-serif italic text-base text-brand-deep leading-relaxed">
                "{isHindi ? activeEdition.blessingHi : activeEdition.blessingEn}"
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={`/greeting-cards?template=${activeEdition.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-brand-deep font-bold text-sm shadow-md hover:bg-brand-champagne transition-all"
              >
                <Wand2 size={15} />
                <span>{loc('Customize in Studio', 'स्टूडियो में बनाएं', 'Customize')}</span>
              </Link>
              <button
                type="button"
                onClick={() => setActiveEdition(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-brand-muted hover:text-brand-deep"
              >
                {loc('Close', 'बंद करें', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

