import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { PrimaryButton } from '../common/PrimaryButton';
import { useLanguage } from '../../hooks/useLanguage';
import { Sparkles, Calendar, CheckCircle2 } from 'lucide-react';

export const FestivalFeaturePreview: React.FC = () => {
  const { t, isHindi } = useLanguage();

  return (
    <section className="relative py-10 sm:py-14 md:py-18 lg:py-24 bg-brand-deep text-brand-white overflow-hidden border-y border-brand-gold/30">
      {/* Subtle background mandala texture */}
      <div
        className="absolute inset-0 bg-mandala opacity-[0.05] pointer-events-none"
        aria-hidden="true"
      />

      {/* Gold atmospheric ambient lights */}
      <div
        className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-brand-royal/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t.festivalFeature.badge}
          title={t.festivalFeature.title}
          subtitle={t.festivalFeature.subtitle}
          light
        />

        <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Column: Visual Artwork & Sacred Shloka Card (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl bg-brand-royal/70 border border-brand-gold/40 p-4 sm:p-7 backdrop-blur-md shadow-royal">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-brand-gold/20 pb-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-brand-champagne uppercase tracking-widest-luxury">
                  <Calendar size={13} className="text-brand-gold" />
                  <span>{t.festivalFeature.dateBadge}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-brand-gold/20 text-brand-champagne border border-brand-gold/30">
                  Featured
                </span>
              </div>

              {/* Sanskrit Sacred Shloka Showcase */}
              <div className="my-2 sm:my-4 p-4 sm:p-5 rounded-xl bg-brand-deep/85 border border-brand-gold/30 text-center space-y-2">
                <p className="font-devanagari text-base sm:text-lg font-semibold text-brand-champagne tracking-wide leading-relaxed">
                  शुभं करोति कल्याणमारोग्यं धनसंपदा ।<br />
                  शत्रुबुद्धि-विनाशाय दीपज्योतिर्नमोऽस्तुते ॥
                </p>
                <div className="w-10 sm:w-12 h-[1px] bg-brand-gold/40 mx-auto" />
                <p className="font-serif text-[11px] sm:text-xs text-brand-white/70 italic leading-normal">
                  {isHindi
                    ? '"जो कल्याणकारी, आरोग्य और धन-सम्पदा प्रदान करती है, उस दिव्य दीपज्योति को हमारा सादर नमन।"'
                    : '"Salutations to the luminous light of the lamp, which brings auspiciousness, well-being, and boundless prosperity."'}
                </p>
              </div>

              {/* Handcrafted Rangoli Accent SVG */}
              <div className="pt-2 sm:pt-4 flex items-center justify-center">
                <svg viewBox="0 0 160 40" fill="none" className="w-32 sm:w-40 h-8 sm:h-10 text-brand-gold opacity-75">
                  <path d="M0 20 H50 M110 20 H160" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="80" cy="20" r="14" stroke="#F2D98B" strokeWidth="1" />
                  <circle cx="80" cy="20" r="6" fill="#D4AF37" />
                  <path d="M70 20 L80 10 L90 20 L80 30 Z" fill="#F2D98B" opacity="0.6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column: Feature Highlights & CTA (6 cols) */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-brand-white leading-snug">
              {isHindi
                ? 'परंपराओं की पावन ज्योति, आधुनिक कलात्मकता के साथ'
                : 'A Tapestry of Luminous Traditions, Reimagined for the Modern Era'}
            </h3>

            <p className="font-sans text-xs sm:text-sm md:text-base text-brand-champagne/85 leading-relaxed">
              {t.festivalFeature.description}
            </p>

            <ul className="space-y-3 pt-1">
              <li className="flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-brand-gold/20 text-brand-champagne mt-0.5 flex-shrink-0">
                  <CheckCircle2 size={15} />
                </div>
                <span className="font-sans text-xs sm:text-sm md:text-base text-brand-white/90">
                  {t.festivalFeature.bullet1}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-brand-gold/20 text-brand-champagne mt-0.5 flex-shrink-0">
                  <CheckCircle2 size={15} />
                </div>
                <span className="font-sans text-xs sm:text-sm md:text-base text-brand-white/90">
                  {t.festivalFeature.bullet2}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-brand-gold/20 text-brand-champagne mt-0.5 flex-shrink-0">
                  <CheckCircle2 size={15} />
                </div>
                <span className="font-sans text-xs sm:text-sm md:text-base text-brand-white/90">
                  {t.festivalFeature.bullet3}
                </span>
              </li>
            </ul>

            <div className="pt-2 sm:pt-4">
              <PrimaryButton
                to="/festivals"
                size="md"
                variant="gold"
                icon={<Sparkles size={16} />}
                className="w-full sm:w-auto"
              >
                {t.festivalFeature.cta}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
